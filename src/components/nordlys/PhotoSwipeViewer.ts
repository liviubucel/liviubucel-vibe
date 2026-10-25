/**
 * Original Nordlys uses PhotoSwipe 5.4.4 with thumbs and dynamic captions.
 * These exact MIT-licensed libraries are vendored locally, to avoid
 * third-party CDN dependencies and unsupported Wix Vibe npm imports.
 * Original wiring: FjellOverflow/nordlys/src/plugins/photoSwipePlugin.ts.
 */
export type PhotoSwipeImage={src:string;alt:string};
type ImageData=PhotoSwipeImage & {msrc:string;width:number;height:number};

async function dimensioned(photo:PhotoSwipeImage):Promise<ImageData>{
  return new Promise(resolve=>{
    const img=new window.Image();
    const complete=(width:number,height:number)=>resolve({
      ...photo,msrc:photo.src,width,height
    });
    img.onload=()=>complete(img.naturalWidth||1600,img.naturalHeight||900);
    img.onerror=()=>complete(1600,900);
    img.src=photo.src;
  });
}

export async function openNordlysPhotoSwipe(photos:PhotoSwipeImage[],index:number):Promise<void>{
  if(!photos.length || index<0 || index>=photos.length)return;
  const [lightboxModule,captionModule,thumbsModule,data]=await Promise.all([
    import('../../vendor/photoswipe/photoswipe-lightbox.esm.js'),
    import('../../vendor/photoswipe/photoswipe-dynamic-caption-plugin.esm.js'),
    import('../../vendor/photoswipe/photoswipe-thumbs-plugin.esm.js'),
    Promise.all(photos.map(dimensioned))
  ]);
  const lightbox=new lightboxModule.default({
    pswpModule:()=>import('../../vendor/photoswipe/photoswipe.esm.js'),
    dataSource:data,
    padding:{top:15,bottom:95,left:15,right:15},
    bgOpacity:.8,zoom:false
  });
  new thumbsModule.default(lightbox);
  new captionModule.default(lightbox,{
    type:'below',mobileLayoutBreakpoint:false,
    captionContent:(slide:{data?:{alt?:string}})=>slide.data?.alt||''
  });
  lightbox.init();
  lightbox.loadAndOpen(index);
  // Core PhotoSwipe closes itself and releases swipe/key handlers.
  lightbox.on('close',()=>{
    window.setTimeout(()=>lightbox.destroy(),600);
  });
}
