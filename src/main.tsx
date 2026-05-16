import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'


const EventsPage = lazy(() => import('./pages/EventsPage'))

// Legacy redirect: /:lang/club → /:lang/events
// Kept for backward compatibility with shared links / old indexing.
function LegacyClubRedirect() {
  const { lang } = useParams<{ lang: string }>()
  return <Navigate to={`/${lang || 'en'}/events`} replace />
}

const router = createBrowserRouter([
  { path: '/:lang/events', element: <Suspense fallback={null}><EventsPage /></Suspense> },
  { path: '/:lang/club', element: <LegacyClubRedirect /> },
  { path: '/:lang', element: <App /> },
  { path: '*', element: <App /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
