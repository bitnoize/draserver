export interface RowLogDataLogId {
  log_id: number
}

export interface RowLogData {
  log_id: number
  log_date: Date
  domain_name: string
  req_url: string
  redir_category_id: number
  redir_url: string
  redir_type: number
}

export interface LogData {
  logId: number
  logDate: Date
  domainName: string
  reqUrl: string
  redirCategoryId: number | null
  redirUrl: string
  redirType: number
}
