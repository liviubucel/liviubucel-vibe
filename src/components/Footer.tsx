import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Youtube, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary border-t border-divider/10">
      <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading text-lg font-bold">LB</span>
              </div>
              <span className="font-heading text-lg font-bold text-secondary-foreground">Liviu Bucel</span>
            </div>
            <p className="text-secondary-foreground/70 font-paragraph text-sm leading-relaxed">
              Specialist în securitate cibernetică, ethical hacking și investigații digitale.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">Navigare</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Despre mine
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Proiecte
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">Resurse</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/accreditations" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Acreditări
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Experiență
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-foreground/70 hover:text-primary font-paragraph text-sm transition-colors">
                  Politica de confidențialitate
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-secondary-foreground mb-4">Conectează-te</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-surfacedark flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-surfacedark flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-surfacedark flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-surfacedark flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://tryhackme.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-surfacedark flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="TryHackMe"
              >
                <Shield className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-divider/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/60 font-paragraph text-sm flex items-center gap-2">
              © {currentYear} · Creat cu <Heart className="w-4 h-4 text-primary fill-primary" /> de Liviu Bucel
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-secondary-foreground/60 hover:text-primary font-paragraph text-sm transition-colors">
                Politica de confidențialitate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
