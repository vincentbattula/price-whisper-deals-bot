
import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Camera, ChevronDown, ChevronUp, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm your PriceWhisper assistant. How can I help you find the best deals today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const SAMPLE_RESPONSES: { [key: string]: string } = {
  "find": "I'd be happy to help you find the best deals! What specific product are you looking for?",
  "price": "I can help you compare prices across different platforms. Which product are you interested in?",
  "card": "PriceWhisper checks all card offers automatically! We support VISA, Mastercard, American Express, and many bank-specific offers. Do you have a specific card you want to check offers for?",
  "emi": "Many products have EMI options available. EMIs typically range from 3-24 months depending on the retailer and your card. Would you like me to find products with no-cost EMI options?",
  "voucher": "I'll search for all available vouchers and discount codes for your product. What are you looking to buy?",
  "compare": "I can compare prices across Amazon, Flipkart, Best Buy, Walmart, and many other retailers. Which product would you like to compare?",
  "iphone": "I found great deals on iPhones! The iPhone 15 is currently at its lowest price on Amazon with a 10% discount using HDFC credit cards. Would you like me to show you more specific iPhone deals?",
  "laptop": "Looking for a laptop? I can help you find the best deals based on your requirements. Do you have a specific brand or budget in mind?",
  "hi": "Hello! I'm your PriceWhisper assistant. I can help you find the best deals across the web. What are you shopping for today?",
  "hello": "Hi there! I'm your PriceWhisper assistant. I can help you find the best deals across the web. What are you shopping for today?",
  "thanks": "You're welcome! If you need any more help finding great deals, just let me know!",
  "thank you": "You're welcome! If you need any more help finding great deals, just let me know!",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'll help you find the best deals on that. Is there anything specific you're looking for like EMI options or card discounts?";
      
      // Check for keywords in the user's message
      const userMessageLower = inputValue.toLowerCase();
      
      for (const [keyword, response] of Object.entries(SAMPLE_RESPONSES)) {
        if (userMessageLower.includes(keyword.toLowerCase())) {
          botResponse = response;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized((prev) => !prev);
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-4">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full shadow-lg bg-brand-teal hover:bg-brand-teal/90 h-14 w-14 p-0 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={cn(
            "w-80 sm:w-96 shadow-xl border border-gray-200 transition-all duration-300 transform origin-bottom-right",
            isMinimized ? "h-16" : "h-[500px]"
          )}
        >
          <div
            className="bg-brand-teal text-white p-3 flex justify-between items-center cursor-pointer rounded-t-lg"
            onClick={isMinimized ? toggleChat : toggleMinimize}
          >
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <div className="font-medium">PriceWhisper Assistant</div>
            </div>
            <div className="flex items-center space-x-1">
              {!isMinimized ? (
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-brand-teal/90 text-white" onClick={toggleMinimize}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-brand-teal/90 text-white" onClick={toggleMinimize}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-brand-teal/90 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(500px-3rem)]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={
                          message.sender === "user"
                            ? "chat-bubble-user"
                            : "chat-bubble-bot"
                        }
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="chat-bubble-bot">
                        <span className="typing-dots">Thinking</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask about deals, cards, EMIs..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full h-9 w-9 flex-shrink-0 hover:bg-gray-100"
                  >
                    <Camera className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className={`rounded-full h-9 w-9 flex-shrink-0 ${
                      inputValue.trim()
                        ? "bg-brand-teal hover:bg-brand-teal/90"
                        : "bg-gray-200"
                    }`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center mt-2">
                  <button
                    onClick={clearChat}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Clear conversation
                  </button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
