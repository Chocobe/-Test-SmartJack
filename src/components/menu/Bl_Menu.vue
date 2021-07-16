<template>
	<div id="Bl_Menu" class="selector">
		<!-- 메뉴 selectBox -->
		<El_Menu_Selector></El_Menu_Selector>

		<!-- TODO 메뉴 목록 컴포넌트 만들기 -->
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import El_Menu_Selector from "@/components/menu/parts/El_Menu_Selector.vue";
import { menuModule } from "@/store/menu/menuModule";

export default Vue.extend({
	components: {
		El_Menu_Selector,
	},

	methods: {
		fetchMenuList() {
			this.$store.dispatch("/menu/GET_MENU_LIST");
		},
	},

	created() {
		if (!this.$store.hasModule("/menu")) {
			this.$store.registerModule("/menu", menuModule);
		}

		this.fetchMenuList();
	},

	beforeDestroy() {
		if (this.$store.hasModule("/menu")) {
			this.$store.unregisterModule("/menu");
		}
	},
});
</script>

<style scoped lang="scss">
.selector {
	@include width-height(100%);
	@include flex(space-between, center, nowrap);

	position: relative;
	cursor: pointer;

	.innerWrapper {
		//
	}
}
</style>
