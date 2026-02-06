import { useState, useRef, useEffect } from 'react';
import { SendIcon } from "../icons";

export function Composer(props: {
    placeholder: string;
    disabled?: boolean;
    autoFocus?: boolean;
    onSend: (text: string) => void;
}) {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.autoFocus) inputRef.current?.focus();
    }, [props.autoFocus]);

    function submit() {
        const text = value.trim();
        if (!text) return;
        props.onSend(text);
        setValue("");
    }

    return (
        <div className="amqur-composer">
            <div className="amqur-inputwrap">
                <input
                    ref={inputRef}
                    className="amqur-input"
                    placeholder={props.placeholder}
                    value={value}
                    disabled={props.disabled}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submit();
                        }
                    }}
                />
                <button
                    type="button"
                    className="amqur-send"
                    onClick={submit}
                    disabled={props.disabled || value.trim().length === 0}
                    aria-label="Send"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}
