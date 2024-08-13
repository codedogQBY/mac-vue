export type WallpaperID = 'default' | 'dynamic1' | 'dynamic2' | 'standalone1' | 'standalone2'

export interface WallpaperConfig {
  name: string
  image: string
  thumbnail: string
  type: 'dynamic' | 'standalone'
  timestamps?: {
    wallpaper: Record<number, string>
    theme?: Record<number, 'light' | 'dark'>
  }
}

export const wallpapersConfig: Record<WallpaperID, WallpaperConfig> = {
  default: {
    name: 'Default Wallpaper',
    image: '/images/default.jpg',
    thumbnail: '/thumbnails/default.jpg',
    type: 'standalone'
  },
  dynamic1: {
    name: 'Dynamic Wallpaper 1',
    image: '/images/dynamic1.jpg',
    thumbnail: '/thumbnails/dynamic1.jpg',
    type: 'dynamic',
    timestamps: {
      wallpaper: {
        6: '/images/dynamic1_morning.jpg',
        18: '/images/dynamic1_evening.jpg'
      },
      theme: {
        6: 'light',
        18: 'dark'
      }
    }
  },
  dynamic2: {
    name: 'Dynamic Wallpaper 2',
    image: '/images/dynamic2.jpg',
    thumbnail: '/thumbnails/dynamic2.jpg',
    type: 'dynamic',
    timestamps: {
      wallpaper: {
        6: '/images/dynamic2_morning.jpg',
        18: '/images/dynamic2_evening.jpg'
      },
      theme: {
        6: 'light',
        18: 'dark'
      }
    }
  },
  standalone1: {
    name: 'Standalone Wallpaper 1',
    image: '/images/standalone1.jpg',
    thumbnail: '/thumbnails/standalone1.jpg',
    type: 'standalone'
  },
  standalone2: {
    name: 'Standalone Wallpaper 2',
    image: '/images/standalone2.jpg',
    thumbnail: '/thumbnails/standalone2.jpg',
    type: 'standalone'
  }
}
