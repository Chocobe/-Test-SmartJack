/**
 * @author: 김영우
 * @description:
 *    * "menu" 에 대한 Store Module interface 입니다.
 */
import { IMenu } from "@/insterface/IMenu";

interface IMenuStore {
	// 전체 메뉴
	menuList: IMenu[];
	// 현재 메뉴
	targetMenu: IMenu | null;
}

export { IMenuStore };
