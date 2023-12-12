import { RequestHandler } from 'express'
import { BaseController } from './base.js'
import { AppOptions } from '../interfaces/app.js'
import { logger } from '../logger.js'

export class WildcardController extends BaseController {
  constructor(options: AppOptions) {
    super(options)

    this.router.use(this.defaultHandler)

    logger.info(`WildcardController registered`)
  }

  defaultHandler: RequestHandler = async (req, res, next): Promise<void> => {
    try {
      console.dir(req)

      res.status(200).send('OK')
    } catch (error) {
      next(error)
    }
  }
}
