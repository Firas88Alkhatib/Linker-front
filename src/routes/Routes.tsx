import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginPage, MainPage, LinkDetailsPage } from 'pages'
import { useAuth } from 'providers/AuthProvider'

export const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route element={<ProtectedRoute redirectPath="login" isAllowed={!!user} />}>
        <Route index element={<MainPage />} />
        <Route path="link/:linkId" element={<LinkDetailsPage />} />
      </Route>
    </Routes>
  )
}
