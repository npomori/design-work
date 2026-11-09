import {
  categoryColor,
  categoryName,
  newsCategories,
  newsItems,
  newsPriorities,
  priorityColor,
  priorityName,
  type NewsItem
} from '@/data/content'
import type { FrontNavigate } from '@/types/page'
import { Icon } from '@iconify/react'
import { useMemo, useState } from 'react'

interface NewsListPageProps {
  onNavigate: FrontNavigate
}

const pageSize = 3

/**
 * お知らせ一覧。絞り込みとページャは画面内だけで動く。
 */
const NewsListPage: React.FC<NewsListPageProps> = ({ onNavigate }) => {
  const [category, setCategory] = useState<string | null>(null)
  const [priority, setPriority] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () =>
      newsItems.filter((item) => {
        const categoryMatch = category === null || item.categories.includes(category)
        const priorityMatch = priority === null || item.priority === priority
        return categoryMatch && priorityMatch
      }),
    [category, priority]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  /**
   * 絞り込みを変えたら先頭ページへ戻す。
   */
  const selectCategory = (value: string | null) => {
    setCategory(value)
    setPage(1)
  }

  /**
   * 優先度の選択を切り替える。
   */
  const selectPriority = (value: string) => {
    setPriority((current) => (current === value ? null : value))
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold">お知らせ</h1>
      <FilterBar
        category={category}
        priority={priority}
        onReset={() => {
          setCategory(null)
          setPriority(null)
          setPage(1)
        }}
        onCategory={selectCategory}
        onPriority={selectPriority}
      />
      {visible.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">お知らせがありません</p>
        </div>
      ) : (
        <section className="mb-12">
          <div className="space-y-8">
            {visible.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                onOpen={() => onNavigate('newsDetail', item.id)}
                onCategory={selectCategory}
                onPriority={selectPriority}
              />
            ))}
          </div>
        </section>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              className={`cursor-pointer rounded px-3 py-2 ${
                currentPage === number ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface FilterProps {
  category: string | null
  priority: string | null
  onReset: () => void
  onCategory: (value: string) => void
  onPriority: (value: string) => void
}

/**
 * カテゴリと優先度の絞り込みボタン。
 */
const FilterBar: React.FC<FilterProps> = ({ category, priority, onReset, onCategory, onPriority }) => {
  const allActive = category === null && priority === null
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onReset}
          className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium ${
            allActive
              ? 'bg-primary-600 text-white'
              : 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50'
          }`}
        >
          すべて
        </button>
        {newsCategories.map((item) => {
          const active = category === item.value
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onCategory(item.value)}
              className="cursor-pointer rounded-full px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: active ? item.color : `${item.color}20`,
                color: active ? 'white' : item.color,
                border: `1px solid ${item.color}`
              }}
            >
              {item.name}
            </button>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {newsPriorities.map((item) => {
          const active = priority === item.value
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onPriority(item.value)}
              className="cursor-pointer rounded px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: active ? item.color : `${item.color}20`,
                color: active ? 'white' : item.color,
                border: `1px solid ${item.color}`
              }}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface CardProps {
  item: NewsItem
  onOpen: () => void
  onCategory: (value: string) => void
  onPriority: (value: string) => void
}

/**
 * お知らせ1件のカード。
 */
const NewsCard: React.FC<CardProps> = ({ item, onOpen, onCategory, onPriority }) => {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-base text-gray-500">
              <Icon icon="mdi:calendar" className="mr-1 h-4 w-4" />
              {new Date(item.date).toLocaleDateString('ja-JP')}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.categories.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onCategory(value)}
                  className="cursor-pointer rounded-full px-3 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: `${categoryColor(value)}20`,
                    color: categoryColor(value),
                    border: `1px solid ${categoryColor(value)}`
                  }}
                >
                  {categoryName(value)}
                </button>
              ))}
            </div>
          </div>
          {item.priority && (
            <button
              type="button"
              onClick={() => onPriority(item.priority!)}
              className="cursor-pointer rounded px-3 py-1 text-sm font-bold text-white"
              style={{ backgroundColor: priorityColor(item.priority) }}
            >
              {priorityName(item.priority)}
            </button>
          )}
        </div>
        <div className="flex items-start gap-2">
          <h2
            className="flex-1 cursor-pointer text-2xl font-bold text-gray-800 hover:text-blue-600"
            onClick={onOpen}
          >
            {item.title}
          </h2>
          {item.isPinned && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              <Icon icon="mdi:pin" className="h-4 w-4" />
              固定
            </span>
          )}
        </div>
        <p className="prose mt-3 max-w-none text-base leading-relaxed text-gray-600">{item.content}</p>
      </div>
    </article>
  )
}

export default NewsListPage
