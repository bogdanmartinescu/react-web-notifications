import * as React from 'react';

interface Props {
    title: string;
    icon?: string;
    body?: string;
    timeout?: number;
    onClickFn?: () => any;
}

const WebNotification: React.FC<Props> = ({ title, icon, body, timeout, onClickFn }) => {
    const [notification, setNotification] = React.useState(new window.Notification(title));
    const [options, setOptions] = React.useState({});

    React.useEffect(() => {
        if (window.Notification) {
            window.Notification.requestPermission((result) => {
                if (result !== 'granted') return;
                show();
            });
        }
    }, [title]);

    const show = () => {
        if(!title) return;

        if(icon) {
            setOptions({ ...options, icon });
        }

        if(body) {
            setOptions({ ...options, body });
        }

        if(timeout) {
            setOptions({ ...options, timeout });
        }

        setNotification(new window.Notification(title, options));

        if (onClickFn) {
            notification.addEventListener('click', onClickFn, false);
        }

        window.setTimeout(() => {
            notification.close();
        }, timeout || 5000);
    };

    return null;
}

export default WebNotification;