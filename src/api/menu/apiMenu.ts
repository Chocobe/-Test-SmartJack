/**
 * @author: 김영우
 * @description:
 *    * 서버에 Menu API 호출 메서드 입니다.
 */
import { noneTokenAxios } from "@/api";
import MyPromise from "@/myLib/myPromise";

// Get Menu API 메서드
function apiGet_Menu(): MyPromise {
	return noneTokenAxios.get("menu");
}

export { apiGet_Menu };
