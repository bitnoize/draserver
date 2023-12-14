export interface RowSettingSettingId {
  setting_id: number
}

export interface RowSetting {
  setting_id: number
  setting_name: number
  setting_value_int: number
  setting_value_string: string
}

export interface Setting {
  settingId: number
  settingName: string
  settingValueInt: number | null
  settingValueString: string | null
}
