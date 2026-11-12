import { createElement, useEffect, useRef, useState } from "react";
import { FaCodepen, FaFacebookF, FaGithub, FaLinkedinIn, FaPatreon, FaRobot, FaYoutube } from "react-icons/fa";
import { FiArrowUp, FiCoffee, FiGlobe, FiHeart, FiMail } from "react-icons/fi";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { Styled } from "./styled";
import ConfirmDialog from "./ConfirmDialog";

const sampleQuestions = [
    "What is machine learning?",
    "How do conversational assistants work?",
    "What are uses of automation in daily life?",
    "How can beginners learn programming?",
    "Who invented Python and when?",
];

const CHAT_STORAGE_KEY = "gemini_chat";
const MAX_CONTEXT_MESSAGES = 20;
const MAX_CONTEXT_LENGTH = 30_000;

const getRecentContents = (contents) => {
    const recentContents = contents.slice(-MAX_CONTEXT_MESSAGES);
    while (recentContents[0]?.role === "model") recentContents.shift();

    let contextLength = recentContents.reduce(
        (total, entry) => total + entry.parts[0].text.length,
        0
    );

    while (contextLength > MAX_CONTEXT_LENGTH && recentContents.length > 1) {
        const userMessage = recentContents.shift();
        contextLength -= userMessage.parts[0].text.length;

        if (recentContents[0]?.role === "model") {
            const modelMessage = recentContents.shift();
            contextLength -= modelMessage.parts[0].text.length;
        }
    }

    return recentContents;
};

const isStoredMessage = (entry, role) =>
    entry?.role === role &&
    Array.isArray(entry.parts) &&
    typeof entry.parts[0]?.text === "string";

const loadChatHistory = () => {
    try {
        const saved = localStorage.getItem(CHAT_STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        if (!Array.isArray(parsed)) return [];

        const history = [];
        for (let index = 0; index < parsed.length - 1; index += 1) {
            if (
                isStoredMessage(parsed[index], "user") &&
                isStoredMessage(parsed[index + 1], "model")
            ) {
                history.push(parsed[index], parsed[index + 1]);
                index += 1;
            }
        }
        return history;
    } catch {
        return [];
    }
};

const footerLinks = [
    ["Portfolio", "https://www.ashishranjan.net/", FiGlobe],
    ["GitHub", "https://github.com/a2rp", FaGithub],
    ["CodePen", "https://codepen.io/ash1198", FaCodepen],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FaLinkedinIn],
    ["Facebook", "https://www.facebook.com/theash.ashish/", FaFacebookF],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FaYoutube],
    ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
    ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
    ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
    ["Patreon", "https://www.patreon.com/a2rp", FaPatreon],
];

const isLocalhost = window.location.hostname === "localhost";
const BASE_URL = (
    import.meta.env.VITE_CHAT_API_URL?.trim() ||
    (isLocalhost
        ? "http://localhost:1198"
        : "https://gemini-chat-backend-ffoy.onrender.com")
).replace(/\/+$/, "");

