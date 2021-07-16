/**
 * @author: 김영우
 * @description:
 *    * Fontawesome 라이브러리의 Plugin 등록 파일 입니다.
 */

import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronUp, faChevronDown);

function initFontawesome(): void {
	Vue.component("FontAwesomeIcon", FontAwesomeIcon);
}

export { initFontawesome };
