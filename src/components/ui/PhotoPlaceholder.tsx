import sergeiPhoto from '../../assets/sergei.png'

export function PhotoPlaceholder() {
  return (
    <img
      src={sergeiPhoto}
      alt="Sergei Zahharenko"
      className="w-32 h-32 rounded-2xl object-cover border-2 border-coffee/40 flex-shrink-0"
    />
  )
}
