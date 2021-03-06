# CRA ์์ด React + Typescript ์ธํ

# ๐ฅ๏ธ ์คํ ๋ฐฉ๋ฒ
```
yarn
yarn start
```

<br />

# ๐ฉ ์ค์  ๊ณผ์ 

## 1. Babel ์ธํ

### 1) git init / yarn init(or npm init)

```
yarn init
	 or
npm init
```

- yarn init ๋๋ npm init: ํ๋ก์ ํธ initialize
- ์ ๋ช๋ น์ด๋ฅผ ์น๋ฉด `package.json` ํ์ผ์ด ์์ฑ๋๊ณ  ๋ด์ฉ์ด ์์ฑ๋์ด ์๋ค.

<div align="center">
  <img height="200" src="https://user-images.githubusercontent.com/85148549/158333446-6cc2e1ab-a10e-448c-ad96-58f640307677.png">
</div>

<br />

### 2) ๋ฃจํธ ๊ฒฝ๋ก์ public, src ํด๋๋ฅผ ์์ฑํ๋ค.

- public: ์ ์ ์ธ ํ์ผ๋ค์ ๊ด๋ฆฌํ๋ค.
- ์์ฑ๋ public ํด๋์ index.html ํ์ผ์ ์์ฑํ ํ ์๋์ ๊ฐ์ด ์์ฑํ๋ค.
    - ์ฌ์ฉํ๊ณ  ์ถ์๋๋ก ์์ฑํ์.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React setup without CRA</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

<div align="center">
  <img height="200" src="https://user-images.githubusercontent.com/85148549/158333460-7a2e8b57-3c2d-4ff5-980f-dfb8222f234b.png">
</div>

<br />

### 3) Babel Package๋ฅผ ์ค์นํ๋ค.

```
yarn add --dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
or
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
```

- **@babel/core**: ๋ฐ๋ฒจ์ ํต์ฌ ๊ธฐ๋ฅ, ํ๋ก์ ํธ ๋ด ์ฝ๋๋ค์ ์ปดํ์ผํด์ค๋ค.
- **@babel/cli**: Command Line(Terminal)์์ babel๋ก ์ปดํ์ผํ  ์ ์๊ฒ ํด์ค๋ค.
- **@babel/preset-env**: ES2015 ์ด์(ES6 ์ด์)์ ๋ฌธ๋ฒ์ ์ปดํ์ผ ํด์ค๋ค.
- **@babel/preset-react**:  React ๋ฌธ๋ฒ์ ์ปดํ์ผ ํด์ค๋ค.
- **@babel/preset-typescript**: Typescript ๋ฌธ๋ฒ์ ์ปดํ์ผ ํด์ค๋ค.
    - Typescript๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด ์ค์นํ์ง ์์๋ ๋๋ค.

