## react-web-notifications

Simple web notifications component for React

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

MIT © [Bogdan M](http://mlb.ro)
