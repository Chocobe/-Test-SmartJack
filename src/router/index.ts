import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/:id",
		name: "Home",
		component: () =>
			import(/* webpackChunkName: "Ly_Default" */ "@/layouts/Ly_Default.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
