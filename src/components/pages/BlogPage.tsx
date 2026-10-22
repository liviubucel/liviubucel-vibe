import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { BlogArticles } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function BlogPage() {
  const lang = getLanguage(useLocation().pathname);
  const [articles, setArticles] = useState<BlogArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async (loadMore = false) => {
    try {
      const result = await BaseCrudService.getAll<BlogArticles>('articoleblog', {}, { 
        limit: 6, 
        skip: loadMore ? skip : 0 
      });
      
      if (loadMore) {
        setArticles(prev => [...prev, ...result.items]);
      } else {
        setArticles(result.items);
      }
      
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadArticles(true);
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
              <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Articole</span>
            </div>
            
            <h1 className="font-heading text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6">
              {lang === 'ro' ? 'Blog Tehnic' : 'Security Writing'}
            </h1>
            
            <p className="text-secondary-foreground/80 text-xl font-paragraph max-w-4xl leading-relaxed">
              {lang === 'ro' ? 'Articole despre securitate cibernetică, ethical hacking și investigații digitale.' : 'Research, technical writing, incident analysis and evidence-led cybersecurity notes.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full bg-background py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : articles.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article, idx) => (
                    <motion.div
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Link to={localizedPath('/blog/' + (article.slug || article._id), lang)} className="group block h-full">
                        <div className="bg-secondary rounded-lg overflow-hidden hover:border-l-4 hover:border-primary transition-all h-full flex flex-col">
                          {article.featuredImage && (
                            <div className="relative h-64 overflow-hidden">
                              <Image 
                                src={article.featuredImage}
                                alt={article.articleTitle || 'Article image'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                width={400}
                              />
                            </div>
                          )}
                          
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-3 group-hover:text-primary transition-colors">
                              {article.articleTitle}
                            </h3>
                            
                            {article.excerpt && (
                              <p className="text-secondary-foreground/70 font-paragraph text-sm mb-4 line-clamp-3 flex-1">
                                {article.excerpt}
                              </p>
                            )}

                            {article.tags && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.split(',').slice(0, 3).map((tag, i) => (
                                  <span key={i} className="px-3 py-1 bg-surfacedark text-secondary-foreground/80 font-paragraph text-xs rounded">
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-divider/10 mt-auto">
                              <div className="flex items-center gap-4 text-secondary-foreground/60">
                                {article.publicationDate && (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-paragraph text-xs">
                                      {format(new Date(article.publicationDate), 'd MMM yyyy', { locale: ro })}
                                    </span>
                                  </div>
                                )}
                                
                                {article.author && (
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="font-paragraph text-xs">
                                      {article.author}
                                    </span>
                                  </div>
                                )}
                              </div>
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
                      Încarcă mai multe articole
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 font-paragraph text-lg">
                  Nu există articole disponibile momentan.
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
