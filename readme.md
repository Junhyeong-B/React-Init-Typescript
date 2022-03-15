# CRA 없이 React + Typescript 세팅

# 🖥️ 실행 방법
```
yarn
yarn start
```

<br />

# 🚩 설정 과정

## 1. Babel 세팅

### 1) git init / yarn init(or npm init)

```
yarn init
	 or
npm init
```

- yarn init 또는 npm init: 프로젝트 initialize
- 위 명령어를 치면 `package.json` 파일이 생성되고 내용이 작성되어 있다.

<div align="center">
  <img height="200" src="https://user-images.githubusercontent.com/85148549/158333446-6cc2e1ab-a10e-448c-ad96-58f640307677.png">
</div>

<br />

### 2) 루트 경로에 public, src 폴더를 생성한다.

- public: 정적인 파일들을 관리한다.
- 생성된 public 폴더에 index.html 파일을 생성한 후 아래와 같이 작성한다.
    - 사용하고 싶은대로 작성하자.

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

### 3) Babel Package를 설치한다.

```
yarn add --dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
or
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
```

- **@babel/core**: 바벨의 핵심 기능, 프로젝트 내 코드들을 컴파일해준다.
- **@babel/cli**: Command Line(Terminal)에서 babel로 컴파일할 수 있게 해준다.
- **@babel/preset-env**: ES2015 이상(ES6 이상)의 문법을 컴파일 해준다.
- **@babel/preset-react**:  React 문법을 컴파일 해준다.
- **@babel/preset-typescript**: Typescript 문법을 컴파일 해준다.
    - Typescript를 사용하지 않으면 설치하지 않아도 된다.

- 설치가 완료되면 루트 디렉토리에 `babel.config.json` 파일을 생성하여 설치한 preset들을 작성해준다.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
}
```

- `babel.config.json`에서 preset, option 작성 방법

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

- 설치가 완료되면 루트 폴더에 node_modules 폴더가 만들어지는데, git에 commit되는 것을 방지하기 위해 `.gitignore` 파일을 생성하여 **node_modules**, **dist** 폴더를 작성한다.
- 현재까지 진행 상황

<div align="center">
  <img height="300" src="https://user-images.githubusercontent.com/85148549/158333455-321e7916-19de-462f-a9b3-31f3d777774a.png">
</div>

<br />

## 2. Webpack 세팅

### 1) Webpack

- webpack 관련 패키지를 아래 명령어를 통해 설치한다.

```json
yarn add --dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
or
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```

- **webpack-dev-server**: Node.js 런타임에서 직접 사용할 수 있는 Node.js API를 제공한다.
- **style-loader**: CSS를 DOM에 삽입한다.
- **css-loader**: CSS 내부의 `@import`나 `url()` 등의 요소를 해석해준다.
- **babel-loader**: Babel로 트랜스파일링된 Javascript를 번들링할 수 있게 해준다.

- 위와 같이 설치한 후 src 폴더에 index.js(.ts 파일은 추가 세팅 필요) 파일을 만들고  내부에 아무런 코드나 작성한 후 Terminal에 **npx webpack** 키워드를 입력하면 dist 폴더가 생성되면서 main.js 파일이 나타나게 된다.
    - 여기서 npx 키워드를 사용하지 않고 지정 명령어를 사용하고 싶다면 package.json 파일에서 scripts 내용을 추가하여 npm 명령어를 대신 사용할 수 있다.
        
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

- 웹팩 번들링 후 적용할 플러그인을 설치한다.

```
yarn add --dev html-webpack-plugin clean-webpack-plugin
or
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

- html-webpack-plugin : webpack 번들을 제공하는 HTML 파일 생성을 단순화한다.
- clean-webpack-plugin : 번들링을 할 때마다 이전 번들링 결과를 제거한다.

- 22-03-15 기준 webpack은 ^5.70.0 버전으로 설치되었고, 버전 4 이후부터는 어떠한 설정을 하지 않아도 webpack이 동작한다.
    - 만약 특정한 옵션을 추가하거나 제거하고 싶다면 `webpack.config.js` 파일을 생성하여 설정하면 된다.
    - 아래와 같이 루트 폴더에 `webpack.config.js` 파일을 생성하여 내용을 추가하자.

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

- **entry**: `./src`를 기본으로 하며 어플리케이션이 entry에서부터 실행되고 webpack이 번들링한다.
- **output**: webpack이 결과를 내보내는 방법과 관련된 옵션
    - **path**: 모든 출력 파일의 대상 디렉토리, 반드시 절대 경로여야 함.
    - **filename**: 번들링된 파일의 이름
