import { Setting } from '../interfaces/setting.js'

const findSetting = (settings: Setting[], name: string): Setting => {
  const setting = settings.find((value) => value.settingName === name)
  if (setting === undefined) {
    throw new Error(`setting '${name}' not exists`)
  }

  return setting
}

export const getDefaultRedirectUrl = (settings: Setting[]): string => {
  const setting = findSetting(settings, 'Default redirect URL')
  if (setting.settingValueString == null) {
    throw new Error(`setting 'Default redirect URL' string value is not set`)
  }

  return setting.settingValueString
}

export const getDefaultRedirectType = (settings: Setting[]): number => {
  const setting = findSetting(settings, 'Default redirect type')
  if (setting.settingValueInt == null) {
    throw new Error(`setting 'Default redirect type' integer value is not set`)
  }

  return setting.settingValueInt
}
