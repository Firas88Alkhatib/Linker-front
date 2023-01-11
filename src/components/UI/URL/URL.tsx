import styles from './url.module.scss'

interface IProps {
  href: string
  children: React.ReactNode
}
export const URL = ({ children, href }: IProps) => {
  return (
    <a className={styles.url} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
