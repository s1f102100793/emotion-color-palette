(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3120)}])},3120:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var o=n(5893),s=n(1664),a=n.n(s),l=n(7294),c=n(4593),i=n(9777);let r=()=>{let[e,t]=(0,l.useState)(""),[n,o]=(0,l.useState)([]),[s,a]=(0,l.useState)(4),[c,r]=(0,l.useState)(!1),[d,h]=(0,l.useState)([]),u=async()=>{o([]),r(!0),console.log(e);let t=await i.x.color.$post({body:{text:e,number:s}});if(console.log(t),null!=t){let e=Object.values(t);o(e),r(!1)}else console.error("API response is undefined."),r(!1)};return{inputValue:e,setInputValue:t,colors:n,setColors:o,selectedValue:s,setSelectedValue:a,loadingText:"作成中...",loading:c,chars:d,setChars:h,handleInputChange:e=>{t(e.target.value)},handleChange:e=>{let t=Number(e.target.value);a(t),console.log("選択された値:",e.target.value)},handleSubmit:u}};var d=n(1733),h=n(2729),u=n.n(h),x=()=>{let{inputValue:e,colors:t,selectedValue:n,loadingText:s,loading:i,chars:h,setChars:x,handleInputChange:_,handleChange:p,handleSubmit:g}=r();return(0,l.useEffect)(()=>{if(i){let e=[];for(let t=0;t<s.length;t++)setTimeout(()=>{e.push(s[t]),x([...e])},100*t)}else x([])},[i,x,s]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(c.q,{children:[(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,o.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@100&display=swap",rel:"stylesheet"})]}),(0,o.jsxs)("div",{className:u().container,children:[(0,o.jsx)("h1",{className:u().title,children:"感情カラーパレット"}),(0,o.jsx)("p",{className:u().description,children:"あなたの感情を色で表現しよう。"}),(0,o.jsx)("input",{type:"text",value:e,onChange:_,placeholder:"感情を表現する文を入力...",className:u().textInput}),(0,o.jsx)("label",{className:u().label,htmlFor:"colorCount",children:"色の数を選択:"}),(0,o.jsxs)("select",{className:u().selectBox,id:"colorCount",value:n,onChange:p,children:[(0,o.jsx)("option",{value:"4",children:"4"}),(0,o.jsx)("option",{value:"5",children:"5"}),(0,o.jsx)("option",{value:"6",children:"6"})]}),(0,o.jsx)("button",{onClick:g,className:u().submitButton,children:"送信"}),i?(0,o.jsx)("div",{className:u().loadingText,children:h.map((e,t)=>(0,o.jsx)("span",{style:{animationDelay:"".concat(.5*t,"s")},className:u().loadingChar,children:e},t))}):null,(0,o.jsx)("div",{className:u().colors,children:t.map((e,t)=>(0,o.jsx)("div",{className:u().colorBox,style:{backgroundColor:e},children:(0,o.jsx)("span",{className:u().colorCode,children:e})},t))})]}),(0,o.jsxs)("div",{className:u().floatingButtonContainer,children:[(0,o.jsx)("span",{className:u().floatingText,children:"カラーパレットのリストへ"}),(0,o.jsx)(a(),{href:d.V.palettelist.$url(),legacyBehavior:!0,children:(0,o.jsx)("a",{className:u().floatingButton,children:"→"})})]})]})}},1733:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});let o={palettelist:{$url:e=>({pathname:"/palettelist",hash:null==e?void 0:e.hash})},$url:e=>({pathname:"/",hash:null==e?void 0:e.hash})}},9777:function(e,t,n){"use strict";n.d(t,{x:function(){return l}});var o=n(9239),s=n(7080),a=n(6154);let l=(e=>{let{baseURL:t,fetch:n}=e,o=(void 0===t?"":t).replace(/\/$/,""),a="/color",l="/health",c="/item",i="/like",r="/session",d="/tasks",h="POST",u="DELETE",x="PATCH";return{color:{post:e=>n(o,a,h,e).json(),$post:e=>n(o,a,h,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(a)},health:{get:e=>n(o,l,"GET",e).json(),$get:e=>n(o,l,"GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat(l)},item:{get:e=>n(o,c,"GET",e).text(),$get:e=>n(o,c,"GET",e).text().then(e=>e.body),post:e=>n(o,c,h,e).json(),$post:e=>n(o,c,h,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(c)},like:{get:e=>n(o,i,"GET",e).text(),$get:e=>n(o,i,"GET",e).text().then(e=>e.body),post:e=>n(o,i,h,e).send(),$post:e=>n(o,i,h,e).send().then(e=>e.body),$path:()=>"".concat(o).concat(i)},me:{get:e=>n(o,"/me","GET",e).json(),$get:e=>n(o,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(o).concat("/me")},session:{post:e=>n(o,r,h,e).json(),$post:e=>n(o,r,h,e).json().then(e=>e.body),delete:e=>n(o,r,u,e).json(),$delete:e=>n(o,r,u,e).json().then(e=>e.body),$path:()=>"".concat(o).concat(r)},tasks:{_taskId:e=>{let t="".concat(d,"/").concat(e);return{patch:e=>n(o,t,x,e).send(),$patch:e=>n(o,t,x,e).send().then(e=>e.body),delete:e=>n(o,t,u,e).send(),$delete:e=>n(o,t,u,e).send().then(e=>e.body),$path:()=>"".concat(o).concat(t)}},get:e=>n(o,d,"GET",e).json(),$get:e=>n(o,d,"GET",e).json().then(e=>e.body),post:e=>n(o,d,h,e).json(),$post:e=>n(o,d,h,e).json().then(e=>e.body),$path:e=>"".concat(o).concat(d).concat(e&&e.query?"?".concat((0,s._K)(e.query)):"")},get:e=>n(o,"","GET",e).text(),$get:e=>n(o,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(o)}})((0,o.Z)(a.Z.create({withCredentials:!0})))},2729:function(e){e.exports={container:"index_container___q52_",title:"index_title__k0g7D","fade-in1":"index_fade-in1__8UDR0",description:"index_description__fcKbo",textInput:"index_textInput__aU97w",label:"index_label__4mSN7",selectBox:"index_selectBox__qAweD",submitButton:"index_submitButton__U9TKl",loadingText:"index_loadingText__Ip26x",loadingChar:"index_loadingChar__cOgmN","fade-in2":"index_fade-in2__cXe0M",colors:"index_colors__BmbZF",colorBox:"index_colorBox__yhndE",colorCode:"index_colorCode__me6ao",floatingButtonContainer:"index_floatingButtonContainer__s23p5",floatingText:"index_floatingText__PEWqD",floatingButton:"index_floatingButton__UDhPB"}}},function(e){e.O(0,[263,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);