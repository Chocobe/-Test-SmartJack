<template>
	<article class="mainContent">
		<section class="mainContent__section">
			<h1 class="mainContent__title">
				{{ contents }}
			</h1>
		</section>
	</article>
</template>

<script lang="ts">
import Vue from "vue";
import { IMenu } from "@/insterface/IMenu";

export default Vue.extend({
	computed: {
		contents(): string {
			const targetMenu = this.$store.getters[
				"/menu/getTargetMenu"
			] as IMenu | null;

			if (targetMenu) {
				return targetMenu.title;
			} else {
				return "메뉴를 선택해 주세요";
			}
		},
	},
});
</script>

<style scoped lang="scss">
.mainContent {
	@include width-height(100%, 100%);

	overflow-y: auto;

	&__section {
		//
	}

	&__title {
		margin-top: 4rem;

		color: $gray-03;
		font-size: 2rem;
		font-weight: 900;
		text-align: center;
	}
}
</style>
