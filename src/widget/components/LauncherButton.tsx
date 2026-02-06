import React from "react";
import { EnvoyMark } from "../icons";

export function LauncherButton(props: { open: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            className="amqur-launcher"
            aria-label={props.open ? "Close assistant" : "Open assistant"}
            onClick={props.onToggle}
        >
            <EnvoyMark />
        </button>
    );
}
