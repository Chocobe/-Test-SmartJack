<template>
	<div id="app">
		<!-- 레이아웃 라우트 -->
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	@include width-height(100%, 100vh);
}
</style>
