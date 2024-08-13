import menu from '@/apps/menu/index.vue'
import read from '@/apps/read/index.vue'
import file from '@/apps/file/index.vue'
import friends from '@/apps/friends/index.vue'
import wallpapers from '@/apps/wallpapers/index.vue'
import setting from '@/apps/setting/index.vue'
import music from '@/apps/music/index.vue'
import message from '@/apps/message/index.vue'
import mail from '@/apps/mail/index.vue'
import github from '@/apps/github/index.vue'
import about from '@/apps/about/index.vue'

export const allApps = [
  {
    appID: 'launcher',
    name: '启动台',
    title: '启动台',
    icon: 'icon-launcher',
    keepInDock: true
  },
  {
    appID: 'menu',
    name: '菜单',
    title: '菜单',
    icon: 'icon-menu',
    component: menu,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'read',
    name: '阅读',
    title: '阅读',
    icon: 'icon-read',
    component: read,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'file',
    name: '文件',
    title: '文件',
    icon: 'icon-file',
    component: file,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'friends',
    name: '好友',
    icon: 'icon-friends',
    title: '好友',
    component: friends,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'wallpapers',
    name: '壁纸',
    title: '壁纸',
    icon: 'icon-wallpapers',
    component: wallpapers,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'setting',
    name: '设置',
    title: '设置',
    icon: 'icon-setting',
    component: setting,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'music',
    name: '音乐',
    title: '音乐',
    icon: 'icon-music',
    component: music,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'message',
    name: '消息',
    title: '消息',
    icon: 'icon-message',
    component: message,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'mail',
    name: '邮件',
    title: '邮件',
    icon: 'icon-mail',
    component: mail,
    isShow: false,
    zIndex: 2,
    top: 100,
    left: 200,
    keepInDock: true
  },
  {
    appID: 'about',
    name: '关于',
    title: '关于',
    icon: 'icon-about',
    component: about,
    isShow: false,
    zIndex: 2,
    top: 200,
    left: 500,
    width: 400,
    height: 480,
    keepInDock: true,
    disableResize: true,
    menus: [
      {
        label: '文件',
        key: 'file',
        children: [
          { label: '新建', key: 'new' },
          { label: '打开', key: 'open' }
        ]
      },
      {
        label: '编辑',
        key: 'edit',
        children: [
          { label: '撤销', key: 'undo' },
          { label: '重做', key: 'redo' }
        ]
      },
      {
        label: '视图',
        key: 'view',
        children: [
          { label: '全屏', key: 'fullscreen' },
          { label: '退出全屏', key: 'exit_fullscreen' }
        ]
      },
      {
        label: '帮助',
        key: 'help',
        children: [
          {
            label: '关于',
            key: 'about',
            children: [
              { label: '关于我们', key: 'about_us' },
              { label: '联系我们', key: 'contact_us' }
            ]
          },
          { label: '文档', key: 'doc' }
        ]
      }
    ]
  },
  {
    appID: 'github',
    name: 'Github',
    title: 'Github',
    icon: 'icon-github',
    keepInDock: true,
    link: 'https://www.github.com'
  }
]
