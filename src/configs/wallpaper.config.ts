export type WallpaperID =
  | 'default'
  | 'big-sur'
  | 'catalina'
  | 'desert'
  | 'lake'
  | 'monterey'
  | 'solar-grad'
  | 'ventura'

export interface WallpaperConfig {
  name: string
  image: string | string[]
  type: 'dynamic' | 'standalone'
}

export const wallpapersConfig: Record<WallpaperID, WallpaperConfig> = {
  default: {
    name: '默认',
    image: Array.from({ length: 64 - 38 }, (_, i) => `/wallpapers/${i + 38}.jpg`),
    type: 'standalone'
  },
  'big-sur': {
    name: 'Big Sur',
    image: Array.from({ length: 10 }, (_, i) => `/wallpapers/big-sur-${i + 1}.jpg`),
    type: 'standalone'
  },
  catalina: {
    name: 'Catalina',
    image: Array.from({ length: 9 }, (_, i) => `/wallpapers/catalina-${i}.jpg`),
    type: 'standalone'
  },
  desert: {
    name: 'Desert',
    image: Array.from({ length: 8 }, (_, i) => `/wallpapers/desert-${i + 1}.jpg`),
    type: 'standalone'
  },
  lake: {
    name: 'Lake',
    image: Array.from({ length: 8 }, (_, i) => `/wallpapers/lake-${i + 1}.jpg`),
    type: 'standalone'
  },
  monterey: {
    name: 'Monterey',
    image: Array.from({ length: 8 }, (_, i) => `/wallpapers/monterey-${i + 1}.jpg`),
    type: 'standalone'
  },
  'solar-grad': {
    name: 'Solar Grad',
    image: Array.from({ length: 16 }, (_, i) => `/wallpapers/solar-grad-${i + 1}.jpg`),
    type: 'standalone'
  },
  ventura: {
    name: 'Ventura',
    image: Array.from({ length: 5 }, (_, i) => `/wallpapers/ventura-${i + 1}.webp`),
    type: 'standalone'
  }
}
