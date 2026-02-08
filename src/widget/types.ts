export type AmqurWidgetConfig = {
    apiBaseUrl: string;
    tenantSlug: string;
    locationSlug: string;
    jwtToken?: string;
};

export type WidgetBootstrapResult = {
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
