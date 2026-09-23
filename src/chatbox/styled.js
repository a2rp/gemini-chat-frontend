import styled from "styled-components";

const panel = "#111827";
const border = "#26354b";
const text = "#edf4ff";
const muted = "#91a4bd";
const accent = "#65d4ff";

export const Styled = {
    Wrapper: styled.div`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: #07111f;
        color: ${text};
        background-image: radial-gradient(circle at 10% 0%, rgba(37, 99, 235, 0.18), transparent 35%),
            radial-gradient(circle at 90% 20%, rgba(14, 165, 233, 0.12), transparent 30%);
    `,
    Header: styled.header`
        position: sticky;
        top: 0;
        z-index: 20;
        min-height: 68px;
        padding: 12px max(18px, 4vw);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid ${border};
        background: rgba(7, 17, 31, 0.92);
        backdrop-filter: blur(14px);

        .brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: ${text};
            text-decoration: none;
        }

        .brand img {
            width: 40px;
            height: 40px;
            padding: 6px;
            border: 1px solid ${border};
            border-radius: 11px;
            background: #020817;
        }

        .brand span {
            display: flex;
            flex-direction: column;
            font-weight: 800;
        }

        .brand small {
            color: ${muted};
            font-size: 9px;
            letter-spacing: 0.18em;
        }

        .githubLink {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 9px 12px;
            border: 1px solid ${border};
            border-radius: 9px;
            color: ${muted};
            text-decoration: none;
            transition: border-color 160ms ease, box-shadow 160ms ease, color 160ms ease;
        }

        .githubLink:hover,
        .githubLink:focus-visible {
            border-color: ${accent};
            box-shadow: 0 0 16px rgba(101, 212, 255, 0.18);
            color: ${text};
            outline: none;
        }
    `,
    Main: styled.main`
        width: min(1080px, calc(100% - 32px));
        min-height: calc(100vh - 160px);
        margin: 0 auto;
        padding: 44px 0 20px;
        display: flex;
        flex: 1;
        flex-direction: column;
    `,
    Title: styled.h1`
        max-width: 760px;
        margin-bottom: 22px;
        color: ${text};
        font-size: clamp(1.8rem, 4vw, 3.2rem);
        line-height: 1.08;
        letter-spacing: -0.04em;
    `,
    ChatBox: styled.div`
        min-height: 300px;
        flex: 1;
        overflow-y: auto;
        padding: 18px;
        border: 1px solid ${border};
        border-radius: 18px;
        background: rgba(12, 25, 43, 0.78);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
        scrollbar-gutter: stable;
    `,
    Suggestions: styled.div`
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        max-width: 760px;
        margin: 0 auto;
        padding: 28px 0;

        @media (max-width: 640px) {
            grid-template-columns: 1fr;
        }
    `,
    SuggestionCard: styled.button`
        min-height: 72px;
        padding: 16px;
        border: 1px solid ${border};
        border-radius: 13px;
        background: ${panel};
        color: ${text};
        text-align: left;
        cursor: pointer;
        transition: border-color 160ms ease, box-shadow 160ms ease;

        &:hover,
        &:focus-visible {
            border-color: ${accent};
            box-shadow: 0 0 18px rgba(101, 212, 255, 0.16);
            outline: none;
        }
    `,
    Note: styled.p`
        max-width: 620px;
        margin: 24px auto;
        color: ${muted};
        font-size: 0.9rem;
        text-align: center;
    `,
    ResponseBox: styled.article`
        position: relative;
        margin: 0 auto 14px;
        padding: 18px;
        border: 1px solid ${border};
        border-radius: 15px;
        background: rgba(17, 24, 39, 0.9);
        transition: border-color 160ms ease, box-shadow 160ms ease;

        &:hover {
            border-color: #3d5878;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
        }

        .myQuery,
        .assistantReply {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            line-height: 1.65;
        }

        .myQuery {
            margin-bottom: 14px;
            color: ${text};
            font-weight: 700;
        }

        .assistantReply {
            color: #c6d5e8;
        }

        .messageIcon {
            width: 28px;
            height: 28px;
            flex: 0 0 28px;
            display: grid;
            place-items: center;
            border: 1px solid ${border};
            border-radius: 9px;
            color: ${accent};
        }

        .messageText {
            white-space: pre-wrap;
        }

        .deleteButton {
            position: absolute;
            top: 12px;
            right: 12px;
            display: grid;
            place-items: center;
            padding: 6px;
            border: 1px solid transparent;
            border-radius: 8px;
            background: transparent;
            color: #f87171;
            cursor: pointer;
            opacity: 0;
            transition: border-color 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
        }

        &:hover .deleteButton,
        .deleteButton:focus-visible {
            opacity: 1;
        }

        .deleteButton:hover,
        .deleteButton:focus-visible {
            border-color: #f87171;
            box-shadow: 0 0 14px rgba(248, 113, 113, 0.18);
            outline: none;
        }
    `,
    LoadingMessage: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 18px;
        color: ${muted};
    `,
    ControlsSection: styled.div`
        position: relative;
        margin-top: 16px;
    `,
    Input: styled.textarea`
        width: 100%;
        min-height: 92px;
        padding: 15px;
        border: 1px solid ${border};
        border-radius: 14px;
        resize: vertical;
        background: #0d1a2b;
        color: ${text};
        outline: none;
        transition: border-color 160ms ease, box-shadow 160ms ease;

        &:focus {
            border-color: ${accent};
            box-shadow: 0 0 0 3px rgba(101, 212, 255, 0.12);
        }
    `,
    CharCount: styled.div`
        position: absolute;
        right: 14px;
        top: -27px;
        color: ${muted};
        font-size: 12px;
    `,
    ButtonsWrapper: styled.div`
        display: flex;
        gap: 10px;
        margin-top: 12px;
        flex-wrap: wrap;
    `,
    Button: styled.button`
        min-width: 92px;
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 18px;
        border: 1px solid ${accent};
        border-radius: 10px;
        background: ${accent};
        color: #06101e;
        font-weight: 800;
        cursor: pointer;
        transition: border-color 160ms ease, box-shadow 160ms ease;

        &:hover:not(:disabled),
        &:focus-visible:not(:disabled) {
            border-color: #b5edff;
            box-shadow: 0 0 18px rgba(101, 212, 255, 0.24);
            outline: none;
        }
    `,
    ClearButton: styled.button`
        min-height: 42px;
        padding: 0 18px;
        border: 1px solid #ef7676;
        border-radius: 10px;
        background: transparent;
        color: #ffaaaa;
        cursor: pointer;
        transition: border-color 160ms ease, box-shadow 160ms ease;

        &:hover,
        &:focus-visible {
            border-color: #ffb5b5;
            box-shadow: 0 0 16px rgba(239, 118, 118, 0.18);
            outline: none;
        }
    `,
    Footer: styled.footer`
        min-height: 76px;
        padding: 18px max(18px, 4vw);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        flex-wrap: wrap;
        border-top: 1px solid ${border};
        background: rgba(5, 14, 26, 0.9);
        color: ${muted};
        font-size: 12px;

        p {
            margin: 0;
        }

        p a {
            color: ${text};
            font-weight: 800;
        }

        nav {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
        }

        nav a {
            width: 32px;
            height: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid ${border};
            border-radius: 8px;
            color: ${muted};
            transition: border-color 160ms ease, box-shadow 160ms ease, color 160ms ease;
        }

        nav a:hover,
        nav a:focus-visible {
            border-color: ${accent};
            box-shadow: 0 0 14px rgba(101, 212, 255, 0.18);
            color: ${text};
            outline: none;
        }

        @media (max-width: 600px) {
            align-items: flex-start;
            flex-direction: column;
        }
    `,
    GoToTop: styled.button`
        position: fixed;
        right: 20px;
        bottom: 90px;
        z-index: 30;
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border: 1px solid ${border};
        border-radius: 50%;
        background: ${panel};
        color: ${text};
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: border-color 160ms ease, box-shadow 160ms ease, color 160ms ease;

        &:hover,
        &:focus-visible {
            border-color: ${accent};
            box-shadow: 0 0 18px rgba(101, 212, 255, 0.2);
            color: ${accent};
            outline: none;
        }
    `,
};
