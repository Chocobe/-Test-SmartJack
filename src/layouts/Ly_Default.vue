<template>
	<div id="Ly_Default">
		<!-- 메뉴 영역 -->
		<nav class="menuWrapper">
			<Bl_Menu title="스마트 잭"></Bl_Menu>
		</nav>

		<!-- 컨텐츠 라이터 영역 -->
		<main class="mainWrapper">
			<Page_DynamicContent></Page_DynamicContent>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import Bl_Menu from "@/components/menu/Bl_Menu.vue";
import Page_DynamicContent from "@/views/Page_DynamicContent.vue";

export default Vue.extend({
	components: {
		Bl_Menu,
		Page_DynamicContent,
	},
});
</script>

<style scoped lang="scss">
#Ly_Default {
	@include width-height(100%, 100%);
	@include flex(flex-start, flex-start, nowrap);

	background-color: rgba(#ff1493, 0.2);

	$menu-width: 250px;

	// 메뉴 영역
	.menuWrapper {
		@include width-height($menu-width, 100%);
		min-width: $menu-width;

		padding: 5px 15px 5px 10px;

		background-color: $white-02;
		box-shadow: -5px 0 5px rgba(#333, 0.1) inset;
	}

	// 메인 영역
	.mainWrapper {
		@include width-height(100%, 100%);

		background-color: $white-03;
	}
}
</style>
