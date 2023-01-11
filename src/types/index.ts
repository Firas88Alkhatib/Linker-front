export interface IClick {
  id: number
  clickedAt: string
}
export interface ILink {
  id: number
  originalUrl: string
  shortUrl: string
  clicks: IClick[]
}

export interface ODataResponse<T> {
  '@odata.context': string
  value: T[]
}
export type ODataSingleResultResponse<T> = T & {
  '@odata.context': string
}

export interface NewLinkDTO {
  originalUrl: string
}
