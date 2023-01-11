import styles from './topBar.module.scss'
import { Button } from 'components/UI'
import { useAuth } from 'providers/AuthProvider'
import { Link } from 'react-router-dom'

export const TopBar = () => {
  const { signOut } = useAuth()
  return (
    <div className={styles.topBar}>
      <Link to="/">Morjens</Link>
      <Button className={styles.logout} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  )
}
