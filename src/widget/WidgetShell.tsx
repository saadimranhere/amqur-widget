import { useState } from 'react';
import { BubbleButton } from './BubbleButton';
import { WidgetPanel } from './WidgetPanel';

export function WidgetShell() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <BubbleButton onClick={() => setOpen(!open)} />
            <WidgetPanel open={open} />
        </>
    );
}
