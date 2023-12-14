import { RequestHandler } from 'express'
import { BaseController } from './base.js'
import { AppOptions } from '../interfaces/app.js'
import { logger } from '../logger.js'

export class SettingsController extends BaseController {
  constructor(options: AppOptions) {
    super(options)

    this.router.get('/settings', this.welcomeHandler)

    logger.info(`SettingsController registered`)
  }

  welcomeHandler: RequestHandler = async (req, res): Promise<void> => {
    try {
      res.status(200).send('OK')
    } catch (error) {
      next(error)
    }
  }
}
