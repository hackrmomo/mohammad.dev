module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["next/babel"],
    plugins: ["macros", ["styled-components", { ssr: true }]],
  };
};
