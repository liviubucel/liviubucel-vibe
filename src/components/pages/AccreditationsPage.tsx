import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Accreditations } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function AccreditationsPage() {
  const [accreditations, setAccreditations] = useState<Accreditations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadAccreditations();
  }, []);

  const loadAccreditations = async (loadMore = false) => {
    try {
      const result = await BaseCrudService.getAll<Accreditations>('acreditari', {}, { 
        limit: 9, 
        skip: loadMore ? skip : 0 
      });
      
      if (loadMore) {
        setAccreditations(prev => [...prev, ...result.items]);
      } else {
        setAccreditations(result.items);
      }
      
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading accreditations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadAccreditations(true);
  };

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
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Certificări</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              Acreditări Profesionale
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              Certificări și acreditări în domeniul securității cibernetice și tehnologiei informației.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accreditations Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : accreditations.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {accreditations.map((accreditation, idx) => (
                    <motion.div
                      key={accreditation._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-secondary rounded-lg p-8 hover:border-l-4 hover:border-primary transition-all"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-2">
                            {accreditation.certificationName}
                          </h3>
                          {accreditation.issuingOrganization && (
                            <p className="text-secondary-foreground/70 font-paragraph text-sm">
                              {accreditation.issuingOrganization}
                            </p>
                          )}
                        </div>
                      </div>

                      {accreditation.description && (
                        <p className="text-secondary-foreground/80 font-paragraph text-sm mb-6 leading-relaxed">
                          {accreditation.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-6 border-t border-divider/10">
                        {accreditation.dateObtained && (
                          <div className="flex items-center gap-2 text-secondary-foreground/60">
                            <Calendar className="w-4 h-4" />
                            <span className="font-paragraph text-xs">
                              {format(new Date(accreditation.dateObtained), 'MMMM yyyy', { locale: ro })}
                            </span>
                          </div>
                        )}
                        
                        {accreditation.verificationLink && (
                          <a 
                            href={accreditation.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hasNext && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={handleLoadMore}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-8 py-6"
                    >
                      Încarcă mai multe acreditări
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 font-paragraph text-lg">
                  Nu există acreditări disponibile momentan.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
