import axios from 'axios'
import { backendUrl } from 'config/URLs'

import { ILink, NewLinkDTO, ODataResponse, ODataSingleResultResponse } from 'types'

export const client = axios.create({ baseURL: backendUrl })

// export const setAccessToken = (accessToken: string) => {
//   client.interceptors.request.use(
//     (config) => {
//       ;(config.headers as any).Authorization = `Bearer ${accessToken}`

//       return config
//     },
//     (error) => error
//   )
// }

export const getLinks = async () => {
  const url = 'odata/links?expand=clicks'
  const response = await client.get<ODataResponse<ILink>>(url)
  return response.data.value
}

export const getLinkById = async (id: number) => {
  const url = `odata/links/${id}?expand=clicks`
  const response = await client.get<ODataSingleResultResponse<ILink>>(url)
  return response.data
}
export const getLinkByShortUlr = async (shortUlr: string) => {
  const url = `odata/links?expand=clicks&filter=shortUrl eq '${shortUlr}'`
  const response = await client.get<ODataResponse<ILink>>(url)
  return response.data.value[0]
}

export const createLink = async (originalUrl: string) => {
  const url = 'odata/links'
  const newLink: NewLinkDTO = { originalUrl }
  const response = await client.post<ODataSingleResultResponse<ILink>>(url, newLink)
  return response.data
}
