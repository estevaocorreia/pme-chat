import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ChatModal } from "./ChatModal";

export const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="floating-chat w-16 h-16 rounded-full animate-float animate-pulse-glow"
        size="icon"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
      
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};