- **resolve**: 모듈 요청 해석 옵션
    - **extentions**: 사용한 확장자
- **devServer**
    - **port**: 포트 번호
    - **hot**: **Hot Module Replacement**로 알려진 **HMR** 기능 활성화 여부
        - **HMR**: 모듈 전체를 다시 로드하지 않고 어플리케이션이 실행되는 동안 교환, 추가, 제거하여 상태를 유지한다. 즉, 변경된 사항만 갱신한다.
- **module**: 모듈 관련 설정
    - **rules**: 모듈에 대한 규칙(로더, 파서 옵션 등)
        - **test**: 조건, 정규식 또는 문자열과 일치하는 조건에 대한 설정
        - **exclude**: 해당 내용을 포함하지 않는다.(`node_modules` 등)
        - **loader**: 적용되어야 하는 로더, 컨텍스트에 상대적으로 해석된다.
        - **use**: 복수의 로더와 옵션을 적용할 때 사용한다.
        - **test**는 파일 이름을 찾을 때만 **RegExp**를 사용하고 전체 경로와 일치하도록 **include**와 **exclude**에서는 절대 경로 배열을 사용한다.
- **plugins**: 설치한 플러그인을 설정한다.

<div align="center">
  <img height="400" src="https://user-images.githubusercontent.com/85148549/158333453-910e4673-64db-4e05-b7d7-3d78a52353c8.png">
</div>

<br />

## 3. React 세팅

- 다음의 패키지를 설치한다.

```jsx
yarn add react react-dom
or
npm install react react-dom
```

- 해당 패키지를 설치한 후 React에게 DOM의 위치를 알려줘야 한다.(여기선 public 폴더의 index.html)
- src 폴더에 index.js, app.js를 생성하고 아래와 같이 입력한다.

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

- 이후 package.json 파일의 scripts 부분을 아래와 같이 수정한다.

```json
"scripts": {
  "build": "webpack",
  "start": "webpack serve"
},
```

- 이제 Terminal에서 `yarn build(npm run build)` 시 루트 폴더에 dist 폴더가 생성되며 번들링된 bundle.js 파일이 생성되고, `yarn start(npm run start)` 시 dev server가 실행된다.

<br />

## 4. Typescript 세팅

### 1) Typescript React 설치

- 아래와 같이 패키지를 설치한다.

```json
yarn add -D typescript @types/react @types/react-dom
or
npm i -D typescript @types/react @types/react-dom
```

<br />

### 2) tsconfig.json 설정

- 루트 폴더에 tsconfig.json 파일을 생성하고 아래와 같이 옵션을 지정한다.

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

- **target**: 사용할 ECMAScript 버전 설정(버전이 낮을수록 파일 용량이 높아진다.),
- **lib**: 컴파일에 포함될 라이브러리 파일 목록
- **allowJs**: 자바스크립트 파일 컴파일 허용 여부
- **skipLibCheck**: 모든 선언 파일(*.d.ts)의 타입 검사를 건너뛸지 여부
- **esModuleInterop**: 런타임 바벨 생테계 호환성을 위한 특정 헬퍼, 기능을 활성화할지 여부
- **allowSyntheticDefaultImports**: default export가 없는 모듈에서 default imports를 허용할지 여부 ⇒ 방출에는 영향을 주지 않는다.
- **strict**: 모든 엄격한 타입 검사 옵션을 활성화할지 여부
- **forceConsistentCasingInFileNames**: 동일 파일 참조에 대해 일관성 없는 대소문자 비활성화 여부
- **noFallthroughCasesInSwitch**: 스위치 문의 fall through 케이스에 대한 오류 보고
- **module**: 모듈 코드 생성 지정(None, CommonJS, AMD, System, UMD, ES6 등)
- **moduleResolution**: 모듈 해석 방법 결정(AMD, System, ES6 등)
- **resolveJsonModule**: `.json`확장자로 import된 모듈을 포함할지 여부
- **isolatedModules**: 별도의 컴파일이 안전한지 확인
- **jsx**: `.tsx`파일에서 JSX 지원
- **baseUrl**: 비 상대적 모듈 이름을 해석하기 위한 기본 디렉토리

<br />

### 3) ts-loader 설치 및 webpack 설정 변경

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

- 이후 package.json 파일의 scripts 부분을 아래와 같이 수정한 후 `yarn build` 시 dist 폴더에 development 모드의 번들링 파일이 나타나고, `yarn start` 시 dev server가 열린다.

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