const ChatBox = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [chatHistory, setChatHistory] = useState(loadChatHistory);
    const [confirmClearAll, setConfirmClearAll] = useState(false);
    const [confirmIndex, setConfirmIndex] = useState(null);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return undefined;

        container.scrollTop = container.scrollHeight;
        setShowGoToTop(container.scrollTop > 240);

        try {
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
        } catch {
            toast.error("Chat history could not be saved on this device.");
        }
        return undefined;
    }, [chatHistory]);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return undefined;
        const handleScroll = () => setShowGoToTop(container.scrollTop > 240);
        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAsk = async (customPrompt) => {
        if (isLoading) return;

        const finalPrompt = (customPrompt ?? prompt).trim();
        if (!finalPrompt) {
            toast.info("Please enter a question.");
            inputRef.current?.focus();
            return;
        }

        const updatedHistory = [
            ...chatHistory,
            { role: "user", parts: [{ text: finalPrompt.trim() }] },
        ];

        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: getRecentContents(updatedHistory) }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.error || "Failed to fetch response");
            const reply = typeof data?.reply === "string" && data.reply.trim()
                ? data.reply
                : "No response was returned.";

            setChatHistory([
                ...updatedHistory,
                { role: "model", parts: [{ text: reply }] },
            ]);
            setPrompt("");
            toast.success("Reply received.");
        } catch {
            toast.error("The response could not be loaded. Try again shortly.");
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleDeletePair = (index) => setConfirmIndex(index);

    const confirmDelete = () => {
        const updated = [...chatHistory];
        updated.splice(confirmIndex, 2);
        setChatHistory(updated);
        setConfirmIndex(null);
        toast.info("Conversation deleted.");
        inputRef.current?.focus();
    };

    const confirmClearAllChats = () => {
        setChatHistory([]);
        toast.info("All conversations cleared.");
        setConfirmClearAll(false);
        inputRef.current?.focus();
    };

    const handleClearAll = () => {
        if (chatHistory.length === 0) {
            toast.info("There are no conversations to clear.");
            return;
        }
        setConfirmClearAll(true);
    };

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <a className="brand" href="#chat-home" aria-label="Smart Chat home">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                    <span>
                        <small>A2RP TOOL</small>
                        Smart Chat
                    </span>
                </a>
                <a className="githubLink" href="https://github.com/a2rp/gemini-chat-frontend" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                </a>
            </Styled.Header>

            <Styled.Main id="chat-home">
                <Styled.Title>Thoughtful answers, one question at a time.</Styled.Title>

                <Styled.ChatBox ref={chatContainerRef}>
                    {chatHistory.length === 0 ? (
                        <>
                            <Styled.Suggestions>
                                {sampleQuestions.map((question) => (
                                    <Styled.SuggestionCard key={question} onClick={() => handleAsk(question)} disabled={isLoading}>
                                        {question}
                                    </Styled.SuggestionCard>
                                ))}
                            </Styled.Suggestions>
                            <Styled.Note>
                                The chat service may take a moment to wake up. Your conversation stays in this browser.
                            </Styled.Note>
                        </>
                    ) : (
                        chatHistory.map((entry, index) => {
                            if (entry.role !== "user" || chatHistory[index + 1]?.role !== "model") return null;
                            return (
                                <Styled.ResponseBox key={`${entry.parts[0].text}-${index}`}>
                                    <div className="myQuery">
                                        <span className="messageIcon"><FiGlobe /></span>
                                        <div className="messageText">{entry.parts[0].text}</div>
                                    </div>
                                    <div className="assistantReply">
                                        <span className="messageIcon"><FaRobot /></span>
                                        <div className="messageText">{chatHistory[index + 1].parts[0].text}</div>
                                    </div>
                                    <button
                                        className="deleteButton"
                                        type="button"
                                        onClick={() => handleDeletePair(index)}
                                        disabled={isLoading}
                                        aria-label={`Delete conversation: ${entry.parts[0].text.slice(0, 60)}`}
                                        title="Delete conversation"
                                    >
                                        <DeleteForeverIcon />
                                    </button>
                                </Styled.ResponseBox>
                            );
                        })
                    )}

                    {isLoading && (
                        <Styled.LoadingMessage role="status" aria-live="polite">
                            <CircularProgress size={18} aria-label="Loading response" />
                            Preparing a reply...
                        </Styled.LoadingMessage>
                    )}
                </Styled.ChatBox>

                <Styled.ControlsSection>
                    <Styled.Input
                        ref={inputRef}
                        rows="3"
                        maxLength={120}
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                        disabled={isLoading}
                        placeholder="Ask something (max 120 characters)..."
                        aria-label="Your question"
                    />
                    <Styled.CharCount>{prompt.length} / 120 characters</Styled.CharCount>
                    <Styled.ButtonsWrapper>
                        <Styled.Button type="button" onClick={() => handleAsk()} disabled={isLoading}>
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Send"}
                        </Styled.Button>
                        <Styled.ClearButton type="button" onClick={handleClearAll} disabled={isLoading}>Clear all</Styled.ClearButton>
                    </Styled.ButtonsWrapper>
                </Styled.ControlsSection>
            </Styled.Main>

            <Styled.Footer>
                <p>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p>
                <nav aria-label="Social and support links">
                    {footerLinks.map(([label, href, Icon]) => (
                        <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} aria-label={label} title={label}>
                            {createElement(Icon, { "aria-hidden": true })}
                        </a>
                    ))}
                </nav>
            </Styled.Footer>

            {showGoToTop && (
                <Styled.GoToTop type="button" onClick={() => chatContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" title="Scroll to top">
                    <FiArrowUp />
                </Styled.GoToTop>
            )}

            {confirmIndex !== null && (
                <ConfirmDialog
                    title="Delete conversation"
                    message="Are you sure you want to delete this conversation?"
                    onConfirm={confirmDelete}
                    onCancel={() => {
                        setConfirmIndex(null);
                        inputRef.current?.focus();
                    }}
                />
            )}
            {confirmClearAll && (
                <ConfirmDialog
                    title="Clear all conversations"
                    message="Are you sure you want to clear all conversations?"
                    onConfirm={confirmClearAllChats}
                    onCancel={() => {
                        setConfirmClearAll(false);
                        inputRef.current?.focus();
                    }}
                />
            )}
        </Styled.Wrapper>
    );
};

export default ChatBox;
