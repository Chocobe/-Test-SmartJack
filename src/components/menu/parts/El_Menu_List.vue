<template>
	<ul class="menuList">
		<template v-for="menu in menuList">
			<li
				class="menuList__item"
				:class="{ 'menuList__item--target': menu.id === targetMenuId }"
				:key="`menuList-${menu.id}`"
				@click="goToPage(menu)"
			>
				{{ menu.title }}
			</li>
		</template>
	</ul>
</template>

<script lang="ts">
import Vue from "vue";
import { IMenu } from "@/insterface/IMenu";

export default Vue.extend({
	computed: {
		menuList(): IMenu[] {
			return this.$store.getters["/menu/getMenuList"];
		},

		targetMenuId(): string {
			const targetMenu = this.$store.getters[
				"/menu/getTargetMenu"
			] as IMenu | null;

			return targetMenu ? targetMenu.id : "";
		},
	},

	methods: {
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
.menuList {
	//

	&__item {
		padding: 5px 5px 5px 20px;

		font-size: 0.83rem;
		font-weight: 900;

		border-radius: 5px;

		position: relative;

		cursor: default;

		&::before {
			@include width-height(5px, 5px);

			content: "";

			position: absolute;
			top: 50%;
			left: 7.5px;
			transform: translateY(-50%);

			background-color: $gray-01;
		}

		&--target {
			background-color: $yellow-01;
		}
	}
}
</style>
