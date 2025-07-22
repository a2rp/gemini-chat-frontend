import styled from "styled-components";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <>
            <Overlay>
                <Dialog>
                    <h3>Confirm Deletion</h3>
                    <p>{message}</p>
                    <Buttons>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button onClick={onConfirm}>Delete</Button>
                    </Buttons>
                </Dialog>
            </Overlay>
        </>
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
`;

