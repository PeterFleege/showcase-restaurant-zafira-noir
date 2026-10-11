/* Turbopack causing issues in Hostinger -> move to Webpack and add postcss*/

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
