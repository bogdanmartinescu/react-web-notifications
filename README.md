## React Web Notifications

Simple web notifications component for React

[![NPM](https://nodei.co/npm/react-web-notifications.png)](https://nodei.co/npm/react-web-notifications/)

## Install

```
$ npm install react-web-notifications
```

## Usage

```jsx
import WebNotification from 'react-web-notifications';

<WebNotification
  title="Hello, World!" // the title prop is required
  icon="path/to/image.jpg"
  body="This is a web notification"
  timeout={9000}
  onClickFn={() => window.open('https://example.com/', '_blank')} // open your own site on notification click
/>
```

## API

| Prop      | Type                     | Required | Default |
|-----------|--------------------------|----------|---------|
| title     | string                   | true     |         |
| icon      | string                   | false    |         |
| body      | string                   | false    |         |
| timeout   | number (ms)              | false    | 5000    |
| onClickFn | (event: Event) => void   | false    |         |

A notification is shown when the component mounts and again whenever `title` changes. Permission is requested only if the user hasn't granted or denied it yet. Most browsers only show the permission prompt in response to a user gesture, so render the component after an interaction such as a click.

The component renders nothing and does nothing in browsers without the Notification API. Chrome on Android only supports notifications sent through a service worker, so no notification is shown there.

## Compatibility

- React 17, 18 and 19.
- Ships TypeScript types; the props type is exported as `WebNotificationProps`.
- Marked with `'use client'`, so it can be imported directly from Next.js App Router server components.

## Upgrading from 1.x

2.0.0 is a drop-in replacement: the props, the default export and the `dist/react-web-notifications.js` / `dist/react-web-notifications.es.js` paths are unchanged. Differences:

- Permission is requested only when the user hasn't decided yet, instead of on every mount.
- `onClickFn` always calls the latest prop instead of the one from the first render.
- Browsers whose `Notification` constructor throws (Chrome on Android) no longer produce an unhandled promise rejection.
- React 19 is supported, and `react-dom` is no longer a peer dependency.
- In native Node.js ESM (without a bundler), `import WebNotification from 'react-web-notifications'` now returns the component itself. 1.x returned a `{ default }` wrapper object there, so a `WebNotification.default` workaround is no longer needed.

## Development

```
$ npm install
$ npm run lint
$ npm run typecheck
$ npm test
$ npm run build
```

## License

MIT
