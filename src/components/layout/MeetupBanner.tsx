import { Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

export function MeetupBanner() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  return (
    <div className="bg-coffee/90 text-white text-center py-2 px-4 text-sm font-medium">
      <Link to={`/${lang || 'en'}/club`} className="inline-flex items-center gap-2 hover:underline">
        <Calendar size={14} />
        {t('meetupBanner')}
      </Link>
    </div>
  )
}
