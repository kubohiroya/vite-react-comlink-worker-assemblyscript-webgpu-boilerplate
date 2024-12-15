/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const C=Symbol("Comlink.proxy"),L=Symbol("Comlink.endpoint"),W=Symbol("Comlink.releaseProxy"),I=Symbol("Comlink.finalizer"),A=Symbol("Comlink.thrown"),U=e=>typeof e=="object"&&e!==null||typeof e=="function",H={canHandle:e=>U(e)&&e[C],serialize(e){const{port1:t,port2:r}=new MessageChannel;return j(e,t),[r,[r]]},deserialize(e){return e.start(),$(e)}},F={canHandle:e=>U(e)&&A in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},k=new Map([["proxy",H],["throw",F]]);function V(e,t){for(const r of e)if(t===r||r==="*"||r instanceof RegExp&&r.test(t))return!0;return!1}function j(e,t=globalThis,r=["*"]){t.addEventListener("message",function i(a){if(!a||!a.data)return;if(!V(r,a.origin)){console.warn(`Invalid origin '${a.origin}' for comlink proxy`);return}const{id:c,type:y,path:f}=Object.assign({path:[]},a.data),b=(a.data.argumentList||[]).map(_);let l;try{const o=f.slice(0,-1).reduce((u,n)=>u[n],e),d=f.reduce((u,n)=>u[n],e);switch(y){case"GET":l=d;break;case"SET":o[f.slice(-1)[0]]=_(a.data.value),l=!0;break;case"APPLY":l=d.apply(o,b);break;case"CONSTRUCT":{const u=new d(...b);l=Q(u)}break;case"ENDPOINT":{const{port1:u,port2:n}=new MessageChannel;j(e,n),l=q(u,[u])}break;case"RELEASE":l=void 0;break;default:return}}catch(o){l={value:o,[A]:0}}Promise.resolve(l).catch(o=>({value:o,[A]:0})).then(o=>{const[d,u]=T(o);t.postMessage(Object.assign(Object.assign({},d),{id:c}),u),y==="RELEASE"&&(t.removeEventListener("message",i),R(t),I in e&&typeof e[I]=="function"&&e[I]())}).catch(o=>{const[d,u]=T({value:new TypeError("Unserializable return value"),[A]:0});t.postMessage(Object.assign(Object.assign({},d),{id:c}),u)})}),t.start&&t.start()}function N(e){return e.constructor.name==="MessagePort"}function R(e){N(e)&&e.close()}function $(e,t){const r=new Map;return e.addEventListener("message",function(a){const{data:c}=a;if(!c||!c.id)return;const y=r.get(c.id);if(y)try{y(c)}finally{r.delete(c.id)}}),M(e,r,[],t)}function O(e){if(e)throw new Error("Proxy has been released and is not useable")}function z(e){return E(e,new Map,{type:"RELEASE"}).then(()=>{R(e)})}const P=new WeakMap,S="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(P.get(e)||0)-1;P.set(e,t),t===0&&z(e)});function B(e,t){const r=(P.get(t)||0)+1;P.set(t,r),S&&S.register(e,t,e)}function G(e){S&&S.unregister(e)}function M(e,t,r=[],i=function(){}){let a=!1;const c=new Proxy(i,{get(y,f){if(O(a),f===W)return()=>{G(c),z(e),t.clear(),a=!0};if(f==="then"){if(r.length===0)return{then:()=>c};const b=E(e,t,{type:"GET",path:r.map(l=>l.toString())}).then(_);return b.then.bind(b)}return M(e,t,[...r,f])},set(y,f,b){O(a);const[l,o]=T(b);return E(e,t,{type:"SET",path:[...r,f].map(d=>d.toString()),value:l},o).then(_)},apply(y,f,b){O(a);const l=r[r.length-1];if(l===L)return E(e,t,{type:"ENDPOINT"}).then(_);if(l==="bind")return M(e,t,r.slice(0,-1));const[o,d]=x(b);return E(e,t,{type:"APPLY",path:r.map(u=>u.toString()),argumentList:o},d).then(_)},construct(y,f){O(a);const[b,l]=x(f);return E(e,t,{type:"CONSTRUCT",path:r.map(o=>o.toString()),argumentList:b},l).then(_)}});return B(c,e),c}function Y(e){return Array.prototype.concat.apply([],e)}function x(e){const t=e.map(T);return[t.map(r=>r[0]),Y(t.map(r=>r[1]))]}const v=new WeakMap;function q(e,t){return v.set(e,t),e}function Q(e){return Object.assign(e,{[C]:!0})}function T(e){for(const[t,r]of k)if(r.canHandle(e)){const[i,a]=r.serialize(e);return[{type:"HANDLER",name:t,value:i},a]}return[{type:"RAW",value:e},v.get(e)||[]]}function _(e){switch(e.type){case"HANDLER":return k.get(e.name).deserialize(e.value);case"RAW":return e.value}}function E(e,t,r,i){return new Promise(a=>{const c=X();t.set(c,a),e.start&&e.start(),e.postMessage(Object.assign({id:c},r),i)})}function X(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}async function J(e,t={}){const r={env:Object.assign(Object.create(globalThis),t.env||{},{abort(n,s,g,m){n=y(n>>>0),s=y(s>>>0),g=g>>>0,m=m>>>0,(()=>{throw Error(`${n} in ${s}:${g}:${m}`)})()},postProgressMessage(n,s){n=n>>>0,s=s>>>0,postProgressMessage(n,s)}})},{exports:i}=await WebAssembly.instantiate(e,r),a=i.memory||t.env.memory,c=Object.setPrototypeOf({createImageObject(n,s){return i.createImageObject(n,s)>>>0},setImageObjectData(n,s){s=b(Uint8ClampedArray,5,0,s)||l(),i.setImageObjectData(n,s)},getImageObjectPtrLen(n){return f(s=>u(s)>>>0,2,i.getImageObjectPtrLen(n)>>>0)},applyAverageFilter(n,s,g){s=s?1:0,i.applyAverageFilter(n,s,g)},getImageObjectWidthHeight(n){return f(s=>u(s)>>>0,2,i.getImageObjectWidthHeight(n)>>>0)}},i);function y(n){if(!n)return null;const s=n+new Uint32Array(a.buffer)[n-4>>>2]>>>1,g=new Uint16Array(a.buffer);let m=n>>>1,w="";for(;s-m>1024;)w+=String.fromCharCode(...g.subarray(m,m+=1024));return w+String.fromCharCode(...g.subarray(m,s))}function f(n,s,g){if(!g)return null;const m=u(g+4),w=o.getUint32(g+12,!0),p=new Array(w);for(let h=0;h<w;++h)p[h]=n(m+(h<<s>>>0));return p}function b(n,s,g,m){if(m==null)return 0;const w=m.length,p=i.__pin(i.__new(w<<g,1))>>>0,h=i.__new(12,s)>>>0;return d(h+0,p),o.setUint32(h+4,p,!0),o.setUint32(h+8,w<<g,!0),new n(a.buffer,p,w).set(m),i.__unpin(p),h}function l(){throw TypeError("value must not be null")}let o=new DataView(a.buffer);function d(n,s){try{o.setUint32(n,s,!0)}catch{o=new DataView(a.buffer),o.setUint32(n,s,!0)}}function u(n){try{return o.getUint32(n,!0)}catch{return o=new DataView(a.buffer),o.getUint32(n,!0)}}return c}const{memory:K,__new:ie,__pin:ce,__unpin:le,__collect:ue,__rtti_base:fe,createImageObject:Z,setImageObjectData:ee,getImageObjectPtrLen:te,deleteImageObject:re,applyAverageFilter:ne,getImageObjectWidthHeight:ge}=await(async e=>J(await(async()=>typeof process<"u"&&process.versions!=null&&(process.versions.node!=null||process.versions.bun!=null)?globalThis.WebAssembly.compile(await(await Promise.resolve().then(function(){return oe})).readFile(e)):await globalThis.WebAssembly.compileStreaming(globalThis.fetch(e)))(),{}))(new URL("/vite-react-promise-worker-assemblyscript-boilerplate/assets/index-D9u-VTlQ.wasm",import.meta.url));class se{}class D extends se{id;constructor(){super()}async initialize(t,r,i){this.id=Z(t,r);const a=new Uint8ClampedArray(i);ee(this.id,a)}async applyAverageFilter(t,r,i){globalThis.postProgressMessage=function(c,y){i({value:c,valueMax:y})},ne(this.id,r.simd||!1,t)}async transfer(){const[t,r]=te(this.id);return re(this.id),new Uint8ClampedArray(K.buffer,t,r)}close(){self.close()}}j(new D);var ae=Object.freeze({__proto__:null,ASImageProcessor:D});j(ae);var oe=Object.freeze({__proto__:null});
