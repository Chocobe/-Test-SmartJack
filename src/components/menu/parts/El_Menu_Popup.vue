<template>
	<ul class="menuPopup">
		<li class="menuPopup__item menuPopup__item--heading">문제 리스트</li>

		<template v-for="menu in menuList">
			<li
				class="menuPopup__item"
				:class="{ 'menuPopup__item--target': menu.id === targetMenuId }"
				:key="`${menu.id}`"
				@click="goToPage(menu)"
			>
				{{ menu.title }}
			</li>
		</template>
	</ul>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { IMenu } from "@/insterface/IMenu";

export default Vue.extend({
	props: {
		// 전체 메뉴
		menuList: {
			type: Array as PropType<IMenu[]>,
			default: [],
		},
	},

	computed: {
		// 대상 메뉴의 title
		targetMenuId(): string {
			const targetMenu = this.$store.getters["/menu/getTargetMenu"] as IMenu;
			return targetMenu.id;
		},
	},

	methods: {
		// 페이지 이동
		goToPage(menu: IMenu) {
			const menuId = menu.id;
			const routeId = this.$route.params.id;

			if (menuId === routeId) {
				return;
			}

			this.$store.commit("/menu/setTargetMenu", menu);
			this.$router.push(`/${menuId}`);

			this.$emit("click");
		},
	},
});
</script>

<style scoped lang="scss">
.menuPopup {
	@include width-height(100%);

	padding: 10px;

	border-radius: 5px;
	box-shadow: 1px 3px 6px rgba(#222, 0.5);
	background-color: $white-01;

	&__item {
		$small-font-size: 0.83rem;

		padding: 5px 5px 5px 25px;

		font-size: $small-font-size;
		font-weight: 800;

		border-radius: 5px;

		cursor: pointer;

		&--heading {
			color: $gray-01;

			cursor: default;
		}

		&--target {
			background-color: $yellow-01;
		}
	}
}
</style>
