import { TopBar } from 'components/TopBar'
import { useAuth } from 'providers/AuthProvider'
import styles from './layout.module.scss'

interface IProps {
  children: React.ReactNode
}
export const Layout = ({ children }: IProps) => {
  const { user } = useAuth()
  return (
    <div className={styles.layout}>
      {user && <TopBar />}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
