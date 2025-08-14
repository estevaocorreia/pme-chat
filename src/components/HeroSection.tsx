import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Users, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">PME Chat</span>
            <br />
            <span className="text-foreground">Inteligente</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolucione sua comunicação empresarial com nossa plataforma de chat inteligente, 
            especialmente desenvolvida para pequenas e médias empresas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="hero-button px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Iniciar Conversa
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Saiba Mais
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in-up">
          <div className="bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Respostas Rápidas</h3>
            <p className="text-muted-foreground">
              Obtenha respostas instantâneas para suas dúvidas sobre gestão empresarial.
            </p>
          </div>

          <div className="bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Especializado em PME</h3>
            <p className="text-muted-foreground">
              Conhecimento específico para desafios de pequenas e médias empresas.
            </p>
          </div>

          <div className="bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Seguro e Confiável</h3>
            <p className="text-muted-foreground">
              Suas informações empresariais protegidas com a mais alta segurança.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};