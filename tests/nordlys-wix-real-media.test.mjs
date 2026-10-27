import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

const source=await readFile(new URL('../src/lib/wix-portfolio.ts',import.meta.url),'utf8');
const transpiled=ts.transpileModule(source,{fileName:'wix-portfolio.ts',
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},
  reportDiagnostics:true});
assert.equal(transpiled.diagnostics?.length||0,0,'typescript transpilation');
let lastQuery=null,rows=[],queries=0;
const fakeSdk={
  items:{query(collection){
    assert.ok(['Portfolio/Projects','Portfolio/ProjectItems'].includes(collection));
    queries++;
    return {
      hasSome(field,ids){
        lastQuery={collection,field,ids};
        return {limit(max){
          assert.equal(max,100);
          return {find:async()=>({items:rows})};
        }};
      },
      limit(){return {find:async()=>({items:rows})};}
    };
  }}
};
const exports={};
vm.runInNewContext(transpiled.outputText,{
  exports,require(name){assert.equal(name,'@wix/data');return fakeSdk;},URL,console
});
const {wixPortfolioImageUrl,projectCoverUrl,getNativeProjectGallery}=exports;
const imageId='a4f45c_26ee653dff9b40d6a8443e34ff197f72~mv2.png';
test('Wix-native cover URL handles actual Portfolio CMS wix:image reference',()=>{
  const cover={imageInfo:'wix:image://v1/'+imageId+'/zebrabyte-website-live.png#originWidth=1440&originHeight=1000'};
  assert.equal(wixPortfolioImageUrl(cover),'https://static.wixstatic.com/media/'+imageId);
  assert.equal(projectCoverUrl({title:'ZebraByte',coverImage:cover}),'https://static.wixstatic.com/media/'+imageId);
  assert.equal(wixPortfolioImageUrl({imageInfo:{id:imageId}}),'https://static.wixstatic.com/media/'+imageId);
  assert.equal(wixPortfolioImageUrl({imageInfo:{url:'https://static.wixstatic.com/media/'+imageId}}),
    'https://static.wixstatic.com/media/'+imageId);
});

test('No cross-host, traversal, data-URI or script can appear in the project image URL',()=>{
  for(const invalid of [null,undefined,'javascript:alert(1)','https://evil.example/image.png',
    'wix:image://v1/../../private','wix:image://v1/a4f45c_slug~mv2.png?inject=true',
    {imageInfo:'data:image/svg+xml,<svg/>',url:'https://evil.example'}]){
    assert.equal(wixPortfolioImageUrl(invalid),undefined,String(invalid));
  }
});

test('SSL gallery is dynamically fetched from Wix Portfolio/ProjectItems and sorted',async()=>{
  rows=[
    {_id:'8d846d7f-0a0e-425e-af76-461f5502b5f5',sortOrder:3,type:'IMAGE',image:{imageInfo:'wix:image://v1/a4f45c_4763f402ec344061b072d5da67b90ba9~mv2.webp/x.webp'}},
    {_id:'167eca22-4d88-4083-b7ad-5b4059e49852',sortOrder:2,type:'IMAGE',image:{imageInfo:'wix:image://v1/a4f45c_5ff797a1fffe41b1b669cb7eb1e8cd55~mv2.webp/x.webp'}},
    {_id:'87b2dbb2-8af5-488a-991a-3e5010b303d9',sortOrder:1,type:'IMAGE',image:{imageInfo:'wix:image://v1/a4f45c_76689fa553ec4d22bd6ce269bfa6bf0d~mv2.webp/x.webp'}},
    {_id:'00000000-0000-4000-8000-000000000000',sortOrder:0,type:'IMAGE',image:{imageInfo:'wix:image://v1/'+imageId+'/x.png'}}
  ];
  const matches=await getNativeProjectGallery({id:'da19f867-bb22-45ca-befb-1b4eb2d9696c'});
  assert.equal(lastQuery.collection,'Portfolio/ProjectItems');
  assert.equal(lastQuery.field,'_id');
  assert.deepEqual([...lastQuery.ids].sort(),[
    '87b2dbb2-8af5-488a-991a-3e5010b303d9',
    '167eca22-4d88-4083-b7ad-5b4059e49852',
    '8d846d7f-0a0e-425e-af76-461f5502b5f5'
  ].sort());
  assert.equal(matches.length,3);
  assert.deepEqual(matches.map(item=>item.sortOrder),[1,2,3]);
});

test('No other Wix project can accidentally show SSL Generator captures',async()=>{
  const before=queries;
  const result=await getNativeProjectGallery({id:'90889462-b8c7-437f-9bcd-9719d4388818'});
  assert.equal(result.length,0);
  assert.equal(queries,before,'no unrelated project query');
});
