import type { ChatMessage } from '../types/chat';

export function Thread({ messages }: { messages: ChatMessage[] }) {
    return (
        <>
            {messages.map((m: ChatMessage) => (
                <div key={m.id} className="amqur-block">
                    <p>{m.content}</p>
                </div>
            ))}
        </>
    );
}
