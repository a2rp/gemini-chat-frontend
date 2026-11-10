import { useEffect, useRef } from "react";
import styled from "styled-components";

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        const buttons = dialog?.querySelectorAll("button:not(:disabled)");
        buttons?.[0]?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel();
                return;
            }

            if (event.key !== "Tab" || !buttons?.length) return;

            const firstButton = buttons[0];
            const lastButton = buttons[buttons.length - 1];

            if (event.shiftKey && document.activeElement === firstButton) {
                event.preventDefault();
                lastButton.focus();
            } else if (!event.shiftKey && document.activeElement === lastButton) {
                event.preventDefault();
                firstButton.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onCancel]);

    return (
        <Overlay>
            <Dialog
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-message"
            >
                <h3 id="confirm-dialog-title">{title}</h3>
                <p id="confirm-dialog-message">{message}</p>
                <Buttons>
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={onConfirm}>
                        Confirm
                    </Button>
                </Buttons>
            </Dialog>
        </Overlay>
    );
};

export default ConfirmDialog;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    z-index: 999;
`;

const Dialog = styled.div`
    background: #1e1e1e;
    padding: 2rem;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
    color: white;
    text-align: center;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

const Button = styled.button`
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;

    &:first-child {
        background-color: #888;
        color: white;
    }

    &:last-child {
        background-color: red;
        color: white;
    }

    &:focus-visible {
        outline: 2px solid white;
        outline-offset: 3px;
    }
`;
