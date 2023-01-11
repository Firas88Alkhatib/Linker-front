import styles from './mainPage.module.scss'
import { useEffect, useState } from 'react'
import { Button, Field, Form } from 'components/UI'
import { createLink, getLinks } from 'services/APIService'
import { ILink, NewLinkDTO } from 'types'
import { isValidUrl } from 'utils/url'
import { backendUrl } from 'config/URLs'
import { LoadingContainer, URL } from 'components/UI'
import { LinksTable } from 'components/LinksTable'
import { useNavigate } from 'react-router-dom'

export const MainPage = () => {
  const navigate = useNavigate()
  const [shortLink, setShortLink] = useState<ILink>()
  const [links, setLinks] = useState<ILink[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const links = await getLinks()
      setLinks(links.reverse())
      setIsLoading(false)
    }
    getData()
  }, [])

  const onSubmitHandler = async ({ originalUrl }: NewLinkDTO) => {
    setShortLink(undefined)
    setError('')
    if (!isValidUrl(originalUrl)) {
      return setError('Invalid URL')
    } else {
      setError('')
    }
    setIsLoading(true)
    const { ['@odata.context']: _, ...link } = await createLink(originalUrl)
    setShortLink(link)
    setLinks((l) => [link, ...l])
    setIsLoading(false)
  }

  const onRowClickHandler = (link: ILink) => {
    navigate(`/link/${link.id}`)
  }
  return (
    <div className={styles.mainPage}>
      <Form onSubmit={onSubmitHandler}>
        <Field className={styles.input} name="originalUrl" placeHolder="Enter URL to be shortened" />
        <Button className={styles.button}>Create Short Link</Button>
      </Form>
      {error && <p className={styles.error}>{error}</p>}

      <LoadingContainer isLoading={isLoading}>
        {shortLink && (
          <>
            <p className={styles.url}>
              Original URL: <URL href={shortLink.originalUrl}>{shortLink.originalUrl}</URL>
            </p>
            <p className={styles.url}>
              Short URL: <URL href={backendUrl + shortLink.shortUrl}>{backendUrl + shortLink.shortUrl}</URL>
            </p>
          </>
        )}
        <LinksTable links={links} onRowClick={onRowClickHandler} />
      </LoadingContainer>
    </div>
  )
}
