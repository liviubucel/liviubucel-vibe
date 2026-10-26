import type {APIRoute} from 'astro';
import {submissions} from '@wix/forms';
import {auth} from '@wix/essentials';
export const prerender=false;
const FORM_ID='350bbd87-09af-4295-9dbc-7e9cab1123bb';
const json=(data:object,status=200)=>new Response(JSON.stringify(data),{
 status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}
});
export const POST:APIRoute=async ({request})=>{
  const origin=request.headers.get('origin');
  const target=new URL(request.url);
  // Cross-site browser form submissions are never accepted.
  if(!origin||!URL.canParse(origin)||new URL(origin).origin!==target.origin)
    return json({error:'Forbidden origin'},403);
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))
    return json({error:'Invalid content type'},415);
  if(Number(request.headers.get('content-length')||0)>10000)return json({error:'Payload too large'},413);
  let input:Record<string,unknown>;
  try{input=await request.json()}catch{return json({error:'Invalid JSON'},400)}
  if(!input||typeof input!=='object')return json({error:'Invalid request'},400);
  if(typeof input.website==='string'&&input.website.length>0)return json({ok:true});
  const fields=['name','email','subject','message'] as const;
  if(fields.some(key=>typeof input[key]!=='string'))return json({error:'Required fields missing'},400);
  const name=String(input.name).trim(),email=String(input.email).trim().toLowerCase(),subject=String(input.subject).trim(),message=String(input.message).trim();
  if(name.length<2||name.length>120||email.length>254||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))||
     subject.length<3||subject.length>180||message.length<10||message.length>6000)
    return json({error:'Invalid form fields'},400);
  try{
    const create=auth.elevate(submissions.createSubmission);
    await create({formId:FORM_ID,submissions:{first_name:name,email,subject,message}});
    return json({ok:true});
  }catch(e){console.error('[nordlys-contact] Wix Forms submission failed:',e instanceof Error?e.message:'Unknown error');return json({error:'Form submission temporarily unavailable'},503)}
};
