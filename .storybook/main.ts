import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    // {
    //   /**
    //    * Fix Storybook issue with PostCSS@8
    //    * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
    //    */
    //   //postcss를 활용할 수 있도록 이 부분 추가.
    //   name: "@storybook/addon-postcss",
    //   options: {
    //     postcssLoaderOptions: {
    //       implementation: require("postcss"),
    //     },
    //   },
    // },
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          // Replaces existing CSS rules with given rule
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  swc: (config, options) => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  webpackFinal: async (config, { configType }) => {
    if (config && config.resolve) {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    return config;
  },
};
export default config;
