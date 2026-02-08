import React from "react";
import ReactDOM from "react-dom/client";
import { WidgetRoot } from "./widget/WidgetRoot";
import { WidgetProvider } from "./widget/WidgetContext";
import { initConnection } from "./connect";

declare global {
    interface Window {
        AMQUR?: any;
    }
}

const API_BASE =
    "https://amqur-backend-production.up.railway.app/api";

/* fetch branding + feature flags */
async function fetchWidgetBootstrap(config: {
    tenantSlug: string;
    locationSlug: string;
}) {
    const res = await fetch(
        `${API_BASE}/public/widget-config?tenantSlug=${config.tenantSlug}&locationSlug=${config.locationSlug}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch widget config");
    }

    return res.json();
}

async function mountWidget(config: {
    tenantSlug: string;
    locationSlug: string;
    apiBaseUrl?: string;
}) {
    // create container
    const container = document.createElement("div");
    container.id = "amqur-widget-root";

    // Shadow DOM protects from dealership CSS
    const shadow = container.attachShadow({ mode: "open" });

    const mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);
    document.body.appendChild(container);

    // 1) get chat JWT
    await initConnection({
        apiBaseUrl:
            config.apiBaseUrl ??
            "https://amqur-backend-production.up.railway.app/api",
        tenantSlug: config.tenantSlug,
        locationSlug: config.locationSlug,
    });

    // 2) get widget config (branding, flags, etc)
    const bootstrap = await fetchWidgetBootstrap(config);

    // 3) mount React widget
    ReactDOM.createRoot(mountPoint).render(
        <React.StrictMode>
            <WidgetProvider
                config={{
                    ...config,
                    apiBaseUrl: API_BASE,
                }}
                bootstrap={bootstrap}
            >
                <WidgetRoot />
            </WidgetProvider>
        </React.StrictMode>
    );
}

window.AMQUR = {
    init: mountWidget,
};
