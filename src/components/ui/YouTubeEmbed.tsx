import { useState } from 'react'
import { Play } from 'lucide-react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  thumbnailQuality?: 'maxres' | 'hq' | 'sd'
}

/**
 * Lazy YouTube embed: shows a thumbnail until the user clicks Play,
 * then mounts the iframe. Avoids ~500KB of YT player JS on initial load.
 */
export function YouTubeEmbed({ videoId, title, thumbnailQuality = 'maxres' }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  const thumbName =
    thumbnailQuality === 'maxres' ? 'maxresdefault'
    : thumbnailQuality === 'hq' ? 'hqdefault'
    : 'sddefault'
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/${thumbName}.jpg`

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
      {loaded ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              // maxresdefault doesn't exist for some videos — fall back to hqdefault
              const img = e.currentTarget
              if (!img.src.includes('hqdefault')) {
                img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-coffee group-hover:bg-coffee/90 transition-colors rounded-full p-5 shadow-lg">
              <Play size={28} className="text-white fill-white ml-1" />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}
