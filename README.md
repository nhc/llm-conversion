# LLM Conversion Package

A React component for handling LLM conversations with custom response components.

## Installation

```bash
pnpm add llm-conversion-package
```

## Usage

```tsx
import { LlmConversion } from "llm-conversion-package";
import ReactMarkdown from "react-markdown";

const messages = [
  {
    id: "1",
    source: "user",
    content: "Hello, how can you help me?",
    timestamp: Date.now(),
  },
  {
    id: "2",
    source: "assistant",
    content:
      "I can help you with various tasks. Here's a button to get started: <add-to-cart>product-123</add-to-cart>",
    timestamp: Date.now(),
  },
];

const AddToCartButton = ({ productId }: { productId: string }) => (
  <button onClick={() => console.log(`Adding product ${productId} to cart`)}>
    Add to Cart
  </button>
);

const App = () => {
  const handleSendMessage = (message: string) => {
    // Handle sending message to your API
    console.log("Sending message:", message);
  };

  return (
    <LlmConversion
      messages={messages}
      handleSendMessage={handleSendMessage}
      responseComponents={[<AddToCartButton productId="123" />]}
      messageRenderer={{
        text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
      }}
    />
  );
};
```

## Props

### LlmConversionProps

| Prop               | Type                      | Description                                                             |
| ------------------ | ------------------------- | ----------------------------------------------------------------------- |
| messages           | Message[]                 | Array of message objects containing the conversation history            |
| handleSendMessage  | (message: string) => void | Function to handle sending new messages                                 |
| responseComponents | ReactNode[]               | Array of React components that can be rendered based on message content |
| messageRenderer    | MessageRenderer           | Object containing renderers for different message types                 |

### Message

| Property  | Type                              | Description                               |
| --------- | --------------------------------- | ----------------------------------------- |
| id        | string                            | Unique identifier for the message         |
| source    | 'user' \| 'system' \| 'assistant' | Source of the message                     |
| content   | string                            | Content of the message                    |
| timestamp | number                            | Timestamp of when the message was created |

### MessageRenderer

| Property | Type                                   | Description                     |
| -------- | -------------------------------------- | ------------------------------- |
| text     | (props: { text: string }) => ReactNode | Function to render text content |

## Custom Components

The package supports custom components through special tags in the message content. For example:

```tsx
// Message content
"Here's a button: <add-to-cart>product-123</add-to-cart>";

// Component definition
const AddToCartButton = ({ productId }: { productId: string }) => (
  <button onClick={() => console.log(`Adding product ${productId} to cart`)}>
    Add to Cart
  </button>
);

// Usage
<LlmConversion
  responseComponents={[<AddToCartButton productId="123" />]}
  // ... other props
/>;
```

## License

MIT
