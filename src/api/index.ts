/**
 * @author: 김영우
 * @description:
 *    * 프로젝트에 필요한 MyAxios 객체를 생성 합니다.
 */
import MyAxios from "@/myLib/myAxios";

const noneTokenAxios = MyAxios.create({
	baseURL: "http://recruit.web.smartjackwp.co.kr",
});

export { noneTokenAxios };
