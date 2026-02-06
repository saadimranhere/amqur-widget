import { useState } from 'react';
import { LauncherButton } from './components/LauncherButton';
import { WidgetPanel } from './WidgetPanel';

export function WidgetShell() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <LauncherButton open={open} onToggle={() => setOpen(v => !v)} />
            <WidgetPanel open={open} onClose={() => setOpen(false)} />
        </>
    );
}
