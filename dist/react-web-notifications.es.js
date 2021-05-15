import * as React from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var WebNotification = function (_a) {
    var title = _a.title, icon = _a.icon, body = _a.body, timeout = _a.timeout, onClickFn = _a.onClickFn;
    var _b = React.useState(new window.Notification(title)), notification = _b[0], setNotification = _b[1];
    var _c = React.useState({}), options = _c[0], setOptions = _c[1];
    React.useEffect(function () {
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
        if (icon) {
            setOptions(__assign(__assign({}, options), { icon: icon }));
        }
        if (body) {
            setOptions(__assign(__assign({}, options), { body: body }));
        }
        if (timeout) {
            setOptions(__assign(__assign({}, options), { timeout: timeout }));
        }
        setNotification(new window.Notification(title, options));
        if (onClickFn) {
            notification.addEventListener('click', onClickFn, false);
        }
        window.setTimeout(function () {
            notification.close();
        }, timeout || 5000);
    };
    return null;
};

export default WebNotification;
//# sourceMappingURL=react-web-notifications.es.js.map
