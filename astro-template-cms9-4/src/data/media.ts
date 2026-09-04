const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

const pexels = (id: string, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

export const media = {
  lead: unsplash('photo-1542601906990-b4d3fb778b09', 2400),
  springPlanting: unsplash('photo-1634151389979-2dea7604b36f'),
  forestSurvey: unsplash('photo-1597430379423-3b91d1539dbf'),
  winterNature: unsplash('photo-1551632811-561732d1e306'),
  forestMaintenance: pexels('5029859'),
  headerBg: unsplash('photo-1448375240586-882707db888b', 2400),
  participant1: unsplash('photo-1475483768296-6163e08872a1'),
  participant2: unsplash('photo-1511632765486-a01980e01a18'),
  participant3: unsplash('photo-1478131143081-80f7f84ca84d'),
  album1: pexels('1365425'),
  album2: unsplash('photo-1618477461853-cf6ed80faba5'),
  album3: pexels('1157386'),
  album4: pexels('4503267'),
  fogForest: unsplash('photo-1425913397330-cf8af2ff40a1'),
  soilHands: pexels('1072824')
}

const localMap: Record<string, string> = {
  '/images/spring-planting.jpg': media.springPlanting,
  '/images/forest-survey.jpg': media.forestSurvey,
  '/images/winter-nature.jpg': media.winterNature,
  '/images/forest-maintenance.jpg': media.forestMaintenance,
  '/images/header-bg.jpg': media.headerBg,
  '/images/participant1.jpg': media.participant1,
  '/images/participant2.jpg': media.participant2,
  '/images/participant3.jpg': media.participant3,
  '/images/album1.jpg': media.album1,
  '/images/album2.jpg': media.album2,
  '/images/album3.jpg': media.album3,
  '/images/album4.jpg': media.album4
}

export function resolveMedia(src: string): string {
  if (src.startsWith('http')) return src
  return localMap[src] ?? media.forestSurvey
}
