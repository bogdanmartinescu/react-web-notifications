'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var WebNotification = function (_a) {
    var title = _a.title, icon = _a.icon, body = _a.body, timeout = _a.timeout, onClickFn = _a.onClickFn;
    var notification = null;
    var options = {
        title: title,
        body: body,
        timeout: timeout
    };
    React__namespace.useEffect(function () {
        if (window.Notification) {
            window.Notification.requestPermission(function (result) {
                if (result !== 'granted')
                    return;
                show();
            });
        }
    }, [title]);
    var show = function () {
        if (!title)
            return;
        options.icon = icon;
        options.body = body;
        options.timeout = timeout;
        if (!notification) {
            notification = new window.Notification(title, options);
            if (onClickFn) {
                notification.addEventListener('click', onClickFn, false);
            }
            window.setTimeout(function () {
                notification.close();
            }, timeout || 5000);
        }
    };
    return null;
};

exports["default"] = WebNotification;
//# sourceMappingURL=react-web-notifications.js.map
