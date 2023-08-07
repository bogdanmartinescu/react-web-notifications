## React Web Notifications

Simple web notifications component for React

[![NPM](https://nodei.co/npm/react-web-notifications.png)](https://nodei.co/npm/react-web-notifications/)

## Install

```
$ npm install react-web-notifications --save
```

## Usage

```js
import WebNotification from 'react-web-notifications'
```

```js
  <WebNotification
        title="Hello, World!" // the title prop is required
        icon="path/to/image.jpg"
        body="This is a web notification"
        timeout={9000}
        onClickFn={ () => window.open('http://www.google.com/', '_blank') } // open your own site on notification click
  />

```

## API

| Prop  | Type   | Required |
|-------|--------|----------|
| title | string | true     |
| icon  | string | false    |
| body  | string | false    |
| timeout  | number | false    |
| onClickFn  | function | false    |



MIT © [Bogdan M](http://mlb.ro)
