import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { MeetupProvider } from './contexts/MeetupContext'


const EventsPage = lazy(() => import('./pages/EventsPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Legacy redirect: /:lang/club → /:lang/events
// Kept for backward compatibility with shared links / old indexing.
function LegacyClubRedirect() {
  const { lang } = useParams<{ lang: string }>()
  return <Navigate to={`/${lang || 'en'}/events`} replace />
}

// Bare root '/' → default language home, so /en gets indexed (not /) and
// hreflang stays internally consistent.
function RootRedirect() {
  return <Navigate to="/en" replace />
}

const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  { path: '/:lang/events', element: <Suspense fallback={null}><EventsPage /></Suspense> },
  { path: '/:lang/club', element: <LegacyClubRedirect /> },
  { path: '/:lang', element: <App /> },
  { path: '/404', element: <Suspense fallback={null}><NotFound /></Suspense> },
  { path: '*', element: <Suspense fallback={null}><NotFound /></Suspense> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MeetupProvider>
        <RouterProvider router={router} />
      </MeetupProvider>
    </ThemeProvider>
  </StrictMode>,
)
