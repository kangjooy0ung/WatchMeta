import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Connect, type Plugin } from 'vite'

// 배포에서는 api/ 아래 파일이 Vercel Functions가 되어 /api/* 로 서빙된다. 개발 서버에는 그게
// 없으므로, 같은 파일을 직접 불러 /api/* 요청을 처리해준다. 덕분에 `npm run dev` 하나로
// 프론트와 API가 같이 돈다(예전에는 백엔드 서버를 따로 띄워야 했다).
//
// 라우팅 규칙은 Vercel과 맞춘다: /api/maps -> api/maps.ts,
// /api/players/<값>/overview -> api/players/[battleTag]/overview.ts
function vercelApiDevServer(): Plugin {
  return {
    name: 'watchmeta-api-dev-server',
    apply: 'serve',
    configureServer(server) {
      const handle: Connect.NextHandleFunction = (req, res, next) => {
        const rawUrl = req.url ?? ''
        if (!rawUrl.startsWith('/api/')) return next()

        void (async () => {
          const url = new URL(rawUrl, 'http://localhost')
          const segments = url.pathname.replace(/^\/api\//, '').split('/').filter(Boolean)
          const query: Record<string, string> = Object.fromEntries(url.searchParams)

          // 동적 구간([battleTag])은 파일 경로로 바로 못 찾으니 알려진 패턴만 매핑한다.
          let modulePath: string | null = null
          if (segments.length === 1) {
            modulePath = `./api/${segments[0]}.ts`
          } else if (segments[0] === 'players' && segments[1] === 'search') {
            modulePath = './api/players/search.ts'
          } else if (segments[0] === 'players' && segments[2] === 'overview') {
            modulePath = './api/players/[battleTag]/overview.ts'
            query.battleTag = decodeURIComponent(segments[1])
          }

          // 파일이 없으면 import가 터지면서 500이 난다. 없는 경로는 404로 돌려줘야
          // 개발 중에 "오타인지 함수가 깨진 건지"를 바로 구분할 수 있다.
          if (modulePath && !existsSync(fileURLToPath(new URL(modulePath, import.meta.url)))) {
            modulePath = null
          }

          if (!modulePath) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ message: `개발 서버에 매핑되지 않은 경로입니다: ${url.pathname}` }))
            return
          }

          try {
            const mod = (await server.ssrLoadModule(modulePath)) as {
              default: (req: unknown, res: unknown) => Promise<void> | void
            }
            // Vercel의 req/res 중 핸들러가 실제로 쓰는 부분만 흉내 낸다.
            const shim = {
              setHeader: (key: string, value: string) => {
                res.setHeader(key, value)
                return shim
              },
              status: (code: number) => {
                res.statusCode = code
                return shim
              },
              json: (body: unknown) => {
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify(body))
                return shim
              },
            }
            await mod.default({ query, method: req.method, url: rawUrl }, shim)
          } catch (error) {
            server.config.logger.error(`[api] ${url.pathname} 처리 실패: ${String(error)}`)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ message: '개발 서버에서 API 처리에 실패했습니다.' }))
          }
        })()
      }

      server.middlewares.use(handle)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vercelApiDevServer()],
})
