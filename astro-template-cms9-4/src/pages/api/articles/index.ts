import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url)
    const includeAll = url.searchParams.get('all') === '1' || url.searchParams.get('all') === 'true'
    // 記事コレクションからすべての記事を取得
    const articles = await getCollection('articles')

    // 記事のメタデータを整形
    const articlesData = articles.map((article: CollectionEntry<'articles'>) => {
      const slug = article.slug || article.id.replace(/\.mdx$/, '')
      return {
        id: article.id,
        slug,
        title: article.data.title,
        description: article.data.description,
        date: article.data.date,
        author: article.data.author,
        tags: article.data.tags,
        draft: article.data.draft,
        content: article.body
      }
    })

    // all=1 のときは下書きも含めて返す
    const result = includeAll
      ? articlesData
      : articlesData.filter((article: (typeof articlesData)[number]) => !article.draft)

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
        count: result.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300' // 5分間キャッシュ
        }
      }
    )
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch articles'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
