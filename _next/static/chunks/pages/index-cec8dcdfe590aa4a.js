(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6086:function(e){"use strict";var t=Object.assign.bind(Object);e.exports=t,e.exports.default=e.exports},9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4488)}])},4488:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return eo}});var r,o,i,a,c=n(5893),s=n(7294),u=n(5697),l=n.n(u),f=n(3524),p=n.n(f),d=n(9590),h=n.n(d),y=n(6086),T=n.n(y),m={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},b={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"};Object.keys(b).map(function(e){return b[e]});var g={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src",TARGET:"target"},v={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},E=Object.keys(v).reduce(function(e,t){return e[v[t]]=t,e},{}),O=[b.NOSCRIPT,b.SCRIPT,b.STYLE],C="data-react-helmet",_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x=function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")},S=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},j=function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},A=function(e,t){var n={};for(var r in e)!(t.indexOf(r)>=0)&&Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},P=function(e,t){if(!e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&("object"==typeof t||"function"==typeof t)?t:e},N=function(e){var t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},I=function(e){var t=R(e,b.TITLE),n=R(e,"titleTemplate");if(n&&t)return n.replace(/%s/g,function(){return Array.isArray(t)?t.join(""):t});var r=R(e,"defaultTitle");return t||r||void 0},L=function(e,t){return t.filter(function(t){return void 0!==t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return w({},e,t)},{})},k=function(e,t,n){var r={};return n.filter(function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&D("Helmet: "+e+' should be of type "Array". Instead found type "'+_(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var o={};n.filter(function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var c=i[a],s=c.toLowerCase();-1===t.indexOf(s)||n===g.REL&&"canonical"===e[n].toLowerCase()||s===g.REL&&"stylesheet"===e[s].toLowerCase()||(n=s),-1!==t.indexOf(c)&&(c===g.INNER_HTML||c===g.CSS_TEXT||c===g.ITEM_PROP)&&(n=c)}if(!n||!e[n])return!1;var u=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][u]&&(o[n][u]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var i=Object.keys(o),a=0;a<i.length;a++){var c=i[a],s=T()({},r[c],o[c]);r[c]=s}return e},[]).reverse()},R=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},M=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout(function(){M(e)},0)}),H=function(e){return clearTimeout(e)},B="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||M:n.g.requestAnimationFrame||M,$="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||H:n.g.cancelAnimationFrame||H,D=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},Y=null,q=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,s=e.onChangeClientState,u=e.scriptTags,l=e.styleTags,f=e.title,p=e.titleAttributes;G(b.BODY,r),G(b.HTML,o),U(f,p);var d={baseTag:K(b.BASE,n),linkTags:K(b.LINK,i),metaTags:K(b.META,a),noscriptTags:K(b.NOSCRIPT,c),scriptTags:K(b.SCRIPT,u),styleTags:K(b.STYLE,l)},h={},y={};Object.keys(d).forEach(function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(h[e]=n),r.length&&(y[e]=d[e].oldTags)}),t&&t(),s(e,h,y)},F=function(e){return Array.isArray(e)?e.join(""):e},U=function(e,t){void 0!==e&&document.title!==e&&(document.title=F(e)),G(b.TITLE,t)},G=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(C),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),c=0;c<a.length;c++){var s=a[c],u=t[s]||"";n.getAttribute(s)!==u&&n.setAttribute(s,u),-1===o.indexOf(s)&&o.push(s);var l=i.indexOf(s);-1!==l&&i.splice(l,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(C):n.getAttribute(C)!==a.join(",")&&n.setAttribute(C,a.join(","))}},K=function(e,t){var n=document.head||document.querySelector(b.HEAD),r=n.querySelectorAll(e+"["+C+"]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r)){if(r===g.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===g.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}}n.setAttribute(C,"true"),o.some(function(e,t){return a=t,n.isEqualNode(e)})?o.splice(a,1):i.push(n)}),o.forEach(function(e){return e.parentNode.removeChild(e)}),i.forEach(function(e){return n.appendChild(e)}),{oldTags:o,newTags:i}},X=function(e){return Object.keys(e).reduce(function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},z=function(e,t,n,r){var o=X(n),i=F(t);return o?"<"+e+" "+C+'="true" '+o+">"+N(i,r)+"</"+e+">":"<"+e+" "+C+'="true">'+N(i,r)+"</"+e+">"},V=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[v[n]||n]=e[n],t},t)},W=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[E[n]||n]=e[n],t},t)},Z=function(e,t,n){var r,o=V(n,((r={key:t})[C]=!0,r));return[s.createElement(b.TITLE,o,t)]},Q=function(e,t,n){switch(e){case b.TITLE:return{toComponent:function(){return Z(e,t.title,t.titleAttributes,n)},toString:function(){return z(e,t.title,t.titleAttributes,n)}};case m.BODY:case m.HTML:return{toComponent:function(){return V(t)},toString:function(){return X(t)}};default:return{toComponent:function(){return t.map(function(t,n){var r,o=((r={key:n})[C]=!0,r);return Object.keys(t).forEach(function(e){var n=v[e]||e;if(n===g.INNER_HTML||n===g.CSS_TEXT){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]}),s.createElement(e,o)})},toString:function(){return t.reduce(function(t,r){var o=Object.keys(r).filter(function(e){return!(e===g.INNER_HTML||e===g.CSS_TEXT)}).reduce(function(e,t){var o=void 0===r[t]?t:t+'="'+N(r[t],n)+'"';return e?e+" "+o:o},""),i=r.innerHTML||r.cssText||"",a=-1===O.indexOf(e);return t+"<"+e+" "+C+'="true" '+o+(a?"/>":">"+i+"</"+e+">")},"")}}}},J=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,c=e.noscriptTags,s=e.scriptTags,u=e.styleTags,l=e.title,f=e.titleAttributes;return{base:Q(b.BASE,t,r),bodyAttributes:Q(m.BODY,n,r),htmlAttributes:Q(m.HTML,o,r),link:Q(b.LINK,i,r),meta:Q(b.META,a,r),noscript:Q(b.NOSCRIPT,c,r),script:Q(b.SCRIPT,s,r),style:Q(b.STYLE,u,r),title:Q(b.TITLE,{title:void 0===l?"":l,titleAttributes:f},r)}},ee=(o=p()(function(e){var t;return{baseTag:(t=[g.HREF,g.TARGET],e.filter(function(e){return void 0!==e[b.BASE]}).map(function(e){return e[b.BASE]}).reverse().reduce(function(e,n){if(!e.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==t.indexOf(i)&&n[i])return e.concat(n)}return e},[])),bodyAttributes:L(m.BODY,e),defer:R(e,"defer"),encode:R(e,"encodeSpecialCharacters"),htmlAttributes:L(m.HTML,e),linkTags:k(b.LINK,[g.REL,g.HREF],e),metaTags:k(b.META,[g.NAME,g.CHARSET,g.HTTPEQUIV,g.PROPERTY,g.ITEM_PROP],e),noscriptTags:k(b.NOSCRIPT,[g.INNER_HTML],e),onChangeClientState:R(e,"onChangeClientState")||function(){},scriptTags:k(b.SCRIPT,[g.SRC,g.INNER_HTML],e),styleTags:k(b.STYLE,[g.CSS_TEXT],e),title:I(e),titleAttributes:L(m.TITLE,e)}},function(e){Y&&$(Y),e.defer?Y=B(function(){q(e,function(){Y=null})}):(q(e),Y=null)},J)(function(){return null}),a=i=function(e){function t(){return x(this,t),P(this,e.apply(this,arguments))}return j(t,e),t.prototype.shouldComponentUpdate=function(e){return!h()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case b.SCRIPT:case b.NOSCRIPT:return{innerHTML:t};case b.STYLE:return{cssText:t}}throw Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return w({},r,((t={})[n.type]=[].concat(r[n.type]||[],[w({},o,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case b.TITLE:return w({},o,((t={})[r.type]=a,t.titleAttributes=w({},i),t));case b.BODY:return w({},o,{bodyAttributes:w({},i)});case b.HTML:return w({},o,{htmlAttributes:w({},i)})}return w({},o,((n={})[r.type]=w({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=w({},t);return Object.keys(e).forEach(function(t){var r;n=w({},n,((r={})[t]=e[t],r))}),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return s.Children.forEach(e,function(e){if(e&&e.props){var o=e.props,i=o.children,a=W(A(o,["children"]));switch(n.warnOnInvalidChildren(e,i),e.type){case b.LINK:case b.META:case b.NOSCRIPT:case b.SCRIPT:case b.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:a,nestedChildren:i});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:a,nestedChildren:i})}}}),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=w({},A(e,["children"]));return t&&(n=this.mapChildrenToProps(t,n)),s.createElement(o,n)},S(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(s.Component),i.propTypes={base:l().object,bodyAttributes:l().object,children:l().oneOfType([l().arrayOf(l().node),l().node]),defaultTitle:l().string,defer:l().bool,encodeSpecialCharacters:l().bool,htmlAttributes:l().object,link:l().arrayOf(l().object),meta:l().arrayOf(l().object),noscript:l().arrayOf(l().object),onChangeClientState:l().func,script:l().arrayOf(l().object),style:l().arrayOf(l().object),title:l().string,titleAttributes:l().object,titleTemplate:l().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=J({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},a);ee.renderStatic=ee.rewind;var et=n(9777),en=n(2729),er=n.n(en),eo=()=>{let[e,t]=(0,s.useState)(""),[n,r]=(0,s.useState)([]),[o,i]=(0,s.useState)(4),[a,u]=(0,s.useState)(!1),l="作成中...",[f,p]=(0,s.useState)([]);(0,s.useEffect)(()=>{if(a){let e=[];for(let t=0;t<l.length;t++)setTimeout(()=>{e.push(l[t]),p([...e])},100*t)}else p([])},[a]);let d=async()=>{r([]),u(!0),console.log(e);let t=await et.x.color.$post({body:{text:e,number:o}});if(console.log(t),null!=t){let e=Object.values(t);r(e),u(!1)}else console.error("API response is undefined."),u(!1)};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(ee,{children:[(0,c.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,c.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,c.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@100&display=swap",rel:"stylesheet"})]}),(0,c.jsxs)("div",{className:er().container,children:[(0,c.jsx)("h1",{className:er().title,children:"感情カラーパレット"}),(0,c.jsx)("p",{className:er().description,children:"あなたの感情を色で表現しよう。"}),(0,c.jsx)("input",{type:"text",value:e,onChange:e=>{t(e.target.value)},placeholder:"感情を表現する文を入力...",className:er().textInput}),(0,c.jsx)("label",{className:er().label,htmlFor:"colorCount",children:"色の数を選択:"}),(0,c.jsxs)("select",{className:er().selectBox,id:"colorCount",value:o,onChange:e=>{let t=Number(e.target.value);i(t),console.log("選択された値:",e.target.value)},children:[(0,c.jsx)("option",{value:"4",children:"4"}),(0,c.jsx)("option",{value:"5",children:"5"}),(0,c.jsx)("option",{value:"6",children:"6"})]}),(0,c.jsx)("button",{onClick:d,className:er().submitButton,children:"送信"}),a?(0,c.jsx)("div",{className:er().loadingText,children:f.map((e,t)=>(0,c.jsx)("span",{style:{animationDelay:"".concat(.5*t,"s")},className:er().loadingChar,children:e},t))}):null,(0,c.jsx)("div",{className:er().colors,children:n.map((e,t)=>(0,c.jsx)("div",{className:er().colorBox,style:{backgroundColor:e},children:(0,c.jsx)("span",{className:er().colorCode,children:e})},t))})]})]})}},9777:function(e,t,n){"use strict";n.d(t,{x:function(){return a}});var r=n(9239),o=n(7080),i=n(6154);let a=(e=>{let{baseURL:t,fetch:n}=e,r=(void 0===t?"":t).replace(/\/$/,""),i="/color",a="/health",c="/item",s="/session",u="/tasks",l="POST",f="DELETE",p="PATCH";return{color:{get:e=>n(r,i,"GET",e).json(),$get:e=>n(r,i,"GET",e).json().then(e=>e.body),post:e=>n(r,i,l,e).json(),$post:e=>n(r,i,l,e).json().then(e=>e.body),$path:()=>"".concat(r).concat(i)},health:{get:e=>n(r,a,"GET",e).json(),$get:e=>n(r,a,"GET",e).json().then(e=>e.body),$path:()=>"".concat(r).concat(a)},item:{get:e=>n(r,c,"GET",e).text(),$get:e=>n(r,c,"GET",e).text().then(e=>e.body),post:e=>n(r,c,l,e).json(),$post:e=>n(r,c,l,e).json().then(e=>e.body),$path:()=>"".concat(r).concat(c)},me:{get:e=>n(r,"/me","GET",e).json(),$get:e=>n(r,"/me","GET",e).json().then(e=>e.body),$path:()=>"".concat(r).concat("/me")},session:{post:e=>n(r,s,l,e).json(),$post:e=>n(r,s,l,e).json().then(e=>e.body),delete:e=>n(r,s,f,e).json(),$delete:e=>n(r,s,f,e).json().then(e=>e.body),$path:()=>"".concat(r).concat(s)},tasks:{_taskId:e=>{let t="".concat(u,"/").concat(e);return{patch:e=>n(r,t,p,e).send(),$patch:e=>n(r,t,p,e).send().then(e=>e.body),delete:e=>n(r,t,f,e).send(),$delete:e=>n(r,t,f,e).send().then(e=>e.body),$path:()=>"".concat(r).concat(t)}},get:e=>n(r,u,"GET",e).json(),$get:e=>n(r,u,"GET",e).json().then(e=>e.body),post:e=>n(r,u,l,e).json(),$post:e=>n(r,u,l,e).json().then(e=>e.body),$path:e=>"".concat(r).concat(u).concat(e&&e.query?"?".concat((0,o._K)(e.query)):"")},get:e=>n(r,"","GET",e).text(),$get:e=>n(r,"","GET",e).text().then(e=>e.body),$path:()=>"".concat(r)}})((0,r.Z)(i.Z.create({withCredentials:!0})))},2729:function(e){e.exports={container:"index_container___q52_",title:"index_title__k0g7D","fade-in1":"index_fade-in1__8UDR0",description:"index_description__fcKbo",textInput:"index_textInput__aU97w",label:"index_label__4mSN7",selectBox:"index_selectBox__qAweD",submitButton:"index_submitButton__U9TKl",loadingText:"index_loadingText__Ip26x",loadingChar:"index_loadingChar__cOgmN","fade-in2":"index_fade-in2__cXe0M",colors:"index_colors__BmbZF",colorBox:"index_colorBox__yhndE",colorCode:"index_colorCode__me6ao"}},2703:function(e,t,n){"use strict";var r=n(414);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},5697:function(e,t,n){e.exports=n(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},9590:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;e.exports=function(e,i){try{return function e(i,a){if(i===a)return!0;if(i&&a&&"object"==typeof i&&"object"==typeof a){var c,s,u,l;if(i.constructor!==a.constructor)return!1;if(Array.isArray(i)){if((c=i.length)!=a.length)return!1;for(s=c;0!=s--;)if(!e(i[s],a[s]))return!1;return!0}if(n&&i instanceof Map&&a instanceof Map){if(i.size!==a.size)return!1;for(l=i.entries();!(s=l.next()).done;)if(!a.has(s.value[0]))return!1;for(l=i.entries();!(s=l.next()).done;)if(!e(s.value[1],a.get(s.value[0])))return!1;return!0}if(r&&i instanceof Set&&a instanceof Set){if(i.size!==a.size)return!1;for(l=i.entries();!(s=l.next()).done;)if(!a.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(i)&&ArrayBuffer.isView(a)){if((c=i.length)!=a.length)return!1;for(s=c;0!=s--;)if(i[s]!==a[s])return!1;return!0}if(i.constructor===RegExp)return i.source===a.source&&i.flags===a.flags;if(i.valueOf!==Object.prototype.valueOf&&"function"==typeof i.valueOf&&"function"==typeof a.valueOf)return i.valueOf()===a.valueOf();if(i.toString!==Object.prototype.toString&&"function"==typeof i.toString&&"function"==typeof a.toString)return i.toString()===a.toString();if((c=(u=Object.keys(i)).length)!==Object.keys(a).length)return!1;for(s=c;0!=s--;)if(!Object.prototype.hasOwnProperty.call(a,u[s]))return!1;if(t&&i instanceof Element)return!1;for(s=c;0!=s--;)if(("_owner"!==u[s]&&"__v"!==u[s]&&"__o"!==u[s]||!i.$$typeof)&&!e(i[u[s]],a[u[s]]))return!1;return!0}return i!=i&&a!=a}(e,i)}catch(e){if((e.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw e}}},3524:function(e,t,n){"use strict";var r=n(7294),o=r&&"object"==typeof r&&"default"in r?r.default:r;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=!!("undefined"!=typeof window&&window.document&&window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw Error("Expected mapStateOnServer to either be undefined or a function.");return function(c){if("function"!=typeof c)throw Error("Expected WrappedComponent to be a React component.");var s,u=[];function l(){s=e(u.map(function(e){return e.props})),f.canUseDOM?t(s):n&&(s=n(s))}var f=function(e){function t(){return e.apply(this,arguments)||this}t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e,t.peek=function(){return s},t.rewind=function(){if(t.canUseDOM)throw Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,u=[],e};var n=t.prototype;return n.UNSAFE_componentWillMount=function(){u.push(this),l()},n.componentDidUpdate=function(){l()},n.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),l()},n.render=function(){return o.createElement(c,this.props)},t}(r.PureComponent);return i(f,"displayName","SideEffect("+(c.displayName||c.name||"Component")+")"),i(f,"canUseDOM",a),f}}}},function(e){e.O(0,[911,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);