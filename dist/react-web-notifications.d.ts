import * as React from 'react';
interface Props {
    title: string;
    icon?: string;
    body?: string;
    timeout?: number;
    onClickFn?: () => any;
}
declare const WebNotification: React.FC<Props>;
export default WebNotification;
