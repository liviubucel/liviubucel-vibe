import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { items } from '@wix/data';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { BlogArticles } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function BlogDetailPage() {
  const lang = getLanguage(useLocation().pathname);
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<BlogArticles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;
    
    try {
      const matching = await items.query('articoleblog').eq('slug', id).limit(1).find();
      const data = matching.items.length ? matching.items[0] as BlogArticles : await BaseCrudService.getById<BlogArticles>('articoleblog', id);
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
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
        ) : !article ? (
          <section className="w-full bg-secondary py-24">
            <div className="max-w-[100rem] mx-auto px-8 lg:px-16 text-center">
              <h1 className="font-heading text-4xl font-bold text-secondary-foreground mb-6">
                Articol negăsit
              </h1>
              <Link to={localizedPath('/blog',lang)}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Înapoi la blog
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="w-full bg-secondary py-24">
              <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
                <Link to={localizedPath('/blog',lang)} className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-primary font-paragraph text-sm mb-8 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Înapoi la blog
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-xl font-bold">01</span>
                    <span className="text-secondary-foreground/70 text-sm font-paragraph uppercase tracking-wider">Articol</span>
                  </div>
                  
                  <h1 className="font-heading text-5xl lg:text-6xl font-bold text-secondary-foreground mb-8">
                    {article.articleTitle}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6">
                    {article.publicationDate && (
                      <div className="flex items-center gap-2 text-secondary-foreground/70">
                        <Calendar className="w-5 h-5" />
                        <span className="font-paragraph text-base">
                          {format(new Date(article.publicationDate), 'd MMMM yyyy', { locale: ro })}
                        </span>
                      </div>
                    )}

                    {article.author && (
                      <div className="flex items-center gap-2 text-secondary-foreground/70">
                        <User className="w-5 h-5" />
                        <span className="font-paragraph text-base">
                          {article.author}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Featured Image */}
            {article.featuredImage && (
              <section className="w-full bg-background py-16">
                <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-lg overflow-hidden"
                  >
                    <Image 
                      src={article.featuredImage}
                      alt={article.articleTitle || 'Article image'}
                      className="w-full h-auto"
                      width={1200}
                    />
                  </motion.div>
                </div>
              </section>
            )}

            {/* Article Content */}
            <section className="w-full bg-background py-16">
              <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    {article.excerpt && (
                      <div className="bg-surfacedark p-8 rounded-lg border-l-4 border-primary mb-12">
                        <p className="text-secondary-foreground font-paragraph text-xl leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    )}

                    <div className="prose prose-lg max-w-none">
                      {article.fullContent && (
                        <div className="text-foreground/80 font-paragraph text-lg leading-relaxed whitespace-pre-wrap">
                          {article.fullContent}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    {article.tags && (
                      <div className="bg-secondary p-8 rounded-lg">
                        <div className="flex items-center gap-2 mb-6">
                          <Tag className="w-5 h-5 text-primary" />
                          <h3 className="font-heading text-xl font-bold text-secondary-foreground">
                            Etichete
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {article.tags.split(',').map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-4 py-2 bg-surfacedark text-secondary-foreground font-paragraph text-sm rounded"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-surfacedark p-8 rounded-lg border-l-4 border-primary">
                      <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                        Despre Autor
                      </h3>
                      {article.author && (
                        <p className="text-secondary-foreground/80 font-paragraph text-base mb-4">
                          {article.author}
                        </p>
                      )}
                      <p className="text-secondary-foreground/70 font-paragraph text-sm">
                        Specialist în securitate cibernetică și ethical hacking.
                      </p>
                    </div>
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
