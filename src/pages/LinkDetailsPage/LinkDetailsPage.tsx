import styles from './linkDetailsPage.module.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLinkById } from 'services/APIService'
import { ILink } from 'types'
import { LoadingContainer, URL } from 'components/UI'
import { backendUrl } from 'config/URLs'
import { getLinkClicksCount } from 'utils/collection'

export const LinkDetailsPage = () => {
  const params = useParams()
  const [link, setLink] = useState<ILink>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [clicks, setClicks] = useState<{ date: string; clicks: number }[]>([])
  const [avg, setAvg] = useState(0)

  useEffect(() => {
    const linkId = Number(params.linkId)
    if (!linkId) {
      setError('Link not found')
      setIsLoading(false)
      return
    }
    const getData = async () => {
      try {
        const { '@odata.context': _, ...shortLink } = await getLinkById(Number(linkId))
        const clicksData = getLinkClicksCount(shortLink)
        const totalClicks = clicksData.reduce((acc, curr) => {
          return (acc += curr.clicks)
        }, 0)
        setClicks(clicksData)
        setAvg(totalClicks ? totalClicks / clicksData.length : 0)
        setLink(shortLink)
      } catch (error) {
        console.log(error)
        setError('Link not found')
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <div className={styles.linkDetailsPage}>
      <LoadingContainer isLoading={isLoading}>
        {link && (
          <>
            <p className={styles.url}>
              Original URL: <URL href={link.originalUrl}>{link.originalUrl}</URL>
            </p>
            <p className={styles.url}>
              Short URL: <URL href={backendUrl + link.shortUrl}>{backendUrl + link.shortUrl}</URL>
            </p>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>Average clicks per day : {avg}</th>
                </tr>
                <tr>
                  <th>Date</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {clicks.length ? (
                  clicks.map(({ date, clicks }) => (
                    <tr key={date}>
                      <td>{date}</td>
                      <td>{clicks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
        {error && <p>{error}</p>}
      </LoadingContainer>
    </div>
  )
}
