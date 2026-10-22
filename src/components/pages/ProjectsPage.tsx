import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Proiecte } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Proiecte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async (loadMore = false) => {
    try {
      const result = await BaseCrudService.getAll<Proiecte>('proiecte', {}, { 
        limit: 6, 
        skip: loadMore ? skip : 0 
      });
      
      if (loadMore) {
        setProjects(prev => [...prev, ...result.items]);
      } else {
        setProjects(result.items);
      }
      
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadProjects(true);
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
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Portofoliu</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              Proiecte Tehnice
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              Explorează proiectele mele în domeniul securității cibernetice, ethical hacking și investigații digitale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : projects.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, idx) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Link to={`/projects/${project._id}`} className="group block">
                        <div className="bg-secondary rounded-lg overflow-hidden hover:border-l-4 hover:border-primary transition-all h-full">
                          {project.projectImage && (
                            <div className="relative h-64 overflow-hidden">
                              <Image 
                                src={project.projectImage}
                                alt={project.projectTitle || 'Project image'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                width={400}
                              />
                            </div>
                          )}
                          
                          <div className="p-6">
                            <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-3 group-hover:text-primary transition-colors">
                              {project.projectTitle}
                            </h3>
                            
                            {project.detailedDescription && (
                              <p className="text-secondary-foreground/70 font-paragraph text-sm mb-4 line-clamp-3">
                                {project.detailedDescription}
                              </p>
                            )}

                            {project.technologiesUsed && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologiesUsed.split(',').slice(0, 3).map((tech, i) => (
                                  <span key={i} className="px-3 py-1 bg-surfacedark text-secondary-foreground/80 font-paragraph text-xs rounded">
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-divider/10">
                              {project.completionDate && (
                                <div className="flex items-center gap-2 text-secondary-foreground/60">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-paragraph text-xs">
                                    {format(new Date(project.completionDate), 'MMMM yyyy', { locale: ro })}
                                  </span>
                                </div>
                              )}
                              
                              {project.projectLink && (
                                <ExternalLink className="w-5 h-5 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {hasNext && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={handleLoadMore}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base px-8 py-6"
                    >
                      Încarcă mai multe proiecte
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 font-paragraph text-lg">
                  Nu există proiecte disponibile momentan.
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
