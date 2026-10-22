import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Experien } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experien[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async (loadMore = false) => {
    try {
      const result = await BaseCrudService.getAll<Experien>('experienta', {}, { 
        limit: 6, 
        skip: loadMore ? skip : 0 
      });
      
      if (loadMore) {
        setExperiences(prev => [...prev, ...result.items]);
      } else {
        setExperiences(result.items);
      }
      
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadExperiences(true);
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
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Carieră</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              Experiență Profesională
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              Istoric profesional și experiența mea de lucru în domeniul securității cibernetice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : experiences.length > 0 ? (
              <>
                <div className="space-y-8">
                  {experiences.map((experience, idx) => (
                    <motion.div
                      key={experience._id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-secondary rounded-lg p-10 hover:border-l-4 hover:border-primary transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-primary-foreground" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-heading text-3xl font-bold text-secondary-foreground mb-3">
                            {experience.jobTitle}
                          </h3>
                          
                          {experience.company && (
                            <p className="text-secondary-foreground/80 font-paragraph text-lg mb-4">
                              {experience.company}
                            </p>
                          )}

                          <div className="flex items-center gap-3 mb-6">
                            <Calendar className="w-5 h-5 text-secondary-foreground/60" />
                            <span className="text-secondary-foreground/70 font-paragraph text-sm">
                              {experience.startDate && format(new Date(experience.startDate), 'MMMM yyyy', { locale: ro })}
                              {' - '}
                              {experience.endDate ? format(new Date(experience.endDate), 'MMMM yyyy', { locale: ro }) : 'Prezent'}
                            </span>
                          </div>

                          {experience.responsibilitiesAchievements && (
                            <div className="bg-surfacedark p-6 rounded-lg">
                              <h4 className="font-heading text-lg font-bold text-secondary-foreground mb-3">
                                Responsabilități și Realizări
                              </h4>
                              <p className="text-secondary-foreground/80 font-paragraph text-base leading-relaxed whitespace-pre-wrap">
                                {experience.responsibilitiesAchievements}
                              </p>
                            </div>
                          )}
                        </div>
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
                      Încarcă mai multă experiență
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 font-paragraph text-lg">
                  Nu există experiență disponibilă momentan.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
              Deschis la Oportunități
            </h2>
            <p className="text-secondary-foreground/80 font-paragraph text-lg mb-8 max-w-2xl mx-auto">
              Sunt interesat de oportunități în România, Regatul Unit și internațional.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-8 py-6">
              Descarcă CV-ul
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
