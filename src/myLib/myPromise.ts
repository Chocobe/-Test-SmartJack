/**
 * @author: 김영우
 * @description:
 * 		* 문제 1) Promise 구현 입니다.
 *
 * 		* 구현된 메서드는 다음과 같습니다.
 * 				* then(): 요청 성공 비동기 메서드
 * 				* catch(): 요청 실패 비동기 메서드
 * 				* finally(): 공통 처리 비동기 메서드
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

// "비동기 상태값" Enum
enum Enum_MyPromiseState {
	PENDING = "pending",
	FULFILLED = "fulfilled",
	REJECTED = "rejected",
}

// 생성자 함수의 인자 callback 의 resolve 함수 Params
export type IFunc_Resolve = (response: any) => void;
// 생성자 함수의 인자 callback 의 reject 함수 Params
export type IFunc_Reject = (error: any) => void;

// then()의 성공 Params
export type IFunc_OnSuccess = (value: any) => any;
// then(), catch()의 실패 Params
export type IFunc_OnFail = (value: any) => any;

// Task Queue 인터페이스
export interface IMyPromise_Task {
	onSuccess: IFunc_Resolve;
	onFail: IFunc_Reject;
}

export default class MyPromise {
	// 비동기 상태값
	private state: Enum_MyPromiseState = Enum_MyPromiseState.PENDING;
	// 비동기 처리 결과값
	private value: any = null;
	// 비동기 처리 함수 Queue
	private taskQueue: IMyPromise_Task[] = [];

	constructor(callback: (res: IFunc_Resolve, rej: IFunc_Reject) => void) {
		// 초기 상태 === "pending"
		this.state = Enum_MyPromiseState.PENDING;
		// 빈값을 구별하기 위한, null 초기화
		this.value = null;
		// then() 에 의해 쌓이는 작업 처리 함수 Queue
		this.taskQueue = [];

		try {
			// callback 내부에서 resolve() 또는 reject() 호출 예정
			callback(this.resolve, this.reject);
		} catch (error) {
			this.reject(error);
		}
	} // constructor();

	// "FULFILL" 상태 전환 메서드
	private resolve = (value: any): void => {
		this.updateResult(value, Enum_MyPromiseState.FULFILLED);
	};

	// "REJECT" 상태 전환 메서드
	private reject = (error: any): void => {
		this.updateResult(error, Enum_MyPromiseState.REJECTED);
	};

	// 상태변경 처리 메서드
	// 호출자: resolve(), reject()
	private updateResult = (value: any, state: Enum_MyPromiseState) => {
		// Web API로 넘겨서, Task Queue 로써 호출 되도록 setTimeout() 에서 처리
		setTimeout(() => {
			// 이미 "상태변경"이 되었던 Promise라면, 처리안함 (종료)
			if (this.state !== Enum_MyPromiseState.PENDING) return;

			// then(value)의 value가 Promise 객체일 경우 처리
			if (this.isThenable(value)) {
				return value.then(this.resolve, this.reject);
			}

			// then(value)의 value가 Promise 객체가 아닐 경우 처리
			this.value = value;
			this.state = state;

			// 변경시킨 상태로, TaskQueue에 쌓인 함수 실행
			// (비동기 처리 실행)
			this.executeTaskQueue();
		}, 0);
	}; // updateResult();

	// value의 타입이 Promise인지 검사 메서드
	private isThenable = function (value: any) {
		return value instanceof MyPromise;
	}; // isThenable();

	// 비동기 처리 함수에 대한 "Task Queue" 등록 및 "Chaining" 객체 반환
	then(
		onSuccessParam: IFunc_OnSuccess | null = null,
		onFailParam: IFunc_OnFail | null = null,
	): MyPromise {
		return new MyPromise((res, rej) => {
			// then() 처리 함수
			const onSuccess: IFunc_Resolve = (value: any): void => {
				// then() 처리 함수가 없다면, 기본 resolve() 실행 함수로 대체
				if (!onSuccessParam) {
					res(value);
					return;
				}

				try {
					res(onSuccessParam(value));
				} catch (error) {
					rej(error);
				}
			}; // onSuccess();

			// catch() 처리 함수
			const onFail: IFunc_Reject = (value: any): void => {
				// catch() 처리 함수가 없다면, 기본 reject() 실행 함수로 대체
				if (!onFailParam) {
					rej(value);
					return;
				}

				try {
					res(onFailParam(value));
				} catch (error) {
					rej(error);
				}
			}; // onFail();

			// 새로운 "Task Queue" 등록
			this.addTask({ onSuccess, onFail });
		}); // return new MyAxios();
	} // then();

	// Task Queue 에 Task 등록 메서드
	private addTask = (task: IMyPromise_Task): void => {
		this.taskQueue.push(task);
		this.executeTaskQueue();
	};

	// Task Queue 실행 메서드
	private executeTaskQueue = (): void => {
		// 호출 시점에 Promise가 Pending 상태면, 실행 종료
		if (this.state === Enum_MyPromiseState.PENDING) {
			return;
		}

		while (this.taskQueue.length > 0) {
			const curTask = this.taskQueue.pop() as IMyPromise_Task;

			if (this.state === Enum_MyPromiseState.FULFILLED) {
				curTask.onSuccess(this.value);
			} else {
				curTask.onFail(this.value);
			}
		}
	}; // executeTaskQueue()

	catch(onFail: IFunc_OnFail) {
		return this.then(null, onFail);
	}

	finally(callback: () => void) {
		return new MyPromise((res, rej) => {
			// 비동기 값 & 상태 caching 처리
			let val: any;
			let isRejected: boolean;

			// then() 처리 함수
			const onSuccess: IFunc_OnSuccess = function (value: any) {
				val = value;
				isRejected = false;

				callback();
			};

			// catch() 처리 함수
			const onFail: IFunc_OnFail = function (error: any) {
				val = error;
				isRejected = true;

				callback();
			};

			this.then(onSuccess, onFail).then(() => {
				// 비동기 caching에 따흔 Promise 처리
				if (!isRejected) {
					res(val);
				} else {
					rej(val);
				}
			});
		}); // new MyPromise();
	} // finally();
}
