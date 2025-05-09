import React, { useState, useCallback, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import type { LlmConversionProps, Message } from "../types";
import "./LlmConversion.css";

export const LlmConversion = ({
  messages,
  handleSendMessage,
  responseComponents,
  messageRenderer,
}: LlmConversionProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        handleSendMessage(inputValue.trim());
        setInputValue("");
      }
    },
    [inputValue, handleSendMessage]
  );

  const renderMessage = (message: Message) => {
    const content = message.content;

    // Check for custom component tags
    const customComponentMatch = content.match(/<([^>]+)>([^<]+)<\/\1>/);
    if (customComponentMatch) {
      const [_, componentName, componentContent] = customComponentMatch;
      const Component = responseComponents.find(
        (comp): comp is ReactElement =>
          React.isValidElement(comp) &&
          typeof comp.type === "function" &&
          comp.type.name.toLowerCase() === componentName.toLowerCase()
      );

      if (Component) {
        return Component;
      }
    }

    // Default to text rendering
    return messageRenderer.text({ text: content });
  };

  return (
    <div className="llm-conversion">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.source}`}>
            {renderMessage(message)}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
