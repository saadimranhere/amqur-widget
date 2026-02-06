import { ChatView } from './ChatView';
import { CloseIcon } from './icons';

export function WidgetPanel({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {

    if (!open) return null;

    return (
        <div className="amqur-panel">
            <div className="amqur-header">
                <div className="amqur-header-left" />
                <div className="amqur-header-spacer" />
                <button className="amqur-iconbtn" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>
            </div>

            <div className="amqur-body">
                <div className="amqur-prompt">
                    What would you like to know?
                </div>

                <ChatView />
            </div>
        </div>
    );
}
