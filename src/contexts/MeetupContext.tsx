import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MeetupModal } from '../components/layout/MeetupModal'

interface MeetupContextValue {
  openMeetup: () => void
  closeMeetup: () => void
}

const MeetupContext = createContext<MeetupContextValue | null>(null)

/**
 * Provides a single shared AI-meetup signup modal across all routes.
 * Wrap the router with this so both the homepage and the events page
 * can trigger the same modal via useMeetup().openMeetup().
 */
export function MeetupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openMeetup = useCallback(() => setIsOpen(true), [])
  const closeMeetup = useCallback(() => setIsOpen(false), [])

  return (
    <MeetupContext.Provider value={{ openMeetup, closeMeetup }}>
      {children}
      <AnimatePresence>
        {isOpen && <MeetupModal onClose={closeMeetup} />}
      </AnimatePresence>
    </MeetupContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMeetup() {
  const ctx = useContext(MeetupContext)
  if (!ctx) throw new Error('useMeetup must be used within a MeetupProvider')
  return ctx
}
