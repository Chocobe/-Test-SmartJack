/**
 * @author: 김영우
 * @description:
 *    * 서버의 Menu 테이블에 대한 Schema 입니다.
 */

// Menu 데이터 Schema
interface IMenu {
	id: string;
	title: string;
}

// GET 응답 데이터 Schema
interface IMenu_Get_Response {
	menuList: IMenu[];
}

export { IMenu, IMenu_Get_Response };
