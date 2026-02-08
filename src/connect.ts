import type {
    AmqurWidgetConfig,
    WidgetBootstrapResult,
} from "./widget/types";

let widgetConfig: AmqurWidgetConfig | null = null;
let widgetBootstrap: WidgetBootstrapResult | null = null;
let conversationId: string | null = null;

export async function initConnection(config: AmqurWidgetConfig) {
    console.log("[AMQUR] Starting widget bootstrap…");

    widgetConfig = config;

    // --------------------------------------------------
    // 1) Fetch PUBLIC widget config
    // --------------------------------------------------
    const configRes = await fetch(
        `${config.apiBaseUrl}/public/widget-config?tenantSlug=${config.tenantSlug}&locationSlug=${config.locationSlug}`
    );

    if (!configRes.ok) {
        throw new Error("Failed to load /public/widget-config");
    }

    const bootstrapJson: WidgetBootstrapResult = await configRes.json();

    console.log("[AMQUR] widget-config loaded:", bootstrapJson);

    // IMPORTANT: backend wraps everything in { success, data }
    widgetBootstrap = bootstrapJson;

    // --------------------------------------------------
    // 2) Mint widget JWT (passport for /chat)
    // --------------------------------------------------
    const tokenRes = await fetch(`${config.apiBaseUrl}/public/widget-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tenantSlug: config.tenantSlug,
            locationSlug: config.locationSlug,
        }),
    });

    if (!tokenRes.ok) {
        throw new Error("Failed to mint widget JWT");
    }

    const tokenJson = await tokenRes.json();

    console.log("[AMQUR] widget-token response:", tokenJson);

    const widgetJwt = tokenJson?.data?.token;

    if (!widgetJwt) {
        throw new Error("Widget token missing from response");
    }

    // 🔥 CRITICAL LINE — inject token into runtime config
    widgetConfig.jwtToken = widgetJwt;

    console.log("[AMQUR] JWT attached to widget config");

    // --------------------------------------------------
    // 3) Create conversation id immediately
    // --------------------------------------------------
    conversationId = crypto.randomUUID();

    console.log("[AMQUR] conversationId created:", conversationId);
}

// --------------------------------------------------
// getters used by React widget
// --------------------------------------------------

export function getWidgetConfig(): AmqurWidgetConfig {
    if (!widgetConfig) throw new Error("Widget not initialized");
    return widgetConfig;
}

export function getWidgetBootstrap(): WidgetBootstrapResult {
    if (!widgetBootstrap) throw new Error("Widget not initialized");
    return widgetBootstrap;
}

export function getConversationId(): string {
    if (!conversationId) throw new Error("Conversation not initialized");
    return conversationId;
}
