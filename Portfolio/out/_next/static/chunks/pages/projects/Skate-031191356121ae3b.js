(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[385],{97:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects/Skate",function(){return n(2611)}])},3025:function(e,t,n){"use strict";n.d(t,{Et:function(){return h},Pg:function(){return p}});var r=n(5893),s=n(1664),a=n.n(s),i=n(5675),o=n.n(i),l=n(7747),c=n(6725),u=n(4e3),d=n(917);let h=e=>{let{children:t,category:n="projects",id:s,title:i,thumbnail:d}=e;return(0,r.jsx)(l.xu,{w:"100%",textAlign:"center",children:(0,r.jsxs)(c.f,{as:a(),href:"/".concat(n,"/").concat(s),scroll:!1,cursor:"pointer",children:[(0,r.jsx)(o(),{src:d,alt:i,style:{borderRadius:"12px"},className:"grid-item-thumbnail",placeholder:"blur"}),(0,r.jsx)(c.A,{as:"div",href:"/".concat(n,"/").concat(s),children:(0,r.jsx)(u.x,{mt:2,fontSize:20,children:i})}),(0,r.jsx)(u.x,{fontSize:14,children:t})]})})},p=()=>(0,r.jsx)(d.xB,{styles:"\n      .grid-item-thumbnail {\n        border-radius: 12px;\n      }\n    "})},6741:function(e,t,n){"use strict";var r=n(5893),s=n(9702),a=n(9008),i=n.n(a),o=n(3025);let l={hidden:{opacity:0,x:0,y:20},enter:{opacity:1,x:0,y:0},exit:{opacity:0,x:-0,y:20}};t.Z=e=>{let{children:t,title:n}=e,a="".concat(n," - Benmadi imad");return(0,r.jsx)(s.E.article,{initial:"hidden",animate:"enter",exit:"exit",variants:l,transition:{duration:.4,type:"easeInOut"},style:{position:"relative"},children:(0,r.jsxs)(r.Fragment,{children:[n&&(0,r.jsxs)(i(),{children:[(0,r.jsx)("title",{children:a}),(0,r.jsx)("meta",{name:"twitter:title",content:a}),(0,r.jsx)("meta",{property:"og:title",content:a})]}),t,(0,r.jsx)(o.Pg,{})]})})}},9594:function(e,t,n){"use strict";var r=n(2729);function s(){let e=(0,r._)(["\n  text-align: start;\n  hyphens: auto;\n"]);return s=function(){return e},e}let a=n(6829).Z.p(s());t.Z=a},5798:function(e,t,n){"use strict";n.d(t,{h_:function(){return k},Dx:function(){return g},WZ:function(){return y}});var r=n(5893),s=n(1664),a=n.n(s),i=n(7747),o=n(2883),l=n(2757),c=n(6554),u=(0,c.G)(function(e,t){let{htmlWidth:n,htmlHeight:s,alt:a,...i}=e;return(0,r.jsx)("img",{width:n,height:s,ref:t,alt:a,...i})});u.displayName="NativeImage";var d=n(6245),h=n(7294),p=(e,t)=>"loaded"!==e&&"beforeLoadOrError"===t||"failed"===e&&"onError"===t,x=n(9653),m=(0,c.G)(function(e,t){let{fallbackSrc:n,fallback:s,src:a,srcSet:i,align:o,fit:l,loading:c,ignoreFallback:m,crossOrigin:f,fallbackStrategy:j="beforeLoadOrError",referrerPolicy:g,...y}=e,k=void 0!==n||void 0!==s,b=null!=c||m||!k,S=p(function(e){let{loading:t,src:n,srcSet:r,onLoad:s,onError:a,crossOrigin:i,sizes:o,ignoreFallback:l}=e,[c,u]=(0,h.useState)("pending");(0,h.useEffect)(()=>{u(n?"loading":"pending")},[n]);let p=(0,h.useRef)(),x=(0,h.useCallback)(()=>{if(!n)return;m();let e=new Image;e.src=n,i&&(e.crossOrigin=i),r&&(e.srcset=r),o&&(e.sizes=o),t&&(e.loading=t),e.onload=e=>{m(),u("loaded"),null==s||s(e)},e.onerror=e=>{m(),u("failed"),null==a||a(e)},p.current=e},[n,i,r,o,s,a,t]),m=()=>{p.current&&(p.current.onload=null,p.current.onerror=null,p.current=null)};return(0,d.G)(()=>{if(!l)return"loading"===c&&x(),()=>{m()}},[c,x,l]),l?"loaded":c}({...e,crossOrigin:f,ignoreFallback:b}),j),v={ref:t,objectFit:l,objectPosition:o,...b?y:function(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}(y,["onError","onLoad"])};return S?s||(0,r.jsx)(x.m.img,{as:u,className:"chakra-image__placeholder",src:n,...v}):(0,r.jsx)(x.m.img,{as:u,src:a,srcSet:i,crossOrigin:f,loading:c,referrerPolicy:g,className:"chakra-image",...v})});m.displayName="Image";var f=n(4880),j=n(3459);let g=e=>{let{children:t}=e;return(0,r.jsxs)(i.xu,{children:[(0,r.jsx)(o.r,{as:a(),href:"/projects",children:"Projects"}),(0,r.jsxs)("span",{children:["  ",(0,r.jsx)(j.X,{}),"  "]}),(0,r.jsx)(l.X,{display:"inline-block",as:"h3",fontSize:20,mb:4,children:t})]})},y=e=>{let{src:t,alt:n}=e;return(0,r.jsx)(m,{borderRadius:"lg",w:"full",src:t,alt:n,mb:4})},k=e=>{let{children:t}=e;return(0,r.jsx)(f.C,{colorScheme:"green",mr:2,children:t})}},2611:function(e,t,n){"use strict";n.r(t);var r=n(5893),s=n(2338),a=n(4880),i=n(3804),o=n(2883),l=n(5349),c=n(5798),u=n(9594),d=n(6741);t.default=()=>(0,r.jsx)(d.Z,{title:"Skate",children:(0,r.jsxs)(s.W,{my:6,children:[(0,r.jsxs)(c.Dx,{children:["Skate",(0,r.jsx)(a.C,{children:"2024"})]}),(0,r.jsxs)(u.Z,{children:["I've had the opportunity to develop a full-stack website for Skate Consult company , and we are pleased to announce the compilation of the first version of the platform. ✨ ",(0,r.jsx)("br",{})," \uD83D\uDD39 Frontend: Built with React and Tailwind CSS for a modern, responsive, and user-friendly interface.",(0,r.jsx)("br",{})," \uD83D\uDD39 Backend: Developed using Node.js and Express, ensuring robust and scalable server-side operations. ",(0,r.jsx)("br",{})," \uD83D\uDD39 Database: Utilized MongoDB for efficient and flexible data storage. ",(0,r.jsx)("br",{})," \uD83D\uDD39 Authentication: Implemented JWT authentication to secure user data and interactions.",(0,r.jsx)("br",{})," \uD83D\uDD39 Multi-Language Support: The platform supports both Arabic and English, enhancing accessibility for a diverse user base. ",(0,r.jsx)("br",{})," \uD83D\uDD39 Dashboard: Designed and developed a comprehensive dashboard enabling streamlined access to website content and efficient user management. The result is a secure, user-friendly platform that meets Skate Company's needs. I'm proud of the results we've achieved and grateful for the opportunity to work with Fouzia BENMADI."]}),(0,r.jsxs)(i.aV,{ml:4,my:4,children:[(0,r.jsxs)(i.HC,{children:[(0,r.jsx)(c.h_,{children:"Live Stream :"}),(0,r.jsxs)(o.r,{href:"https://skate.dz",target:"_black",children:["https://skate.dz",(0,r.jsx)(l.h,{mx:"2px"})]})]}),(0,r.jsxs)(i.HC,{children:[(0,r.jsx)(c.h_,{children:"Coded by :"}),(0,r.jsx)("span",{children:"Reactjs, TaillwinddCss, ReactRouter, ExpressJs, JWT Authenthication, MongoDB"})]})]}),(0,r.jsx)(c.WZ,{src:"/images/projects/Skate/Skate1.png",alt:"Skate"}),(0,r.jsx)(c.WZ,{src:"/images/projects/Skate/Skate2.png",alt:"Skate"}),(0,r.jsx)(c.WZ,{src:"/images/projects/Skate/Skate3.png",alt:"Skate"}),(0,r.jsx)(c.WZ,{src:"/images/projects/Skate/Skate4.png",alt:"Skate"}),(0,r.jsx)(c.WZ,{src:"/images/projects/Skate/Skate5.png",alt:"Skate"}),(0,r.jsx)(c.WZ,{src:"/images/projects/Skate/Skate6.png",alt:"Skate"})]})})},3459:function(e,t,n){"use strict";n.d(t,{X:function(){return r}});var r=(0,n(4027).I)({d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",displayName:"ChevronRightIcon"})},5349:function(e,t,n){"use strict";n.d(t,{h:function(){return a}});var r=n(4027),s=n(5893),a=(0,r.I)({displayName:"ExternalLinkIcon",path:(0,s.jsxs)("g",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),(0,s.jsx)("path",{d:"M15 3h6v6"}),(0,s.jsx)("path",{d:"M10 14L21 3"})]})})},3804:function(e,t,n){"use strict";n.d(t,{HC:function(){return x},aV:function(){return p}});var r=n(6948),s=n(5227),a=n(2495),i=n(6554),o=n(7030),l=n(3179),c=n(9653),u=n(5893),[d,h]=(0,s.k)({name:"ListStylesContext",errorMessage:"useListStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<List />\" "}),p=(0,i.G)(function(e,t){let n=(0,o.jC)("List",e),{children:r,styleType:s="none",stylePosition:i,spacing:h,...p}=(0,l.Lr)(e),x=(0,a.W)(r);return(0,u.jsx)(d,{value:n,children:(0,u.jsx)(c.m.ul,{ref:t,listStyleType:s,listStylePosition:i,role:"list",__css:{...n.container,...h?{"& > *:not(style) ~ *:not(style)":{mt:h}}:{}},...p,children:x})})});p.displayName="List",(0,i.G)((e,t)=>{let{as:n,...r}=e;return(0,u.jsx)(p,{ref:t,as:"ol",styleType:"decimal",marginStart:"1em",...r})}).displayName="OrderedList",(0,i.G)(function(e,t){let{as:n,...r}=e;return(0,u.jsx)(p,{ref:t,as:"ul",styleType:"initial",marginStart:"1em",...r})}).displayName="UnorderedList";var x=(0,i.G)(function(e,t){let n=h();return(0,u.jsx)(c.m.li,{ref:t,...e,__css:n.item})});x.displayName="ListItem",(0,i.G)(function(e,t){let n=h();return(0,u.jsx)(r.J,{ref:t,role:"presentation",...e,__css:n.icon})}).displayName="ListIcon"},4880:function(e,t,n){"use strict";n.d(t,{C:function(){return c}});var r=n(6554),s=n(7030),a=n(3179),i=n(9653),o=n(5432),l=n(5893),c=(0,r.G)(function(e,t){let n=(0,s.mq)("Badge",e),{className:r,...c}=(0,a.Lr)(e);return(0,l.jsx)(i.m.span,{ref:t,className:(0,o.cx)("chakra-badge",e.className),...c,__css:{display:"inline-block",whiteSpace:"nowrap",verticalAlign:"middle",...n}})});c.displayName="Badge"}},function(e){e.O(0,[925,888,774,179],function(){return e(e.s=97)}),_N_E=e.O()}]);