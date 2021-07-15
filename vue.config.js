module.exports = {
	devServer: {
		overlay: false,
	},

	css: {
		loaderOptions: {
			sass: {
				prependData: `
				  @import "src/assets/scss/resetStyles.scss";
          @import "src/assets/scss/mixins/mixinWidthHeight.scss";
          @import "src/assets/scss/mixins/mixinFlex.scss";
				`,
			},
		},
	},
};
