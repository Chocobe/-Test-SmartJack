import Vue from "vue";
import Vuex from "vuex";
import { IRootStore } from "@/store/IRootStore";

Vue.use(Vuex);

export default new Vuex.Store<IRootStore>({
	state: {
		NO_DATA: undefined,
	},
});
