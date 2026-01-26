export async function sendChatMessage(input: {
    apiBaseUrl: string;
    jwtToken?: string;
    message: string;
    action?: string;
    vin?: string;
    conversationId?: string;
}) {
    const res = await fetch(`${input.apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(input.jwtToken
                ? { Authorization: `Bearer ${input.jwtToken}` }
                : {}),
        },
        body: JSON.stringify({
            message: input.message,
            action: input.action,
            vin: input.vin,
            conversationId: input.conversationId,
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Chat request failed');
    }

    return res.json();
}
