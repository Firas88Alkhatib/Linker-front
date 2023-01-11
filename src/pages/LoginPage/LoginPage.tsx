import styles from './loginPage.module.scss'
import { Form, Button, Field } from 'components/UI'
import { useState } from 'react'
import { useAuth, AuthErrorCodes } from 'providers/AuthProvider'

interface ILoginData {
  email: string
  password: string
}
interface IRegisterData extends ILoginData {
  confirm: string
}
export const LoginPage = () => {
  const { signIn, register } = useAuth()
  const [registerError, setRegisterError] = useState('')
  const [loginError, setLoginError] = useState('')
  const onRegisterHandler = async ({ email, password, confirm }: IRegisterData) => {
    if (password !== confirm) {
      return setRegisterError('The password confirmation does not match.')
    }
    try {
      await register(email, password)
    } catch (error: any) {
      setRegisterError('Failed to register.')
    }
  }

  const onLoginHandler = async ({ email, password }: ILoginData) => {
    try {
      await signIn(email, password)
    } catch (error: any) {
      if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        setLoginError('Too many failed login attempts.')
      } else {
        setLoginError('Wrong email or password.')
      }
    }
  }
  return (
    <div className={styles.loginPage}>
      <h1>Morjens URL Shortner</h1>
      <div className={styles.container}>
        <div className={styles.login}>
          <Form onSubmit={onLoginHandler}>
            <Field className={styles.field} name="email" placeHolder="E-mail" />
            <Field className={styles.field} name="password" type="password" placeHolder="Password" />
            <Button>Login</Button>
            {loginError && <p className={styles.error}>{loginError}</p>}
          </Form>
        </div>
        <div className={styles.register}>
          <Form onSubmit={onRegisterHandler}>
            <Field className={styles.field} name="email" placeHolder="E-mail" />
            <Field className={styles.field} name="password" type="password" placeHolder="Password" />
            <Field className={styles.field} name="confirm" type="password" placeHolder="Confirm password" />
            <Button>Register</Button>
            {registerError && <p className={styles.error}>{registerError}</p>}
          </Form>
        </div>
      </div>
    </div>
  )
}
