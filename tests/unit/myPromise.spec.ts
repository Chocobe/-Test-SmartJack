/**
 * @author: 김영우
 * @description:
 *    * MyPromise 테스트 유닛 입니다.
 *    * 테스트 종류는 다음과 같습니다.
 *        * then() 메서드 테스트
 *        * catch() 메서드 테스트
 *        * finally() 메서드 테스트
 */

import MyPromise from "@/myLib/myPromise";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require("assert");

describe("MyPromise 테스트", () => {
	// resolve() 처리 Promise
	let resPromise: MyPromise;
	// reject() 처리 Promise
	let rejPromise: MyPromise;

	const resValue = 3;
	const rejValue = "에러 메시지";

	const testFailMsg = "실패] response";

	beforeAll(() => {
		resPromise = new MyPromise(res => {
			setTimeout(() => {
				res(resValue);
			}, 500);
		});

		rejPromise = new MyPromise((_res, rej) => {
			setTimeout(() => {
				rej(rejValue);
			}, 500);
		});
	});

	// then() 테스트
	describe("then() 테스트", () => {
		it("then() 1개", done => {
			resPromise.then(response => {
				assert(response === resValue, `${testFailMsg}: ${response}`);
				done();
			});
		});

		it("then() 2개", done => {
			resPromise
				.then(response => {
					return response + 1;
				})
				.then(response => {
					assert(response === resValue + 1, `${testFailMsg}: ${response}`);
					done();
				});
		});

		it("catch() 이후 then()", done => {
			resPromise
				.catch(() => {
					// 여기 들어오면 MyPromise 버그
					assert(false, "MyPromise catch() 버그 의심");
					done();
				})
				.then(response => {
					assert(response === 3, `${testFailMsg}: ${response}`);
					done();
				});
		});
	});

	// catch() 테스트
	describe("catch() 테스트", () => {
		it("catch() 1개", done => {
			rejPromise.catch(error => {
				assert(error === rejValue, `${testFailMsg}: ${error}`);
				done();
			});
		});

		it("then() 이후 catch()", done => {
			rejPromise
				.then(() => {
					assert(false, "MyPromise then() 버그 의심");
					done();
				})
				.catch(error => {
					assert(error === rejValue, `${testFailMsg}: ${error}`);
					done();
				});
		});
	});

	// finally() 테스트
	describe("finally() 테스트", () => {
		it("finally()", done => {
			resPromise.finally(() => {
				assert(true);
				done();
			});
		});

		it("then() -> finally()", done => {
			resPromise
				.then(response => {
					return response;
				})
				.finally(() => {
					assert(true);
					done();
				});
		});

		it("catch() -> finally()", done => {
			rejPromise
				.catch(error => {
					return error;
				})
				.finally(() => {
					assert(true);
					done();
				});
		});

		it("then() -> catch() -> finally()", done => {
			resPromise
				.then(response => {
					return response;
				})
				.catch(error => {
					return error;
				})
				.finally(() => {
					assert(true);
					done();
				});
		});
	});
});
