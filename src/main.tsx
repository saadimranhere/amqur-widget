import './index.css';
import { mountWidget } from './widget/mount';
import type { AmqurWidgetConfig } from './widget/types';

declare global {
    interface Window {
        AmqurWidget?: {
            init: (config: AmqurWidgetConfig) => void;
        };
    }
}

window.AmqurWidget = {
    init(config: AmqurWidgetConfig) {
        mountWidget(config);
    },
};

// ✅ AUTO-INIT FOR LOCAL DEVELOPMENT ONLY
window.AmqurWidget.init({
    apiBaseUrl: 'http://localhost:3000',

    // must exist in your database
    tenantSlug: 'jeep-of-chicago',
    locationSlug: 'north-chicago',
});
