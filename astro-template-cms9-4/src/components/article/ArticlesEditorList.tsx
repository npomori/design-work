import React, { memo, useEffect, useMemo, useState } from 'react'
import ArticleEditPanel, { type Article as ArticleType } from './ArticleEditPanel'

type ArticleListItem = Pick<
  ArticleType,
  'id' | 'slug' | 'title' | 'description' | 'date' | 'author' | 'tags' | 'draft'
> & { content?: string }

type Props = { articles: ArticleListItem[] }

function ArticlesEditorList({ articles }: Props) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ArticleType | null>(null)

  const items: ArticleType[] = useMemo(() => {
    // 安全のためフィールドを整形
    return (articles || []).map((a) => ({
      id: a.id!,
      slug: a.slug!,
      title: a.title ?? '',
      description: a.description ?? '',
      date: a.date ?? undefined,
      author: a.author ?? '',
      tags: Array.isArray(a.tags) ? a.tags : [],
      draft: !!a.draft,
      content: a.content ?? ''
    }))
  }, [articles])

  const onEdit = (art: ArticleType) => {
    setSelected(art)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    // ページ内容のリフレッシュは必要に応じて
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
    }
    if (open) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      if (open) {
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [open])

  return (
    <div>
      <ul className="divide-y rounded border">
        {items.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="font-medium">
                {a.title || '(無題)'}{' '}
                {a.draft && (
                  <span className="ml-2 inline-block rounded bg-yellow-100 px-1.5 py-0.5 text-sm text-yellow-800">
                    draft
                  </span>
                )}
              </div>
              <div className="text-base text-gray-500">{a.slug}</div>
            </div>
            <div className="flex items-center gap-2">
              {/* 非JSフォールバック用の通常リンクも一応残す場合はaタグを置くが、ここではモーダル優先 */}
              <button
                type="button"
                className="rounded bg-blue-600 px-3 py-1.5 text-base text-white hover:bg-blue-700"
                onClick={() => onEdit(a)}
              >
                編集
              </button>
            </div>
          </li>
        ))}
      </ul>

      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-stretch justify-center overflow-hidden bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-full w-full max-w-none flex-col overflow-hidden rounded bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">編集: {selected.title || selected.slug}</h2>
              <button
                type="button"
                className="rounded border px-3 py-1.5 text-base hover:bg-gray-50"
                onClick={close}
                aria-label="閉じる"
              >
                閉じる
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <ArticleEditPanel
                article={selected}
                onSaved={() => {
                  setOpen(false)
                  // 保存後に一覧の表示を更新したい場合はリロードが簡単
                  window.location.reload()
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(ArticlesEditorList)
