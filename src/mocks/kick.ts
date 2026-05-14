// Kick 站点假页面的 mock 数据：直播流卡片 + 热门分类。

export type KickStream = {
  id: string
  title: string
  category: string
  streamer: string
  watchers: string
  thumb: string
  tags: string[]
}

export const kickStreams: KickStream[] = [
  {
    id: 'vinceaesthetic',
    title: 'Hot Models VS Ouiji Boar...',
    category: 'IRL',
    streamer: 'VinceAesthetic',
    watchers: '2.2K',
    thumb: 'linear-gradient(135deg,#f9d6f2,#a16eff)',
    tags: ['English', 'irl', 'girls', 'youtuber'],
  },
  {
    id: 'theRealShooKon3',
    title: 'Grillin Out - Melbourne To...',
    category: 'IRL',
    streamer: 'theRealShooKon3',
    watchers: '104',
    thumb: 'linear-gradient(135deg,#ffd58a,#a05a00)',
    tags: ['English', 'travel', 'australia'],
  },
  {
    id: 'ryda',
    title: 'OPENING 46 BONUSES! G...',
    category: 'Slots & Casino',
    streamer: 'Ryda',
    watchers: '110',
    thumb: 'linear-gradient(135deg,#ffe66f,#a86b00)',
    tags: ['English', '18+', 'gaming'],
  },
  {
    id: 'jared',
    title: 'Giveaw...',
    category: 'Call of D...',
    streamer: 'Jared',
    watchers: '199',
    thumb: 'linear-gradient(135deg,#5d6c8a,#1d2742)',
    tags: ['English'],
  },
]

export type KickCategory = {
  id: string
  label: string
  background: string
  text?: string
}

export const kickCategories: KickCategory[] = [
  { id: 'gta', label: 'grand theft auto v', background: 'linear-gradient(135deg,#ff8c52,#a13900)', text: '#fff' },
  { id: 'chat', label: 'JUST CHATTING', background: 'linear-gradient(135deg,#a35bff,#3d0e94)', text: '#fff' },
  { id: 'irl', label: 'IRL', background: 'linear-gradient(135deg,#52d4ff,#0c4d80)', text: '#fff' },
  { id: 'slots', label: 'SLOTS & CASINO', background: 'linear-gradient(135deg,#ffd64a,#a06a00)', text: '#1a1100' },
  { id: 'lol', label: 'LEAGUE of LEGENDS', background: 'linear-gradient(135deg,#3a64ff,#0c1d75)', text: '#fff' },
  { id: 'dota', label: 'DOTA 2', background: 'linear-gradient(135deg,#ff5c5c,#7d0d0d)', text: '#fff' },
  { id: 'pubg', label: 'BATTLEGROUNDS MOBILE', background: 'linear-gradient(135deg,#52ff8a,#0e7a3a)', text: '#06250e' },
  { id: 'valorant', label: 'VALORANT', background: 'linear-gradient(135deg,#ff5c8a,#7d0d3d)', text: '#fff' },
]

// 检测到的具体直播：用于 detected view 渲染头像、地址、tab 标签
export const kickDetectedStream = {
  streamerSlug: 'vinceaesthetic',
  url: 'https://kick.com/vinceaesthetic',
  tabLabel: 'VinceAesthetic S...',
  recordTitle: 'VinceAesthetic Stream - Watch Live on Kick',
}
