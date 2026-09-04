# MDXコンテンツ API ドキュメント

このAPIは、`src/content/articles`ディレクトリに格納されたMDXコンテンツを配信するためのエンドポイントを提供します。

## エンドポイント

### 1. 記事一覧取得

**URL:** `GET /api/articles`

**説明:** すべての公開記事のメタデータを取得します。

**レスポンス例:**
```json
{
  "success": true,
  "data": [
    {
      "id": "forest-activities",
      "slug": "forest-activities",
      "title": "森の活動について",
      "description": "森での活動内容について詳しく説明します",
      "date": "2024-01-15T00:00:00.000Z",
      "author": "著者名",
      "tags": ["森", "活動", "自然"],
      "draft": false
    }
  ],
  "count": 1
}
```

### 2. 個別記事取得

**URL:** `GET /api/articles/[slug]`

**説明:** 指定されたスラッグの記事の詳細情報とコンテンツを取得します。

**パラメータ:**
- `slug`: 記事のスラッグ（ファイル名から.mdx拡張子を除いたもの）

**レスポンス例:**
```json
{
  "success": true,
  "data": {
    "id": "forest-activities",
    "slug": "forest-activities",
    "title": "森の活動について",
    "description": "森での活動内容について詳しく説明します",
    "date": "2024-01-15T00:00:00.000Z",
    "author": "著者名",
    "tags": ["森", "活動", "自然"],
    "content": "MDXコンテンツのテキスト"
  }
}
```

## エラーレスポンス

### 400 Bad Request
```json
{
  "success": false,
  "error": "Slug parameter is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Article not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to fetch article"
}
```

## 使用例

### JavaScriptでの使用例

```javascript
// 記事一覧を取得
const response = await fetch('/api/articles');
const data = await response.json();

if (data.success) {
  console.log('記事一覧:', data.data);
  console.log('記事数:', data.count);
}

// 特定の記事を取得
const articleResponse = await fetch('/api/articles/forest-activities');
const articleData = await articleResponse.json();

if (articleData.success) {
  console.log('記事タイトル:', articleData.data.title);
  console.log('MDXコンテンツ:', articleData.data.content);
}
```

### Reactでの使用例

```jsx
import { useState, useEffect } from 'react';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        
        if (data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error('記事の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>記事一覧</h1>
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <p>著者: {article.author}</p>
          <p>日付: {new Date(article.date).toLocaleDateString('ja-JP')}</p>
        </div>
      ))}
    </div>
  );
}
```

## 注意事項

1. **下書き記事**: `draft: true`が設定されている記事は、APIからは取得できません。
2. **キャッシュ**: 記事一覧は5分間、個別記事は10分間キャッシュされます。
3. **スラッグ**: 記事のスラッグは、MDXファイル名から`.mdx`拡張子を除いたものです。
4. **コンテンツ**: 個別記事取得時は、MDXコンテンツのテキストが含まれます。

## スキーマ

記事のメタデータは以下のスキーマに従います：

```typescript
interface Article {
  title: string;
  description?: string;
  date?: Date;
  author?: string;
  tags?: string[];
  draft?: boolean; // デフォルト: false
}
```
