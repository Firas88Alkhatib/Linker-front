import styles from './loadingContainer.module.scss'

interface IProps {
  isLoading: boolean
  children: React.ReactNode
}
export const LoadingContainer = ({ children, isLoading }: IProps) => {
  return isLoading ? (
    <div className={styles.outerContainer}>
      <div className={styles.loadingContainer}>
        <div>
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
