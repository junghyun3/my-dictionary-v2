# My Dictionary

## Motivation

I frequently use [올ㅋ사전](http://allkdic.xoul.kr/), but it does not provide another dictionary that I also frequently use, and I cannot add new dictionary, so I made it.

## Features
- It's like a small web-browser and you can open it conveniently by clicking the app icon in the tray
- You can use a shortcut to open the app. `Control+Shift+D` to show/hide the app.
- You can change the dictionary to another or edit the list of dictionaries
- In Edit page, you can add new dictionaries, delete dictionaries, and change the ordering.

## Acknowledge

This app could be made by using [Electron](https://electronjs.org/), [React.js](https://reactjs.org/), [photon](http://photonkit.com) and other packages.

Much code is from [tray-example](https://github.com/kevinsawicki/tray-example), [electron-bookmark](https://github.com/2woongjae/electron-bookmark) and dependency projects.

Dictionary icon is from [electron-bookmark](https://github.com/2woongjae/electron-bookmark).

# Todo
- 앞, 뒤 버튼 단축키 추가
- 창 내에서 단축키 눌러도 동작하도록 수정
- Make test cases


# Updates
## 210223
- 창 고정 기능 추가

## 210203
- 창 띄우기 단축기 Ctrl + shift + D로 수정

## 201219
- windows 지원
    - "window.require not a function" error 발생하여 preload.js 추가하고 index.js, Dic.js 수정
        - 참고: https://stackoverflow.com/questions/56265958/electronjs-window-require-not-a-function
    - packaging error가 발생해서 icon.icns 삭제. Default icon으로 생성됨
    - TODO
        - icon 생성
## 200930
- tray icon issue 
    - icon이 assets 폴더에 있었음. 패키징 하니 에러가 발생함
    - 경로를 index.js와 같은 위치에 둠으로써 해결
    - 참고: https://github.com/electron/electron/issues/7657#issuecomment-368236509
- hashrouter
    - electron은 BrowserRouter를 지원하지 않아 hashrouter를 사용
    - hashrouter로 다른 url로 routing할 때 error 발생
    - withRoute로 해결
    - 참고사이트
        - https://stackoverflow.com/questions/44211268/programmatically-navigate-w-hashrouter
        - https://2ssue.github.io/programming/electron-react-router/
- electron "window.require is not a function" error
    - react 코드(Dic.js)에서 electron webview tag 쓸 때 에러 발생 (Uncaught TypeError: fs.readFileSync is not a function)
    - BrowserWindow에서 nodeIntegration 설정 필요
    - 참고: https://github.com/electron/electron/issues/7300#issuecomment-493077796
- webview
    - webview에 페이지가 안뜨는 문제
    - 원인: electron 5이상부터는 webview가 기본적으로 disable되어 있음
    - 해결: You need to enable the tag by setting the webviewTag webPreferences option when constructing your BrowserWindow
    - 참고: https://www.electronjs.org/docs/api/webview-tag

- react ref
    - react 버전 업하면서 ref 사용방식이 변경됨
    - "React 16.3 에서 추가된 React.createRef() API를 사용하도록 수정되었습니다."
    - https://ko.reactjs.org/docs/refs-and-the-dom.html

- react and electron
    - `yarn create react-app .`으로 react app 생성
    - 아래 사이트 참고하여 electron 환경 세팅
    - 참고: https://typed.sh/react-jswa-electron-jsro-neitibeu-aeb-gaebalhagi/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# 

# `yarn create react-app` 내용

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
