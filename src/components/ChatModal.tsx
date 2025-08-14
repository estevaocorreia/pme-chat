import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Caminho do som de notificação (adicione esse arquivo em /public/sounds/notify.mp3)
const notificationSound = new Audio("/sounds/notifyyyy.mp3");

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEBHOOK_URL = "https://n8n.memt.com.br/webhook/29c9d314-0708-474c-93fa-db4f09a1fb0f";

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente PME. Como posso ajudá-lo hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const url = new URL(WEBHOOK_URL);
      url.searchParams.append("message", inputMessage);
      url.searchParams.append("timestamp", new Date().toISOString());

      const response = await fetch(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Falha na comunicação com o assistente");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.output ?? "Desculpe, não consegui processar sua mensagem.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Som de notificação
      notificationSound.play().catch((err) => {
        console.warn("Erro ao reproduzir som:", err);
      });

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, estou enfrentando dificuldades técnicas. Tente novamente em alguns minutos.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[600px] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="gradient-text">Chat PME</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            {/* <X className="h-4 w-4" /> */}
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                {!message.isUser && (
                  <img
                    src="https://w7.pngwing.com/pngs/695/247/png-transparent-chatbot-logo-robotics-robot-electronics-leaf-logo.png"
                    alt="Bot"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.isUser
                    ? "chat-bubble-user bg-green-600 text-white"
                    : "chat-bubble-bot bg-gray-200 text-black"
                    } animate-fade-in-up`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.isUser && (
                  <img
                    src="https://marketplace.canva.com/Dz63E/MAF4KJDz63E/1/tl/canva-user-icon-MAF4KJDz63E.png"
                    alt="Usuário"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2 justify-start">
                <img
                  src="https://w7.pngwing.com/pngs/695/247/png-transparent-chatbot-logo-robotics-robot-electronics-leaf-logo.png"
                  alt="Bot"
                  className="w-8 h-8 rounded-full"
                />
                <div className="chat-bubble-bot animate-pulse bg-gray-200 text-black p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex space-x-2 pt-4 border-t">
          <Input
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
            variant="default"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
