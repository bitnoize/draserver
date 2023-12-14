import { Router } from 'express'

export interface AppOptions {
  listenPort: number
}

export interface Controller {
  router: Router
}
