import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'
import fs from 'node:fs/promises'
import path from 'node:path'

export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params

    if (!slug) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Slug parameter is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    // 指定されたスラッグの記事を取得
    const article = await getEntry('articles', slug)

    if (!article) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Article not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    // 下書きの場合は404を返す（?all=1 なら許可）
    // AstroのAPI RouteのGETではrequestがないため、一覧で参照してください
    if (article.data.draft) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Article not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    // レスポンス用のデータを構築
    const articleData = {
      id: article.id,
      slug: article.slug || article.id.replace(/\.mdx$/, ''),
      title: article.data.title,
      description: article.data.description,
      date: article.data.date,
      author: article.data.author,
      tags: article.data.tags,
      content: article.body
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: articleData
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=600' // 10分間キャッシュ
        }
      }
    )
  } catch (error) {
    console.error('Error fetching article:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch article'
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

// 記事の更新（MDXファイルに書き戻し）
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params
    if (!slug) {
      return new Response(JSON.stringify({ success: false, error: 'Slug parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const { title, description, date, author, tags, draft, content } = body as {
      title?: string
      description?: string
      date?: string
      author?: string
      tags?: string[]
      draft?: boolean
      content?: string
    }

    // 既存記事の存在確認（下書きでもOK）
    const article = await getEntry('articles', slug)
    if (!article) {
      return new Response(JSON.stringify({ success: false, error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 既存の値をベースに更新
    const newFrontmatter: Record<string, unknown> = {
      title: title ?? article.data.title,
      description: description ?? article.data.description,
      author: author ?? article.data.author,
      tags: Array.isArray(tags) ? tags : article.data.tags,
      draft: typeof draft === 'boolean' ? draft : article.data.draft
    }

    // date は ISO 文字列 or yyyy-mm-dd を想定
    if (date) {
      const d = new Date(date)
      if (isNaN(d.getTime())) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid date format' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      // MDX frontmatter は日付を ISO 形式で格納してもOK
      newFrontmatter.date = d.toISOString().slice(0, 10)
    } else if (article.data.date) {
      // 既存が Date の場合は yyyy-mm-dd に整形
      try {
        const d = new Date(article.data.date as unknown as string)
        if (!isNaN(d.getTime())) newFrontmatter.date = d.toISOString().slice(0, 10)
      } catch {
        // ignore
      }
    }

    const newBody = typeof content === 'string' ? content : (article.body ?? '')

    // MDX ファイルパスを特定
    const mdxPath = path.join(process.cwd(), 'src', 'content', 'articles', `${slug}.mdx`)

    // フロントマターをYAMLとして生成
    const yamlEscape = (v: unknown): string => {
      if (v === null || v === undefined) return ''
      if (typeof v === 'string') {
        // ダブルクォートで単純に囲む
        const escaped = v.replace(/"/g, '\\"')
        return `"${escaped}"`
      }
      if (Array.isArray(v)) {
        return `[${v.map(yamlEscape).join(', ')}]`
      }
      return String(v)
    }

    const fmLines: string[] = ['---']
    for (const key of ['title', 'description', 'date', 'author', 'tags', 'draft']) {
      if (key in newFrontmatter && newFrontmatter[key] !== undefined) {
        fmLines.push(`${key}: ${yamlEscape(newFrontmatter[key])}`)
      }
    }
    fmLines.push('---', '', String(newBody).trimStart())
    const fileContent = fmLines.join('\n') + (newBody.endsWith('\n') ? '' : '\n')

    await fs.writeFile(mdxPath, fileContent, 'utf8')

    return new Response(JSON.stringify({ success: true, message: 'Article updated', slug }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error updating article:', error)
    return new Response(JSON.stringify({ success: false, error: 'Failed to update article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
