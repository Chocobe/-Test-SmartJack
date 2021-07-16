/**
 * @author: 김영우
 * @description:
 *    * Menu Store Module 객체 입니다.
 */
import { Module } from "vuex";
import { IMenuStore } from "@/store/menu/IMenuStore";
import { IRootStore } from "@/store/IRootStore";
import { IMenu, IMenu_Get_Response } from "@/insterface/IMenu";
import { apiGet_Menu } from "@/api/menu/apiMenu";
import MyPromise from "@/myLib/myPromise";

import router from "@/router";

const menuModule: Module<IMenuStore, IRootStore> = {
	namespaced: true,

	state: () => {
		return {
			menuList: [],
			targetMenu: null,
		};
	},

	getters: {
		// 전체 메뉴
		getMenuList(state): IMenu[] {
			return state.menuList;
		},

		// 대상 메뉴
		getTargetMenu(state): IMenu | null {
			return state.targetMenu;
		},
	},

	mutations: {
		// 전체 메뉴
		setMenuList(state, menuList: IMenu[]): void {
			state.menuList = menuList;
		},

		// 대상 메뉴
		setTargetMenu(state, targetMenu: IMenu | null): void {
			state.targetMenu = targetMenu;
		},
	},

	actions: {
		// Menu 데이터 조회
		GET_MENU_LIST(context): MyPromise {
			const menuResponse: MyPromise = apiGet_Menu();

			menuResponse
				.then(response => {
					// 전체 메뉴 저장
					const menuResponse = response as IMenu_Get_Response;
					const menuList = menuResponse.menuList;
					context.commit("setMenuList", menuList);

					// 대상 메뉴 적용 (새로고침 처리)
					const curRoute = router.currentRoute.path;
					const curMenu = menuList.filter(menu => {
						return curRoute.indexOf(`/${menu.id}`) === 0;
					});

					if (curMenu.length === 1) {
						context.commit("setTargetMenu", curMenu[0]);
					}
				})
				.catch(error => {
					alert(
						`에러 발생: 잠시 후, 다시 시도해 주세요 😯\n에러내역: ${error}`,
					);
				});

			return menuResponse;
		},
	},
};

export { menuModule };
