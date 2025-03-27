import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import BackgroundWrapper from "./BackgroundWrapper";
import { Mic, MicOff, Send, Leaf } from "lucide-react";

const ChatPanel = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const chatEndRef = useRef(null);

  const typingInterval = 30;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("SpeechRecognition API not supported in this browser.");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en-US" ? "hi-IN" : "en-US"));
  };

  const handleStart = () => {
    if (recognition && !isListening) {
      try {
        recognition.lang = language;
        recognition.start();
        setIsListening(true);

        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            setMediaStream(stream);
          })
          .catch((err) => {
            console.error("Failed to access microphone:", err);
          });
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    }
  };

  const handleStop = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      handleSendMessage(input);

      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
      }
    }
  };

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    setChatLog((prevLog) => [...prevLog, { sender: "User", message }]);
    setInput("");

    setIsLoading(true);

    try {
      const languagePrompt =
        language === "hi-IN"
          ? "Please respond in Hindi in a more structured format: "
          : "Give in more Structural format please. ";

      const result = await model.generateContent(languagePrompt + message);

      setIsLoading(false);

      let ans = await result.response.text();
      ans = ans.replace(/[#*]/g, "");

      setChatLog((prevLog) => [...prevLog, { sender: "AgroAI", message: "" }]);

      let index = 0;
      const intervalId = setInterval(() => {
        setChatLog((prevLog) => {
          const newLog = [...prevLog];
          const lastMsgIndex = newLog.length - 1;
          if (lastMsgIndex >= 0) {
            newLog[lastMsgIndex].message += ans.charAt(index);
          }
          return newLog;
        });

        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

        index++;
        if (index >= ans.length) {
          clearInterval(intervalId);
        }
      }, typingInterval);
    } catch (error) {
      console.error("Error:", error);

      setIsLoading(false);
      setChatLog((prevLog) => [
        ...prevLog,
        {
          sender: "AgroAI",
          message: "I'm sorry, I couldn't process your request. Please try again.",
        },
      ]);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="flex flex-col w-full h-full max-w-4xl mx-auto relative px-2 sm:px-4 py-4 sm:py-6">
        <div className="absolute top-0 left-0 opacity-30">
          <Leaf className="w-24 h-24 text-green-300" />
        </div>
        <div className="absolute bottom-0 right-0 opacity-30">
          <Leaf className="w-24 h-24 text-green-300 transform rotate-180" />
        </div>

        <div className="relative z-10 flex flex-col w-full sm:h-[calc(100vh-120px)] h-[calc(100vh-100px)]">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Chat With AgroAI</h2>
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-green-200 text-sm">
                {language === "en-US" ? "English" : "हिंदी"}
              </span>
              <button
                onClick={toggleLanguage}
                className="relative inline-flex h-6 w-11 items-center rounded-full
                           bg-green-900 transition-colors border-none focus:outline-none"
                style={{ outline: "none" }}
              >
                <span
                  className={`${
                    language === "hi-IN" ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto rounded-lg bg-green-50 bg-opacity-10
                       backdrop-blur-sm border border-green-400 p-4 mb-4
                       scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-transparent"
          >
            {chatLog.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-green-400 text-center">
                  Ask AgroAI anything about agriculture, farming, or plant care!
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {chatLog.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      entry.sender === "User" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 transition-all duration-200 ${
                        entry.sender === "User"
                          ? "bg-green-600 text-white rounded-tr-none"
                          : "bg-green-100 text-green-900 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">{entry.sender}</p>
                      <p className="whitespace-pre-wrap">{entry.message}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-green-100 text-green-900 rounded-lg rounded-tl-none p-3">
                      <p className="text-sm font-medium mb-1">AgroAI</p>
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={isListening ? handleStop : handleStart}
              className={`p-3 rounded-full transition-all duration-200 ${
                isListening
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                  : "bg-green-200 text-green-800 hover:bg-green-300"
              }`}
              aria-label={isListening ? "Stop recording" : "Start recording"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(input);
                  }
                }}
                className="
                  w-full py-3 px-4
                  bg-green-800/10
                  text-green-50
                  placeholder-green-300
                  border border-green-400
                  rounded-full
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-300
                  focus:bg-green-800/30
                  transition-colors
                  duration-200
                "
                placeholder="Type your message here..."
              />
            </div>

            <button
              onClick={() => handleSendMessage(input)}
              disabled={input.trim() === "" || isLoading}
              className={`p-3 rounded-full ${
                input.trim() === "" || isLoading
                  ? "bg-green-700 text-green-300"
                  : "bg-green-500 text-white hover:bg-green-400 shadow-lg shadow-green-500/30"
              } transition-all duration-200`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ChatPanel;
