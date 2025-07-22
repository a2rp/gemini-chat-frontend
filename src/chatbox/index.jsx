import React, { useEffect, useRef, useState } from 'react'
import { Styled } from './styled'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';
import { FaRegUserCircle, FaRobot } from "react-icons/fa";
import ConfirmDialog from './ConfirmDialog';
import { toast } from 'react-toastify';

const sampleQuestions = [
    "What is Artificial Intelligence?",
    "How does ChatGPT work?",
    "What are some uses of AI in daily life?",
    "How can beginners learn programming?",
    "Who invented Python and when?"
];

const ChatBox = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [confirmClearAll, setConfirmClearAll] = useState(false);
    const [confirmIndex, setConfirmIndex] = useState(null);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("gemini_chat");
        if (saved) setChatHistory(JSON.parse(saved));
    }, []);

    // Auto scroll + save
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        localStorage.setItem("gemini_chat", JSON.stringify(chatHistory));
    }, [chatHistory]);

    // Main ask handler
    const handleAsk = async (customPrompt) => {
        const finalPrompt = customPrompt || prompt;
        if (!finalPrompt.trim()) {
            toast.info("Please enter a question.");
            inputRef.current.focus();
            return;
        }

        const updatedHistory = [
            ...chatHistory,
            { role: "user", parts: [{ text: finalPrompt }] }
        ];

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:1198/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: updatedHistory })
            });
            if (!res.ok) throw new Error("Failed to fetch response");
            const data = await res.json();
            const modelReply = data?.reply || "No response.";

            setChatHistory([
                ...updatedHistory,
                { role: "model", parts: [{ text: modelReply }] }
            ]);
            setPrompt("");
            toast.success("Gemini replied successfully!");
        } catch (error) {
            console.log("error", error);
            toast.error("Failed to fetch response!");
        } finally {
            setIsLoading(false);
            inputRef.current.focus();
        }
    };

    const handleDeletePair = (index) => setConfirmIndex(index);
    const confirmDelete = () => {
        const updated = [...chatHistory];
        updated.splice(confirmIndex, 2);
        setChatHistory(updated);
        setConfirmIndex(null);
        toast.info("Deleted successfully");
        inputRef.current.focus();
    };
    const cancelDelete = () => setConfirmIndex(null);

    const handleClearAll = () => {
        if (chatHistory.length === 0) {
            toast.info("No chats to clear.");
            return;
        }
        setConfirmClearAll(true);
    };
    const confirmClearAllChats = () => {
        setChatHistory([]);
        localStorage.removeItem("gemini_chat");
        toast.info("All chats cleared");
        setConfirmClearAll(false);
        inputRef.current.focus();
    };
    const cancelClearAll = () => setConfirmClearAll(false);

    return (
        <>
            <Styled.Wrapper>
                <Styled.Main>
                    <Styled.Title>Your AI Chat Companion</Styled.Title>

                    <Styled.ChatBox ref={chatContainerRef}>
                        {chatHistory.length === 0 ? (
                            <Styled.Suggestions>
                                {sampleQuestions.map((q, i) => (
                                    <Styled.SuggestionCard key={i} onClick={() => handleAsk(q)}>
                                        {q}
                                    </Styled.SuggestionCard>
                                ))}
                            </Styled.Suggestions>
                        ) : (
                            chatHistory.map((entry, index) => {
                                if (entry.role === "user" && chatHistory[index + 1]?.role === "model") {
                                    return (
                                        <Styled.ResponseBox key={`${entry.parts[0].text}-${index}`}>
                                            <div className="myQuery">
                                                <FaRegUserCircle />
                                                <div className="myQueryMain">{entry.parts[0].text}</div>
                                            </div>
                                            <div className="geminiReply">
                                                <FaRobot />
                                                <div className="geminiReplyMain">
                                                    {chatHistory[index + 1].parts[0].text}
                                                </div>
                                            </div>
                                            <div className="deleteIconWrapper">
                                                <DeleteForeverIcon
                                                    style={{ cursor: "pointer", color: "red" }}
                                                    onClick={() => handleDeletePair(index)}
                                                />
                                            </div>
                                        </Styled.ResponseBox>
                                    );
                                }
                                return null;
                            })
                        )}
                        {isLoading && (
                            <div style={{ textAlign: "center", marginTop: "1rem", fontStyle: "italic" }}>
                                Gemini is thinking...
                            </div>
                        )}
                    </Styled.ChatBox>

                    <Styled.ControlsSection>
                        <Styled.Input
                            ref={inputRef}
                            rows="3"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ask something..."
                        />
                        <Styled.ButtonsWrapper>
                            <Styled.Button onClick={() => handleAsk()} disabled={isLoading}>
                                {isLoading ? <CircularProgress size={20} /> : "Send"}
                            </Styled.Button>
                            <Styled.ClearButton onClick={handleClearAll}>Clear All</Styled.ClearButton>
                        </Styled.ButtonsWrapper>
                    </Styled.ControlsSection>
                </Styled.Main>
            </Styled.Wrapper>

            {confirmIndex !== null && (
                <ConfirmDialog
                    message="Are you sure you want to delete this question and its answer?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            {confirmClearAll && (
                <ConfirmDialog
                    message="Are you sure you want to clear all chats?"
                    onConfirm={confirmClearAllChats}
                    onCancel={cancelClearAll}
                />
            )}
        </>
    );
};

export default ChatBox;
