import type {
    AmqurWidgetConfig,
    WidgetBootstrapResult,
} from "./widget/types";

let widgetConfig: AmqurWidgetConfig | null = null;
let widgetBootstrap: WidgetBootstrapResult | null = null;

export async function initConnection(config: AmqurWidgetConfig) {
    widgetConfig = config;

    // 1) Get widget config (public data)
    const configRes = await fetch(
        `${config.apiBaseUrl}/public/widget-config?tenantSlug=${config.tenantSlug}&locationSlug=${config.locationSlug}`
    );

    if (!configRes.ok) {
        throw new Error("Failed to load widget-config");
    }

    const bootstrap: WidgetBootstrapResult = await configRes.json();

    // 2) Get widget JWT (the passport)
    const tokenRes = await fetch(
        `${config.apiBaseUrl}/public/widget-token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tenantSlug: config.tenantSlug,
                locationSlug: config.locationSlug,
            }),
        }
    );

    if (!tokenRes.ok) {
        throw new Error("Failed to mint widget token");
    }

    const tokenData = await tokenRes.json();

    // 3) Store JWT inside config
    widgetConfig.jwtToken = tokenData.data.token;

    widgetBootstrap = bootstrap;
}

export function getWidgetConfig() {
    if (!widgetConfig) throw new Error("Widget not initialized");
    return widgetConfig;
}

export function getWidgetBootstrap() {
    if (!widgetBootstrap) throw new Error("Widget not initialized");
    return widgetBootstrap;
}
