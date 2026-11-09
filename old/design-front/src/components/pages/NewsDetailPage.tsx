import Button from '@/components/base/Button'
import { categoryColor, categoryName, newsItems, priorityColor, priorityName } from '@/data/content'
import type { FrontNavigate } from '@/types/page'
import { Icon } from '@iconify/react'

interface NewsDetailPageProps {
  newsId: string
  onNavigate: FrontNavigate
}

/**
 * お知らせ詳細。指定IDが無い場合は先頭の記事を出す。
 */
const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsId, onNavigate }) => {
  const news = newsItems.find((item) => item.id === newsId) ?? newsItems[0]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <Button
          type="button"
          onClick={() => onNavigate('news')}
          className="flex cursor-pointer items-center text-gray-600 hover:text-gray-800"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          お知らせ一覧に戻る
        </Button>
      </div>
      {news && (
        <article className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-base text-gray-500">
                  <Icon icon="mdi:calendar" className="mr-1 h-4 w-4" />
                  {new Date(news.date).toLocaleDateString('ja-JP')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {news.categories.map((value) => (
                    <span
                      key={value}
                      className="rounded-full px-3 py-1 text-sm font-medium"
                      style={{
                        backgroundColor: `${categoryColor(value)}20`,
                        color: categoryColor(value),
                        border: `1px solid ${categoryColor(value)}`
                      }}
                    >
                      {categoryName(value)}
                    </span>
                  ))}
                </div>
              </div>
              {news.priority && (
                <span
                  className="rounded px-3 py-1 text-sm font-bold text-white"
                  style={{ backgroundColor: priorityColor(news.priority) }}
                >
                  {priorityName(news.priority)}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{news.title}</h1>
            <p className="prose mt-3 max-w-none text-base leading-relaxed text-gray-600">{news.content}</p>
            {news.attachmentName && (
              <div className="mt-4">
                <h4 className="mb-2 text-base font-semibold text-gray-700">添付ファイル:</h4>
                <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-2 text-base text-blue-700">
                  <Icon icon="mdi:file-document-outline" className="mr-2 h-4 w-4" />
                  {news.attachmentName}
                  <span className="ml-2 text-sm text-gray-500">(128 KB)</span>
                </span>
              </div>
            )}
            <div className="mt-4 flex items-center border-t border-gray-100 pt-4 text-base text-gray-500">
              <Icon icon="mdi:account" className="mr-2 h-4 w-4" />
              {news.author}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}

export default NewsDetailPage
