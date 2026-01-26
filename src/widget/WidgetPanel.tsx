import { ChatView } from './ChatView';
import { useWidget } from './WidgetContext';

export function WidgetPanel({ open }: { open: boolean }) {
    const { bootstrap } = useWidget();

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '100px',
                right: '24px',
                width: '360px',
                height: '520px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'auto' : 'none',
                transition: 'all 220ms ease',
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    padding: '16px',
                    borderBottom: '1px solid #eee',
                    fontWeight: 600,
                    fontSize: '14px',
                    background: '#fff',
                }}
            >
                {bootstrap.tenantName}
            </div>

            <div style={{ flex: 1 }}>
                <ChatView />
            </div>
        </div>
    );
}
