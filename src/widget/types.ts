export type AmqurWidgetConfig = {
    apiBaseUrl: string;
    tenantSlug: string;
    locationSlug: string;

    // temporary for dev; later replaced with widget token mint endpoint
    jwtToken?: string;
};

export type WidgetBootstrapResult = {
    tenantId: string;
    locationId: string;
    tenantName: string;
    locationName: string;
};
