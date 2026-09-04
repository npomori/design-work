import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

// 汎用ページ用のコレクション
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    place: z.string().optional(),
    note: z.string().optional(),
    draft: z.boolean().default(false)
  })
})

export const collections = {
  articles
}
