import { RequestHandler } from 'express'
import {
  getDefaultRedirectUrl,
  getDefaultRedirectType
} from '@draserver/common'
import { BaseController } from './base.js'
import { AppOptions } from '../interfaces/app.js'
import { KNOWN_PATHNAMES } from '../constants.js'
import { logger } from '../logger.js'

export class WildcardController extends BaseController {
  constructor(options: AppOptions) {
    super(options)

    this.router.use(this.defaultHandler)

    logger.info(`WildcardController registered`)
  }

  defaultHandler: RequestHandler = async (req, res, next): Promise<void> => {
    try {
      const reqUrl = new URL(
        'https://' +
        req.hostname.replace(/^www\./, '') +
        req.originalUrl
      )

      const settings = await this.postgresService.getSettings()

      let redirCategoryId: number | null = null
      let redirUrl = new URL(getDefaultRedirectUrl(settings))
      let redirType = getDefaultRedirectType(settings)

      const category = await this.postgresService.getCategory(reqUrl.hostname)
      if (category !== undefined) {
        redirCategoryId = category.categoryId
        redirUrl = new URL(category.categoryRedirectUrl)
        redirType = category.categoryRedirectType
      }

      if (KNOWN_PATHNAMES.includes(reqUrl.pathname)) {
        redirUrl.pathname = reqUrl.pathname
      }

      const logData = await this.postgresService.newLogData(
        reqUrl.hostname,
        reqUrl.toString(),
        redirCategoryId,
        redirUrl.toString(),
        redirType
      )

      res.redirect(redirType, redirUrl.toString())
    } catch (error) {
      next(error)
    }
  }
}
