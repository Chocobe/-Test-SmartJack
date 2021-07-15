/**
 * @author: 김영우
 * @description:
 *    * 문제 2) Axios 구현 입니다.
 *
 *    * public static 메서드는 다음과 같습니다.
 *    		* create(): MyAxios static 객체 생성
 *    		* setConfig(): MyAxios static 객체 설정
 *    		* get(): 조회
 *    		* post(): 등록
 *    		* put(): 전체수정
 *    		* patch(): 부분수정
 *    		* delete(): 삭제
 *
 *    * public 메서드는 다음과 같습니다.
 *    		* setConfig(): MyAxios 객체 설정
 *    		* get(): 조회
 *    		* post(): 등록
 *    		* put(): 전체수정
 *    		* patch(): 부분수정
 *    		* delete(): 삭제
 *
 *  	* setConfig()를 사용하여, "baseURL"을 변경할 수 있습니다.
 */
// any 타입에 대한 경고 해제
/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import MyPromise from "@/myLib/myPromise";

// MyAxios 객체 설정
interface IMyAxios_Defaults {
	baseURL?: string;
}

// MyAxios 설정
interface IMyAxios_Config extends IMyAxios_Defaults {
	url?: string;
}

export default class MyAxios {
	// 전역 객체
	private static instance: MyAxios | undefined = undefined;

	// 인스턴스 설정
	private defaults: IMyAxios_Defaults = {};

	// Fractory 함수 "create()" 를 통해서 객체생성 가능
	private constructor(
		config: IMyAxios_Defaults = {
			baseURL: "",
		},
	) {
		// 객체 설정
		this.setConfig(config);
	}

	static create(
		config: IMyAxios_Defaults = {
			baseURL: "",
		},
	): MyAxios {
		return new MyAxios(config);
	}

	// MyAxios 설정 메서드
	setConfig(config: IMyAxios_Defaults = {}): void {
		this.defaults = {
			baseURL:
				config.baseURL || typeof config.baseURL === "string"
					? config.baseURL
					: "",
		};
	}

	// MyAxios 설정 메서드 (static)
	static setConfig(config: IMyAxios_Config = {}): void {
		MyAxios.checkStaticInstance();
		(MyAxios.instance as MyAxios).setConfig(config);
	}

	// 전역 객체 존재 여부 확인 메서드 (없으면 전역 객체 생성)
	private static checkStaticInstance(): void {
		if (!MyAxios.instance) {
			MyAxios.instance = new MyAxios();
		}
	}

	// URL 생성 메서드
	private createURL(url: string, baseURL: string | undefined): string {
		// url 이 전체 주소일 경우, URL 사용
		if (url.indexOf("http") > -1) {
			return url;
		}

		if (baseURL) {
			return combineBaseURL(url, baseURL);
		} else {
			return combineBaseURL(url, this.defaults.baseURL);
		}

		// URL 과 baseURL 조합용 함수
		function combineBaseURL(url: string, baseURL = ""): string {
			// baseURL 과 url 사이 "/" 유무 보정
			if (
				baseURL.lastIndexOf("/") === baseURL.length - 1 ||
				url.indexOf("/") === 0
			) {
				return baseURL.concat(url);
			} else {
				return baseURL.concat("/", url);
			}
		}
	}

	// XMLHttpRequest 객체 생성 메서드
	private createRequest(
		url: string,
		method: string,
		config: IMyAxios_Defaults,
		body?: any,
	): MyPromise {
		MyAxios.checkStaticInstance();

		return new MyPromise((res, rej) => {
			const fixedURL = this.createURL(url, config.baseURL);

			const xhr = new XMLHttpRequest();
			xhr.open(method, fixedURL);

			// 요청 완료 Event Listener
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					res(JSON.parse(xhr.responseText));
				} else {
					rej(xhr.statusText);
				}
			};

			// 요청 실패 Event Listener
			xhr.onerror = () => {
				rej(xhr.statusText);
			};

			// body 유무에 따른 Payload 전달 및 요청 실행
			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send();
			}
		});
	}

	// GET 요청 (전역)
	static get(url: string, config: IMyAxios_Defaults = {}): MyPromise {
		MyAxios.checkStaticInstance();

		return (MyAxios.instance as MyAxios).createRequest(url, "GET", config);
	}

	// POST 요청 (전역)
	static post(
		url: string,
		body: any,
		config: IMyAxios_Defaults = {},
	): MyPromise {
		MyAxios.checkStaticInstance();

		return (MyAxios.instance as MyAxios).createRequest(
			url,
			"POST",
			config,
			body,
		);
	}

	// PUT 요청 (전역)
	static put(
		url: string,
		body: any,
		config: IMyAxios_Defaults = {},
	): MyPromise {
		MyAxios.checkStaticInstance();

		return (MyAxios.instance as MyAxios).createRequest(
			url,
			"PUT",
			config,
			body,
		);
	}

	// PATCH 요청 (전역)
	static patch(
		url: string,
		body: any,
		config: IMyAxios_Defaults = {},
	): MyPromise {
		MyAxios.checkStaticInstance();

		return (MyAxios.instance as MyAxios).createRequest(
			url,
			"PATCH",
			config,
			body,
		);
	}

	// DELETE 요청 (전역)
	static delete(url: string, config: IMyAxios_Defaults = {}): MyPromise {
		MyAxios.checkStaticInstance();

		return (MyAxios.instance as MyAxios).createRequest(url, "DELETE", config);
	}

	// GET 요청
	get(url: string, config: IMyAxios_Defaults = {}): MyPromise {
		return this.createRequest(url, "GET", config);
	}

	// POST 요청
	post(url: string, body: any, config: IMyAxios_Defaults = {}): MyPromise {
		return this.createRequest(url, "POST", config, body);
	}

	// PUT 요청
	put(url: string, body: any, config: IMyAxios_Defaults = {}): MyPromise {
		return this.createRequest(url, "PUT", config, body);
	}

	// PATCH 요청
	patch(url: string, body: any, config: IMyAxios_Defaults = {}): MyPromise {
		return this.createRequest(url, "PATCH", config, body);
	}

	delete(url: string, config: IMyAxios_Defaults = {}): MyPromise {
		return this.createRequest(url, "DELETE", config);
	}
}
