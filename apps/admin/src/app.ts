import express, { Application, RequestHandler, ErrorRequestHandler } from 'express'
import createError, { HttpError } from 'http-errors'
import { AppOptions, Controller } from './interfaces/app.js'
import { SettingsController } from './controllers/settings.js'
import { logger } from './logger.js'

export class App {
  private app: Application

  constructor(private readonly options: AppOptions) {
    this.app = express()

    this.app.enable('trust proxy')
    this.app.disable('x-powered-by')
    //this.app.disable('etag')

    const controllers: Array<Controller> = []

    controllers.push(new SettingsController(this.options))

    controllers.forEach((controller) => this.app.use(controller.router))

    this.app.use(this.notFoundHandler)
    this.app.use(this.exceptionHandler)

    logger.info(`App initialized`)
  }

  start(): void {
    const { listenPort } = this.options

    this.app.listen(listenPort, () => {
      logger.info(`App started and listening on ${listenPort} port`)
    })
  }

  private notFoundHandler: RequestHandler = (req, res, next) => {
    next(new createError.NotFound())
  }

  private exceptionHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (res.headersSent) {
      return next(error)
    }

    if (error instanceof HttpError) {
      res.status(error.statusCode).send({
        message: error.message
      })
    } else {
      logger.error(error.stack)

      res.status(500).send({
        message: 'Internal Server Error'
      })
    }
  }
}
