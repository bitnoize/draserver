import pg from 'pg'
import { PostgresServiceOptions } from '../interfaces/postgres.js'
import { Setting } from '../interfaces/setting.js'
import {
  isRowId,
  isRowCount,
  isRowsSettings,
  buildSettings
} from '../helpers/postgres.js'
import { logger } from '../logger.js'

export class PostgresService {
  private pool: pg.Pool

  constructor(private readonly options: PostgresServiceOptions) {
    const { postgresUrl } = this.options

    this.pool = new pg.Pool({
      connectionString: postgresUrl,
      idleTimeoutMillis: 10000,
      max: 10,
      allowExitOnIdle: true
    })

    pg.types.setTypeParser(pg.types.builtins.INT8, (value: string): number =>
      parseInt(value)
    )

    logger.info(`PostgresService initialized`)
  }

  private static _instance: PostgresService | undefined

  static register(options: PostgresServiceOptions) {
    if (this._instance !== undefined) {
      throw new Error(`PostgresService allready registered`)
    }

    this._instance = new PostgresService(options)
  }

  static instance(): PostgresService {
    if (this._instance === undefined) {
      throw new Error(`PostgresService does not registered`)
    }

    return this._instance
  }

  async getSettings(): Promise<Setting[]> {
    const client = await this.pool.connect()

    try {
      const resultSelectSettings = await client.query(
        this.selectSettingsSql
      )

      const rowsSelectSettings = resultSelectSettings.rows
      if (!isRowsSettings(rowsSelectSettings)) {
        throw new Error(`select settings malformed result`)
      }

      const settings = buildSettings(rowsSelectSettings)

      return settings
    } catch (error) {
      throw error
    } finally {
      client.release()
    }
  }
}
