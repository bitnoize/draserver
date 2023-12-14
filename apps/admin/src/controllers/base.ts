import { Router, Request, Response } from 'express'
import { AppOptions, Controller } from '../interfaces/app.js'
import { PostgresService } from '../services/postgres.js'

export abstract class BaseController implements Controller {
  readonly router: Router

  protected postgresService = PostgresService.instance()

  constructor(protected readonly options: AppOptions) {
    this.router = Router()
  }
}

