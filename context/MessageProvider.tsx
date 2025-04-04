import { createContext, useContext, useState } from "react";

export interface Message{
    id: string;
    type: 'text';
    content: string;
    sender: 'user' | 'system';
}

export const MessageContext = createContext<{
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    messages: [],
    setMessages: () => {},
    inputText: '',
    setInputText: () => {},
    sendMessage: () => {},
    loading: false,
    setLoading: () => {},
});

export const MessageProvider = ({children}: {children: React.ReactNode}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = () =>{
        console.log("Send Message is working: ", inputText)
        if(inputText.trim().length === 0) return;

        // when the user adds a message
        const userMessage: Message = { id: Date.now().toString(), type: 'text', content: inputText, sender: 'user'};
        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
    }

    return (
        <MessageContext.Provider value={{messages, setMessages, inputText, setInputText, sendMessage, loading, setLoading}}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext)
