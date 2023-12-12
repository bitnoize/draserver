import {
  RowId,
  RowCount,
  RowSetting,
} from '../interfaces/postgres.js'
import { Setting } from '../interfaces/setting.js'

export const isRowId = (row: unknown): row is RowId => {
  return (
    row != null &&
    typeof row === 'object' &&
    'id' in row &&
    typeof row.id === 'number'
  )
}

export const isRowCount = (row: unknown): row is RowCount => {
  return (
    row != null &&
    typeof row === 'object' &&
    'count' in row &&
    typeof row.count === 'number'
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
    id: row.setting_id,
    name: row.setting_name,
    valueInt: row.setting_value_int,
    valueString: row.setting_value_string,
  }

  return setting
}

export const isRowsSettings = (rows: unknown): rows is RowSetting[] => {
  return (
    rows != null &&
    Array.isArray(rows) &&
    rows.every((row) => isRowSetting(rowSetting))
  )
}

export const buildSettings = (rows: RowSetting[]): Setting[] => {
  return rows.map((row) => buildSetting(row))
}
