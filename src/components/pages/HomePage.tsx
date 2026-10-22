// HPI 1.7-V
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter, Youtube, Shield, ArrowRight, Terminal, Activity, Mail, Lock, FileText, Award, BookOpen } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { BaseCrudService } from '@/integrations';
import { AbonaiNewsletter } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  // --- CANONICAL DATA & LOGIC PRESERVATION ---
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [myTime, setMyTime] = useState('');
  const [yourTime, setYourTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const myTimeStr = now.toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Bucharest'
      });
      const yourTimeStr = now.toLocaleTimeString('ro-RO', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      setMyTime(myTimeStr);
      setYourTime(yourTimeStr);
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setSubmitMessage('Te rog să accepți Politica de confidențialitate.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await BaseCrudService.create<AbonaiNewsletter>('abonatinewsletter', {
        _id: crypto.randomUUID(),
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
        privacyPolicyAgreement: agreed,
        subscriptionDate: new Date().toISOString()
      });
      
      setSubmitMessage('Abonare reușită! Vei primi alertele pe e-mail.');
      setEmail('');
      setFirstName('');
      setLastName('');
      setAgreed(false);
    } catch (error) {
      setSubmitMessage('A apărut o eroare. Te rog să încerci din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const expertiseAreas = [
    { title: 'Ethical Hacking', desc: 'Testare de penetrare și identificare vulnerabilități' },
    { title: 'Investigații Digitale', desc: 'Analiză forensică și investigarea incidentelor' },
    { title: 'Criptografie', desc: 'Securizarea datelor și comunicațiilor' },
    { title: 'Testare de Penetrare', desc: 'Evaluări complete de securitate' },
    { title: 'Evaluări de Securitate', desc: 'Audit și conformitate securitate' },
    { title: 'Cercetarea Vulnerabilităților', desc: 'Descoperirea și raportarea vulnerabilităților' }
  ];

  // --- ANIMATION & LAYOUT REFS ---
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* 
          HERO SECTION 
          Inspired by the provided image: Full bleed, bottom-heavy content, 
          high contrast, technical aesthetic.
        */}
        <section 
          ref={heroRef}
          className="relative w-full h-[100vh] min-h-[800px] flex flex-col justify-end bg-secondary overflow-hidden"
        >
          {/* Parallax Background */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <Image 
              src="https://static.wixstatic.com/media/a4f45c_b5bead6f38a249a1ac48e943346cd386~mv2.png?originWidth=1920&originHeight=1024"
              alt="Cybersecurity Operations"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              width={1920}
            />
            {/* Gradient overlay to ensure text readability at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
          </motion.div>

          {/* Content Container - Bottom Aligned */}
          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-12 lg:pb-24">
            
            {/* Top Accent Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="w-full h-[1px] bg-white/20 mb-12 origin-left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              
              {/* Left: Main Headline */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary font-heading text-sm tracking-[0.2em] uppercase">
                    Liviu Bucel · Specialist Securitate
                  </span>
                </div>
                <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-secondary-foreground leading-[1.1] tracking-tight">
                  Securitate Cibernetică <br />
                  <span className="text-white/40">&</span> Ethical Hacking
                </h1>
              </motion.div>

              {/* Right: Supporting Text & CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-4 flex flex-col gap-8"
              >
                <p className="text-secondary-foreground/80 text-lg font-paragraph leading-relaxed border-l border-primary/50 pl-6">
                  Mă interesează cum funcționează atacurile, cum sunt descoperite vulnerabilitățile și cum pot fi investigate incidentele. Aici îmi prezint proiectele și activitatea tehnică.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-heading text-sm font-bold tracking-wider">
                    FĂ-O, DAR FĂ-O BINE!
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 
          EXPERTISE SECTION 
          Sticky left column, scrolling bento grid on the right.
        */}
        <section className="w-full bg-background py-24 lg:py-32 relative">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Header */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-primary font-heading text-xl font-bold">01</span>
                    <div className="h-[1px] flex-grow bg-divider" />
                  </div>
                  <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                    Arii de <br />Expertiză
                  </h2>
                  <p className="text-foreground/70 font-paragraph text-lg mb-8">
                    Mă concentrez pe securitate practică și bazată pe dovezi: înțelegerea vulnerabilităților, investigarea incidentelor și reducerea riscurilor reale.
                  </p>
                </div>
              </div>

              {/* Scrolling Grid */}
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  {expertiseAreas.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group relative bg-white border border-divider p-8 hover:border-primary transition-colors duration-300 overflow-hidden"
                    >
                      {/* Hover Background Effect */}
                      <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-none bg-secondary flex items-center justify-center text-secondary-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-foreground/70 font-paragraph text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 
          LIVE OPERATIONS & SOCIALS
          Dark, technical aesthetic. Split layout.
        */}
        <section className="w-full bg-secondary py-24 border-y border-white/10">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left: Time / Terminal */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-surfacedark border border-white/10 p-8 lg:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                
                <div className="flex items-center gap-3 mb-12 text-white/50">
                  <Terminal className="w-5 h-5" />
                  <span className="font-heading text-sm tracking-widest uppercase">System Status: Active</span>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-primary font-heading text-xs uppercase tracking-widest mb-2">Ora Mea (București)</p>
                    <div className="font-heading text-4xl lg:text-5xl font-bold text-secondary-foreground tabular-nums tracking-tight">
                      {myTime || "00:00"}
                    </div>
                    <p className="text-white/40 font-paragraph text-xs mt-2">GMT+2 / GMT+3</p>
                  </div>
                  <div>
                    <p className="text-white/50 font-heading text-xs uppercase tracking-widest mb-2">Ora Ta (Locală)</p>
                    <div className="font-heading text-4xl lg:text-5xl font-bold text-white/80 tabular-nums tracking-tight">
                      {yourTime || "00:00"}
                    </div>
                    <p className="text-white/40 font-paragraph text-xs mt-2">Sincronizat</p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Social Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Github, label: 'GitHub', url: 'https://github.com' },
                  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
                  { icon: Twitter, label: 'X Profile', url: 'https://twitter.com' },
                  { icon: Youtube, label: 'YouTube', url: 'https://youtube.com' },
                  { icon: Shield, label: 'TryHackMe', url: 'https://tryhackme.com' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col items-center justify-center gap-4 bg-surfacedark border border-white/5 p-6 hover:bg-primary hover:border-primary transition-all duration-300"
                  >
                    <social.icon className="w-8 h-8 text-white/50 group-hover:text-primary-foreground transition-colors" />
                    <span className="font-heading text-xs text-white/70 group-hover:text-primary-foreground uppercase tracking-wider">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 
          NEWSLETTER SECTION
          High contrast form area.
        */}
        <section className="w-full bg-background py-24 lg:py-32 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-24 z-0" />

          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Text Content */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-primary font-heading text-xl font-bold">02</span>
                  <div className="h-[1px] flex-grow bg-divider" />
                </div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Romania <br />Cyber Monitor
                </h2>
                <p className="text-foreground/70 font-paragraph text-lg mb-8">
                  Alerte gratuite pe e-mail pentru revendicări ransomware și breșe de securitate din România. Rămâi informat, rămâi în siguranță.
                </p>
                <div className="flex items-center gap-3 text-sm font-heading text-foreground/60">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Monitorizare activă 24/7</span>
                </div>
              </div>

              {/* Form Container */}
              <div className="lg:col-span-7">
                <motion.form 
                  onSubmit={handleSubscribe} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-secondary p-8 lg:p-12 shadow-2xl relative"
                >
                  {/* Accent corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary" />

                  <div className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-white/60 font-heading text-xs uppercase tracking-wider">Prenume</label>
                        <Input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Ex: Ion"
                          className="bg-surfacedark border-white/10 text-secondary-foreground focus-visible:ring-primary focus-visible:border-primary h-12 rounded-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/60 font-heading text-xs uppercase tracking-wider">Nume</label>
                        <Input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Ex: Popescu"
                          className="bg-surfacedark border-white/10 text-secondary-foreground focus-visible:ring-primary focus-visible:border-primary h-12 rounded-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/60 font-heading text-xs uppercase tracking-wider">Adresă de e-mail *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nume@exemplu.ro"
                          required
                          className="bg-surfacedark border-white/10 text-secondary-foreground focus-visible:ring-primary focus-visible:border-primary h-12 pl-12 rounded-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pt-2">
                      <Checkbox
                        id="privacy"
                        checked={agreed}
                        onCheckedChange={(checked) => setAgreed(checked as boolean)}
                        className="mt-1 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-none"
                      />
                      <label htmlFor="privacy" className="text-white/70 font-paragraph text-sm cursor-pointer leading-relaxed">
                        Sunt de acord să primesc aceste e-mailuri conform{' '}
                        <Link to="/privacy" className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                          Politicii de confidențialitate
                        </Link>.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base h-14 rounded-none group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? 'Se procesează...' : 'Abonează-te Acum'}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </span>
                      {/* Button hover effect */}
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Button>

                    {submitMessage && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`p-4 border-l-4 text-sm font-paragraph ${
                          submitMessage.includes('reușită') 
                            ? 'bg-green-500/10 border-green-500 text-green-400' 
                            : 'bg-destructive/10 border-destructive text-destructive'
                        }`}
                      >
                        {submitMessage}
                      </motion.div>
                    )}
                  </div>
                </motion.form>
              </div>

            </div>
          </div>
        </section>

        {/* 
          QUICK LINKS / NAVIGATION HUB
          Large, architectural blocks for internal navigation.
        */}
        <section className="w-full bg-secondary py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10">
            {[
              { to: "/projects", title: "Proiecte", desc: "Explorează proiectele tehnice", icon: FileText },
              { to: "/experience", title: "Experiență", desc: "Istoric profesional", icon: Activity },
              { to: "/accreditations", title: "Acreditări", desc: "Certificări profesionale", icon: Award },
              { to: "/blog", title: "Blog", desc: "Articole tehnice", icon: BookOpen },
            ].map((link, idx) => (
              <Link key={idx} to={link.to} className="group block bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                <div className="relative z-10 p-12 lg:p-16 flex flex-col h-full min-h-[300px] justify-between">
                  <link.icon className="w-8 h-8 text-white/30 group-hover:text-primary-foreground/50 transition-colors duration-500" />
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-2 group-hover:text-primary-foreground transition-colors duration-500">
                      {link.title}
                    </h3>
                    <p className="text-white/50 font-paragraph text-sm group-hover:text-primary-foreground/80 transition-colors duration-500">
                      {link.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-12 right-12 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowRight className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}