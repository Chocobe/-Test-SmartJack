<template>
	<div class="menuSelector" @click.capture="showMenuPopup">
		<div class="menuSelectorWrapper">
			<template v-if="title">
				<h5 class="menuSelector__title">
					{{ title }}
				</h5>
			</template>

			<!-- 현재 선택자 -->
			<p class="menuSelector__target">
				{{ targetMenuTitle }}
			</p>
		</div>

		<div class="menuSelector__icon">
			<FontAwesomeIcon icon="chevron-up"></FontAwesomeIcon>
			<FontAwesomeIcon icon="chevron-down"></FontAwesomeIcon>
		</div>

		<!-- Popup -->
		<div class="menuSelector__popup">
			<El_Menu_Popup
				:menuList="menuList"
				@click="hideMenuPopup"
			></El_Menu_Popup>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import El_Menu_Popup from "@/components/menu/parts/El_Menu_Popup.vue";
import { IMenu } from "@/insterface/IMenu";

export default Vue.extend({
	components: {
		El_Menu_Popup,
	},

	props: {
		title: {
			type: String,
			default: "스마트 잭",
		},
	},

	computed: {
		// Store - 전체 메뉴
		menuList(): IMenu[] {
			return this.$store.getters["/menu/getMenuList"] as IMenu[];
		},

		// Store - 대상 메뉴 - 메뉴명
		targetMenuTitle(): string {
			const targetMenu = this.$store.getters[
				"/menu/getTargetMenu"
			] as IMenu | null;

			if (targetMenu) {
				return targetMenu.title;
			} else {
				return "메뉴 선택";
			}
		},
	},

	methods: {
		// 팝업 열기 메서드
		showMenuPopup(): void {
			const popupElement = this.$el.querySelector(
				".menuSelector__popup",
			) as HTMLDivElement;

			popupElement.classList.add("menuSelector__popup--show");
		},

		// 팝업 닫기 메서드
		hideMenuPopup(): void {
			const popupElement = this.$el.querySelector(
				".menuSelector__popup",
			) as HTMLDivElement;

			popupElement.classList.remove("menuSelector__popup--show");
		},

		// click 이벤트 초기화 메서드
		initClickListener(): void {
			window.addEventListener("click", (event: MouseEvent) => {
				const targetElement = event.target as HTMLElement;
				if (!targetElement.closest(".menuSelector")) {
					this.hideMenuPopup();
				}
			});
		},
	},

	mounted(): void {
		this.initClickListener();
	},
});
</script>

<style scoped lang="scss">
.menuSelector {
	@include width-height(100%);
	@include flex(space-between);

	cursor: pointer;
	position: relative;

	&__title {
		color: $gray-02;
	}

	&__target {
		font-weight: 900;
	}

	&__icon {
		@include flex(center, center, wrap, column);

		color: $gray-01;
		font-size: 0.75rem;
	}

	&__popup {
		@include width-height(100%);

		display: none;

		position: absolute;
		top: calc(100% + 5px);
		left: 0;

		&--show {
			display: block;
		}
	}
}
</style>
