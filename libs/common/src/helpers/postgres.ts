import { RowId, RowCount } from '../interfaces/postgres.js'
import {
  RowCategoryCategoryId,
  RowCategory,
  Category
} from '../interfaces/category.js'
import {
  RowCategoryDomainDomainId,
  RowCategoryDomain,
  CategoryDomain
} from '../interfaces/category-domain.js'
import {
  RowSettingSettingId,
  RowSetting,
  Setting
} from '../interfaces/setting.js'
import {
  RowLogDataLogId,
  RowLogData,
  LogData
} from '../interfaces/logdata.js'

//
// Categories
//

export const isRowCategoryCategoryId = (
  row: unknown
): row is RowCategoryCategoryId => {
  return (
    row != null &&
    typeof row === 'object' &&
    'category_id' in row &&
    typeof row.category_id === 'number'
  )
}

export const isRowCategory = (row: unknown): row is RowCategory => {
  return (
    row != null &&
    typeof row === 'object' &&
    'category_id' in row &&
    typeof row.category_id === 'number' &&
    'category_name' in row &&
    typeof row.category_name === 'string' &&
    'category_redirect_url' in row &&
    typeof row.category_redirect_url === 'string' &&
    'category_domain_count' in row &&
    typeof row.category_domain_count === 'number' &&
    'category_redirect_type' in row &&
    typeof row.category_redirect_type === 'number'
  )
}

export const buildCategory = (row: RowCategory): Category => {
  const category: Category = {
    categoryId: row.category_id,
    categoryName: category_name,
    categoryRedirectUrl: category_redirect_url,
    categoryDomainCount: category_domain_count,
    categoryRedirectType: category_redirect_type
  }

  return category
}

export const isRowsCategories = (rows: unknown): rows is RowCategory[] => {
  return (
    rows != null &&
    Array.isArray(rows) &&
    rows.every((row) => isRowCategory(row))
  )
}

export const buildCategories = (rows: RowCategory[]): Category[] => {
  return rows.map((row) => buildCategory(row))
}

//
// CategoryDomains
//

export const isRowCategoryDomainDomainId = (
  row: unknown
): row is RowCategoryDomainDomainId => {
  return (
    row != null &&
    typeof row === 'object' &&
    'domain_id' in row &&
    typeof row.domain_id === 'number'
  )
}

export const isRowCategoryDomain = (row: unknown): row is RowCategoryDomain => {
  return (
    row != null &&
    typeof row === 'object' &&
    'domain_id' in row &&
    typeof row.domain_id === 'number' &&
    'category_id' in row &&
    typeof row.category_id === 'number' &&
    'domain_name' in row &&
    typeof row.domain_name === 'string'
  )
}

export const buildCategoryDomain = (row: RowCategoryDomain): CategoryDomain => {
  const categoryDomain: CategoryDomain = {
    domainId: row.domain_id,
    categoryId: row.category_id,
    domainName: domain_name
  }

  return categoryDomain
}

export const isRowsCategoryDomains = (
  rows: unknown
): rows is RowCategoryDomain[] => {
  return (
    rows != null &&
    Array.isArray(rows) &&
    rows.every((row) => isRowCategoryDomain(row))
  )
}

export const buildCategoryDomains = (
  rows: RowCategoryDomain[]
): CategoryDomain[] => {
  return rows.map((row) => buildCategoryDomain(row))
}

//
// Settings
//

export const isRowSettingSettingId = (
  row: unknown
): row is RowSettingSettingId => {
  return (
    row != null &&
    typeof row === 'object' &&
    'setting_id' in row &&
    typeof row.setting_id === 'number'
  )
}

export const isRowSetting = (row: unknown): row is RowSetting => {
  return (
    row != null &&
    typeof row === 'object' &&
    'setting_id' in row &&
    typeof row.setting_id === 'number' &&
    'setting_name' in row &&
    typeof row.setting_name === 'string' &&
    'setting_value_int' in row &&
    (row.setting_value_int === null ||
      typeof row.setting_value_int === 'number') &&
    'setting_value_string' in row &&
    (row.setting_value_string === null ||
      typeof row.setting_value_string === 'string')
  )
}

export const buildSetting = (row: RowSetting): Setting => {
  const setting: Setting = {
    settingId: row.setting_id,
    settingName: row.setting_name,
    settingValueInt: row.setting_value_int,
    settingValueString: row.setting_value_string,
  }

  return setting
}

export const isRowsSettings = (rows: unknown): rows is RowSetting[] => {
  return (
    rows != null &&
    Array.isArray(rows) &&
    rows.every((row) => isRowSetting(row))
  )
}

export const buildSettings = (rows: RowSetting[]): Setting[] => {
  return rows.map((row) => buildSetting(row))
}

//
// LogsData
//

export const isRowLogDataLogId = (
  row: unknown
): row is RowLogDataLogId => {
  return (
    row != null &&
    typeof row === 'object' &&
    'log_id' in row &&
    typeof row.log_id === 'number'
  )
}

export const isRowLogData = (row: unknown): row is RowLogData => {
  return (
    row != null &&
    typeof row === 'object' &&
    'log_id' in row &&
    typeof row.log_id === 'number' &&
    'log_date' in row &&
    typeof row.log_date === 'object' &&
    row.log_date instanceof Date &&
    'domain_name' in row &&
    typeof row.domain_name === 'string' &&
    'req_url' in row &&
    typeof row.req_url === 'string' &&
    'redir_category_id' in row &&
    (row.redir_category_id === null ||
      typeof row.redir_category_id === 'number') &&
    'redir_url' in row &&
    typeof row.redir_url === 'string' &&
    'redir_type' in row &&
    typeof row.redir_type === 'number'
  )
}

export const buildLogData = (row: RowLogData): LogData => {
  const logData: LogData = {
    logId: row.log_id,
    logDate: row.log_date,
    domainName: row.domain_name,
    reqUrl: row.req_url,
    redirCategoryId: row.redir_category_id,
    redirUrl: row.redir_url,
    redirType: row.redir_type
  }

  return logData
}

export const isRowsLogsData = (rows: unknown): rows is RowLogData[] => {
  return (
    rows != null &&
    Array.isArray(rows) &&
    rows.every((row) => isRowLogData(row))
  )
}

export const buildLogsData = (rows: RowLogData[]): LogData[] => {
  return rows.map((row) => buildLogData(row))
}