- ์ค์น๊ฐ ์๋ฃ๋๋ฉด ๋ฃจํธ ๋๋ ํ ๋ฆฌ์ `babel.config.json` ํ์ผ์ ์์ฑํ์ฌ ์ค์นํ preset๋ค์ ์์ฑํด์ค๋ค.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
}
```

- `babel.config.json`์์ preset, option ์์ฑ ๋ฐฉ๋ฒ

```json
{
  "presets": [
    "presetA", // bare string
    ["presetA"], // wrapped in array
    ["presetA", {}] // 2nd argument is an empty options object
  ]
}

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```

- ์ค์น๊ฐ ์๋ฃ๋๋ฉด ๋ฃจํธ ํด๋์ node_modules ํด๋๊ฐ ๋ง๋ค์ด์ง๋๋ฐ, git์ commit๋๋ ๊ฒ์ ๋ฐฉ์งํ๊ธฐ ์ํด `.gitignore` ํ์ผ์ ์์ฑํ์ฌ **node_modules**, **dist** ํด๋๋ฅผ ์์ฑํ๋ค.
- ํ์ฌ๊น์ง ์งํ ์ํฉ

<div align="center">
  <img height="300" src="https://user-images.githubusercontent.com/85148549/158333455-321e7916-19de-462f-a9b3-31f3d777774a.png">
</div>

<br />

## 2. Webpack ์ธํ

### 1) Webpack

- webpack ๊ด๋ จ ํจํค์ง๋ฅผ ์๋ ๋ช๋ น์ด๋ฅผ ํตํด ์ค์นํ๋ค.

```json
yarn add --dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
or
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```

- **webpack-dev-server**: Node.js ๋ฐํ์์์ ์ง์  ์ฌ์ฉํ  ์ ์๋ Node.js API๋ฅผ ์ ๊ณตํ๋ค.
- **style-loader**: CSS๋ฅผ DOM์ ์ฝ์ํ๋ค.
- **css-loader**: CSS ๋ด๋ถ์ `@import`๋ `url()` ๋ฑ์ ์์๋ฅผ ํด์ํด์ค๋ค.
- **babel-loader**: Babel๋ก ํธ๋์คํ์ผ๋ง๋ Javascript๋ฅผ ๋ฒ๋ค๋งํ  ์ ์๊ฒ ํด์ค๋ค.

- ์์ ๊ฐ์ด ์ค์นํ ํ src ํด๋์ index.js(.ts ํ์ผ์ ์ถ๊ฐ ์ธํ ํ์) ํ์ผ์ ๋ง๋ค๊ณ   ๋ด๋ถ์ ์๋ฌด๋ฐ ์ฝ๋๋ ์์ฑํ ํ Terminal์ **npx webpack** ํค์๋๋ฅผ ์๋ ฅํ๋ฉด dist ํด๋๊ฐ ์์ฑ๋๋ฉด์ main.js ํ์ผ์ด ๋ํ๋๊ฒ ๋๋ค.
    - ์ฌ๊ธฐ์ npx ํค์๋๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  ์ง์  ๋ช๋ น์ด๋ฅผ ์ฌ์ฉํ๊ณ  ์ถ๋ค๋ฉด package.json ํ์ผ์์ scripts ๋ด์ฉ์ ์ถ๊ฐํ์ฌ npm ๋ช๋ น์ด๋ฅผ ๋์  ์ฌ์ฉํ  ์ ์๋ค.
        
        ```json
        {
        	/* ... */
           "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
           },
        	/* ... */
         }
        ```
        

<br />

### 2) Plugin

- ์นํฉ ๋ฒ๋ค๋ง ํ ์ ์ฉํ  ํ๋ฌ๊ทธ์ธ์ ์ค์นํ๋ค.

```
yarn add --dev html-webpack-plugin clean-webpack-plugin
or
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

- html-webpack-plugin : webpack ๋ฒ๋ค์ ์ ๊ณตํ๋ HTML ํ์ผ ์์ฑ์ ๋จ์ํํ๋ค.
- clean-webpack-plugin : ๋ฒ๋ค๋ง์ ํ  ๋๋ง๋ค ์ด์  ๋ฒ๋ค๋ง ๊ฒฐ๊ณผ๋ฅผ ์ ๊ฑฐํ๋ค.

- 22-03-15 ๊ธฐ์ค webpack์ ^5.70.0 ๋ฒ์ ์ผ๋ก ์ค์น๋์๊ณ , ๋ฒ์  4 ์ดํ๋ถํฐ๋ ์ด๋ ํ ์ค์ ์ ํ์ง ์์๋ webpack์ด ๋์ํ๋ค.
    - ๋ง์ฝ ํน์ ํ ์ต์์ ์ถ๊ฐํ๊ฑฐ๋ ์ ๊ฑฐํ๊ณ  ์ถ๋ค๋ฉด `webpack.config.js` ํ์ผ์ ์์ฑํ์ฌ ์ค์ ํ๋ฉด ๋๋ค.
    - ์๋์ ๊ฐ์ด ๋ฃจํธ ํด๋์ `webpack.config.js` ํ์ผ์ ์์ฑํ์ฌ ๋ด์ฉ์ ์ถ๊ฐํ์.

