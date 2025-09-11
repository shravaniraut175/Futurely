const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "color-functional-notation": true,
        "lab-function": true,
      },
    },
  },
};

export default config;
