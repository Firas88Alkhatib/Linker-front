import styles from './button.module.scss'
import { classNames } from 'utils'

interface IProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
  className?: string
}
export const Button = ({ children, className, onClick }: IProps) => {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  )
}
