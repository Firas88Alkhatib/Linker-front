import { Navigate, Outlet } from 'react-router-dom'

interface IProps {
  redirectPath: string
  isAllowed: boolean
}
export const ProtectedRoute = ({ isAllowed, redirectPath }: IProps) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />
}
