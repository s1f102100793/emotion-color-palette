(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[725],{6719:function(t,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/palettelist",function(){return a(4719)}])},4719:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return r}});var n=a(5893),s=a(7294),o=a(9777);let l=()=>{let[t,e]=(0,s.useState)([]),[a,n]=(0,s.useState)([4,5,6]),[l,c]=(0,s.useState)([]),[i,r]=(0,s.useState)(0),u={赤:{hue:[330,30],saturation:[33,100],value:[33,100]},橙:{hue:[0,60],saturation:[33,100],value:[33,100]},黄:{hue:[45,75],saturation:[33,100],value:[33,100]},緑:{hue:[75,165],saturation:[33,100],value:[33,100]},水色:{hue:[165,195],saturation:[33,100],value:[33,100]},青:{hue:[195,255],saturation:[33,100],value:[33,100]},紫:{hue:[250,290],saturation:[33,100],value:[33,100]},ピンク:{hue:[285,315],saturation:[33,100],value:[33,100]},茶:{hue:[0,30],saturation:[33,66],value:[33,66]},黒:{hue:[330,360],saturation:[0,100],value:[0,33]},白:{hue:[0,360],saturation:[0,33],value:[66,100]}},d=async(t,e)=>{console.log(e);let n=await o.x.item.$post({body:{type:e,numberlist:a,colorlist:t}});return Array.isArray(n)?c(n):c([]),n},[h,p]=(0,s.useState)([]),[_,m]=(0,s.useState)("with");return{selectedColors:t,selectedNumbers:a,palettes:l,setPalettes:c,currentCount:i,setCurrentCount:r,colorRanges:u,fetchPalettes:d,handleColorChange:t=>{e(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])},handleNumberChange:t=>{n(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])},handleFetch:()=>{let e=t.map(t=>u[t]),n=a.length>0,s=t.length>0;d(e,n&&s?"with":n?"number":"color")},rangesToSend:h,currentType:_}};var c=a(9250),i=a.n(c),r=()=>{let{selectedColors:t,selectedNumbers:e,palettes:a,setPalettes:c,currentCount:r,setCurrentCount:u,colorRanges:d,handleColorChange:h,handleNumberChange:p,handleFetch:_}=l();(0,s.useEffect)(()=>{let t=Date.now(),e=()=>{let n=Date.now(),s=n-t;s>2e3&&(s=2e3);let o=s/2e3;u(Math.round(o*a.length)),s<2e3&&requestAnimationFrame(e)};e()},[a.length,u]);let m=(t,e,a)=>{let n=t/255,s=e/255,o=a/255,l=Math.max(n,s,o),c=Math.min(n,s,o),i=0,r=l-c;if(l!==c){switch(l){case n:i=(s-o)/r+(s<o?6:0);break;case s:i=(o-n)/r+2;break;case o:i=(n-s)/r+4}i/=6}return{h:360*i,s:100*(0===l?0:r/l),v:100*l}},b=t=>{let e=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),n=parseInt(t.slice(5,7),16);return m(e,a,n)},x=async t=>{let e=t.like+1,a=t.color.map(t=>b(t));await o.x.like.$post({body:{id:t.id,text:t.text,paletteSize:t.paletteSize,color:a,like:e}}),c(a=>a.map(a=>a.id===t.id?{...a,like:e}:a))},j=t=>{let e=new Date,a=(e.getTime()-t.getTime())/1e3;if(a<60)return"Just now";if(a<3600)return"".concat(Math.round(a/60)," minutes ago");if(a<=86400)return"Today";let n=Math.round(a/86400);if(1===n)return"1 day ago";if(n<30)return"".concat(n," days ago");let s=Math.round(n/30);if(1===s)return"1 month ago";if(s<12)return"".concat(s," months ago");let o=Math.round(s/12);return 1===o?"1 year ago":"".concat(o," years ago")},f=t=>{let e=parseInt(t.slice(1,3),16),a=parseInt(t.slice(3,5),16),n=parseInt(t.slice(5,7),16),s=(.299*e+.587*a+.114*n)/255;return s>.7?"#000":s>.4?"#777":"#fff"};return(0,n.jsxs)("div",{className:i().container,children:[(0,n.jsxs)("div",{className:i().leftsidebar,children:[(0,n.jsxs)("div",{className:i().targetCount,children:[(0,n.jsx)("span",{children:"対象パレット"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("span",{className:i().currentCount,children:r}),(0,n.jsx)("span",{className:i().countLabel,children:"件"})]})]}),(0,n.jsxs)("div",{className:i().paletteNumbers,children:[(0,n.jsx)("div",{className:i().subtitle,children:"パレット数"}),[4,5,6].map(t=>(0,n.jsxs)("div",{className:i().option,children:[(0,n.jsx)("input",{type:"checkbox",checked:e.includes(t),onChange:()=>p(t)}),(0,n.jsxs)("label",{children:[t,"色"]})]},t))]}),(0,n.jsxs)("div",{className:i().paletteColors,children:[(0,n.jsx)("div",{className:i().subtitle,children:"カラー"}),Object.keys(d).map(e=>(0,n.jsxs)("div",{className:i().option,children:[(0,n.jsx)("input",{type:"checkbox",checked:t.includes(e),onChange:()=>h(e)}),(0,n.jsx)("span",{className:i().colorDisplay,style:{backgroundColor:e}}),(0,n.jsx)("label",{children:e})]},e))]}),(0,n.jsx)("button",{className:i().fetchbutton,onClick:_,children:"パレットを取得"})]}),(0,n.jsx)("div",{className:i().mainContent,children:a.map(t=>(0,n.jsxs)("div",{className:i().paletteItem,children:[(0,n.jsx)("div",{className:i().colorBox,children:t.color.map((t,e)=>(0,n.jsx)("div",{className:i().color,style:{background:t,color:f(t)},"data-color":t},e))}),(0,n.jsx)("h3",{children:t.text}),(0,n.jsxs)("div",{className:i().info,children:[(0,n.jsx)("div",{children:(0,n.jsxs)("span",{onClick:()=>x(t),children:["❤️ ",t.like]})}),(0,n.jsx)("div",{children:j(new Date(t.createdAt))})]})]},t.id))})]})}},9777:function(t,e,a){"use strict";a.d(e,{x:function(){return l}});var n=a(9239),s=a(7080),o=a(6154);let l=(t=>{let{baseURL:e,fetch:a}=t,n=(void 0===e?"":e).replace(/\/$/,""),o="/color",l="/health",c="/item",i="/like",r="/session",u="/tasks",d="POST",h="DELETE",p="PATCH";return{color:{post:t=>a(n,o,d,t).json(),$post:t=>a(n,o,d,t).json().then(t=>t.body),$path:()=>"".concat(n).concat(o)},health:{get:t=>a(n,l,"GET",t).json(),$get:t=>a(n,l,"GET",t).json().then(t=>t.body),$path:()=>"".concat(n).concat(l)},item:{get:t=>a(n,c,"GET",t).text(),$get:t=>a(n,c,"GET",t).text().then(t=>t.body),post:t=>a(n,c,d,t).json(),$post:t=>a(n,c,d,t).json().then(t=>t.body),$path:()=>"".concat(n).concat(c)},like:{get:t=>a(n,i,"GET",t).text(),$get:t=>a(n,i,"GET",t).text().then(t=>t.body),post:t=>a(n,i,d,t).send(),$post:t=>a(n,i,d,t).send().then(t=>t.body),$path:()=>"".concat(n).concat(i)},me:{get:t=>a(n,"/me","GET",t).json(),$get:t=>a(n,"/me","GET",t).json().then(t=>t.body),$path:()=>"".concat(n).concat("/me")},session:{post:t=>a(n,r,d,t).json(),$post:t=>a(n,r,d,t).json().then(t=>t.body),delete:t=>a(n,r,h,t).json(),$delete:t=>a(n,r,h,t).json().then(t=>t.body),$path:()=>"".concat(n).concat(r)},tasks:{_taskId:t=>{let e="".concat(u,"/").concat(t);return{patch:t=>a(n,e,p,t).send(),$patch:t=>a(n,e,p,t).send().then(t=>t.body),delete:t=>a(n,e,h,t).send(),$delete:t=>a(n,e,h,t).send().then(t=>t.body),$path:()=>"".concat(n).concat(e)}},get:t=>a(n,u,"GET",t).json(),$get:t=>a(n,u,"GET",t).json().then(t=>t.body),post:t=>a(n,u,d,t).json(),$post:t=>a(n,u,d,t).json().then(t=>t.body),$path:t=>"".concat(n).concat(u).concat(t&&t.query?"?".concat((0,s._K)(t.query)):"")},get:t=>a(n,"","GET",t).text(),$get:t=>a(n,"","GET",t).text().then(t=>t.body),$path:()=>"".concat(n)}})((0,n.Z)(o.Z.create({withCredentials:!0})))},9250:function(t){t.exports={container:"palettelist_container__Tn3C8",leftsidebar:"palettelist_leftsidebar___xxDc",targetCount:"palettelist_targetCount__DcHXc",currentCount:"palettelist_currentCount__kNiQo",countLabel:"palettelist_countLabel__JN_nf",paletteNumbers:"palettelist_paletteNumbers__PC0wM",paletteColors:"palettelist_paletteColors__lpWYU",option:"palettelist_option__hf_Xw",colorDisplay:"palettelist_colorDisplay__bc9aK",subtitle:"palettelist_subtitle__avShf",fetchbutton:"palettelist_fetchbutton__FLpb3",mainContent:"palettelist_mainContent__XBRCW",paletteItem:"palettelist_paletteItem__MYKCu",colorBox:"palettelist_colorBox__Z8WIE",color:"palettelist_color__6F_4s",info:"palettelist_info__SdVEs"}}},function(t){t.O(0,[911,774,888,179],function(){return t(t.s=6719)}),_N_E=t.O()}]);