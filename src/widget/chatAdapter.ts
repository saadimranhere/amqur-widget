import type { ChatMessage } from './types/chat';
import { sendChatMessage } from './api/chat.api';

type SendChatArgs = {
    apiBaseUrl: string;
    jwtToken?: string;
    userInput: string;
};

export async function sendChatFromWidget({
    apiBaseUrl,
    jwtToken,
    userInput,
}: SendChatArgs): Promise<ChatMessage> {
    const res = await sendChatMessage({
        apiBaseUrl,
        jwtToken,
        message: userInput,
    });

    return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: res.reply ?? res.message ?? '',
        createdAt: Date.now(),
    };
}
