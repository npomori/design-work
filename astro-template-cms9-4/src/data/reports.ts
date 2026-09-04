import { media } from './media'

export interface FieldReport {
  id: number
  title: string
  content: string
  date: string
  author: string
  image: string
  location: string
}

export const fieldReports: FieldReport[] = [
  {
    id: 1,
    title: '春の苗、100本',
    content:
      '今日は春の植樹活動でした。参加者30名でクヌギとコナラの苗木を100本植樹しました。みんなで協力して作業したので、予定より早く終了。植えた苗木が大きく育つのが楽しみです。',
    date: '2024-03-20',
    author: '田中 太郎',
    image: media.springPlanting,
    location: '奥多摩町 森林公園'
  },
  {
    id: 2,
    title: '生存率95%、森は応えている',
    content:
      '森林調査の結果が出ました。昨年植えた苗木の生存率95%達成。平均樹高も15%成長。生物多様性も向上していて、アカゲラやコゲラも増加中。森林が健康に育っている証拠です。',
    date: '2024-03-10',
    author: '佐藤 花子',
    image: media.forestSurvey,
    location: '丹沢山地 調査エリア'
  },
  {
    id: 3,
    title: '冬の下草と枯れ枝',
    content:
      '冬の森林整備活動。寒い中でしたが、枯れ枝の除去と下草刈りを完了。森林の健康状態が改善されました。作業後は温かいお茶で一息。',
    date: '2024-02-15',
    author: '山田 次郎',
    image: media.winterNature,
    location: '秩父市 森林整備エリア'
  },
  {
    id: 4,
    title: '安全講習、はじめての現場へ',
    content:
      '新入会員の皆さん、ようこそ。今日は安全講習を行いました。森林ボランティア活動では安全第一。みんなで楽しく安全に活動しましょう。',
    date: '2024-02-01',
    author: '鈴木 美咲',
    image: media.participant1,
    location: '事務所・実習林'
  },
  {
    id: 5,
    title: '紅葉の観察路を歩く',
    content:
      '紅葉観察会を開催しました。参加者25名で美しい紅葉を楽しみながら森林の生態系について学びました。子どもたちも大喜びでした。',
    date: '2024-01-20',
    author: '高橋 一郎',
    image: media.participant2,
    location: '高尾山 自然観察路'
  }
]

export function findReportById(id: number): FieldReport | undefined {
  return fieldReports.find((post) => post.id === id)
}
