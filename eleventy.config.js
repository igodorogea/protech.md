module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/**");
    eleventyConfig.addPassthroughCopy("src/css/**");
    eleventyConfig.addPassthroughCopy("src/js/**");
    return {
        dir: {
			input: "src",
			output: "public",
		},
		templateFormats: ["html", "md", "njk"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
    };
};
