import { User } from 'lucide-react'

// TODO: replace with <img src="/photo.jpg" ... />
export function PhotoPlaceholder() {
  return (
    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-coffee/30 to-coffee/10 border-2 border-coffee/40 flex flex-col items-center justify-center flex-shrink-0 gap-1">
      <User size={36} className="text-coffee" />
      <span className="text-coffee/60 text-xs font-medium">Add photo</span>
    </div>
  )
}
