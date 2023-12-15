import pg from 'pg'
import {
  Category,
  Setting,
  LogData,
  isRowCategory,
  buildCategory,
  isRowsSettings,
  buildSettings,
  isRowLogDataLogId,
  isRowLogData,
  buildLogData,
} from '@draserver/common'
import { PostgresServiceOptions } from '../interfaces/postgres.js'
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

    pg.types.setTypeParser(
      pg.types.builtins.INT8,
      (value: string): number => parseInt(value)
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

  async getCategory(domainName: string): Promise<Category | undefined> {
    const client = await this.pool.connect()

    try {
      const resultSelectCategory = await client.query(
        this.selectCategoryByDomainNameSql,
        [domainName]
      )

      if (resultSelectCategory.rowCount === 0) {
        return undefined
      }

      const rowSelectCategory = resultSelectCategory.rows.shift()
      if (!isRowCategory(rowSelectCategory)) {
        throw new Error(`selected category malformed result`)
      }

      const category = buildCategory(rowSelectCategory)

      return category
    } catch (error) {
      throw error
    } finally {
      client.release()
    }
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

  async newLogData(
    domainName: string,
    reqUrl: string,
    redirCategoryId: number | null,
    redirUrl: string,
    redirType: number
  ): Promise<LogData> {
    const client = await this.pool.connect()

    try {
      await client.query('BEGIN')

      if (redirCategoryId !== null) {
        const resultSelectCategory = await client.query(
          this.selectCategoryByCategoryIdSql + 'FOR SHARE',
          [redirCategoryId]
        )

        if (resultSelectCategory.rowCount === 0) {
          throw new Error(`expected Category does not exists`)
        }
      }

      const resultInsertLogData = await client.query(
        this.insertLogDataSql,
        [
          domainName,
          reqUrl,
          redirCategoryId,
          redirUrl,
          redirType
        ]
      )

      const rowInsertLogData = resultInsertLogData.rows.shift()
      if (!isRowLogDataLogId(rowInsertLogData)) {
        throw new Error(`insert LogData malformed result`)
      }

      const resultSelectLogData = await client.query(
        this.selectLogDataByLogIdSql + 'FOR SHARE',
        [rowInsertLogData.log_id]
      )

      const rowSelectLogData = resultSelectLogData.rows.shift()
      if (!isRowLogData(rowSelectLogData)) {
        throw new Error(`select logData malformed result`)
      }

      const logData = buildLogData(rowSelectLogData)

      await client.query('COMMIT')

      return logData
    } catch (error) {
      await client.query('ROLLBACK')

      throw error
    } finally {
      client.release()
    }
  }

  private readonly selectCategoryByCategoryIdSql = `
SELECT
  category_id,
  category_name,
  category_redirect_url,
  category_domain_count,
  category_redirect_type
FROM "Categories"
WHERE category_id = $1
`

  private readonly selectCategoryByDomainNameSql = `
SELECT
  category_id,
  category_name,
  category_redirect_url,
  category_domain_count,
  category_redirect_type
FROM "Categories"
WHERE category_id = (
  SELECT category_id FROM "CategoryDomains" WHERE domain_name = $1
)
`

  private readonly selectSettingsSql = `
SELECT
  setting_id, setting_name, setting_value_int, setting_value_string
FROM "Settings"
ORDER BY setting_id ASC
`

  private readonly insertLogDataSql = `
INSERT INTO "LogData" (
  domain_name,
  req_url,
  redir_category_id,
  redir_url,
  redir_type
)
VALUES ($1, $2, $3, $4, $5)
RETURNING log_id
`

  private readonly selectLogDataByLogIdSql = `
SELECT
  log_id,
  log_date,
  domain_name,
  req_url,
  redir_category_id,
  redir_url,
  redir_type
FROM "LogData"
WHERE log_id = $1
`
}
