const eleventySass = require("eleventy-sass");
const pluginRev = require("eleventy-plugin-rev");
const navigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addFilter("markActiveLink", function (nav) {
    return nav.map(markActiveLink(this.page.url));
  });
  eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(eleventySass, {
    rev: true,
    when: [{ ELEVENTY_ENV: "production" }, { ELEVENTY_ENV: false }],
  });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // define default layout
  eleventyConfig.addGlobalData("layout", "default");

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_includes/layouts",
    },
    templateFormats: ["html", "md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

function markActiveLink(currentUrl) {
  return function (entry) {
    entry.children = entry.children.map(markActiveLink(currentUrl));
    entry.active =
      entry.url === currentUrl ||
      entry.children.some(function (c) {
        return c.active;
      });
    return entry;
  };
}
