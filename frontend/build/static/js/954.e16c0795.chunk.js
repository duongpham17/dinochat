"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[954],{9676:function(n,e,i){i.d(e,{Z:function(){return a}});var s=i(9439),r="Observer_container__fqmeT",t="Observer_show__zCz8Q",c=i(2791),d=i(184),a=function(n){var e=n.children,i=n.threshold,a=void 0===i?.5:i,o=(0,c.useRef)();return(0,c.useEffect)((function(){var n=new IntersectionObserver((function(e){var i=(0,s.Z)(e,1)[0];i.target.classList.toggle(t,i.isIntersecting),i.isIntersecting&&n.unobserve(i.target)}),{threshold:a});n.observe(o.current)}),[a]),(0,d.jsx)("div",{className:r,ref:o,children:e})}},1954:function(n,e,i){i.r(e),i.d(e,{default:function(){return b}});var s=i(9439),r="Width700_container__8eLHn",t="Width700_findChats__VTiPz",c="Width700_chatList__pNH1p",d="Width700_element__GmxBi",a="Width700_image__qyYae",o="Width700_admin__gSo0E",l="Width700_selected__lzXuG",u=i(2791),h=i(3901),v=i(1087),_=i(2775),m=i(3067),f=i(9676),x=i(8820),j=i(6856),g=i(184),b=function(){var n=(0,u.useState)(!1),e=(0,s.Z)(n,2),i=e[0],b=e[1],C=(0,_.Z)(),p=C.getQuery,N=C.location,k=(0,h.C)((function(n){return n.user})).user,W=(0,h.C)((function(n){return n.rooms})),Z=W.chats,w=W.room,z=p();return(0,u.useEffect)((function(){b(!1)}),[N]),(0,g.jsxs)("div",{className:r,children:[!i&&(0,g.jsx)("div",{className:t,children:(0,g.jsxs)("button",{onClick:function(){return b(!i)},children:[(0,g.jsx)(j.RL9,{}),z?(0,g.jsx)("img",{src:null===w||void 0===w?void 0:w.image,alt:"i"}):"Chat rooms",z?(0,g.jsx)("p",{children:null===w||void 0===w?void 0:w.name}):""]})}),i&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:t,children:(0,g.jsxs)("button",{onClick:function(){return b(!i)},children:[(0,g.jsx)(j.Ix0,{}),z?(0,g.jsx)("img",{src:null===w||void 0===w?void 0:w.image,alt:"i"}):"Back",z?(0,g.jsx)("p",{children:null===w||void 0===w?void 0:w.name}):""]})}),(0,g.jsx)("div",{className:c,children:null===Z||void 0===Z?void 0:Z.map((function(n){return(0,g.jsx)(f.Z,{children:(0,g.jsxs)(v.rU,{to:"?".concat(n._id),className:"".concat(d," ").concat(z.substring(1)===n._id?l:""),onClick:function(){return b(!1)},children:[(0,g.jsxs)("div",{className:a,children:[(0,g.jsx)("img",{src:n.image,alt:"qs"}),(0,g.jsx)("p",{children:n.name})]}),(0,g.jsx)("div",{className:o,children:n.admin===(null===k||void 0===k?void 0:k._id)&&(0,g.jsx)(m.Z,{message:"admin",children:(0,g.jsx)(x.Xrf,{})})})]})},n._id)}))})]})]})}}}]);
//# sourceMappingURL=954.e16c0795.chunk.js.map