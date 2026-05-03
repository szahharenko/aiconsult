import { Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function MeetupBanner() {
  const { t } = useTranslation()
  return (
    <div className="bg-coffee/90 text-white text-center py-2 px-4 text-sm font-medium">
      <a href="#club" className="inline-flex items-center gap-2 hover:underline">
        <Calendar size={14} />
        {t('meetupBanner')}
      </a>
    </div>
  )
}
