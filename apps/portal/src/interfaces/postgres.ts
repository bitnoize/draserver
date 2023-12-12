export interface PostgresServiceOptions {
  postgresUrl: string
}

export interface RowId {
  id: number
}

export interface RowCount {
  count: number
}

export interface RowSetting {
  setting_id: number
  setting_name: number
  setting_value_int: number
  setting_value_string: string
}
