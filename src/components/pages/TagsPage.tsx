import {useEffect,useState} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {getPublishedBlogPosts,getPublishedBlogTags,type NativeBlogPost,type NativeBlogTag} from '@/lib/wix-blog';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {setNordlysDocumentSEO} from '@/components/nordlys/NordlysSeo';

/**
 * Nordlys Tags index and tag detail, using the live Wix Blog taxonomy.
 * Follows the original TagsBar and PostsList templates; tags appear only
 * after they are assigned to posts in the Wix Blog management UI.
 */
export default function TagsPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const {tag:slug}=useParams<{tag:string}>();
  const [tags,setTags]=useState<NativeBlogTag[]>([]);
  const [posts,setPosts]=useState<NativeBlogPost[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  useEffect(()=>{
    let active=true;
    setLoading(true);setError(false);
    Promise.all([getPublishedBlogTags(),getPublishedBlogPosts()])
      .then(([realTags,realPosts])=>{if(active){setTags(realTags);setPosts(realPosts)}})
      .catch(()=>{if(active)setError(true)})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[]);

  const tag=slug?tags.find(t=>t.slug===slug):undefined;
  useEffect(()=>{if(tag)setNordlysDocumentSEO(tag.label,ro?'Articole din categoria '+tag.label:'Published articles tagged '+tag.label);},[tag?.id,tag?.label,ro]);
  const filtered=tag?posts.filter(post=>post.tagIds?.includes(tag.id)):[];
  return <section className="nordlys-upstream-tags-page">
    {slug&&<p className="nordlys-upstream-back"><Link viewTransition to={localizedPath('/tags',lang)}>← {ro?'Toate etichetele':'All tags'}</Link></p>}
    <h1 className="nordlys-page-title">{slug?(tag?.label|| (ro?'Etichetă':'Tag')):(ro?'Etichete':'Tags')}</h1>
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading…'}</p>}
    {error&&<p role="alert">{ro?'Etichetele nu sunt disponibile.':'Blog tags are temporarily unavailable.'}</p>}
    {!loading&&!error&&!slug&&<div className="nordlys-upstream-tag-index">
      {tags.map(t=><Link viewTransition key={t.id} to={localizedPath('/tags/'+t.slug,lang)}>
        {t.label} <span>({t.publishedPostCount})</span>
      </Link>)}
      {tags.length===0&&<p>{ro?'Nu există încă etichete publicate în Wix Blog.':'No published tags in Wix Blog yet.'}</p>}
    </div>}
    {!loading&&!error&&slug&&!tag&&<p>{ro?'Eticheta nu există.':'Tag not found.'}</p>}
    {!loading&&!error&&tag&&<ul className="nordlys-upstream-index">
      {filtered.map((post,index)=><li key={post.id||post._id||post.slug} className="nordlys-upstream-list-item">
        <article className="nordlys-upstream-post">
          <div className="nordlys-upstream-post-body">
            <div className="nordlys-upstream-heading-row">
              <h2><Link viewTransition to={localizedPath('/blog/'+(post.slug||post.id||post._id),lang)}>{post.title}</Link></h2>
              {post.firstPublishedDate&&<time className="nordlys-upstream-date" dateTime={new Date(post.firstPublishedDate).toISOString()}>{new Date(post.firstPublishedDate).toLocaleDateString(ro?'ro-RO':'en-GB')}</time>}
            </div>
            {post.excerpt&&<p className="nordlys-upstream-description">{post.excerpt}</p>}
          </div>
        </article>
        {index!==filtered.length-1&&<hr className="nordlys-upstream-separator"/>}
      </li>)}
      {filtered.length===0&&<li>{ro?'Niciun articol publicat cu această etichetă.':'No published posts with this tag.'}</li>}
    </ul>}
  </section>;
}
