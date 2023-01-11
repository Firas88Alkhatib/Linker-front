import styles from './field.module.scss'
import { classNames } from 'utils'

interface IProps {
  name: string
  placeHolder?: string
  className?: string
  type?: 'text' | 'password'
}
export const Field = ({ name, placeHolder, className, type }: IProps) => {
  return <input type={type} className={classNames(styles.field, className)} name={name} placeholder={placeHolder} />
}
