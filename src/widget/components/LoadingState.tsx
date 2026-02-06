import React from "react";

export function LoadingState() {
    return (
        <div className="amqur-skel" aria-label="Loading">
            <div className="amqur-skelbar" style={{ width: "68%" }} />
            <div className="amqur-skelbar" style={{ width: "88%" }} />
            <div className="amqur-skelbar" style={{ width: "54%" }} />
        </div>
    );
}