```jsx
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

- **entry**: `./src`๋ฅผ ๊ธฐ๋ณธ์ผ๋ก ํ๋ฉฐ ์ดํ๋ฆฌ์ผ์ด์์ด entry์์๋ถํฐ ์คํ๋๊ณ  webpack์ด ๋ฒ๋ค๋งํ๋ค.
- **output**: webpack์ด ๊ฒฐ๊ณผ๋ฅผ ๋ด๋ณด๋ด๋ ๋ฐฉ๋ฒ๊ณผ ๊ด๋ จ๋ ์ต์
    - **path**: ๋ชจ๋  ์ถ๋ ฅ ํ์ผ์ ๋์ ๋๋ ํ ๋ฆฌ, ๋ฐ๋์ ์ ๋ ๊ฒฝ๋ก์ฌ์ผ ํจ.
    - **filename**: ๋ฒ๋ค๋ง๋ ํ์ผ์ ์ด๋ฆ
- **resolve**: ๋ชจ๋ ์์ฒญ ํด์ ์ต์
    - **extentions**: ์ฌ์ฉํ ํ์ฅ์
- **devServer**
    - **port**: ํฌํธ ๋ฒํธ
    - **hot**: **Hot Module Replacement**๋ก ์๋ ค์ง **HMR** ๊ธฐ๋ฅ ํ์ฑํ ์ฌ๋ถ
        - **HMR**: ๋ชจ๋ ์ ์ฒด๋ฅผ ๋ค์ ๋ก๋ํ์ง ์๊ณ  ์ดํ๋ฆฌ์ผ์ด์์ด ์คํ๋๋ ๋์ ๊ตํ, ์ถ๊ฐ, ์ ๊ฑฐํ์ฌ ์ํ๋ฅผ ์ ์งํ๋ค. ์ฆ, ๋ณ๊ฒฝ๋ ์ฌํญ๋ง ๊ฐฑ์ ํ๋ค.
- **module**: ๋ชจ๋ ๊ด๋ จ ์ค์ 
    - **rules**: ๋ชจ๋์ ๋ํ ๊ท์น(๋ก๋, ํ์ ์ต์ ๋ฑ)
        - **test**: ์กฐ๊ฑด, ์ ๊ท์ ๋๋ ๋ฌธ์์ด๊ณผ ์ผ์นํ๋ ์กฐ๊ฑด์ ๋ํ ์ค์ 
        - **exclude**: ํด๋น ๋ด์ฉ์ ํฌํจํ์ง ์๋๋ค.(`node_modules` ๋ฑ)
        - **loader**: ์ ์ฉ๋์ด์ผ ํ๋ ๋ก๋, ์ปจํ์คํธ์ ์๋์ ์ผ๋ก ํด์๋๋ค.
        - **use**: ๋ณต์์ ๋ก๋์ ์ต์์ ์ ์ฉํ  ๋ ์ฌ์ฉํ๋ค.
        - **test**๋ ํ์ผ ์ด๋ฆ์ ์ฐพ์ ๋๋ง **RegExp**๋ฅผ ์ฌ์ฉํ๊ณ  ์ ์ฒด ๊ฒฝ๋ก์ ์ผ์นํ๋๋ก **include**์ **exclude**์์๋ ์ ๋ ๊ฒฝ๋ก ๋ฐฐ์ด์ ์ฌ์ฉํ๋ค.
- **plugins**: ์ค์นํ ํ๋ฌ๊ทธ์ธ์ ์ค์ ํ๋ค.

<div align="center">
  <img height="400" src="https://user-images.githubusercontent.com/85148549/158333453-910e4673-64db-4e05-b7d7-3d78a52353c8.png">
</div>

<br />

## 3. React ์ธํ

- ๋ค์์ ํจํค์ง๋ฅผ ์ค์นํ๋ค.

```jsx
yarn add react react-dom
or
npm install react react-dom
```

- ํด๋น ํจํค์ง๋ฅผ ์ค์นํ ํ React์๊ฒ DOM์ ์์น๋ฅผ ์๋ ค์ค์ผ ํ๋ค.(์ฌ๊ธฐ์  public ํด๋์ index.html)
- src ํด๋์ index.js, app.js๋ฅผ ์์ฑํ๊ณ  ์๋์ ๊ฐ์ด ์๋ ฅํ๋ค.

```jsx
import React from "react";
import reactDom from "react-dom";
import App from "./App";

