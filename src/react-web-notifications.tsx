import { useEffect, useRef } from 'react';

export interface WebNotificationProps {
    title: string;
    icon?: string;
    body?: string;
    timeout?: number;
    onClickFn?: (event: Event) => void;
}

const DEFAULT_TIMEOUT = 5000;

const requestPermission = (): Promise<NotificationPermission> => {
    if (Notification.permission !== 'default') {
        return Promise.resolve(Notification.permission);
    }

    // Older Safari only supports the callback form and returns undefined.
    return new Promise((resolve) => {
        const result = Notification.requestPermission(resolve);
        if (result) result.then(resolve, () => resolve('denied'));
    });
};

function WebNotification(props: WebNotificationProps): null {
    const propsRef = useRef(props);
    const { title } = props;

    useEffect(() => {
        propsRef.current = props;
    });

    useEffect(() => {
        if (!title || !('Notification' in window)) return;

        let cancelled = false;

        requestPermission().then((permission) => {
            if (cancelled || permission !== 'granted') return;

            const { icon, body, timeout } = propsRef.current;
            let notification: Notification;
            try {
                notification = new Notification(title, { icon, body });
            } catch {
                // Chrome on Android only allows notifications through a service worker.
                return;
            }

            notification.addEventListener('click', (event) => {
                propsRef.current.onClickFn?.(event);
            });

            window.setTimeout(() => notification.close(), timeout || DEFAULT_TIMEOUT);
        });

        return () => {
            cancelled = true;
        };
    }, [title]);

    return null;
}

export default WebNotification;
