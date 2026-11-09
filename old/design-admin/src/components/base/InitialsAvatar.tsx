import type { FC } from 'react'

export interface InitialsAvatarProps {
  name: string
  className?: string
  alt?: string
  boxSize?: number
}

const palette = [
  '#3b82f6',
  '#22c55e',
  '#f97316',
  '#a855f7',
  '#06b6d4',
  '#ef4444',
  '#14b8a6',
  '#eab308',
  '#f43f5e'
]

/**
 * 名前から安定した色番号を作る。
 */
const nameHash = (value: string): number => {
  let hash = 0
  for (const ch of Array.from(value)) {
    const code = ch.codePointAt(0) ?? 0
    hash = (hash << 5) - hash + code
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * 表示用のイニシャルを取り出す。
 */
const getInitials = (nameRaw: string): string => {
  const name = nameRaw.trim()
  if (!name) return '?'
  const cleaned = name.replace(/\s+/g, ' ').replace(/[・･•]/g, ' ')
  const parts = cleaned.split(' ').filter(Boolean)
  if (parts.length >= 2) {
    const first = Array.from(parts[0] ?? '')[0] ?? ''
    const second = Array.from(parts[1] ?? '')[0] ?? ''
    return `${first}${second}`.toUpperCase()
  }
  const chars = Array.from(cleaned)
  return `${chars[0] ?? '?'}${chars[1] ?? ''}`.toUpperCase()
}

/**
 * 画像が無いユーザ向けの頭文字アバター。
 */
const InitialsAvatar: FC<InitialsAvatarProps> = ({ name, className, alt, boxSize = 64 }) => {
  const initials = getInitials(name).slice(0, 2)
  const bg = palette[nameHash(name) % palette.length]
  const fontSize = Math.round(boxSize * 0.45)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      role="img"
      aria-label={alt ?? `${name}のアバター`}
      className={className}
    >
      <title>{alt ?? `${name}のアバター`}</title>
      <rect width="100%" height="100%" rx={boxSize / 2} fill={bg} />
      <text
        x="50%"
        y="50%"
        dy=".1em"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
        fontSize={fontSize}
        fill="#ffffff"
      >
        {initials}
      </text>
    </svg>
  )
}

export default InitialsAvatar
