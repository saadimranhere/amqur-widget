import { useEffect, useRef, useState } from 'react';
import { sendChatMessage } from './api/chat.api';
import { useWidget } from './WidgetContext';
import { getWidgetConfig } from '../connect';

type Message = {
    role: 'user' | 'assistant';
    text?: string;
    vehicles?: any[];
};

export function ChatView() {
    const { config, bootstrap, conversationId } = useWidget();


    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            text: `Welcome to ${bootstrap.tenantName}. How can I help you today?`,
        },
    ]);

    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, sending]);

    async function sendMessage() {
        if (!input.trim() || sending) return;

        const userText = input.trim();

        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setSending(true);

        try {
            const liveConfig = getWidgetConfig();

            const data = await sendChatMessage({
                apiBaseUrl: liveConfig.apiBaseUrl,
                jwtToken: liveConfig.jwtToken,
                message: userText,
                conversationId,
            });


            if (data.type === 'vehicle_carousel') {
                setMessages(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        text: data.reply,
                        vehicles: data.vehicles,
                    },
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        text:
                            (typeof data.reply === 'string' && data.reply.trim()) ||
                            'OK — I received that.',
                    },
                ]);
            }
        } catch (e) {
            const msg =
                e instanceof Error
                    ? e.message
                    : 'Something went wrong sending the message.';

            const hint = !config.jwtToken
                ? ' (Missing widget JWT — check bootstrap flow.)'
                : '';

            setMessages(prev => [
                ...prev,
                { role: 'assistant', text: `Error: ${msg}${hint}` },
            ]);
        } finally {
            setSending(false);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* messages */}
            <div
                style={{
                    flex: 1,
                    padding: '16px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            alignSelf:
                                msg.role === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.role === 'user' ? '#000' : '#f1f1f1',
                            color: msg.role === 'user' ? '#fff' : '#000',
                            padding: '10px 14px',
                            borderRadius: '14px',
                            maxWidth: '80%',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {msg.text && <div>{msg.text}</div>}

                        {msg.vehicles && (
                            <div style={{ marginTop: '10px', display: 'grid', gap: '12px' }}>
                                {msg.vehicles.map((v, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            background: '#fff',
                                        }}
                                    >
                                        {v.photos?.[0] && (
                                            <img
                                                src={v.photos[0]}
                                                style={{
                                                    width: '100%',
                                                    borderRadius: '8px',
                                                    marginBottom: '8px',
                                                }}
                                            />
                                        )}

                                        <strong>
                                            {v.year} {v.make} {v.model}
                                        </strong>

                                        <div style={{ fontSize: '13px', marginTop: '4px' }}>
                                            {v.trim && <span>{v.trim} · </span>}
                                            {v.mileage && (
                                                <span>{v.mileage.toLocaleString()} miles</span>
                                            )}
                                        </div>

                                        <div style={{ marginTop: '6px', fontWeight: 600 }}>
                                            ${v.price?.toLocaleString()}
                                        </div>

                                        {v.estimatedPayment && (
                                            <div style={{ fontSize: '13px', marginTop: '4px' }}>
                                                Est. ${Math.round(v.estimatedPayment)}/mo
                                            </div>
                                        )}

                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '8px',
                                                marginTop: '10px',
                                            }}
                                        >
                                            <button
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #000',
                                                    background: '#000',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setInput(v.vin)}
                                            >
                                                View
                                            </button>

                                            <button
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    background: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setInput(`payment ${v.vin}`)}
                                            >
                                                Payment
                                            </button>

                                            <button
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    background: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setInput(`hold ${v.vin}`)}
                                            >
                                                Hold
                                            </button>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {sending && (
                    <div
                        style={{
                            alignSelf: 'flex-start',
                            background: '#f1f1f1',
                            color: '#000',
                            padding: '10px 14px',
                            borderRadius: '14px',
                            maxWidth: '80%',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            opacity: 0.7,
                        }}
                    >
                        Typing…
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* input */}
            <div
                style={{
                    borderTop: '1px solid #eee',
                    padding: '12px',
                    display: 'flex',
                    gap: '8px',
                }}
            >
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '14px',
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={sending}
                    style={{
                        padding: '0 16px',
                        borderRadius: '10px',
                        background: '#000',
                        color: '#fff',
                        border: 'none',
                        cursor: sending ? 'not-allowed' : 'pointer',
                        opacity: sending ? 0.6 : 1,
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
