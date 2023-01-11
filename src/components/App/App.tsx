import { LoadingContainer } from 'components/UI'
import styles from './app.module.scss'
import { useAuth } from 'providers/AuthProvider'
import { Layout } from 'components/Layout'
import { AppRoutes } from 'routes'

export const App = () => {
  const { isReady } = useAuth()

  return (
    <div className={styles.app}>
      <LoadingContainer isLoading={!isReady}>
        <Layout>
          <AppRoutes />
        </Layout>
      </LoadingContainer>
    </div>
  )
}
