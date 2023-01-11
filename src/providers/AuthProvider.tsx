import { client } from 'services/APIService'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as authSignOut,
  type User,
  AuthErrorCodes,
} from 'firebase/auth'
import { firebaseConfig } from 'config/AuthConfig'
export { AuthErrorCodes }

interface IAuthContext {
  user: User | null
  isReady: boolean
  register: (email: string, password: string) => Promise<User>
  signIn: (email: string, password: string) => Promise<User>
  signOut: () => void
}

const firebaseApp = initializeApp(firebaseConfig)
export const AuthContext = createContext<IAuthContext>(null!)

interface IProps {
  children: ReactNode
}
export const AuthProvider = ({ children }: IProps) => {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), async (user) => {
      setUser(user)
      if (user) {
        client.interceptors.request.use(
          async (config) => {
            if (user) {
              ;(config.headers as any).Authorization = `Bearer ${await user.getIdToken()}`
            }
            return config
          },
          (error) => error
        )
      } else {
        client.interceptors.request.clear()
      }
      setIsReady(true)
    })
  }, [])

  const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
    return userCredential.user
  }

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password)
    return userCredential.user
  }
  const signOut = async () => {
    await authSignOut(getAuth(firebaseApp))
  }
  return <AuthContext.Provider value={{ user, isReady, signIn, signOut, register }}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  return useContext(AuthContext)
}
