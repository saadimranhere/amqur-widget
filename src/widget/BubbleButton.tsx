export function BubbleButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                zIndex: 999999,
                transition: 'transform 150ms ease',
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
            }
        >
            AMQUR
        </button>
    );
}
