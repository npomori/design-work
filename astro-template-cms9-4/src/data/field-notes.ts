import { media } from './media'

export interface FieldNoteEntry {
  date: string
  title: string
  location: string
  datetime: string
  weather: string
  participants: number
  participantsNote?: string
  reporter: string
  content: string
  nearMiss: string
  category: string
  thumbnails: string[]
}

export const fieldNotes: FieldNoteEntry[] = [
  {
    date: '2024-03-20',
    title: '定例活動',
    location: '秩父市 森林整備エリア',
    datetime: '2024年3月20日（水）8:30～16:00',
    weather: '曇り、気温8℃、湿度60%',
    participants: 32,
    participantsNote: 'ボランティア25 · スタッフ7',
    reporter: '佐藤 美咲（整備リーダー）',
    content:
      '下草刈り作業（面積：2ha）。枝打ち作業（高さ2m以下）。倒木の除去と整理。作業後の安全確認。',
    nearMiss: 'なし（安全に作業完了）',
    category: '整備活動',
    thumbnails: [media.forestMaintenance, media.album1, media.album2, media.album3]
  },
  {
    date: '2024-03-15',
    title: '定例活動',
    location: '奥多摩町 森林公園',
    datetime: '2024年3月15日（金）9:00～15:00',
    weather: '晴れ、気温12℃、湿度45%',
    participants: 48,
    participantsNote: '一般35 · スタッフ13',
    reporter: '田中 正義（活動リーダー）',
    content:
      'コナラ、クヌギの苗木100本を植樹。植樹後の水やり作業。参加者への森林保全の重要性について説明。記念撮影と交流会。',
    nearMiss:
      '参加者の1名が斜面で滑りそうになったが、事前の安全指導により未然に防げた。次回はより安全な場所での活動を検討。',
    category: '植樹活動',
    thumbnails: [media.springPlanting, media.participant1, media.soilHands, media.participant2]
  },
  {
    date: '2024-02-25',
    title: '定例活動',
    location: '丹沢山地 調査エリア',
    datetime: '2024年2月25日（日）7:00～17:00',
    weather: '曇り時々晴れ、気温5℃、湿度50%',
    participants: 28,
    participantsNote: '調査員20 · スタッフ8',
    reporter: '伊藤 博文（調査リーダー）',
    content:
      '樹木の生長状況調査（3ha）。生物多様性の記録。土壌サンプルの採取。GPSによる位置情報記録。',
    nearMiss:
      '調査中に野生動物（イノシシ）と遭遇。適切な距離を保ち、安全に回避できた。次回は野生動物への注意喚起を強化。',
    category: '調査活動',
    thumbnails: [media.forestSurvey, media.forestMaintenance, media.headerBg, media.winterNature]
  },
  {
    date: '2024-02-10',
    title: '定例活動',
    location: '高尾山 自然観察路',
    datetime: '2024年2月10日（土）10:00～14:00',
    weather: '晴れ、気温3℃、湿度30%',
    participants: 22,
    participantsNote: '一般18 · ガイド4',
    reporter: '山本 健一（自然観察リーダー）',
    content:
      '冬芽の観察と解説。野鳥の観察（15種確認）。冬の森の生態系について学習。観察記録の作成。',
    nearMiss:
      '参加者の1名が滑りやすい路面で転倒しそうになった。次回は滑り止めの靴の着用を事前に案内する。',
    category: '観察活動',
    thumbnails: [media.winterNature, media.album4, media.forestSurvey, media.springPlanting]
  }
]
