import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Youtube, Shield, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">01</span>
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Contact</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              Hai să vorbim
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              Sunt deschis la oportunități și colaborări în domeniul securității cibernetice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">02</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Informații Contact</h2>
              </div>

              <div className="space-y-6 mb-12">
                <div className="bg-secondary p-8 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <h3 className="font-heading text-xl font-bold text-secondary-foreground">Email</h3>
                  </div>
                  <p className="text-secondary-foreground/80 font-paragraph text-base">
                    contact@liviubucel.ro
                  </p>
                </div>

                <div className="bg-surfacedark p-8 rounded-lg">
                  <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                    Disponibilitate
                  </h3>
                  <p className="text-secondary-foreground/80 font-paragraph text-base leading-relaxed">
                    Deschis la oportunități din România, Regatul Unit și internațional.
                  </p>
                </div>
              </div>

              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-8 py-6 w-full lg:w-auto">
                <Download className="w-5 h-5 mr-2" />
                Descarcă CV-ul
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">03</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Profiluri Sociale</h2>
              </div>

              <div className="space-y-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-secondary p-6 rounded-lg hover:border-l-4 hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-surfacedark flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Github className="w-6 h-6 text-secondary-foreground group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                      GitHub
                    </h4>
                    <p className="text-secondary-foreground/70 font-paragraph text-sm">
                      Proiecte și contribuții open source
                    </p>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-secondary p-6 rounded-lg hover:border-l-4 hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-surfacedark flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Linkedin className="w-6 h-6 text-secondary-foreground group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                      LinkedIn
                    </h4>
                    <p className="text-secondary-foreground/70 font-paragraph text-sm">
                      Profil profesional și networking
                    </p>
                  </div>
                </a>

                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-secondary p-6 rounded-lg hover:border-l-4 hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-surfacedark flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Twitter className="w-6 h-6 text-secondary-foreground group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                      X (Twitter)
                    </h4>
                    <p className="text-secondary-foreground/70 font-paragraph text-sm">
                      Actualizări și insights tehnice
                    </p>
                  </div>
                </a>

                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-secondary p-6 rounded-lg hover:border-l-4 hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-surfacedark flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Youtube className="w-6 h-6 text-secondary-foreground group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                      YouTube
                    </h4>
                    <p className="text-secondary-foreground/70 font-paragraph text-sm">
                      Tutoriale și demonstrații tehnice
                    </p>
                  </div>
                </a>

                <a 
                  href="https://tryhackme.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-secondary p-6 rounded-lg hover:border-l-4 hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-surfacedark flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Shield className="w-6 h-6 text-secondary-foreground group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-secondary-foreground group-hover:text-primary transition-colors">
                      TryHackMe
                    </h4>
                    <p className="text-secondary-foreground/70 font-paragraph text-sm">
                      Profil și realizări în cybersecurity
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
              Susține activitatea mea
            </h2>
            <p className="text-secondary-foreground/80 font-paragraph text-lg mb-8 max-w-2xl mx-auto">
              Dacă apreciezi munca mea și vrei să susții cercetarea și proiectele în domeniul securității cibernetice.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-8 py-6">
              Susține
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
