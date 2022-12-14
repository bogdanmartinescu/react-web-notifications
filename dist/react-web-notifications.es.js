import * as React from 'react';

var WebNotification = function (_a) {
    var title = _a.title, icon = _a.icon, body = _a.body, timeout = _a.timeout, onClickFn = _a.onClickFn;
    var notification = null;
    var options = {
        title: title,
        body: body,
        timeout: timeout
    };
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

export { WebNotification as default };
//# sourceMappingURL=react-web-notifications.es.js.map
