import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App'

const AIClubPage = lazy(() => import('./pages/AIClubPage'))

const router = createBrowserRouter([
  { path: '/:lang/club', element: <Suspense fallback={null}><AIClubPage /></Suspense> },
  { path: '/:lang', element: <App /> },
  { path: '*', element: <App /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
