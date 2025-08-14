import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FloatingChatButton } from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
      </main>
      <FloatingChatButton />
    </div>
  );
};

export default Index;
