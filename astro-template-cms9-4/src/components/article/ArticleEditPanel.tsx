import React, { memo, useState } from 'react'
import WorkingMDXRenderer from './WorkingMDXRenderer'

export type Article = {
  id: string
  slug: string
  title?: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  draft?: boolean
  content: string
}

type Props = { article: Article; onSaved?: () => void }

function ArticleEditPanel({ article: initial, onSaved }: Props) {
  const [state, setState] = useState<Article>({ ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [headerOpen, setHeaderOpen] = useState(false)

  const update = (patch: Partial<Article>) => setState((s) => ({ ...s, ...patch }))

  const onSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const payload = {
        title: state.title ?? '',
        description: state.description ?? '',
        date: state.date ?? undefined,
        author: state.author ?? '',
        tags: state.tags ?? [],
        draft: !!state.draft,
        content: state.content ?? ''
      }
      const res = await fetch(`/api/articles/${encodeURIComponent(state.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      if (onSaved) {
        onSaved()
      } else {
        window.location.href = '/admin/articles-editor'
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : '保存に失敗しました'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden">
      {/* ヘッダ（設定項目） */}
      <div className="overflow-hidden rounded border">
        <button
          type="button"
          className="flex w-full items-center justify-between bg-gray-50 px-4 py-2 text-left"
          onClick={() => setHeaderOpen((v) => !v)}
          aria-expanded={headerOpen}
        >
          <span className="text-base font-medium text-gray-700">記事設定</span>
          <span
            className={`inline-block h-4 w-4 transform transition-transform ${
              headerOpen ? 'rotate-0' : '-rotate-90'
            }`}
            aria-hidden
          >
            ▾
          </span>
        </button>
        {headerOpen && (
          <div className="border-t p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-base text-gray-700">タイトル</span>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={state.title || ''}
                  onChange={(e) => update({ title: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">スラッグ</span>
                <input
                  className="w-full rounded border bg-gray-50 px-3 py-2"
                  value={state.slug}
                  readOnly
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-base text-gray-700">説明</span>
                <textarea
                  className="h-20 w-full rounded border px-3 py-2"
                  value={state.description || ''}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">日付 (YYYY-MM-DD)</span>
                <input
                  type="date"
                  className="w-full rounded border px-3 py-2"
                  value={state.date ? String(state.date).slice(0, 10) : ''}
                  onChange={(e) => update({ date: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">著者</span>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={state.author || ''}
                  onChange={(e) => update({ author: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">タグ (カンマ区切り)</span>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={(state.tags || []).join(', ')}
                  onChange={(e) =>
                    update({
                      tags: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                    })
                  }
                />
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!state.draft}
                  onChange={(e) => update({ draft: e.target.checked })}
                />
                <span className="text-base">下書き (draft)</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 本文とプレビューを同じ上端で並べる */}
      <div className="grid h-full min-h-0 flex-1 grid-cols-1 items-stretch gap-6 overflow-hidden md:grid-cols-2">
        {/* 本文 */}
        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="mb-2 text-base text-gray-700">本文 (MDX)</div>
          <textarea
            className="min-h-[40vh] w-full flex-1 resize-none rounded border px-3 py-2 font-mono md:min-h-0"
            value={state.content || ''}
            onChange={(e) => update({ content: e.target.value })}
          />
        </div>

        {/* プレビュー */}
        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="mb-2 text-base text-gray-700">プレビュー</div>
          <div className="prose min-h-[40vh] max-w-none flex-1 overflow-auto rounded border p-4 md:min-h-0">
            <WorkingMDXRenderer content={state.content || ''} />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? '保存中...' : '保存して一覧に戻る'}
        </button>
        <a className="rounded border px-3 py-2" href="/admin/articles-editor">
          一覧に戻る
        </a>
      </div>
    </div>
  )
}

export default memo(ArticleEditPanel)
