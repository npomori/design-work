import React from 'react'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

function parseYouTubeUrl(href: string): { id: string; start?: number } | null {
  try {
    const url = new URL(href)
    const host = url.hostname.replace(/^www\./, '')

    // youtu.be/<id>
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      if (id) return { id, start: parseStart(url) }
    }

    // youtube.com/watch?v=<id>
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const path = url.pathname.replace(/\/+$/, '')
      // /watch or /watch/
      if (path === '/watch') {
        const id = url.searchParams.get('v') || ''
        if (id) return { id, start: parseStart(url) }
      }
      // /shorts/<id>
      if (path.startsWith('/shorts/')) {
        const id = path.split('/')[2]
        if (id) return { id, start: parseStart(url) }
      }
      // /embed/<id>
      if (path.startsWith('/embed/')) {
        const id = path.split('/')[2]
        if (id) return { id, start: parseStart(url) }
      }
    }

    return null
  } catch {
    return null
  }
}

function parseStart(url: URL): number | undefined {
  // サポート: t=123s, t=123, start=123
  const t = url.searchParams.get('t')
  const start = url.searchParams.get('start')
  let seconds: number | undefined
  if (t) {
    const match = t.match(/^(\d+)(s)?$/)
    if (match) seconds = parseInt(match[1]!, 10)
  }
  if (seconds == null && start) {
    const n = parseInt(start, 10)
    if (!Number.isNaN(n)) seconds = n
  }
  return seconds
}

function YouTubeEmbed({ id, start }: { id: string; start?: number }) {
  const src = `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
      <iframe
        src={src}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    </div>
  )
}

export default function AutoEmbedLink(props: AnchorProps) {
  const { href, children, ...rest } = props
  if (!href) return <a {...props} />

  const yt = parseYouTubeUrl(href)

  // 子テキストが URL のみ（自動リンク）なら埋め込み、それ以外は通常のリンク
  const childText = React.Children.toArray(children)
    .filter((c) => typeof c === 'string')
    .join('')
    .trim()

  const normalizedHref = href.trim()
  const withoutProtocol = normalizedHref.replace(/^https?:\/\//, '')

  const isBareUrl = childText === normalizedHref || childText === withoutProtocol

  if (yt && isBareUrl) {
    return <YouTubeEmbed id={yt.id} start={yt.start} />
  }

  return (
    <a
      href={href}
      {...rest}
      target={props.target ?? '_blank'}
      rel={props.rel ?? 'noopener noreferrer'}
    >
      {children}
    </a>
  )
}
