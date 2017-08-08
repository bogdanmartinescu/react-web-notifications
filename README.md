## react-web-notifications

<br />

## Install

```
$ npm install react-web-notifications --save
```

## Usage

```js
import WebNotification from 'react-web-notifications'

..

render () {
  return (
    <WebNotification
        message="Hello World"
        icon="./path/to/image.jpg"
        timeout="5000"
        onClick={() => console.log('clicked') }

    />
  )
}
```

MIT © [Bogdan M](http://mlb.ro)
