import { StrictMode } from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import WebNotification from '../react-web-notifications';

class MockNotification extends EventTarget {
    static permission: NotificationPermission = 'default';
    static requestPermission = vi.fn<typeof Notification.requestPermission>(async () => 'granted');
    static instances: MockNotification[] = [];

    close = vi.fn<() => void>();

    constructor(public title: string, public options?: NotificationOptions) {
        super();
        MockNotification.instances.push(this);
    }
}

beforeEach(() => {
    MockNotification.permission = 'default';
    MockNotification.requestPermission.mockClear();
    MockNotification.requestPermission.mockResolvedValue('granted');
    MockNotification.instances = [];
    vi.stubGlobal('Notification', MockNotification);
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

describe('WebNotification', () => {
    test('shows a notification once permission is granted', async () => {
        render(<WebNotification title="Hello" body="World" icon="/icon.png" />);

        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));
        expect(MockNotification.instances[0].title).toBe('Hello');
        expect(MockNotification.instances[0].options).toEqual({ body: 'World', icon: '/icon.png' });
    });

    test('does not show a notification when permission is denied', async () => {
        MockNotification.requestPermission.mockResolvedValue('denied');
        render(<WebNotification title="Hello" />);

        await waitFor(() => expect(MockNotification.requestPermission).toHaveBeenCalled());
        await Promise.resolve();
        expect(MockNotification.instances).toHaveLength(0);
    });

    test('skips the permission prompt when already granted', async () => {
        MockNotification.permission = 'granted';
        render(<WebNotification title="Hello" />);

        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));
        expect(MockNotification.requestPermission).not.toHaveBeenCalled();
    });

    test('supports the legacy callback-based requestPermission', async () => {
        MockNotification.requestPermission.mockImplementation((callback) => {
            callback?.('granted');
            return undefined as unknown as Promise<NotificationPermission>;
        });
        render(<WebNotification title="Hello" />);

        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));
    });

    test('shows only one notification under StrictMode', async () => {
        render(
            <StrictMode>
                <WebNotification title="Hello" />
            </StrictMode>
        );

        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));
        await Promise.resolve();
        expect(MockNotification.instances).toHaveLength(1);
    });

    test('shows a new notification when the title changes', async () => {
        const { rerender } = render(<WebNotification title="First" />);
        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));

        rerender(<WebNotification title="First" body="changed" />);
        rerender(<WebNotification title="Second" />);

        await waitFor(() => expect(MockNotification.instances).toHaveLength(2));
        expect(MockNotification.instances[1].title).toBe('Second');
    });

    test('calls the latest onClickFn when clicked', async () => {
        const first = vi.fn<(event: Event) => void>();
        const latest = vi.fn<(event: Event) => void>();
        const { rerender } = render(<WebNotification title="Hello" onClickFn={first} />);
        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));

        rerender(<WebNotification title="Hello" onClickFn={latest} />);
        MockNotification.instances[0].dispatchEvent(new Event('click'));

        expect(first).not.toHaveBeenCalled();
        expect(latest).toHaveBeenCalledTimes(1);
    });

    test('closes the notification after the timeout', async () => {
        vi.useFakeTimers();
        render(<WebNotification title="Hello" timeout={1000} />);
        await vi.advanceTimersByTimeAsync(0);
        expect(MockNotification.instances).toHaveLength(1);

        const [notification] = MockNotification.instances;
        vi.advanceTimersByTime(999);
        expect(notification.close).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(notification.close).toHaveBeenCalledTimes(1);
    });

    test('ignores browsers where the Notification constructor throws', async () => {
        vi.stubGlobal(
            'Notification',
            class extends MockNotification {
                constructor(title: string) {
                    super(title);
                    throw new TypeError('Illegal constructor');
                }
            }
        );

        render(<WebNotification title="Hello" />);

        await waitFor(() => expect(MockNotification.instances).toHaveLength(1));
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    test('does nothing when the Notification API is unavailable', () => {
        vi.stubGlobal('Notification', undefined);
        delete (window as { Notification?: unknown }).Notification;

        expect(() => render(<WebNotification title="Hello" />)).not.toThrow();
    });
});
