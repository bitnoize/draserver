import { RequestHandler } from 'express'
import {
  getDefaultRedirectUrl,
  getDefaultRedirectType
} from '@draserver/common'
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
      const domainName = req.get('host').replace(/^www\./, '')
      const originalUrl = req.originalUrl

      const settings = await this.postgresService.getSettings()
      let categoryRedirectUrl = getDefaultRedirectUrl(settings)
      let categoryRedirectType = getDefaultRedirectType(settings)

      const category = await this.postgresService.getCategory(domainName)
      if (category !== undefined) {
        categoryRedirectUrl = category.categoryRedirectUrl
        categoryRedirectType = category.categoryRedirectType
      }

      if (originalUrl.match(/^\/(robots.txt|sitemap.xml|favicon.ico)/)) {
      }

      res.status(200).send('OK')
    } catch (error) {
      next(error)
    }
  }
}
