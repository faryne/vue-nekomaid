import Vue from 'vue';
import router from "vue-router";

Vue.use(router);

export default new router({
    routes: [
        {
            name: "search",
            path: "/",
            component: () => import("../components/pages/Search")
        },
        {
            name: "artwork-detail",
            path: "/:site/:author_id/:artwork_id",
            component: () => import("../components/pages/ArtworkDetail")
        },
        {
            name: "author-list",
            path: "/:site/:author_id",
            component: () => import("../components/pages/Search")
        },
        {
            name: "bysite",
            path: "/:site",
            component: () => import("../components/pages/Search")
        },
    ]
});