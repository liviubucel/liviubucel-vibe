import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Despre mine</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              Salut, sunt Liviu
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              Specialist în securitate cibernetică, deschis oportunităților din România, Regatul Unit și internațional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-secondary p-12 rounded-lg">
                <Image 
                  src="https://static.wixstatic.com/media/a4f45c_4f8fe61673e34d2f821e13cdcdea31cf~mv2.png?originWidth=576&originHeight=384"
                  alt="Liviu Bucel - Cybersecurity Specialist"
                  className="w-full h-auto rounded-lg mb-6"
                  width={600}
                />
                <div className="border-l-4 border-primary pl-6">
                  <p className="text-secondary-foreground font-heading text-2xl font-bold">
                    FĂ-O, DAR FĂ-O BINE!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">02</span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">Despre activitatea mea</h2>
                </div>
                
                <p className="text-foreground/80 font-paragraph text-lg leading-relaxed mb-6">
                  Ariile mele principale de expertiză includ Ethical Hacking, Investigații Digitale, Criptografie și Operațiuni de Securitate. Mă concentrez pe securitate practică și bazată pe dovezi, de la înțelegerea vulnerabilităților și incidentelor până la reducerea riscurilor reale.
                </p>

                <p className="text-foreground/80 font-paragraph text-lg leading-relaxed">
                  Mă interesează cum funcționează atacurile, cum sunt descoperite vulnerabilitățile și cum pot fi investigate incidentele. Aici îmi prezint proiectele și activitatea tehnică.
                </p>
              </div>

              <div className="bg-secondary p-8 rounded-lg">
                <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-6">Arii principale de expertiză</h3>
                <ul className="space-y-4">
                  {[
                    'Ethical Hacking',
                    'Investigații Digitale',
                    'Criptografie',
                    'Testare de Penetrare',
                    'Evaluări de Securitate',
                    'Cercetarea Vulnerabilităților'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xs font-bold flex-shrink-0 mt-1">
                        {idx + 1}
                      </span>
                      <span className="text-secondary-foreground font-paragraph text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surfacedark p-8 rounded-lg border-l-4 border-primary">
                <p className="text-secondary-foreground font-paragraph text-base leading-relaxed">
                  Mă concentrez pe securitate practică și bazată pe dovezi: înțelegerea vulnerabilităților, investigarea incidentelor și reducerea riscurilor reale pentru organizații și utilizatori.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media Mentions */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">03</span>
            <h2 className="font-heading text-4xl font-bold text-secondary-foreground">Apariții Media</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['PRO TV', 'Digi24', 'Agro TV'].map((media, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-surfacedark p-10 rounded-lg text-center hover:border-l-4 hover:border-primary transition-all"
              >
                <p className="font-heading text-3xl font-bold text-secondary-foreground">{media}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
