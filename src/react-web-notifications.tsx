import * as React from 'react';

"use strict";

interface Props {
    title: string;
    icon?: string;
    body?: string;
    timeout?: number;
    onClickFn?: () => any;
}

interface iOptions {
    title: string;
    icon?: string;
    body?: string;
    timeout?: number;
}

const WebNotification: React.FC<Props> = ({ title, icon, body, timeout, onClickFn }: Props) => {
    let notification: any = null;

    let options: iOptions = {
        title,
        body,
        timeout
    };

    React.useEffect(() => {
        if (window.Notification) {
            window.Notification.requestPermission((result) => {
                if (result !== 'granted') return;
                show();
            });
        }
    }, [title]);

    const show = () => {
        if (!title) return;

        options.icon = icon;
        options.body = body;
        options.timeout = timeout;

        if (!notification) {
            notification = new window.Notification(title, options);

            if (onClickFn) {
                notification.addEventListener('click', onClickFn, false);
            }

            window.setTimeout(() => {
                notification.close();
            }, timeout || 5000);
        }
    };

    return null;
}

export default WebNotification;