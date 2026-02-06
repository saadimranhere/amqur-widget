console.log('AMQUR CONNECT LOADED');
import { mountWidget } from './widget/mount';
import type { AmqurWidgetConfig } from './widget/types';

declare global {
    interface Window {
        AMQUR?: {
            connect: (config: AmqurWidgetConfig) => void;
        };
    }
}

let initialized = false;

window.AMQUR = {
    connect(config: AmqurWidgetConfig) {
        if (initialized) {
            console.warn('[AMQUR Connect] already initialized');
            return;
        }

        if (!config?.apiBaseUrl || !config?.tenantSlug) {
            throw new Error(
                'AMQUR.connect requires { apiBaseUrl, tenantSlug }'
            );
        }

        initialized = true;
        mountWidget(config);
    },
};

// DEV ONLY AUTO INIT
if (import.meta.env.DEV) {
    window.AMQUR.connect({
        apiBaseUrl: 'https://amqur-backend-production.up.railway.app/api',
        tenantSlug: 'jeep-of-chicago',
        locationSlug: 'north-chicago',
    });
}