reactDom.render(<App />, document.getElementById("root"));
```

```jsx
import React from "react";

const App = () => {
  return <div>Hello React</div>;
};

export default App;
```

- ์ดํ package.json ํ์ผ์ scripts ๋ถ๋ถ์ ์๋์ ๊ฐ์ด ์์ ํ๋ค.

```json
"scripts": {
  "build": "webpack",
  "start": "webpack serve"
},
```

- ์ด์  Terminal์์ `yarn build(npm run build)` ์ ๋ฃจํธ ํด๋์ dist ํด๋๊ฐ ์์ฑ๋๋ฉฐ ๋ฒ๋ค๋ง๋ bundle.js ํ์ผ์ด ์์ฑ๋๊ณ , `yarn start(npm run start)` ์ dev server๊ฐ ์คํ๋๋ค.

<br />

## 4. Typescript ์ธํ

### 1) Typescript React ์ค์น

- ์๋์ ๊ฐ์ด ํจํค์ง๋ฅผ ์ค์นํ๋ค.

```json
yarn add -D typescript @types/react @types/react-dom
or
npm i -D typescript @types/react @types/react-dom
```

<br />

### 2) tsconfig.json ์ค์ 

- ๋ฃจํธ ํด๋์ tsconfig.json ํ์ผ์ ์์ฑํ๊ณ  ์๋์ ๊ฐ์ด ์ต์์ ์ง์ ํ๋ค.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "include": [ "src" ]
}
```

- **target**: ์ฌ์ฉํ  ECMAScript ๋ฒ์  ์ค์ (๋ฒ์ ์ด ๋ฎ์์๋ก ํ์ผ ์ฉ๋์ด ๋์์ง๋ค.),
- **lib**: ์ปดํ์ผ์ ํฌํจ๋  ๋ผ์ด๋ธ๋ฌ๋ฆฌ ํ์ผ ๋ชฉ๋ก
- **allowJs**: ์๋ฐ์คํฌ๋ฆฝํธ ํ์ผ ์ปดํ์ผ ํ์ฉ ์ฌ๋ถ
- **skipLibCheck**: ๋ชจ๋  ์ ์ธ ํ์ผ(*.d.ts)์ ํ์ ๊ฒ์ฌ๋ฅผ ๊ฑด๋๋ธ์ง ์ฌ๋ถ
- **esModuleInterop**: ๋ฐํ์ ๋ฐ๋ฒจ ์ํ๊ณ ํธํ์ฑ์ ์ํ ํน์  ํฌํผ, ๊ธฐ๋ฅ์ ํ์ฑํํ ์ง ์ฌ๋ถ
- **allowSyntheticDefaultImports**: default export๊ฐ ์๋ ๋ชจ๋์์ default imports๋ฅผ ํ์ฉํ ์ง ์ฌ๋ถ โ ๋ฐฉ์ถ์๋ ์ํฅ์ ์ฃผ์ง ์๋๋ค.
- **strict**: ๋ชจ๋  ์๊ฒฉํ ํ์ ๊ฒ์ฌ ์ต์์ ํ์ฑํํ ์ง ์ฌ๋ถ
- **forceConsistentCasingInFileNames**: ๋์ผ ํ์ผ ์ฐธ์กฐ์ ๋ํด ์ผ๊ด์ฑ ์๋ ๋์๋ฌธ์ ๋นํ์ฑํ ์ฌ๋ถ
- **noFallthroughCasesInSwitch**: ์ค์์น ๋ฌธ์ fall through ์ผ์ด์ค์ ๋ํ ์ค๋ฅ ๋ณด๊ณ 
- **module**: ๋ชจ๋ ์ฝ๋ ์์ฑ ์ง์ (None, CommonJS, AMD, System, UMD, ES6 ๋ฑ)
- **moduleResolution**: ๋ชจ๋ ํด์ ๋ฐฉ๋ฒ ๊ฒฐ์ (AMD, System, ES6 ๋ฑ)
- **resolveJsonModule**: `.json`ํ์ฅ์๋ก import๋ ๋ชจ๋์ ํฌํจํ ์ง ์ฌ๋ถ
- **isolatedModules**: ๋ณ๋์ ์ปดํ์ผ์ด ์์ ํ์ง ํ์ธ
- **jsx**: `.tsx`ํ์ผ์์ JSX ์ง์
- **baseUrl**: ๋น ์๋์  ๋ชจ๋ ์ด๋ฆ์ ํด์ํ๊ธฐ ์ํ ๊ธฐ๋ณธ ๋๋ ํ ๋ฆฌ

