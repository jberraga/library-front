import { Button } from "@/components/ui/button";
import { Book, Users, BookOpen, Clock, Search, Shield, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import HeroScene from "@/features/home/components/HeroScene.tsx";
import { Link } from "react-router";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Give models time to load (simulating 3 model loads)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden bg-background">
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-3xl animate-pulse"></div>
            <BookOpen className="relative w-20 h-20 text-primary animate-pulse drop-shadow-[0_0_25px_rgba(255,136,0,0.8)]" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Loading library...</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-card/30 to-card/50">
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: Math.max(0.5, 1 - scrollY / 800),
          }}
        >
          <HeroScene scrollY={scrollY} />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent will-change-transform"
          style={{
            transform: `scale(${1 + scrollY * 0.001})`,
          }}
        />
        <div
          className="absolute inset-0 opacity-10 will-change-transform"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff8800' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-0"></div>
        <div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            opacity: Math.max(0, 1 - scrollY / 600),
          }}
        >
          <div className="mb-8 inline-block relative">
            <div className="absolute inset-0 bg-primary/30 blur-3xl animate-pulse"></div>
            <BookOpen className="relative w-24 h-24 text-primary mx-auto drop-shadow-[0_0_25px_rgba(255,136,0,0.8)] animate-float" />
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent drop-shadow-2xl tracking-tight leading-tight">
            Library Manager
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Streamline your library operations. <span className="text-primary font-semibold">Empower readers.</span> Manage books effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link to="/register">
              <Button size="lg" className="text-xl px-12 py-8 shadow-[0_0_40px_rgba(255,136,0,0.4)] hover:shadow-[0_0_60px_rgba(255,136,0,0.7)] transition-all hover:scale-105 font-semibold group">
                Get Started
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-2 border-primary/60 hover:border-primary hover:bg-primary/20 hover:scale-105 transition-all font-semibold">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
          }}
        >
          <div className="relative w-8 h-14 border-2 border-primary/70 rounded-full flex justify-center shadow-[0_0_25px_rgba(255,136,0,0.4)] bg-background/20 backdrop-blur-sm">
            <div className="w-1.5 h-4 bg-primary rounded-full mt-3 animate-bounce shadow-[0_0_15px_rgba(255,136,0,0.9)]" />
          </div>
        </div>
      </section>
      <section className="relative py-40 px-4 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background/80 via-background/40 to-transparent z-0"></div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent will-change-transform"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 400) * 0.2)}px)`,
          }}
        />
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div
            className="text-center mb-24 will-change-transform"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 300) / 300)),
              transform: `translateY(${Math.max(0, 50 - (scrollY - 300) * 0.1)}px)`,
            }}
          >
            <div className="inline-block mb-4 px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-semibold">
              Features
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-6 text-foreground tracking-tight">
              Everything You Need
            </h2>
            <p className="text-2xl text-muted-foreground/80 max-w-3xl mx-auto font-light">
              A comprehensive solution for <span className="text-primary font-semibold">modern library management</span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Book,
                title: "Book Management",
                description: "Add, edit, and organize your entire book collection with ease. Track availability and manage inventory.",
                color: "primary",
              },
              {
                icon: Users,
                title: "User Management",
                description: "Manage borrowers and librarians. Track user history and borrowing patterns.",
                color: "accent",
              },
              {
                icon: Search,
                title: "Smart Search",
                description: "Powerful search functionality to find books by title, author, genre, or ISBN instantly.",
                color: "primary",
              },
              {
                icon: Clock,
                title: "Borrowing System",
                description: "Seamless check-in and check-out process. Automated reminders for due dates.",
                color: "accent",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Built with security in mind. Your data is protected with industry-standard encryption.",
                color: "primary",
              },
              {
                icon: BookOpen,
                title: "Analytics",
                description: "Gain insights into borrowing trends, popular books, and library usage statistics.",
                color: "accent",
              },
            ].map((feature, index) => {
              const cardOffset = 600 + index * 100;
              const cardOpacity = Math.min(1, Math.max(0, (scrollY - cardOffset + 200) / 300));
              const cardTransform = Math.max(0, 30 - (scrollY - cardOffset) * 0.05);

              return (
                <div
                  key={index}
                  className="group relative p-10 rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,136,0,0.25)] will-change-transform overflow-hidden"
                  style={{
                    opacity: cardOpacity,
                    transform: `translateY(${cardTransform}px)`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,136,0,0.4)]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground/80 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="relative py-24 md:py-36 lg:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-card/50 to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 136, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 170, 68, 0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-block mb-4 md:mb-6 px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/40 rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase shadow-lg">
              ✨ Get Started Today
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent tracking-tight px-4">
              Choose Your Path
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground/80 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Whether you're a <span className="text-primary font-bold bg-primary/10 px-2 md:px-3 py-1 rounded-lg">reader</span> or a <span className="text-accent font-bold bg-accent/10 px-2 md:px-3 py-1 rounded-lg">librarian</span>, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 max-w-6xl mx-auto">
            <div
              className="group relative will-change-transform"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 1300) / 300))
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-primary/50 to-primary/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl group-hover:blur-2xl md:group-hover:blur-3xl transition-all duration-700 opacity-50 group-hover:opacity-100 animate-pulse" />
              <div className="relative p-6 sm:p-8 lg:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border-2 border-primary/30 group-hover:border-primary/70 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(255,136,0,0.4)] h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
                <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 lg:w-24 md:h-20 lg:h-24 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary via-primary to-orange-600 mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-[0_0_30px_rgba(255,136,0,0.6)] md:shadow-[0_0_40px_rgba(255,136,0,0.6)] group-hover:shadow-[0_0_50px_rgba(255,136,0,0.9)] md:group-hover:shadow-[0_0_60px_rgba(255,136,0,0.9)]">
                  <Book className="w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 text-primary-foreground drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl md:rounded-2xl" />
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 md:mb-4 text-foreground relative z-10 group-hover:text-primary transition-colors duration-500">
                  For Readers
                </h3>
                <p className="text-muted-foreground/90 mb-6 md:mb-10 text-base md:text-lg leading-relaxed relative z-10">
                  Discover, borrow, and enjoy books from our extensive collection with a seamless experience
                </p>
                <ul className="space-y-4 md:space-y-6 mb-6 md:mb-10 flex-grow relative z-10">
                  <li className="flex items-start gap-3 md:gap-4 group/item">
                    <div className="p-1 bg-primary/20 rounded-lg group-hover/item:bg-primary/30 transition-colors flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1 text-foreground">Easy Book Discovery</div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">Browse and search our vast catalog effortlessly</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4 group/item">
                    <div className="p-1 bg-primary/20 rounded-lg group-hover/item:bg-primary/30 transition-colors flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1 text-foreground">Digital Borrowing History</div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">Track all your borrowed books in one place</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4 group/item">
                    <div className="p-1 bg-primary/20 rounded-lg group-hover/item:bg-primary/30 transition-colors flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1 text-foreground">Smart Recommendations</div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">Get personalized book suggestions based on your interests</div>
                    </div>
                  </li>
                </ul>

                <Link to="/register" className="w-full">
                  <Button size="lg" className="w-full group-hover:scale-105 transition-all duration-500 shadow-[0_10px_40px_rgba(255,136,0,0.4)] hover:shadow-[0_20px_60px_rgba(255,136,0,0.6)] text-base md:text-lg py-6 md:py-8 font-bold relative z-10 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary">
                    Start Borrowing Today
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="group relative will-change-transform"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 1300) / 300))
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-accent via-accent/50 to-accent/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl group-hover:blur-2xl md:group-hover:blur-3xl transition-all duration-700 opacity-50 group-hover:opacity-100 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="relative p-6 sm:p-8 lg:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border-2 border-accent/30 group-hover:border-accent/70 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(255,170,68,0.4)] h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-bl from-accent/20 to-transparent rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full" />
                <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 lg:w-24 md:h-20 lg:h-24 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent via-accent to-yellow-600 mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-[0_0_30px_rgba(255,170,68,0.6)] md:shadow-[0_0_40px_rgba(255,170,68,0.6)] group-hover:shadow-[0_0_50px_rgba(255,170,68,0.9)] md:group-hover:shadow-[0_0_60px_rgba(255,170,68,0.9)]">
                  <Shield className="w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 text-accent-foreground drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl md:rounded-2xl" />
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 md:mb-4 text-foreground relative z-10 group-hover:text-accent transition-colors duration-500">
                  For Librarians
                </h3>
                <p className="text-muted-foreground/90 mb-6 md:mb-10 text-base md:text-lg leading-relaxed relative z-10">
                  Powerful tools to streamline library operations and gain valuable insights
                </p>
                <ul className="space-y-4 md:space-y-6 mb-6 md:mb-10 flex-grow relative z-10">
                  <li className="flex items-start gap-3 md:gap-4 group/item">
                    <div className="p-1 bg-accent/20 rounded-lg group-hover/item:bg-accent/30 transition-colors flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1 text-foreground">Complete Catalog Management</div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">Add, edit, and organize your entire collection</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4 group/item">
                    <div className="p-1 bg-accent/20 rounded-lg group-hover:item:bg-accent/30 transition-colors flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1 text-foreground">User & Borrowing Tracking</div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">Monitor all library activities in real-time</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4 group/item">
                    <div className="p-1 bg-accent/20 rounded-lg group-hover:item:bg-accent/30 transition-colors flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="font-bold text-base md:text-lg mb-1 text-foreground">Analytics & Insights</div>
                      <div className="text-xs md:text-sm text-muted-foreground/80">Make data-driven decisions with detailed reports</div>
                    </div>
                  </li>
                </ul>

                <Link to="/dashboard" className="w-full">
                  <Button size="lg" variant="outline" className="w-full group-hover:scale-105 transition-all duration-500 border-2 border-accent/60 hover:border-accent hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/30 text-base md:text-lg py-6 md:py-8 font-bold relative z-10 shadow-[0_10px_40px_rgba(255,170,68,0.2)] hover:shadow-[0_20px_60px_rgba(255,170,68,0.4)]">
                    Access Dashboard
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
