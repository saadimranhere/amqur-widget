export type AmqurWidgetConfig = {
    apiBaseUrl: string;
    tenantSlug: string;
    locationSlug: string;

    // temporary for dev; later replaced with widget token mint endpoint
    jwtToken?: string;
};

/*
   1) RAW response from backend
   This matches EXACTLY what /public/widget-config returns.
*/
export type WidgetConfigApiResponse = {
    success: boolean;
    statusCode: number;
    timestamp: string;

    data: {
        ok: boolean;

        tenant: {
            id: string;
            name: string;
            slug: string;
        };

        location: {
            id: string;
            name: string;
            slug: string;
        };

        branding: {
            primaryColor: string;
            accentColor: string;
            logoUrl: string | null;
        };

        features: {
            chat: boolean;
            inventory: boolean;
            payments: boolean;
        };
    };
};

/*
   2) NORMALIZED widget bootstrap state
   This is what the widget actually uses internally.
*/
export type WidgetBootstrapResult = {
    tenantId: string;
    locationId: string;
    tenantName: string;
    locationName: string;
};
