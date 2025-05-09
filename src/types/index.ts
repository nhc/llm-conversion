import { ReactNode } from "react";

export type MessageSource = "user" | "system" | "assistant";

export type Message = {
  id: string;
  source: MessageSource;
  content: string;
  timestamp: number;
};

export type MessageRenderer = {
  text: (props: { text: string }) => ReactNode;
};

export type LlmConversionProps = {
  messages: Message[];
  handleSendMessage: (message: string) => void;
  responseComponents: ReactNode[];
  messageRenderer: MessageRenderer;
};
