import { readFileSync } from 'fs'
import { join } from 'path'

// 改善されたMarkdownパーサー
export function parseMarkdown(markdown: string): string {
  let html = markdown

  // コードブロック（最初に処理）
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text'
    return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`
  })

  // 見出し
  html = html.replace(/^###### (.*$)/gim, '<h6 id="$1">$1</h6>')
  html = html.replace(/^##### (.*$)/gim, '<h5 id="$1">$1</h5>')
  html = html.replace(/^#### (.*$)/gim, '<h4 id="$1">$1</h4>')
  html = html.replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 id="$1">$1</h1>')

  // 水平線
  html = html.replace(/^---$/gim, '<hr>')
  html = html.replace(/^\*\*\*$/gim, '<hr>')
  html = html.replace(/^___$/gim, '<hr>')

  // 引用
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

  // 番号付きリスト
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')

  // 箇条書きリスト
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')

  // リストのラッピング
  html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
    if (match.includes('<ol>') || match.includes('<ul>')) return match
    return `<ul>${match}</ul>`
  })

  // 強調
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // インラインコード
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // リンク
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // 画像
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')

  // テーブル（改善版）
  const tableRegex = /(\|.*\|[\r\n]+)+\|.*\|/g
  html = html.replace(tableRegex, (tableMatch) => {
    const rows = tableMatch.trim().split('\n')
    let tableHtml = '<table class="markdown-table">'

    rows.forEach((row, index) => {
      const cells = row.split('|').filter((cell) => cell.trim() !== '')
      const isHeader = index === 0 || row.includes('---')
      const tag = isHeader ? 'th' : 'td'

      tableHtml += '<tr>'
      cells.forEach((cell) => {
        const content = cell.trim()
        if (content.includes('---')) return // 区切り行をスキップ
        tableHtml += `<${tag}>${content}</${tag}>`
      })
      tableHtml += '</tr>'
    })

    tableHtml += '</table>'
    return tableHtml
  })

  // 段落（最後に処理）
  html = html.replace(
    /^(?!<[a-z][1-6]?|<li|<blockquote|<pre|<hr|<table|<ul|<ol)(.+)$/gim,
    '<p>$1</p>'
  )

  // 空の段落タグを削除
  html = html.replace(/<p><\/p>/g, '')

  // 連続する段落タグを結合
  html = html.replace(/<\/p>\s*<p>/g, '</p><p>')

  return html
}

// HTMLエスケープ関数
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Markdownファイルを読み込む
export function loadMarkdownFile(filePath: string): string {
  try {
    const fullPath = join(process.cwd(), 'src', 'content', filePath)
    const content = readFileSync(fullPath, { encoding: 'utf-8' })
    return parseMarkdown(content)
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error)
    return '<p>コンテンツを読み込めませんでした。</p>'
  }
}

// ファイル名からタイトルを抽出
export function extractTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l: string) => l.toUpperCase())
}

// 利用可能なMarkdownファイルのリストを取得
export function getAvailableMarkdownFiles(): string[] {
  // 実際の実装では、contentディレクトリをスキャンしてファイル一覧を取得
  return ['sample.md']
}
