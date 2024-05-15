import menu from '@/apps/menu/index.vue';
import read from '@/apps/read/index.vue';
import file from '@/apps/file/index.vue';
import friends from '@/apps/friends/index.vue';
import wallpapers from '@/apps/wallpapers/index.vue';
import setting from '@/apps/setting/index.vue';
import music from '@/apps/music/index.vue';
import message from '@/apps/message/index.vue';
import mail from '@/apps/mail/index.vue';
import github from '@/apps/github/index.vue';


export const allApps = [
    {
        appID: 'menu',
        name: '菜单',
        icon: 'icon-menu',
        component: menu,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'read',
        name: '阅读',
        icon: 'icon-read',
        component: read,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'file',
        name: '文件',
        icon: 'icon-file',
        component: file,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'friends',
        name: '好友',
        icon: 'icon-friends',
        component: friends,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'wallpapers',
        name: '壁纸',
        icon: 'icon-wallpapers',
        component: wallpapers,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'setting',
        name: '设置',
        icon: 'icon-setting',
        component: setting,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'music',
        name: '音乐',
        icon: 'icon-music',
        component: music,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'message',
        name: '消息',
        icon: 'icon-message',
        component: message,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'mail',
        name: '邮件',
        icon: 'icon-mail',
        component: mail,
        isShow: true,
        zIndex: 2,
    },
    {
        appID: 'github',
        name: 'Github',
        icon: 'icon-github',
        component: github,
        isShow: true,
        zIndex: 2,
    },
];
