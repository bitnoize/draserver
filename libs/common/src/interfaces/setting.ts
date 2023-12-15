export interface RowSettingSettingId {
  setting_id: number
}

export interface RowSetting {
  setting_id: number
  setting_name: string
  setting_value_int: number | null
  setting_value_string: string | null
}

export interface Setting {
  settingId: number
  settingName: string
  settingValueInt: number | null
  settingValueString: string | null
}
