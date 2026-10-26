import {useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {getPublishedBlogPosts,getPublishedBlogTags,type NativeBlogPost,type NativeBlogTag} from '@/lib/wix-blog';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import NordlysNewsletter from '@/components/nordlys/NordlysNewsletter';

/**
 * Faithful React rendering of Nordlys PostsList.astro + PostsListItem.astro.
 * Wix Blog remains the authoritative data source. The original theme
 * defaults to a five-entry unboxed editorial list, followed by Pagination.
 */
const PAGE_SIZE=5;
const postPath=(post:NativeBlogPost,lang:'en'|'ro')=>
  localizedPath('/blog/'+(post.slug||post.id||post._id),lang);

export default function BlogPage(){
  const lang=getLanguage(useLocation().pathname);
  const ro=lang==='ro';
  const [posts,setPosts]=useState<NativeBlogPost[]>([]);
  const [tags,setTags]=useState<NativeBlogTag[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [page,setPage]=useState(0);

  useEffect(()=>{
    let active=true;
    Promise.all([getPublishedBlogPosts(),getPublishedBlogTags().catch(()=>[] as NativeBlogTag[])])
      .then(([items,realTags])=>{if(active){setPosts(items);setTags(realTags)}})
      .catch(()=>{if(active)setError(true)})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[]);

  const pageCount=Math.max(1,Math.ceil(posts.length/PAGE_SIZE));
  const visible=posts.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
  const changePage=(next:number)=>{
    setPage(next);
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };

  return <section aria-label={ro?'Articole publicate':'Published posts'}>
    <h1 className="nordlys-page-title">Blog</h1>
    <p className="nordlys-page-lead">{ro
      ?'Articole tehnice, cercetare și analize de securitate cibernetică.'
      :'Technical notes, research and cybersecurity analysis.'}</p>

    {loading&&<p role="status">{ro?'Se încarcă articolele…':'Loading posts…'}</p>}
    {error&&<p role="alert">{ro?'Articolele nu sunt disponibile momentan.':'Posts are temporarily unavailable.'}</p>}
    {!loading&&!error&&posts.length===0&&<p>{ro?'Nu există articole publicate.':'No published posts yet.'}</p>}

    <ul className="nordlys-upstream-index">
      {visible.map((post,index)=><li className="nordlys-upstream-list-item" key={post.id||post._id||post.slug}>
        <article className="nordlys-upstream-post">
          <div className="nordlys-upstream-post-body">
            <div className="nordlys-upstream-heading-row">
              <h2><Link viewTransition to={postPath(post,lang)}>{post.title}</Link></h2>
              {post.firstPublishedDate&&<time className="nordlys-upstream-date" dateTime={new Date(post.firstPublishedDate).toISOString()}>
                {new Date(post.firstPublishedDate).toLocaleDateString(ro?'ro-RO':'en-GB',{day:'numeric',month:'short',year:'numeric'})}
              </time>}
            </div>
            {!!post.tagIds?.length&&<div className="nordlys-upstream-tags">
              {tags.filter(tag=>post.tagIds?.includes(tag.id)).map(tag=><Link viewTransition className="nordlys-upstream-tag" key={tag.id} to={localizedPath('/tags/'+tag.slug,lang)}>{tag.label}</Link>)}
            </div>}
            {!!post.excerpt&&<p className="nordlys-upstream-description">{post.excerpt}</p>}
          </div>
        </article>
        {index!==visible.length-1&&<hr className="nordlys-upstream-separator"/>}
      </li>)}
    </ul>

    {pageCount>1&&<nav className="nordlys-upstream-pagination" aria-label={ro?'Paginarea articolelor':'Posts pagination'}>
      <button type="button" disabled={page===0} onClick={()=>changePage(page-1)}>{ro?'Anterior':'Previous'}</button>
      <span>{page+1} / {pageCount}</span>
      <button type="button" disabled={page===pageCount-1} onClick={()=>changePage(page+1)}>{ro?'Următor':'Next'}</button>
    </nav>}

    <NordlysNewsletter/>
  </section>;
}
