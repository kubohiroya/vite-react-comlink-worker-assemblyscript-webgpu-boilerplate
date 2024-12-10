class F{width;height;buffer;id;constructor(e,r,t){this.width=e,this.height=r,this.buffer=t}}class p extends F{static nextId=0;id;dataArray;constructor(e,r,t,d){super(e,r,t),this.dataArray=this.createDataArray(t,0,e*r*4),this.id=d??p.nextId++}createDataArray(e,r,t){return r>=0?this.dataArray=new Uint8ClampedArray(e,r,t):this.dataArray=new Uint8ClampedArray(e)}getDataArray(){return this.dataArray}}function M(a,e,r){const{width:t,height:d,dataArray:i}=a,n="Applying Average Filter";for(let l=0;l<e;l++){r({value:l,valueMin:0,valueMax:e,text:n});const o=Uint8ClampedArray.from(i);for(let c=1;c<d-1;c++)for(let u=1;u<t-1;u++){let w=0,x=0,g=0,b=0;for(let v=-1;v<=1;v++)for(let A=-1;A<=1;A++){const h=((c+v)*t+(u+A))*4;w+=o[h+0]&255,x+=o[h+1]&255,g+=o[h+2]&255,b+=o[h+3]&255}const f=(c*t+u)*4;i[f]=w/9&255,i[f+1]=x/9&255,i[f+2]=g/9&255,i[f+3]=b/9&255}}return r({value:e,valueMin:0,valueMax:e,text:n}),a}var s=(a=>(a[a.create=0]="create",a[a.delete=1]="delete",a[a.transfer=2]="transfer",a))(s||{}),P=(a=>(a[a.applyAverageFilter=100]="applyAverageFilter",a))(P||{});const y=new Map;self.addEventListener("message",a=>{const{type:e,requestId:r}=a.data;switch(e){case s.create:{const{width:t,height:d,buffer:i}=a.data.requestPayload,n=new p(t,d,i);y.set(n.id,n),self.postMessage({type:s.create,requestId:r,responsePayload:{id:n.id,width:t,height:d}});break}case P.applyAverageFilter:{const{id:t,iteration:d}=a.data.requestPayload,i=y.get(t);if(!i)throw new Error("not found id: "+t);M(i,d,n=>{self.postMessage({type:e,requestId:r,responsePayload:{id:t},progress:{value:n.value,valueMin:n.valueMin,valueMax:n.valueMax,text:n.text}})});break}case s.transfer:{const{id:t}=a.data.requestPayload,d=y.get(t);if(y.delete(t),!d)throw new Error("not found id: "+t);const{width:i,height:n,dataArray:l}=d;postMessage({type:s.transfer,requestId:r,responsePayload:{id:t,width:i,height:n,buffer:l.buffer}});break}default:throw new Error("unknown message:"+JSON.stringify(a.data))}});