import { config, loadConfig } from '@app-config/main'
import { PostgresService } from './services/postgres.js'
import { DEFAULT_LISTEN_PORT, DEFAULT_POSTGRES_URL } from './constants.js'
import { App } from './app.js'

export const bootstrap = async (): Promise<void> => {
  const listenPort = parseInt(<string>process.env.LISTEN_PORT, 10) || DEFAULT_LISTEN_PORT
  const postgresUrl = process.env.POSTGRES_URL || DEFAULT_POSTGRES_URL

  PostgresService.register({
    postgresUrl
  })

  const app = new App({
    listenPort
  })

  await app.start()
}

bootstrap().catch((error) => {
  if (error instanceof Error) {
    console.error(error.stack)
  }

  process.exit(1)
})
