import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Legal</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              Politica de Confidențialitate
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              Ultima actualizare: Octombrie 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg font-bold">1</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Introducere</h2>
              </div>
              <p className="text-foreground/80 font-paragraph text-base leading-relaxed">
                Această Politică de Confidențialitate descrie modul în care colectăm, utilizăm și protejăm informațiile personale pe care le furnizați prin intermediul acestui site web. Ne angajăm să protejăm confidențialitatea datelor dumneavoastră personale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg font-bold">2</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Informații Colectate</h2>
              </div>
              <div className="space-y-4">
                <p className="text-foreground/80 font-paragraph text-base leading-relaxed">
                  Colectăm următoarele tipuri de informații:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span><strong>Informații de contact:</strong> Nume, prenume și adresă de e-mail furnizate prin formularul de abonare la newsletter.</span>
                  </li>
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span><strong>Date de utilizare:</strong> Informații despre modul în care utilizați site-ul nostru.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg font-bold">3</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Utilizarea Informațiilor</h2>
              </div>
              <div className="space-y-4">
                <p className="text-foreground/80 font-paragraph text-base leading-relaxed">
                  Utilizăm informațiile colectate pentru:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Trimiterea de alerte prin e-mail despre revendicări ransomware și breșe de securitate din România (Romania Cyber Monitor).</span>
                  </li>
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Îmbunătățirea serviciilor și conținutului site-ului.</span>
                  </li>
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Comunicarea cu dumneavoastră în legătură cu serviciile noastre.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg font-bold">4</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Protecția Datelor</h2>
              </div>
              <p className="text-foreground/80 font-paragraph text-base leading-relaxed">
                Implementăm măsuri de securitate tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră personale împotriva accesului neautorizat, modificării, divulgării sau distrugerii. Datele sunt stocate în mod securizat și sunt accesibile doar personalului autorizat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg font-bold">5</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Drepturile Dumneavoastră</h2>
              </div>
              <div className="space-y-4">
                <p className="text-foreground/80 font-paragraph text-base leading-relaxed">
                  Aveți următoarele drepturi în legătură cu datele dumneavoastră personale:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Dreptul de acces la datele personale</span>
                  </li>
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Dreptul de rectificare a datelor incorecte</span>
                  </li>
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Dreptul de ștergere a datelor (dreptul de a fi uitat)</span>
                  </li>
                  <li className="text-foreground/80 font-paragraph text-base leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                    <span>Dreptul de a vă dezabona de la newsletter în orice moment</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg font-bold">6</span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Contact</h2>
              </div>
              <p className="text-foreground/80 font-paragraph text-base leading-relaxed">
                Pentru orice întrebări sau solicitări legate de această Politică de Confidențialitate sau de datele dumneavoastră personale, vă rugăm să ne contactați la: <a href="mailto:contact@liviubucel.ro" className="text-primary hover:underline">contact@liviubucel.ro</a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