<br />

### 3) ts-loader ์ค์น ๋ฐ webpack ์ค์  ๋ณ๊ฒฝ

```json
yarn add -D ts-loader
or
npm i -D ts-loader
```

```jsx
"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  resolve: {
    **extensions: [".ts", ".tsx", ".js", ".jsx"],**
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      **{
        test: /\.(ts|tsx)$/,
        exclude: "/node_modules/",
        use: ["babel-loader", "ts-loader"],
      },**
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

- ์ดํ package.json ํ์ผ์ scripts ๋ถ๋ถ์ ์๋์ ๊ฐ์ด ์์ ํ ํ `yarn build` ์ dist ํด๋์ development ๋ชจ๋์ ๋ฒ๋ค๋ง ํ์ผ์ด ๋ํ๋๊ณ , `yarn start` ์ dev server๊ฐ ์ด๋ฆฐ๋ค.

```json
"scripts": {
  "build": "webpack ./src/index.tsx --output-path dist",
  "start": "webpack serve --config ./webpack.config.js"
},
```

<div align="center">
  <img height="200" src="https://user-images.githubusercontent.com/85148549/158333451-b1eb3b74-f7e6-4803-a9c9-80003e42f363.png">
  <img height="200" src="https://user-images.githubusercontent.com/85148549/158334537-5482ffdf-fecc-4a4e-912b-fdc032e0d98b.png">
</div>

<br />

### 4) ํ์ผ ๊ฒฝ๋ก Alias ์ค์ (22.03.17 ์ถ๊ฐ ์ฌํญ)
- ์ด ๋ถ๋ถ์ ์ ํ์ฌํญ์ด๋ค.
- ๋ชจ๋์ importํ  ๋ ํ์ผ ๊ฒฝ๋ก๋ฅผ ์ ๋ ๊ฒฝ๋ก(alias)๋ก ์ฌ์ฉํ์ฌ import ๊ตฌ๋ฌธ์ ๊น๋ํ๊ฒ ์์ฑํ  ์ ์๊ฒ ๋๋ค.
- `tsconfig.json`

```json
  "compilerOptions": {
    /* ... */
    "baseUrl": ".",
    "paths": {
      "@src/*": [
        "src/*"
      ]
    /* ... */
  }
```

- `webpack.config.js`

```jsx
module.exports = {
  resolve: {
    /* ... */
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
    /* ... */
}
```

- tsconfig.json์์ baseUrl, paths ํญ๋ชฉ์ผ๋ก ./src ํด๋๋ฅผ @src๋ก ์์ฑํ  ์ ์๊ฒ ์ค์ ํ๊ณ , webpack์ผ๋ก ๋ฒ๋ค๋งํ  ๋๋ ํด๋น ๊ฒฝ๋ก๋ฅผ ์ดํดํ  ์ ์์ด์ผ ํ๋ฏ๋ก resolve ํญ๋ชฉ์์ alias ์์ฑ์ "@src"๋ฅผ srcํด๋๋ก ์ง์ ํ๋ค.
