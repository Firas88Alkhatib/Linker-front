import styles from './form.module.scss'
import { classNames } from 'utils'

interface IProps {
  children: React.ReactNode
  onSubmit: (formData: any, e: React.FormEvent<HTMLFormElement>) => void
  className?: string
}
export const Form = ({ children, onSubmit, className }: IProps) => {
  return (
    <form
      className={classNames(styles.form, className)}
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        onSubmit(data, e)
      }}
    >
      {children}
    </form>
  )
}
