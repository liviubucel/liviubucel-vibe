import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowLeft } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Proiecte } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function ProjectDetailPage() {
  const lang = getLanguage(useLocation().pathname);
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Proiecte | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    
    try {
      const data = await BaseCrudService.getById<Proiecte>('proiecte', id);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !project ? (
          <section className="w-full bg-secondary py-24">
            <div className="max-w-[100rem] mx-auto px-8 lg:px-16 text-center">
              <h1 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
                Proiect negăsit
              </h1>
              <Link to={localizedPath('/projects',lang)}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Înapoi la proiecte
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="w-full bg-secondary py-24">
              <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
                <Link to={localizedPath('/projects',lang)} className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-primary font-paragraph text-sm mb-8 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Înapoi la proiecte
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">01</span>
                    <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Detalii Proiect</span>
                  </div>
                  
                  <h1 className="font-heading text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
                    {project.projectTitle}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    {project.completionDate && (
                      <div className="flex items-center gap-2 text-secondary-foreground/70">
                        <Calendar className="w-5 h-5" />
                        <span className="font-paragraph text-base">
                          {format(new Date(project.completionDate), 'MMMM yyyy', { locale: ro })}
                        </span>
                      </div>
                    )}

                    {project.projectLink && (
                      <a 
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Vizitează proiectul
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Project Image */}
            {project.projectImage && (
              <section className="w-full bg-background py-16">
                <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-lg overflow-hidden"
                  >
                    <Image 
                      src={project.projectImage}
                      alt={project.projectTitle || 'Project image'}
                      className="w-full h-auto"
                      width={1200}
                    />
                  </motion.div>
                </div>
              </section>
            )}

            {/* Project Content */}
            <section className="w-full bg-background py-16">
              <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">02</span>
                        <h2 className="font-heading text-3xl font-bold text-foreground">Descriere</h2>
                      </div>
                      
                      {project.detailedDescription && (
                        <div className="prose prose-lg max-w-none">
                          <p className="text-foreground/80 font-paragraph text-lg leading-relaxed whitespace-pre-wrap">
                            {project.detailedDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    {project.technologiesUsed && (
                      <div className="bg-secondary p-8 rounded-lg">
                        <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-6">
                          Tehnologii Utilizate
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {project.technologiesUsed.split(',').map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 bg-surfacedark text-secondary-foreground font-paragraph text-sm rounded"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.projectLink && (
                      <div className="bg-surfacedark p-8 rounded-lg border-l-4 border-primary">
                        <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                          Link Proiect
                        </h3>
                        <a 
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-paragraph text-base transition-colors break-all"
                        >
                          <ExternalLink className="w-5 h-5 flex-shrink-0" />
                          Vizitează
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
