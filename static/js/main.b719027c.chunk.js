(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,n){e.exports=n(39)},31:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"signUp",function(){return ne}),n.d(r,"logIn",function(){return re}),n.d(r,"getUser",function(){return ae}),n.d(r,"logOut",function(){return ce}),n.d(r,"default",function(){return pe});var a={};n.r(a),n.d(a,"getBalance",function(){return he}),n.d(a,"default",function(){return we});var c={};n.r(c),n.d(c,"getCards",function(){return Ne}),n.d(c,"addCard",function(){return xe}),n.d(c,"deleteCard",function(){return Fe}),n.d(c,"default",function(){return $e});var s={};n.r(s),n.d(s,"getContacts",function(){return He}),n.d(s,"addContact",function(){return Xe}),n.d(s,"toggleFavoriteContact",function(){return ze}),n.d(s,"deleteContact",function(){return We}),n.d(s,"default",function(){return lt});var o={};n.r(o),n.d(o,"getTransfers",function(){return dt}),n.d(o,"makeTransfer",function(){return ft}),n.d(o,"default",function(){return Ct});var u=n(0),i=n.n(u),l=n(23),m=n.n(l),d=(n(31),n(4)),f=n(5),p=n(7),h=n(6),v=n(8),b=n(9),E=n(17),g=n(10),O=n.n(g),y=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).handleSubmit=function(e){if(n.props.onSubmit){e.preventDefault();var t={},r=!0,a=!1,c=void 0;try{for(var s,o=e.target.elements[Symbol.iterator]();!(r=(s=o.next()).done);r=!0){var u=s.value;u.name&&(t[u.name]=u.value)}}catch(i){a=!0,c=i}finally{try{r||null==o.return||o.return()}finally{if(a)throw c}}n.props.onSubmit(t)}},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return i.a.createElement("form",Object.assign({},this.props,{onSubmit:this.handleSubmit}),this.props.children)}}]),t}(i.a.Component);function j(e){var t=e.errorMessage,n=Object(E.a)(e,["errorMessage"]);return i.a.createElement("div",{className:"field"},i.a.createElement("div",{className:"control"},i.a.createElement("input",Object.assign({type:"text"},n,{className:O()("input",t&&"is-danger",e.className)}))),i.a.createElement("p",{className:"help is-danger"},t))}function w(e){var t=e.name,n=e.placeholder,r=e.options,a=void 0===r?[]:r,c=e.errorMessage;return i.a.createElement("div",{className:"field"},i.a.createElement("div",{className:"control"},i.a.createElement("div",{className:O()("select is-fullwidth",c&&"is-danger")},i.a.createElement("select",{name:t},i.a.createElement("option",{value:""},n),a.map(function(e){return i.a.createElement("option",{key:e.value,value:e.value},e.label)})))),i.a.createElement("p",{className:"help is-danger"},c))}function k(e){return i.a.createElement("nav",{className:"navbar"},i.a.createElement("div",{className:"container"},e.children))}function C(e){var t=e.active,n=e.onToggleMenu;return i.a.createElement("div",{className:"navbar-brand"},i.a.createElement("div",{className:"navbar-item"},e.children),i.a.createElement("span",{className:O()("navbar-burger burger",t&&"is-active"),onClick:n},i.a.createElement("span",null),i.a.createElement("span",null),i.a.createElement("span",null)))}function N(e){var t=e.active;return i.a.createElement("div",{className:O()("navbar-menu",t&&"is-active")},i.a.createElement("div",{className:"navbar-end has-text-right"},i.a.Children.map(e.children,function(e){return i.a.cloneElement(e,{className:O()("navbar-item",e.props.classNames)})})))}function x(e){return i.a.createElement("a",e,e.children)}var F=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={isMenuOpen:!1},n.handleToggleMenu=function(){n.setState(function(e){return{isMenuOpen:!e.isMenuOpen}})},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this.state.isMenuOpen;return i.a.createElement(k,null,i.a.createElement(C,{active:e,onToggleMenu:this.handleToggleMenu},i.a.createElement("h1",{className:"title is-italic"},"Ekki")),i.a.createElement(N,{active:e},this.props.children))}}]),t}(i.a.Component);function T(e){return i.a.createElement("button",Object.assign({type:"button"},e,{className:O()("button is-primary",e.className)}),e.children)}function S(){return i.a.createElement("div",{className:"container has-text-centered"},i.a.createElement("button",{type:"button",className:"button is-loading is-white is-large"},"Loading\u2026"))}function M(e){return i.a.createElement("h3",{className:"subtitle"},e.children)}function D(e){return i.a.createElement("h2",{className:"title is-4"},e.children)}var A=n(2),I=n(13),L=n(25),P=n(1),U=n.n(P),_=n(3),B=n(15),q="http://localhost:3001",G="token",$={token:localStorage.getItem(G)};function J(e){$.token=e,localStorage.setItem(G,e||"")}function H(){return!!$.token}function X(e,t,n){return z.apply(this,arguments)}function z(){return(z=Object(_.a)(U.a.mark(function e(t,n,r){var a,c,s,o;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:t,mode:"cors",headers:{}},$.token&&(a.headers["X-Auth"]=$.token),r&&(a.headers["Content-Type"]="application/json",a.body=JSON.stringify(r)),e.next=5,fetch(q+n,a);case 5:return 401===(c=e.sent).status&&J(null),e.prev=7,e.next=10,c.json();case 10:s=e.sent,e.next=16;break;case 13:e.prev=13,e.t0=e.catch(7),s={};case 16:if(c.ok){e.next=18;break}throw new R(s.errors,c.status);case 18:return(o=c.headers.get("X-Auth"))&&J(o),e.abrupt("return",s);case 21:case"end":return e.stop()}},e,this,[[7,13]])}))).apply(this,arguments)}var R=function e(t,n){Object(d.a)(this,e),this.errors=t,this.status=n},W=function(e){var t=e.number,n=e.expiry,r=e.holder;return function(e,t,n){te(e,"number","Card number"),te(t,"expiry","Expiration date"),te(n,"holder","Card holder")}(t,n,r),X("POST","/cards",{card:{number:t,expiry:n,holder:r}})},Y=function(e){return X("DELETE","/cards/".concat(e))},K=function(e){var t=e.username;return function(e){te(e,"username","Username")}(t),X("POST","/contacts",{contact:{username:t}})},Q=function(e,t){var n=t.favorite;return X("PATCH","/contacts/".concat(e),{patch:{favorite:!!n}})},V=function(e){return X("DELETE","/contacts/".concat(e))},Z=function(e){var t=e.to,n=e.amount,r=e.cardId,a=e.password;return function(e,t){if(te(e,"to","Receiver's username"),"NaN"===t)throw new R({amount:"Amount must be a valid number"})}(t,n=(+n).toFixed(2).replace(".","")),X("POST","/transfers",{transfer:{to:t,amount:n,cardId:r,password:a}})};function ee(e,t,n){if(te(e,"username","Username"),te(t,"password","Password"),te(n,"confirm","Password confirmation"),t!==n)throw new R({confirm:"Passwords don't match"})}function te(e,t,n){if(!e)throw new R(Object(B.a)({},t,"".concat(n," is required")))}var ne=se(function(e){var t=e.username,n=e.password;return ee(t,n,e.confirm),X("POST","/users",{user:{username:t,password:n}})}),re=se(function(e){var t=e.username,n=e.password;return ee(t,n,n),X("POST","/users/login",{user:{username:t,password:n}})}),ae=se(function(){return X("GET","/users/me")},{if:H}),ce=se(function(){return X("DELETE","/users/me/token")});function se(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).if;return function(n){return function(){var r=Object(_.a)(U.a.mark(function r(a){var c,s;return U.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!t||t()){r.next=2;break}return r.abrupt("return");case 2:return a(le()),r.prev=3,r.next=6,e(n);case 6:c=r.sent,s=c.user,a(me(s)),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(3),a(de(r.t0.errors));case 14:case"end":return r.stop()}},r,this,[[3,11]])}));return function(e){return r.apply(this,arguments)}}()}}var oe="auth/request",ue="auth/success",ie="auth/failure",le=function(){return{type:oe}},me=function(e){return{type:ue,user:e}},de=function(e){return{type:ie,errors:e}},fe={isFetching:H(),user:null,errors:null};function pe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case oe:return Object(A.a)({},e,{isFetching:!0,errors:null});case ue:return{isFetching:!1,user:t.user,errors:null};case ie:return Object(A.a)({},e,{isFetching:!1,errors:t.errors});default:return e}}var he=function(){return function(){var e=Object(_.a)(U.a.mark(function e(t){var n,r;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t(ge()),e.prev=1,e.next=4,X("GET","/balance");case 4:n=e.sent,r=n.balance,t(Oe(r)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t(ye());case 12:case"end":return e.stop()}},e,this,[[1,9]])}));return function(t){return e.apply(this,arguments)}}()},ve="balance/request",be="balance/success",Ee="balance/failure",ge=function(){return{type:ve}},Oe=function(e){return{type:be,balance:e}},ye=function(){return{type:Ee}},je={isFetching:!1,value:null};function we(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:je,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ve:return Object(A.a)({},e,{isFetching:!0});case be:return{isFetching:!1,value:t.balance};case Ee:return Object(A.a)({},e,{isFetching:!1});default:return e}}var ke=n(12),Ce=function(e){return function(){var t=Object(_.a)(U.a.mark(function t(n){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n(Le()),t.prev=1,t.next=4,e(n);case 4:n(Pe()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),n(Ue(t.t0.errors));case 10:case"end":return t.stop()}},t,this,[[1,7]])}));return function(e){return t.apply(this,arguments)}}()},Ne=function(){return Ce(function(){var e=Object(_.a)(U.a.mark(function e(t){var n,r;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X("GET","/cards");case 2:n=e.sent,r=n.cards,t(_e(r));case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())},xe=function(e){return Ce(function(){var t=Object(_.a)(U.a.mark(function t(n){var r,a;return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,W(e);case 2:r=t.sent,a=r.card,n(Be(a));case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())},Fe=function(e){return Ce(function(){var t=Object(_.a)(U.a.mark(function t(n){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Y(e);case 2:n(qe(e));case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())},Te="cards/request",Se="cards/success",Me="cards/failure",De="cards/set-cards",Ae="cards/card-added",Ie="cards/card-deleted",Le=function(){return{type:Te}},Pe=function(){return{type:Se}},Ue=function(e){return{type:Me,errors:e}},_e=function(e){return{type:De,cards:e}},Be=function(e){return{type:Ae,card:e}},qe=function(e){return{type:Ie,id:e}},Ge={isFetching:!1,items:[],errors:null};function $e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Te:return Object(A.a)({},e,{isFetching:!0,errors:null});case Se:return Object(A.a)({},e,{isFetching:!1,errors:null});case Me:return Object(A.a)({},e,{isFetching:!1,errors:t.errors});case De:return Object(A.a)({},e,{items:t.cards});case Ae:return Object(A.a)({},e,{items:[].concat(Object(ke.a)(e.items),[t.card])});case Ie:return Object(A.a)({},e,{items:e.items.filter(function(e){return e._id!==t.id})});default:return e}}var Je=function(e){return function(){var t=Object(_.a)(U.a.mark(function t(n){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n(nt()),t.prev=1,t.next=4,e(n);case 4:n(rt()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),n(at(t.t0.errors));case 10:case"end":return t.stop()}},t,this,[[1,7]])}));return function(e){return t.apply(this,arguments)}}()},He=function(){return Je(function(){var e=Object(_.a)(U.a.mark(function e(t){var n,r;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X("GET","/contacts");case 2:n=e.sent,r=n.contacts,t(ct(r));case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())},Xe=function(e){return Je(function(){var t=Object(_.a)(U.a.mark(function t(n){var r,a;return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K(e);case 2:r=t.sent,a=r.contact,n(st(a));case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())},ze=function(e){return function(t){return t(Re(e._id,{favorite:!e.favorite}))}},Re=function(e,t){return Je(function(){var n=Object(_.a)(U.a.mark(function n(r){var a,c;return U.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Q(e,t);case 2:a=n.sent,c=a.contact,r(ot(e,c));case 5:case"end":return n.stop()}},n,this)}));return function(e){return n.apply(this,arguments)}}())},We=function(e){return Je(function(){var t=Object(_.a)(U.a.mark(function t(n){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,V(e);case 2:n(ut(e));case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())},Ye="contacts/request",Ke="contacts/success",Qe="contacts/failure",Ve="contacts/set-contacts",Ze="contacts/contact-added",et="contacts/contact-updated",tt="contacts/contact-deleted",nt=function(){return{type:Ye}},rt=function(){return{type:Ke}},at=function(e){return{type:Qe,errors:e}},ct=function(e){return{type:Ve,contacts:e}},st=function(e){return{type:Ze,contact:e}},ot=function(e,t){return{type:et,id:e,contact:t}},ut=function(e){return{type:tt,id:e}},it={isFetching:!1,items:[],errors:null};function lt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:it,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ye:return Object(A.a)({},e,{isFetching:!0,errors:null});case Ke:return Object(A.a)({},e,{isFetching:!1,errors:null});case Qe:return Object(A.a)({},e,{isFetching:!1,errors:t.errors});case Ve:return Object(A.a)({},e,{items:t.contacts});case Ze:return Object(A.a)({},e,{items:[].concat(Object(ke.a)(e.items),[t.contact])});case et:return Object(A.a)({},e,{items:e.items.map(function(e){return e._id===t.id?t.contact:e})});case tt:return Object(A.a)({},e,{items:e.items.filter(function(e){return e._id!==t.id})});default:return e}}var mt=function(e){return function(){var t=Object(_.a)(U.a.mark(function t(n){return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n(gt()),t.prev=1,t.next=4,e(n);case 4:n(Ot()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),n(yt(t.t0.errors));case 10:case"end":return t.stop()}},t,this,[[1,7]])}));return function(e){return t.apply(this,arguments)}}()},dt=function(){return mt(function(){var e=Object(_.a)(U.a.mark(function e(t){var n,r;return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X("GET","/transfers");case 2:n=e.sent,r=n.transfers,t(jt(r));case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())},ft=function(e){return mt(function(){var t=Object(_.a)(U.a.mark(function t(n){var r,a;return U.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Z(e);case 2:r=t.sent,a=r.transfer,n(wt(a));case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())},pt="transfers/request",ht="transfers/success",vt="transfers/failure",bt="transfers/set-transfers",Et="transfers/transfer-added",gt=function(){return{type:pt}},Ot=function(){return{type:ht}},yt=function(e){return{type:vt,errors:e}},jt=function(e){return{type:bt,transfers:e}},wt=function(e){return{type:Et,transfer:e}},kt={isFetching:!1,items:[],errors:null};function Ct(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:kt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case pt:return Object(A.a)({},e,{isFetching:!0,errors:null});case ht:return Object(A.a)({},e,{isFetching:!1,errors:null});case vt:return Object(A.a)({},e,{isFetching:!1,errors:t.errors});case bt:return Object(A.a)({},e,{items:t.transfers});case Et:return Object(A.a)({},e,{items:[t.transfer].concat(Object(ke.a)(e.items))});default:return e}}var Nt=Object(A.a)({},r,a,c,s,o),xt=Object(I.c)({auth:pe,balance:we,cards:$e,contacts:lt,transfers:Ct});var Ft="Log in",Tt="Sign up",St=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={mode:Ft},n.handleSwitchMode=function(){n.setState(function(e){return{mode:e.mode===Ft?Tt:Ft}})},n.handleSubmit=function(e){var t=n.props,r=t.onLogIn,a=t.onSignUp;(n.state.mode===Ft?r:a)(e)},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this.state.mode,t=this.props.errors;return i.a.createElement(Mt,null,i.a.createElement(Dt,null,i.a.createElement(F,null,i.a.createElement(x,{onClick:this.handleSwitchMode},e===Ft?Tt:Ft))),i.a.createElement(At,null,i.a.createElement(It,{mode:e,errors:t,onSubmit:this.handleSubmit})))}}]),t}(i.a.Component);function Mt(e){return i.a.createElement("section",{className:"hero is-primary is-fullheight"},e.children)}function Dt(e){return i.a.createElement("div",{className:"hero-head"},e.children)}function At(e){return i.a.createElement("div",{className:"hero-body"},i.a.createElement("div",{className:"container has-text-centered"},i.a.createElement("div",{className:"columns is-centered is-mobile"},i.a.createElement("div",{className:"column is-narrow"},e.children))))}function It(e){var t=e.mode,n=e.errors,r=e.onSubmit;return i.a.createElement(i.a.Fragment,null,i.a.createElement(D,null,t===Ft?Ft:Tt),i.a.createElement(y,{onSubmit:r},i.a.createElement(j,{className:"is-primary is-medium",name:"username",placeholder:"Username",errorMessage:n.username}),i.a.createElement(j,{className:"is-primary is-medium",name:"password",type:"password",placeholder:"Password",errorMessage:n.password}),t===Tt&&i.a.createElement(j,{className:"is-primary is-medium",name:"confirm",type:"password",placeholder:"Confirm password",errorMessage:n.confirm}),i.a.createElement(T,{className:"is-medium is-inverted is-outlined",type:"submit"},"Submit")))}var Lt={onLogIn:Nt.logIn,onSignUp:Nt.signUp},Pt=Object(b.b)(function(e){return{errors:e.auth.errors||{}}},Lt)(St),Ut=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).handleAddCard=function(e){n.props.onAddCard(e)},n.handleDeleteCard=function(e){n.props.onDeleteCard(e)},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.props.getCards()}},{key:"render",value:function(){var e=this.props.cards;return i.a.createElement("div",{className:"container ekki-container"},i.a.createElement("div",{className:"columns"},i.a.createElement("div",{className:"column"},e.isFetching?i.a.createElement(S,null):e.items.length?i.a.createElement(i.a.Fragment,null,i.a.createElement(D,null,"Credit cards"),i.a.createElement(_t,{items:e.items,onDelete:this.handleDeleteCard})):null),i.a.createElement("div",{className:"column is-narrow-desktop"},i.a.createElement(qt,{errors:e.errors,onSubmit:this.handleAddCard}))))}}]),t}(i.a.Component);function _t(e){var t=e.items,n=e.onDelete;return i.a.createElement("div",{className:"columns is-multiline is-centered is-mobile"},t.map(function(e){return i.a.createElement("div",{key:e._id,className:"column is-narrow"},i.a.createElement(Bt,{card:e,onDelete:n}))}))}function Bt(e){var t=e.card,n=e.onDelete;return i.a.createElement("div",{className:"ekki-card box notification"},i.a.createElement("button",{className:"delete",onClick:function(){return n(t._id)}}),i.a.createElement("p",null,t.number.replace(/\*/g,"\u2022")),i.a.createElement("p",null,t.expiry),i.a.createElement("p",{className:"is-uppercase"},t.holder))}function qt(e){var t=e.errors,n=e.onSubmit;return i.a.createElement(y,{onSubmit:n},i.a.createElement(D,null,"Add a card"),i.a.createElement(j,{name:"number",placeholder:"Card number",errorMessage:t&&t.number}),i.a.createElement(j,{name:"expiry",placeholder:"Expiration date",errorMessage:t&&t.expiry}),i.a.createElement(j,{name:"holder",placeholder:"Name on card",errorMessage:t&&t.holder}),i.a.createElement(T,{type:"submit"},"Add"))}var Gt={getCards:Nt.getCards,onAddCard:Nt.addCard,onDeleteCard:Nt.deleteCard},$t=Object(b.b)(function(e){return{cards:e.cards}},Gt)(Ut),Jt=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).handleAddContact=function(e){n.props.onAddContact(e)},n.handleToggleFavorite=function(e){n.props.onToggleFavoriteContact(e)},n.handleDeleteContact=function(e){n.props.onDeleteContact(e)},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.props.getContacts()}},{key:"render",value:function(){var e=this.props.contacts;return i.a.createElement("div",{className:"container ekki-container"},i.a.createElement("div",{className:"columns"},i.a.createElement("div",{className:"column"},e.isFetching?i.a.createElement(S,null):i.a.createElement(i.a.Fragment,null,i.a.createElement(Ht,{title:"Favorites",items:Kt(e.items),onToggleFavorite:this.handleToggleFavorite,onDelete:this.handleDeleteContact}),i.a.createElement(Ht,{items:Qt(e.items),onToggleFavorite:this.handleToggleFavorite,onDelete:this.handleDeleteContact}))),i.a.createElement("div",{className:"column is-narrow-desktop"},i.a.createElement(Rt,{errors:e.errors,onSubmit:this.handleAddContact}))))}}]),t}(i.a.Component);function Ht(e){var t=e.title,n=void 0===t?"Contacts":t,r=e.items,a=Object(E.a)(e,["title","items"]);return 0===r.length?null:i.a.createElement(i.a.Fragment,null,i.a.createElement(D,null,n),r.map(function(e){return i.a.createElement(Xt,Object.assign({},a,{key:e._id,contact:e}))}))}function Xt(e){var t=e.contact,n=e.onToggleFavorite,r=e.onDelete;return i.a.createElement("article",{className:"box media"},i.a.createElement("figure",{className:"media-left"},i.a.createElement("p",{className:"image is-32x32"},i.a.createElement("img",{className:"is-rounded",src:Zt(t.username),alt:""}))),i.a.createElement("div",{className:"media-content"},i.a.createElement("p",null,t.username," ",i.a.createElement(zt,{favorite:t.favorite,onClick:function(){return n(t)}}))),i.a.createElement("div",{className:"media-right"},i.a.createElement("button",{className:"delete",onClick:function(){return r(t._id)}})))}function zt(e){var t=e.favorite,n=e.onClick;return i.a.createElement("span",{className:O()("ekki-clickable is-size-5",t?"has-text-warning":"has-text-grey-lighter"),onClick:n},"\u2605")}function Rt(e){var t=e.errors,n=e.onSubmit;return i.a.createElement(y,{onSubmit:n},i.a.createElement(D,null,"Add a contact"),i.a.createElement(j,{name:"username",placeholder:"Username",errorMessage:t&&t.username}),i.a.createElement(T,{type:"submit"},"Add"))}var Wt={getContacts:Nt.getContacts,onAddContact:Nt.addContact,onToggleFavoriteContact:Nt.toggleFavoriteContact,onDeleteContact:Nt.deleteContact},Yt=Object(b.b)(function(e){return{contacts:e.contacts}},Wt)(Jt),Kt=function(e){return Vt(e.filter(function(e){return e.favorite}))},Qt=function(e){return Vt(e.filter(function(e){return!e.favorite}))},Vt=function(e){return e.sort(function(e,t){return e.username.localeCompare(t.username)})},Zt=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:64;return"https://api.adorable.io/avatars/".concat(t,"/").concat(e,".png")},en=n(16);function tn(e){for(var t=(e/100).toFixed(2).split("."),n=Object(en.a)(t,2),r=n[0],a=n[1],c=r.length%3,s=c?[r.slice(0,c)]:[],o=c;o<r.length;o+=3)s.push(r.slice(o,o+3));return s.join(",")+"."+a}var nn=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.props.onMount()}},{key:"render",value:function(){var e=this.props,t=e.user,n=e.balance;return i.a.createElement(rn,null,n.isFetching&&null==n.value?i.a.createElement(S,null):i.a.createElement(an,{username:t.username,value:n.value}))}}]),t}(i.a.Component);function rn(e){return i.a.createElement("div",{className:"hero"},i.a.createElement("div",{className:"hero-body"},e.children))}function an(e){var t=e.username,n=tn(e.value).split("."),r=Object(en.a)(n,2),a=r[0],c=r[1];return i.a.createElement("div",{className:"container has-text-centered"},i.a.createElement(D,null,"Welcome, ",t),i.a.createElement(M,null,"Your balance is"),i.a.createElement("p",{className:"has-text-primary"},i.a.createElement("span",{className:"subtitle is-4"},"$"),i.a.createElement("span",{className:"title is-1"},a),i.a.createElement("span",{className:"title is-2"},".",c)))}var cn={onMount:Nt.getBalance},sn=Object(b.b)(function(e){return{user:e.auth.user,balance:e.balance}},cn)(nn),on=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={cardId:"",password:""},n.handleMakeTransfer=function(e){var t=e.cardId,r=e.password;n.setState(function(){return{cardId:t,password:r}}),n.props.onMakeTransfer(e)},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.props.getTransfers(),this.props.getCards()}},{key:"render",value:function(){var e=this.props,t=e.transfers,n=e.cards,r=e.user;return i.a.createElement("div",{className:"container ekki-container"},i.a.createElement("div",{className:"columns"},i.a.createElement("div",{className:"column"},i.a.createElement(un,Object.assign({},this.state,{cards:n,errors:t.errors,onSubmit:this.handleMakeTransfer}))),i.a.createElement("div",{className:"column"},t.isFetching?i.a.createElement(S,null):i.a.createElement(ln,{items:t.items,user:r}))))}}]),t}(i.a.Component);function un(e){var t=e.cards,n=e.cardId,r=e.password,a=e.onSubmit,c=e.errors||{};return i.a.createElement(y,{onSubmit:a},i.a.createElement(D,null,"Make a transfer"),i.a.createElement(j,{name:"to",placeholder:"To (username)",errorMessage:c.to}),i.a.createElement(j,{name:"amount",placeholder:"Amount",errorMessage:c.amount}),(n||c.cardId)&&i.a.createElement(w,{name:"cardId",placeholder:"Choose a card",options:t.items.map(function(e){return{value:e._id,label:e.number}}),errorMessage:c.cardId}),(r||c.password)&&i.a.createElement(j,{name:"password",type:"password",placeholder:"Password",errorMessage:c.password}),i.a.createElement(T,{type:"submit"},"Send"))}function ln(e){var t=e.items,n=e.user;return 0===t.length?null:i.a.createElement(i.a.Fragment,null,i.a.createElement(D,null,"Transfer history"),t.map(function(e){return i.a.createElement(mn,{key:e._id,transfer:e,user:n})}))}function mn(e){var t=e.transfer,n=e.user;return i.a.createElement("article",{className:O()("message",t.receiver===n.username&&"is-success")},i.a.createElement("div",{className:"message-body"},i.a.createElement("table",{className:"table ekki-transfer"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Date"),i.a.createElement("td",null,new Date(t.createdAt).toLocaleString())),n.username!==t.sender&&i.a.createElement("tr",null,i.a.createElement("th",null,"From"),i.a.createElement("td",null,t.sender)),n.username!==t.receiver&&i.a.createElement("tr",null,i.a.createElement("th",null,"To"),i.a.createElement("td",null,t.receiver)),t.amountFromBalance?i.a.createElement("tr",null,i.a.createElement("th",null,"From balance"),i.a.createElement("td",null,"$",tn(t.amountFromBalance))):null,t.amountFromCard?i.a.createElement("tr",null,i.a.createElement("th",null,"From card"),i.a.createElement("td",null,"$",tn(t.amountFromCard))):null,t.amountFromBalance&&t.amountFromCard?i.a.createElement("tr",null,i.a.createElement("th",null,"Total"),i.a.createElement("td",null,"$",tn(t.amountFromBalance+t.amountFromCard))):null))))}var dn={getTransfers:Nt.getTransfers,getCards:Nt.getCards,onMakeTransfer:Nt.makeTransfer},fn=[{label:"Home",component:sn},{label:"Transfers",component:Object(b.b)(function(e){return{transfers:e.transfers,cards:e.cards,user:e.auth.user}},dn)(on)},{label:"Contacts",component:Yt},{label:"Cards",component:$t}],pn=function(){return+localStorage.getItem("tab")},hn=function(e){return localStorage.setItem("tab",e)},vn=function(e){function t(){var e,n;Object(d.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(a)))).state={activeTab:pn()},n.handleClickTab=function(e){n.setState(function(t){return{activeTab:e}}),hn(e)},n}return Object(v.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this.state.activeTab,t=this.props.onLogOut,n=fn[e].component;return i.a.createElement("div",null,i.a.createElement(F,null,i.a.createElement(x,{onClick:t},"Log out")),i.a.createElement(bn,{onClick:this.handleClickTab},fn.map(function(t,n){return i.a.createElement(En,{key:n,index:n,activeIndex:e,label:t.label})})),i.a.createElement(n,null))}}]),t}(i.a.Component);function bn(e){var t=e.onClick;return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"tabs is-centered"},i.a.createElement("ul",null,i.a.Children.map(e.children,function(e){return i.a.cloneElement(e,{onClick:t})}))))}function En(e){var t=e.index,n=e.activeIndex,r=e.label,a=e.onClick;return i.a.createElement("li",{className:O()(n===t&&"is-active")},i.a.createElement("a",{onClick:function(){return a(t)}},r))}var gn={onLogOut:Nt.logOut},On=Object(b.b)(null,gn)(vn),yn=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.props.onMount()}},{key:"render",value:function(){var e=this.props.auth;return H()&&e.isFetching?i.a.createElement(jn,null):e.user?i.a.createElement(On,null):i.a.createElement(Pt,null)}}]),t}(i.a.Component);function jn(){return i.a.createElement("div",{className:"hero is-fullheight"},i.a.createElement("div",{className:"hero-body"},i.a.createElement(S,null)))}var wn={onMount:Nt.getUser},kn=Object(b.b)(function(e){return{auth:e.auth}},wn)(yn);m.a.render(function(e){var t=Object(I.d)(xt,{},Object(I.a)(L.a));return i.a.createElement(b.a,{store:t},e)}(i.a.createElement(kn,null)),document.getElementById("root"))}},[[26,2,1]]]);
//# sourceMappingURL=main.b719027c.chunk.js.map