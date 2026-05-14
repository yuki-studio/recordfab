export type HotService = {
  id: string
  slug: string
  label: string
  sub?: string
  image?: string
  background?: string
  text?: string
  fontSize?: string
}

// Hot Services — 10 张主推卡片（5 列 × 2 行），对齐 Figma 0:1367 设计稿。
// 图片资源放在 /figma/，slug 用于 /site/:slug 路由。
export const hotServices: HotService[] = [
  { id: 'netflix', slug: 'netflix', label: 'Netflix', image: '/figma/hot_netflix.png' },
  { id: 'prime', slug: 'prime', label: 'Prime Video', image: '/figma/hot_prime.png' },
  { id: 'hbomax', slug: 'hbomax', label: 'HBO Max', image: '/figma/hot_hbomax.png' },
  { id: 'netflix-2', slug: 'netflix-2', label: 'Netflix', image: '/figma/hot_netflix.png' },
  { id: 'hbonow', slug: 'hbonow', label: 'HBO Now', image: '/figma/hot_hbonow.png' },
  { id: 'netflix-3', slug: 'netflix-3', label: 'Netflix', image: '/figma/hot_netflix.png' },
  { id: 'prime-2', slug: 'prime-2', label: 'Prime Video', image: '/figma/hot_prime.png' },
  { id: 'hbomax-2', slug: 'hbomax-2', label: 'HBO Max', image: '/figma/hot_hbomax.png' },
  { id: 'netflix-4', slug: 'netflix-4', label: 'Netflix', image: '/figma/hot_netflix.png' },
  { id: 'hbonow-2', slug: 'hbonow-2', label: 'HBO Now', image: '/figma/hot_hbonow.png' },
]

export type SiteGroup = {
  letter: string
  domains: string[]
}

// 全字母分组站点目录（A-Z + #），按设计稿每字母可铺 5 列。
export const allSites: SiteGroup[] = [
  { letter: 'A', domains: ['abc.com', 'abc7news.com', 'abc7ny.com', 'abcnews.go.com', 'abema.tv', 'acfun.cn', 'adn.com', 'adultswim.com', 'akamai.com', 'amazon.com'] },
  { letter: 'B', domains: ['b-ch.com', 'baidu.com', 'bandcamp.com', 'bbc.co.uk', 'beeg.com', 'bigo.tv', 'bild.de', 'bilibili.com', 'bloomberg.com', 'boomplay.com'] },
  { letter: 'C', domains: ['canalplus.com', 'caracoltv.com', 'cbc.ca', 'cbsnews.com', 'cda.pl', 'channel4.com', 'cinemax.com', 'cnbc.com', 'cnn.com', 'crunchyroll.com'] },
  { letter: 'D', domains: ['dailymotion.com', 'dazn.com', 'discovery.com', 'disneyplus.com', 'dlive.tv', 'douban.com', 'douyin.com', 'dplay.com', 'dr.dk', 'dropout.tv'] },
  { letter: 'E', domains: ['eporner.com', 'espn.com', 'eurosport.com', 'extreme.com'] },
  { letter: 'F', domains: ['facebook.com', 'fandango.com', 'fanza.com', 'flickr.com', 'fox.com', 'foxnews.com', 'fubo.tv', 'funimation.com'] },
  { letter: 'G', domains: ['gaia.com', 'globo.com', 'gmm25.com', 'godou.tv', 'goplay.be', 'google.com'] },
  { letter: 'H', domains: ['hbomax.com', 'hbonow.com', 'hboasia.com', 'hellporno.com', 'history.com', 'hotstar.com', 'hulu.com', 'hulu.jp'] },
  { letter: 'I', domains: ['ign.com', 'imdb.com', 'instagram.com', 'iq.com', 'iqiyi.com', 'itv.com', 'itvx.com'] },
  { letter: 'J', domains: ['joyn.de', 'jw-cdn.org', 'jiocinema.com'] },
  { letter: 'K', domains: ['kakao.com', 'kick.com', 'kocowa.com', 'kompasiana.com'] },
  { letter: 'L', domains: ['laola1.tv', 'liberty.tv', 'line.me', 'linkedin.com', 'lionsgate.com', 'liverpoolfc.tv'] },
  { letter: 'M', domains: ['m6.fr', 'mango.tv', 'mbc.net', 'mediaset.it', 'mgo.com', 'mixcloud.com', 'mlb.com', 'mubi.com', 'myfans.jp', 'mytv.com.hk'] },
  { letter: 'N', domains: ['naver.com', 'nbcnews.com', 'netflix.com', 'nfl.com', 'nhk.or.jp', 'niconico.jp', 'nrk.no', 'ntv.co.jp', 'nytimes.com'] },
  { letter: 'O', domains: ['okruger.com', 'onlyfans.com', 'optus.com.au', 'ovo.com'] },
  { letter: 'P', domains: ['paramount.com', 'parler.com', 'pbs.org', 'peacocktv.com', 'periscope.tv', 'pinterest.com', 'pluto.tv', 'pornhub.com', 'primevideo.com'] },
  { letter: 'Q', domains: ['qq.com', 'quibi.com'] },
  { letter: 'R', domains: ['rakuten.tv', 'rapidvideo.com', 'redbull.tv', 'reddit.com', 'roku.com', 'rumble.com', 'rutube.ru'] },
  { letter: 'S', domains: ['salto.fr', 'sbs.com.au', 'shahid.net', 'showmax.com', 'showtime.com', 'sina.com.cn', 'skygo.co.nz', 'soundcloud.com', 'spotify.com', 'starz.com'] },
  { letter: 'T', domains: ['telecinco.es', 'tencent.com', 'tf1.fr', 'tiktok.com', 'tnt.com', 'tubi.tv', 'tudou.com', 'tv4play.se', 'tver.jp', 'twitch.tv'] },
  { letter: 'U', domains: ['udemy.com', 'u-next.jp', 'univision.com', 'uplay.com', 'ustvgo.tv'] },
  { letter: 'V', domains: ['veoh.com', 'vevo.com', 'viaplay.com', 'vidio.com', 'vimeo.com', 'voyo.cz', 'vrt.be', 'vudu.com'] },
  { letter: 'W', domains: ['warnerbros.com', 'wattpad.com', 'wave.com', 'wetv.vip', 'wowow.co.jp', 'wsj.com'] },
  { letter: 'X', domains: ['xfinity.com', 'xhamster.com', 'xnxx.com', 'xvideos.com'] },
  { letter: 'Y', domains: ['yahoo.co.jp', 'yandex.ru', 'youku.com', 'youporn.com', 'youtube.com'] },
  { letter: 'Z', domains: ['zalando.de', 'zattoo.com', 'zdf.de', 'zee5.com', 'zhihu.com'] },
  { letter: '#', domains: ['10play.com.au', '1tv.ru', '247sports.com', '4tube.com', '6play.fr', '9now.com.au'] },
]

export const supportedSiteCount = 1000
