import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        /* border: 1px solid #fff; */
        height: 100vh;
        display: flex;
        justify-content: center;
    `,
    Main: styled.div`
        width: 100%;
        max-width: 1440px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
    `,
    Title: styled.h1`
        /* border: 1px solid #fff; */
    `,
    ChatBox: styled.div`
        /* border: 1px solid #fff; */
        height: 100%;
        padding: 20px;
        margin: 15px 0;
        overflow-y: auto;
    `,
    ResponseBox: styled.div`
        margin-bottom: 1rem;
        padding: 1rem;

        .myQuery {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .geminiReply {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-weight: normal;
            font-style: italic;
        }

        &:hover {
            background-color: #111;
            .deleteIconWrapper {
                opacity: 1;
            }
        }
        .deleteIconWrapper {
            /* border: 1px solid #fff; */
            opacity: 0;
            display: flex;
            justify-content: flex-end;
            padding: 0.5rem;
        }
    `,
    ControlsSection: styled.div`
        /* border: 1px solid #fff; */
    `,
    Input: styled.textarea`
        width: 100%;
        padding: 1rem;
        border: none;
        border-radius: 4px;
        resize: none;
        margin-bottom: 1rem;
        outline: none;
        background-color: rgb(20, 20, 20);
        color: #aaa;
    `,
    ButtonsWrapper: styled.div`
        display: flex;
        gap: 10px;
        margin-top: 10px;
        flex-wrap: wrap;
    `,
    Button: styled.button`
        padding: 0.7rem 1.5rem;
        background: rgb(134, 201, 232);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        overflow: hidden;
        width: 100px;
        height: 40px;
        &:hover {
            background-color: rgb(100, 170, 200);
        }
    `,
    ClearButton: styled.button`
        width: 100px;
        background: transparent;
        color: red;
        border: 2px solid red;
        border-radius: 4px;
        cursor: pointer;
        width: 100px;
        margin-left: 1rem;
        transition: 0.2s ease;

        &:hover {
            background: red;
            color: white;
        }
    `,
    DevInfo: styled.div`
        color: #333;
        a {
            color: #007bff;
        }
        &:hover {
            color: #fff;
        }
    `,

    Suggestions: styled.div`
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1rem;
        justify-content: center;
    `,

    SuggestionCard: styled.div`
        background-color: #1c1c1c;
        padding: 1rem;
        border-radius: 8px;
        width: 220px;
        color: #fff;
        cursor: pointer;
        box-shadow: 0 0 5px #000;
        transition: all 0.2s ease;
        font-size: 0.9rem;

        &:hover {
            background-color: #2b2b2b;
            transform: translateY(-3px);
        }
    `,
};
