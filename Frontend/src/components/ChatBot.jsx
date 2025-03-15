// ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import aihammer from "../assets/aihammer.mp4";
const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const chatBodyRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [displayedPrompts, setDisplayedPrompts] = useState([]);

    const allSamplePrompts = [
        "Summarize case notes for case [Case ID]",
        "Schedule follow up for [Case ID] by [Date]",
        "List tasks due this week for [User]",
        "Find docs for [Client Name]",
        "Draft email to [Client] re: [Update]",
        "Case status of [Case ID]?",
        "Analyze client sentiment in [Case ID]",
        "Suggest next steps for [Case ID]"
    ];

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handlePromptClick = (prompt) => {
        setMessage(prompt);
    };

    const handleSendMessage = () => {
        if (message.trim() && !isTyping) {
            const currentMessage = message.trim();
            setMessage('');
            setChatMessages(prevMessages => [...prevMessages, { text: currentMessage, sender: 'user' }]);
            setIsTyping(true);
            setResponseText('');

            // Simulate AI response with delay
            setTimeout(() => {
                const simulatedResponse = "Processing your legal case request... This is a simulated response from Matter AI for: \"" + currentMessage + "\".";
                let index = 0;
                let fullResponse = "";
                const typingInterval = setInterval(() => {
                    if (index < simulatedResponse.length) {
                        fullResponse += simulatedResponse[index];
                        setResponseText(fullResponse);
                        index++;
                    } else {
                        clearInterval(typingInterval);
                        setIsTyping(false);
                        setChatMessages(prevMessages => [...prevMessages, { text: fullResponse, sender: 'ai' }]);
                        setResponseText('');
                    }
                }, 20);
            }, 700);
        }
    };

    const handleMicClick = () => {
        alert("Voice input feature is a demo.");
    };

    useEffect(() => {
        // Scroll to bottom of chat body when new messages are added
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const bgGradientRadialStyle = {
        backgroundImage: 'radial-gradient(circle, rgba(220,220,220,1) 30%, rgba(192,192,192,1) 70%)',
    };

    const shadowTopStyle = {
        boxShadow: '0 -2px 4px rgba(0,0,0,0.08)',
    };

    return (
        <div className="flex flex-col bg-gray-50 text-gray-900 font-sans h-full">
            {/* Header */}
            <div className="bg-white p-4 shadow-md border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                        <i className="fas fa-balance-scale text-gray-600 text-xl"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-gray-900">Matter AI</h4>
                        <span className="text-sm text-gray-600 font-normal">Legal CRM Assistant</span>
                    </div>
                </div>
                <button className="bg-transparent text-gray-900 border border-gray-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            {/* Chat Body */}
            <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4 pb-12"> {/* Reduced pb-24 to pb-12 for less space below chat messages */}
                {chatMessages.map((chat, index) => (
                    <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-xl p-3 w-fit max-w-[80%] ${chat.sender === 'user' ? 'bg-blue-500 text-white ml-2' : 'bg-gray-200 text-gray-900 mr-2'}`}>
                            <p className="text-sm whitespace-pre-line">{chat.text}</p>
                        </div>
                    </div>
                ))}

                {/* AI Response Typing Area - Separate from chatMessages to avoid duplicate rendering */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="rounded-xl p-3 bg-gray-200 text-gray-900 mr-2 w-fit max-w-[80%]">
                            <p className="text-sm whitespace-pre-line">{responseText}<span className="animate-blink-cursor">|</span></p>
                        </div>
                    </div>
                )}


                {!isTyping && !chatMessages.length && ( // Changed condition to !isTyping
                    <div className="flex flex-col items-center justify-center h-full top-0 left-0 right-0 bottom-24 p-4 bg-gray-50">
                        <div className="w-32 h-32 rounded-full overflow-hidden" style={bgGradientRadialStyle}> {/* Inline style for bg-gradient-radial */}
                            <video
                                src={aihammer}
                                autoPlay
                                loop
                                muted
                                className="object-cover w-full h-full" // object-cover to fill container and maintain aspect ratio
                            />
                        </div>
                        <h2 className="mt-6 font-bold text-center text-gray-900 text-xl">Ask Matter AI anything</h2>
                        <div className="mt-6 flex flex-wrap justify-center gap-2" style={{marginBottom: '1rem'}}> {/* Reduced mt-6 to mt-4 and added marginBottom for less space below prompts */}
                            {displayedPrompts.map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePromptClick(prompt)}
                                    className="bg-gray-300 text-gray-900 py-2 px-4 rounded-full text-sm flex items-center gap-2 hover:bg-gray-400 transition-colors duration-200"
                                >
                                    {prompt === "Summarize case notes for case [Case ID]" && <i className="fas fa-file-alt text-gray-600"></i>}
                                    {prompt === "Schedule follow up for [Case ID] by [Date]" && <i className="fas fa-calendar-check text-gray-600"></i>}
                                    {prompt === "List tasks due this week for [User]" && <i className="fas fa-tasks text-gray-600"></i>}
                                    {prompt === "Find docs for [Client Name]" && <i className="fas fa-folder-open text-gray-600"></i>}
                                    {prompt === "Draft email to [Client] re: [Update]" && <i className="fas fa-envelope text-gray-600"></i>}
                                    {prompt === "Case status of [Case ID]?" && <i className="fas fa-info-circle text-gray-600"></i>}
                                    {prompt === "Analyze client sentiment in [Case ID]" && <i className="fas fa-chart-line text-gray-600"></i>}
                                    {prompt === "Suggest next steps for [Case ID]" && <i className="fas fa-directions text-gray-600"></i>}
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 left-0 right-0 flex items-center" style={shadowTopStyle}> {/* Inline style for shadow-top */}
                <input
                    type="text"
                    placeholder="Message Matter AI..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    className="flex-1 bg-gray-100 text-gray-900 border-none min-w-1 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-1"
                    disabled={isTyping}
                />
                <button
                    onClick={handleMicClick}
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-full min-w-10 min-h-10 ml-2 flex items-center justify-center focus:outline-none transition-colors duration-200"
                    aria-label="Voice input"
                    disabled={isTyping}
                >
                    <i className="fas fa-microphone"></i>
                </button>
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full min-w-10 min-h-10 ml-2 flex items-center justify-center focus:outline-none transition-colors duration-200"
                    aria-label="Send message"
                    disabled={isTyping}
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>

            <style>
                {`
                    @keyframes pulse-bg-radial {
                        0% { background-size: 0% 0%, 100% 100%; }
                        50% { background-size: 100% 100%, 0% 0%;}
                        100% { background-size: 0% 0%, 100% 100%; }
                    }

                    @keyframes blink-cursor {
                        from, to { border-right-color: transparent }
                        50% { border-right-color: #212529; }
                    }

                    .animate-blink-cursor {
                        animation: blink-cursor 0.75s step-end infinite;
                    }
                `}
            </style>
        </div>
    );
};

export default ChatBot;