# Trello Clone

Project management tool,organize tasks,collaborate with your team and track the progress of your projects using boards, lists, and cards. :grinning:

## Tech Stack :small_airplane:

- [ReactJs](https://react.dev/) : library for web and native user interfaces
- [DndKit](https://dndkit.com) : A lightweight, performant, accessible and
  extensible drag & drop toolkit for React.

## Project structure

```
$PROJECT_ROOT
│   # React component files
├── components
│   # config file
└── config
│   # Static files for image , logo , video backgroud
└── public
│   # contain all layout of app
└── layout
│   # pages file
└── pages
│   # route file
└── route
│   # get data from server
└── api
│   # provide some function feature.etc use entire app
└── utils
```

## How to styles components effectively with CSS module

- If you don't use CSS module , you can follow convention [BEM](https://www.geeksforgeeks.org/understanding-the-css-bem-convention/) to set name for tag
- In this project , we don't use it , We use [Classnames and CSS Modules](https://dev.to/alais29dev/leveraging-the-power-of-css-modules-and-the-classnames-package-in-react-4ci5#classnames-and-css-modules-integration)

```js
import className from 'classNames/bind'
import styles from 'filename.module.css'
const cx = classNames.bind(styles)
```

```jsx
export default function Example(){
  return <div className={cx("hello"}>example</div>
}
```

```css
.hello {
//style
}
```

easy :grin:

## How to run project

Clone project

```
git clone https://github.com/HoaLe69/trello-clone-ui.git
```

Change directory

```
cd trello-clone-ui
```

install dependencies and run project

```
npm i && npm start
```
