const Home = () => import('@/pages/home.vue');
const NotFound = () => import('@/pages/not_found.vue');
const About = () => import('@/pages/about.vue');
const Chart = () => import('@/pages/chart.vue');
const Gallery = () => import('@/pages/gallery.vue');
const Links = () => import('@/pages/links.vue');
import {
    PhotoIcon,
    InformationCircleIcon,
    HomeIcon,
    PencilSquareIcon,
    PaperClipIcon,
} from "@heroicons/vue/24/outline";
import { type RouteRecordName } from 'vue-router';

interface RouteRecord {
    displayName: string;
    icon?: any;
    pageName: string;
    path: string;
    component: any;
    hidden?: boolean;
    cover?: string;
    noHeader?: boolean;
}

const navigations: RouteRecord[] =
    [
        {
            displayName: "我首页",
            icon: HomeIcon,
            pageName: "home",
            path: "/home",
            component: Home,
            noHeader: true
        },
        {
            displayName: "我介绍",
            icon: InformationCircleIcon,
            pageName: "about",
            path: "/about",
            component: About,
            noHeader: true
        },
        {
            displayName: "我写谱",
            icon: PencilSquareIcon,
            pageName: "chart",
            path: "/chart",
            cover: "/Chart05.png",
            component: Chart
        },
        {
            displayName: "我吊图",
            icon: PhotoIcon,
            pageName: "gallery",
            path: "/gallery",
            cover: "/SDXD_Pixel2.png",
            component: Gallery
        },
        {
            displayName: "我项目",
            icon: PaperClipIcon,
            pageName: "links",
            path: "/links",
            cover: "/wakadoriPixel.jpg",
            component: Links
        },
        {
            displayName: "找不到页面",
            pageName: "Page Not Found",
            path: "/:catchAll(.*)",
            component: NotFound,
            hidden: true,
            noHeader: true,
        }
    ]

// 第一项是主页
const home: RouteRecord = navigations[0]
// 最后一项是错误页
const ErrorPage: RouteRecord = navigations[navigations.length - 1]

const GetPage = (page_name: RouteRecordName | null | undefined): RouteRecord | undefined => {
    const page = navigations.find(item => item["pageName"] === page_name)
    if(page) {
        return page;
    } else {return undefined}
};

export {navigations, home, ErrorPage, GetPage}