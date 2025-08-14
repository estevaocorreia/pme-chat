import { Button } from "@/components/ui/button";
import { MessageCircle, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">SIGE Chat</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Início
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            {/* <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a> */}
          </nav>

          {/* <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex text-primary hover:bg-primary/10"
            >
              Entrar
            </Button>
            <Button className="hero-button">
              Começar
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};