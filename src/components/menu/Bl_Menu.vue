<template>
	<div class="menu">
		<!-- 메뉴 selectBox -->
		<El_Menu_Selector class="menu__selector"></El_Menu_Selector>

		<!-- 메뉴 리스트 -->
		<El_Menu_List class="menu__list"></El_Menu_List>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import El_Menu_Selector from "@/components/menu/parts/El_Menu_Selector.vue";
import El_Menu_List from "@/components/menu/parts/El_Menu_List.vue";
import { menuModule } from "@/store/menu/menuModule";

export default Vue.extend({
	components: {
		El_Menu_Selector,
		El_Menu_List,
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
.menu {
	@include width-height(100%);

	&__selector {
		z-index: 1;
	}

	&__list {
		margin-top: 10px;
	}
}
</style>
