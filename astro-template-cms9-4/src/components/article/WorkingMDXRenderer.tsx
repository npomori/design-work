import { evaluate } from '@mdx-js/mdx'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import React, { memo, useEffect, useMemo, useState } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'

// カスタムMDXコンポーネントのマッピング
import AutoEmbedLink from './AutoEmbedLink'
import ImageGallery from './ImageGallery'
import ImageTextLayout from './ImageTextLayout'
import InfoCard from './InfoCard'
import MDXImage from './MDXImage'

export type WorkingMDXRendererProps = {
  content: string
}

function WorkingMDXRenderer({ content }: WorkingMDXRendererProps) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debouncedContent, setDebouncedContent] = useState(content)

  // ランタイムは react/jsx-runtime のみを使用（開発/本番で共通）

  const components = useMemo(
    () => ({
      MDXImage,
      ImageGallery,
      InfoCard,
      ImageTextLayout,
      a: AutoEmbedLink
    }),
    []
  )

  // 入力をデバウンスしてコンパイル頻度を下げる
  useEffect(() => {
    const t = setTimeout(() => setDebouncedContent(content), 300)
    return () => clearTimeout(t)
  }, [content])

  useEffect(() => {
    let cancelled = false

    async function compileAndRun() {
      // エラーはリセットするが、直前のプレビューは維持してフリッカーを防ぐ
      setError(null)
      try {
        // 文字列のMDXを直接評価してReactコンポーネントを得る
        const mod = (await evaluate(debouncedContent, {
          ...jsxRuntime,
          baseUrl: import.meta.url,
          // jsxDEV を要求しないよう development は固定で false
          development: false,
          useMDXComponents,
          remarkPlugins: [remarkGfm]
        })) as { default: React.ComponentType }
        if (!cancelled) {
          setMDXContent(() => mod.default)
        }
      } catch (err) {
        console.error('MDX evaluate error:', err)
        const message = err instanceof Error ? err.message : String(err)
        if (!cancelled) {
          setError(message)
        }
      }
    }

    if (debouncedContent && debouncedContent.trim().length > 0) {
      void compileAndRun()
    } else {
      setMDXContent(() => () => null)
    }

    return () => {
      cancelled = true
    }
  }, [debouncedContent])

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-base text-red-700">
        MDXのレンダリング中にエラーが発生しました: {error}
      </div>
    )
  }

  // 初回のみローディングを出す。以後は直前のコンポーネントを保持するためフリッカーしない
  if (!MDXContent) {
    return (
      <div className="text-gray-500">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent align-[-2px]"></span>
        <span className="ml-2 text-base">読み込み中…</span>
      </div>
    )
  }

  return (
    <MDXProvider components={components}>
      <MDXContent />
    </MDXProvider>
  )
}

export default memo(WorkingMDXRenderer)
