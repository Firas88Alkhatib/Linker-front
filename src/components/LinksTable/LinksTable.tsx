import styles from './linksTable.module.scss'
import { ILink } from 'types'
import { backendUrl } from 'config/URLs'
import { Button } from 'components/UI'

interface IProps {
  links: ILink[]
  onRowClick: (link: ILink) => void
}
export const LinksTable = ({ links, onRowClick }: IProps) => {
  return (
    <div className={styles.linksTable}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id} onClick={() => onRowClick(link)}>
              <td>{link.id}</td>
              <td title={backendUrl + link.shortUrl}>{backendUrl + link.shortUrl}</td>
              <td title={link.originalUrl}>{link.originalUrl}</td>
              <td>{link?.clicks?.length || 0}</td>
              <td>
                <Button
                  className={styles.action}
                  onClick={(e) => {
                    e.stopPropagation()
                    alert('To be implemented')
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor">
                    <path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
