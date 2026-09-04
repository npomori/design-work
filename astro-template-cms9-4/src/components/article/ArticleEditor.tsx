import React, { useEffect, useMemo, useState } from 'react'

type ArticleMeta = {
  id: string
  slug: string
  title?: string
  description?: string
  date?: string | Date
  author?: string
  tags?: string[]
  draft?: boolean
  content?: string
}

const fetchJson = async <T,>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export default function ArticleEditor() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ArticleMeta[]>([])
  const [selected, setSelected] = useState<ArticleMeta | null>(null)
  const [saving, setSaving] = useState(false)
  const [keyword, setKeyword] = useState('')

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchJson<{ success: boolean; data: ArticleMeta[] }>('/api/articles?all=1')
      setItems(data.data)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '読み込みに失敗しました'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    if (!k) return items
    return items.filter((a) =>
      [a.slug, a.title, a.description, a.author, ...(a.tags ?? [])]
        .filter(Boolean)
        .some((t) => String(t).toLowerCase().includes(k))
    )
  }, [items, keyword])

  const onPick = (slug: string) => {
    const item = items.find((i) => i.slug === slug)
    if (item) setSelected({ ...item })
  }

  const updateSelected = (patch: Partial<ArticleMeta>) => {
    setSelected((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  const onSave = async () => {
    if (!selected) return
    setSaving(true)
    setError(null)
    try {
      const payload = {
        title: selected.title ?? '',
        description: selected.description ?? '',
        date: selected.date ? String(selected.date) : undefined,
        author: selected.author ?? '',
        tags: selected.tags ?? [],
        draft: !!selected.draft,
        content: selected.content ?? ''
      }
      const res = await fetch(`/api/articles/${encodeURIComponent(selected.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '保存に失敗しました'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="mb-3">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="検索 (slug, title, tags...)"
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div className="max-h-[70vh] divide-y overflow-auto rounded border">
          {loading && <div className="p-3 text-base text-gray-500">読み込み中...</div>}
          {error && <div className="p-3 text-base text-red-600">エラー: {error}</div>}
          {!loading && !filtered.length && (
            <div className="p-3 text-base text-gray-500">記事がありません</div>
          )}
          {filtered.map((a) => (
            <button
              key={a.slug}
              onClick={() => onPick(a.slug)}
              className={`w-full p-3 text-left hover:bg-gray-50 ${
                selected?.slug === a.slug ? 'bg-gray-100' : ''
              }`}
            >
              <div className="font-medium">{a.title || '(無題)'} </div>
              <div className="text-base text-gray-500">{a.slug}</div>
              {a.draft ? (
                <span className="mt-1 inline-block rounded bg-yellow-100 px-1.5 py-0.5 text-sm text-yellow-800">
                  draft
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        {!selected ? (
          <div className="text-base text-gray-500">左のリストから記事を選択してください。</div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-base text-gray-700">タイトル</span>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={selected.title || ''}
                  onChange={(e) => updateSelected({ title: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">スラッグ</span>
                <input
                  className="w-full rounded border bg-gray-50 px-3 py-2"
                  value={selected.slug}
                  readOnly
                  title="スラッグはファイル名に紐付くため、ここでは変更できません"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-base text-gray-700">説明</span>
                <textarea
                  className="h-20 w-full rounded border px-3 py-2"
                  value={selected.description || ''}
                  onChange={(e) => updateSelected({ description: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">日付 (YYYY-MM-DD)</span>
                <input
                  type="date"
                  className="w-full rounded border px-3 py-2"
                  value={selected.date ? String(selected.date).slice(0, 10) : ''}
                  onChange={(e) => updateSelected({ date: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">著者</span>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={selected.author || ''}
                  onChange={(e) => updateSelected({ author: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-base text-gray-700">タグ (カンマ区切り)</span>
                <input
                  className="w-full rounded border px-3 py-2"
                  value={(selected.tags || []).join(', ')}
                  onChange={(e) =>
                    updateSelected({
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
                  checked={!!selected.draft}
                  onChange={(e) => updateSelected({ draft: e.target.checked })}
                />
                <span className="text-base">下書き (draft)</span>
              </label>
            </div>

            <div>
              <span className="text-base text-gray-700">本文 (MDX)</span>
              <textarea
                className="mt-1 h-[50vh] w-full rounded border px-3 py-2 font-mono"
                value={selected.content || ''}
                onChange={(e) => updateSelected({ content: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? '保存中...' : '保存'}
              </button>
              <button
                className="rounded border px-3 py-2"
                onClick={() => (selected ? setSelected({ ...selected }) : null)}
              >
                変更を破棄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
