import type {
    AmqurWidgetConfig,
    WidgetBootstrapResult,
} from './types';

export async function bootstrapWidget(
    config: AmqurWidgetConfig
): Promise<WidgetBootstrapResult> {
    // -----------------------------
    // 1. resolve tenant + location
    // -----------------------------
    const configUrl =
        `${config.apiBaseUrl}/public/widget-config` +
        `?tenantSlug=${config.tenantSlug}` +
        `&locationSlug=${config.locationSlug}`;

    const configRes = await fetch(configUrl);
    const configData = await configRes.json();

    if (!configData.ok) {
        throw new Error(configData.error ?? 'WIDGET_CONFIG_FAILED');
    }

    // -----------------------------
    // 2. mint widget JWT
    // -----------------------------
    const tokenRes = await fetch(
        `${config.apiBaseUrl}/public/widget-token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tenantSlug: config.tenantSlug,
                locationSlug: config.locationSlug,
            }),
        }
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.ok || !tokenData.token) {
        throw new Error('WIDGET_TOKEN_FAILED');
    }

    // attach token to config (in-memory only)
    config.jwtToken = tokenData.token;

    return {
        tenantId: configData.tenant.id,
        locationId: configData.location.id,
        tenantName: configData.tenant.name,
        locationName: configData.location.name,
    };
}
