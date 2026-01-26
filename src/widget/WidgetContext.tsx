import React, { createContext, useContext, useMemo, useState } from 'react';
import type { AmqurWidgetConfig, WidgetBootstrapResult } from './types';

const STORAGE_KEY = 'amqur_conversation_id';

function getConversationId(): string {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
}

type WidgetContextValue = {
    config: AmqurWidgetConfig;
    bootstrap: WidgetBootstrapResult;

    conversationId: string;
};

const WidgetContext = createContext<WidgetContextValue | null>(null);

export function WidgetProvider({
    config,
    bootstrap,
    children,
}: {
    config: AmqurWidgetConfig;
    bootstrap: WidgetBootstrapResult;
    children: React.ReactNode;
}) {
    // 🔐 conversation identity is created ONCE and persisted
    const [conversationId] = useState<string>(() => getConversationId());

    const value = useMemo(
        () => ({
            config,
            bootstrap,
            conversationId,
        }),
        [config, bootstrap, conversationId],
    );

    return (
        <WidgetContext.Provider value={value}>
            {children}
        </WidgetContext.Provider>
    );
}

export function useWidget() {
    const ctx = useContext(WidgetContext);
    if (!ctx) {
        throw new Error('useWidget must be used inside <WidgetProvider>');
    }
    return ctx;
}
