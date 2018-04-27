(function(BX,BP){var Bn=BP.noop;var BL=BP.copy;var Bb=BP.extend;var Bm=BP.element;var B1=BP.forEach;var BS=BP.isArray;var BW=BP.isString;var BM=BP.isObject;var Ba=BP.isUndefined;var BU=BP.isDefined;var BJ=BP.isFunction;var Bo=BP.isElement;var Cd=1;var Bc=8;var B6="-add";var Bi="-remove";var Bv="ng-";var BQ="-active";var AN="-prepare";var BK="ng-animate";var Bx="$$ngAnimateChildren";var AR="",By,B4,Bw,BD;if(Ba(BX.ontransitionend)&&BU(BX.onwebkittransitionend)){AR="-webkit-";By="WebkitTransition";B4="webkitTransitionEnd transitionend"}else{By="transition";B4="transitionend"}if(Ba(BX.onanimationend)&&BU(BX.onwebkitanimationend)){AR="-webkit-";Bw="WebkitAnimation";BD="webkitAnimationEnd animationend"}else{Bw="animation";BD="animationend"}var AZ="Duration";var Br="Property";var AM="Delay";var BG="TimingFunction";var BC="IterationCount";var BE="PlayState";var BT=9999;var AV=Bw+AM;var AQ=Bw+AZ;var A8=By+AM;var BO=By+AZ;var Bd=function(A){return A&&A.then?true:false};var Bu=BP.$$minErr("ng");function A3(C,A,B){if(!C){throw Bu("areq","Argument '{0}' is {1}",(A||"?"),(B||"required"))}return C}function BB(B,A){if(!B&&!A){return""}if(!B){return A}if(!A){return B}if(BS(B)){B=B.join(" ")}if(BS(A)){A=A.join(" ")}return B+" "+A}function Bt(A){var B={};if(A&&(A.to||A.from)){B.to=A.to;B.from=A.from}return B}function AU(A,C,D){var B="";A=BS(A)?A:A&&BW(A)&&A.length?A.split(/\s+/):[];B1(A,function(E,F){if(E&&E.length>0){B+=(F>0)?" ":"";B+=D?C+E:E+C}});return B}function AY(C,A){var B=C.indexOf(A);if(A>=0){C.splice(B,1)}}function Bs(A){if(A instanceof Bm){switch(A.length){case 0:return[];break;case 1:if(A[0].nodeType===Cd){return A}break;default:return Bm(Bl(A));break}}if(A.nodeType===Cd){return Bm(A)}}function Bl(A){if(!A[0]){return A}for(var B=0;B<A.length;B++){var C=A[B];if(C.nodeType==Cd){return C}}}function B2(C,A,B){B1(A,function(D){C.addClass(D,B)})}function B3(C,A,B){B1(A,function(D){C.removeClass(D,B)})}function A0(A){return function(B,C){if(C.addClass){B2(A,B,C.addClass);C.addClass=null}if(C.removeClass){B3(A,B,C.removeClass);C.removeClass=null}}}function Bj(A){A=A||{};if(!A.$$prepared){var B=A.domOperation||Bn;A.domOperation=function(){A.$$domOperationFired=true;B();B=Bn};A.$$prepared=true}return A}function A9(B,A){BH(B,A);B0(B,A)}function BH(B,A){if(A.from){B.css(A.from);A.from=null}}function B0(B,A){if(A.to){B.css(A.to);A.to=null}}function Bq(H,E,A){var B=E.options||{};var C=A.options||{};var G=(B.addClass||"")+" "+(C.addClass||"");var D=(B.removeClass||"")+" "+(C.removeClass||"");var I=Bk(H.attr("class"),G,D);if(C.preparationClasses){B.preparationClasses=BV(C.preparationClasses,B.preparationClasses);delete C.preparationClasses}var F=B.domOperation!==Bn?B.domOperation:null;Bb(B,C);if(F){B.domOperation=F}if(I.addClass){B.addClass=I.addClass}else{B.addClass=null}if(I.removeClass){B.removeClass=I.removeClass}else{B.removeClass=null}E.addClass=B.addClass;E.removeClass=B.removeClass;return B}function Bk(C,F,B){var D=1;var A=-1;var E={};C=G(C);F=G(F);B1(F,function(I,J){E[J]=D});B=G(B);B1(B,function(I,J){E[J]=E[J]===D?null:A});var H={addClass:"",removeClass:""};B1(E,function(K,J){var I,L;if(K===D){I="addClass";L=!C[J]}else{if(K===A){I="removeClass";L=C[J]}}if(L){if(H[I].length){H[I]+=" "}H[I]+=J}});function G(I){if(BW(I)){I=I.split(" ")}var J={};B1(I,function(K){if(K.length){J[K]=true}});return J}return H}function AW(A){return(A instanceof BP.element)?A[0]:A}function BI(C,A,D){var B="";if(A){B=AU(A,Bv,true)}if(D.addClass){B=BV(B,AU(D.addClass,B6))}if(D.removeClass){B=BV(B,AU(D.removeClass,Bi))}if(B.length){D.preparationClasses=B;C.addClass(B)}}function B9(B,A){if(A.preparationClasses){B.removeClass(A.preparationClasses);A.preparationClasses=null}if(A.activeClasses){B.removeClass(A.activeClasses);A.activeClasses=null}}function B7(B,C){var A=C?"-"+C+"s":"";AP(B,[A8,A]);return[A8,A]}function AO(D,C){var A=C?"paused":"";var B=Bw+BE;AP(D,[B,A]);return[B,A]}function AP(B,C){var D=C[0];var A=C[1];B.style[D]=A}function BV(B,A){if(!B){return A}if(!A){return B}return B+" "+A}var Be=["$$rAF",function(E){var B,A;function C(F){B=B.concat(F);D()}B=C.queue=[];C.waitUntilQuiet=function(F){if(A){A()}A=E(function(){A=null;F();D()})};return C;function D(){if(!B.length){return}var G=B.shift();for(var F=0;F<G.length;F++){G[F]()}if(!A){E(function(){if(!A){D()}})}}}];var BF=["$interpolate",function(A){return{link:function(F,B,E){var C=E.ngAnimateChildren;if(BP.isString(C)&&C.length===0){B.data(Bx,true)}else{D(A(C)(F));E.$observe("ngAnimateChildren",D)}function D(G){G=G==="on"||G==="true";B.data(Bx,G)}}}}];var Bh="$$animateCss";var B8=1000;var Bz=10;var AS=3;var Cb=1.5;var A1={transitionDuration:BO,transitionDelay:A8,transitionProperty:By+Br,animationDuration:AQ,animationDelay:AV,animationIterationCount:Bw+BC};var A5={transitionDuration:BO,transitionDelay:A8,animationDuration:AQ,animationDelay:AV};function B5(A){return[AQ,A+"s"]}function A7(A,B){var C=B?AV:A8;return[C,A+"s"]}function Cc(E,B,A){var D=Object.create(null);var C=E.getComputedStyle(B)||{};B1(A,function(G,F){var I=C[G];if(I){var H=I.charAt(0);if(H==="-"||H==="+"||H>=0){I=AT(I)}if(I===0){I=null}D[F]=I}});return D}function AT(B){var A=0;var C=B.split(/\s*,\s*/);B1(C,function(D){if(D.charAt(D.length-1)=="s"){D=D.substring(0,D.length-1)}D=parseFloat(D)||0;A=A?Math.max(D,A):D});return A}function BZ(A){return A===0||A!=null}function BA(A,B){var D=By;var C=A+"s";if(B){D+=AZ}else{C+=" linear all"}return[D,C]}function BY(){var A=Object.create(null);return{flush:function(){A=Object.create(null)},count:function(C){var B=A[C];return B?B.total:0},get:function(C){var B=A[C];return B&&B.value},put:function(C,B){if(!A[C]){A[C]={total:1,value:B}}else{A[C].total++}}}}function Bf(C,B,A){B1(A,function(D){C[D]=BU(C[D])?C[D]:B.style.getPropertyValue(D)})}var BR=["$animateProvider",function(A){var B=BY();var C=BY();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(L,M,O,P,G,D,H,Q){var N=A0(M);var E=0;function T(W,Z){var Y="$$ngAnimateParentKey";var X=W.parentNode;var V=X[Y]||(X[Y]=++E);return V+"-"+W.getAttribute("class")+"-"+Z}function S(W,X,Z,Y){var V=B.get(Z);if(!V){V=Cc(L,W,Y);if(V.animationIterationCount==="infinite"){V.animationIterationCount=1}}B.put(Z,V);return V}function K(X,Y,a,Z){var W;if(B.count(a)>0){W=C.get(a);if(!W){var V=AU(Y,"-stagger");M.addClass(X,V);W=Cc(L,X,Z);W.animationDuration=Math.max(W.animationDuration,0);W.transitionDuration=Math.max(W.transitionDuration,0);M.removeClass(X,V);C.put(a,W)}}return W||{}}var U;var F=[];function R(V){F.push(V);H.waitUntilQuiet(function(){B.flush();C.flush();var W=G();for(var X=0;X<F.length;X++){F[X](W)}F.length=0})}function J(V,a,Z){var W=S(V,a,Z,A1);var X=W.animationDelay;var Y=W.transitionDelay;W.maxDelay=X&&Y?Math.max(X,Y):(X||Y);W.maxDuration=Math.max(W.animationDuration*W.animationIterationCount,W.transitionDuration);return W}return function I(n,y){var An=y||{};if(!An.$$prepared){An=Bj(BL(An))}var f={};var c=AW(n);if(!c||!c.parentNode||!Q.enabled()){return m()}var Al=[];var v=n.attr("class");var o=Bt(An);var Ai;var u;var w;var t;var Ap;var q;var Ag;var x;var Am;var Ak;var a=[];if(An.duration===0||(!D.animations&&!D.transitions)){return m()}var l=An.event&&BS(An.event)?An.event.join(" "):An.event;var z=l&&An.structural;var Aq="";var j="";if(z){Aq=AU(l,Bv,true)}else{if(l){Aq=l}}if(An.addClass){j+=AU(An.addClass,B6)}if(An.removeClass){if(j.length){j+=" "}j+=AU(An.removeClass,Bi)}if(An.applyClassesEarly&&j.length){N(n,An)}var p=[Aq,j].join(" ").trim();var g=v+" "+p;var Ah=AU(p,BQ);var Ao=o.to&&Object.keys(o.to).length>0;var Aj=(An.keyframeStyle||"").length>0;if(!Aj&&!Ao&&!p){return m()}var Ab,h;if(An.stagger>0){var Z=parseFloat(An.stagger);h={transitionDelay:Z,animationDelay:Z,transitionDuration:0,animationDuration:0}}else{Ab=T(c,g);h=K(c,p,Ab,A5)}if(!An.$$skipPreparationClasses){M.addClass(n,p)}var Af;if(An.transitionStyle){var Aa=[By,An.transitionStyle];AP(c,Aa);Al.push(Aa)}if(An.duration>=0){Af=c.style[By].length>0;var W=BA(An.duration,Af);AP(c,W);Al.push(W)}if(An.keyframeStyle){var Y=[Bw,An.keyframeStyle];AP(c,Y);Al.push(Y)}var d=h?An.staggerIndex>=0?An.staggerIndex:B.count(Ab):0;var r=d===0;if(r&&!An.skipBlocking){B7(c,BT)}var e=J(c,g,Ab);var Ae=e.maxDelay;q=Math.max(Ae,0);x=e.maxDuration;var s={};s.hasTransitions=e.transitionDuration>0;s.hasAnimations=e.animationDuration>0;s.hasTransitionAll=s.hasTransitions&&e.transitionProperty=="all";s.applyTransitionDuration=Ao&&((s.hasTransitions&&!s.hasTransitionAll)||(s.hasAnimations&&!s.hasTransitions));s.applyAnimationDuration=An.duration&&s.hasAnimations;s.applyTransitionDelay=BZ(An.delay)&&(s.applyTransitionDuration||s.hasTransitions);s.applyAnimationDelay=BZ(An.delay)&&s.hasAnimations;s.recalculateTimingStyles=j.length>0;if(s.applyTransitionDuration||s.applyAnimationDuration){x=An.duration?parseFloat(An.duration):x;if(s.applyTransitionDuration){s.hasTransitions=true;e.transitionDuration=x;Af=c.style[By+Br].length>0;Al.push(BA(x,Af))}if(s.applyAnimationDuration){s.hasAnimations=true;e.animationDuration=x;Al.push(B5(x))}}if(x===0&&!s.recalculateTimingStyles){return m()}if(An.delay!=null){var V;if(typeof An.delay!=="boolean"){V=parseFloat(An.delay);q=Math.max(V,0)}if(s.applyTransitionDelay){Al.push(A7(V))}if(s.applyAnimationDelay){Al.push(A7(V,true))}}if(An.duration==null&&e.transitionDuration>0){s.recalculateTimingStyles=s.recalculateTimingStyles||r}Ag=q*B8;Am=x*B8;if(!An.skipBlocking){s.blockTransition=e.transitionDuration>0;s.blockKeyframeAnimation=e.animationDuration>0&&h.animationDelay>0&&h.animationDuration===0}if(An.from){if(An.cleanupStyles){Bf(f,c,Object.keys(An.from))}BH(n,An)}if(s.blockTransition||s.blockKeyframeAnimation){X(x)}else{if(!An.skipBlocking){B7(c,false)}}return{$$willAnimate:true,end:k,start:function(){if(Ai){return}Ap={end:k,cancel:i,resume:null,pause:null};t=new O(Ap);R(b);return t}};function k(){Ac()}function i(){Ac(true)}function Ac(Ar){if(Ai||(w&&u)){return}Ai=true;u=false;if(!An.$$skipPreparationClasses){M.removeClass(n,p)}M.removeClass(n,Ah);AO(c,false);B7(c,false);B1(Al,function(At){c.style[At[0]]=""});N(n,An);A9(n,An);if(Object.keys(f).length){B1(f,function(At,Au){At?c.style.setProperty(Au,At):c.style.removeProperty(Au)})}if(An.onDone){An.onDone()}if(a&&a.length){n.off(a.join(" "),Ad)}var As=n.data(Bh);if(As){P.cancel(As[0].timer);n.removeData(Bh)}if(t){t.complete(!Ar)}}function X(Ar){if(s.blockTransition){B7(c,Ar)}if(s.blockKeyframeAnimation){AO(c,!!Ar)}}function m(){t=new O({end:k,cancel:i});R(Bn);Ac();return{$$willAnimate:false,start:function(){return t},end:k}}function Ad(As){As.stopPropagation();var Au=As.originalEvent||As;var Ar=Au.$manualTimeStamp||Date.now();var At=parseFloat(Au.elapsedTime.toFixed(AS));if(Math.max(Ar-Ak,0)>=Ag&&At>=x){w=true;Ac()}}function b(){if(Ai){return}if(!c.parentNode){Ac();return}var Ar=function(Aw){if(!w){u=!Aw;if(e.animationDuration){var Av=AO(c,u);u?Al.push(Av):AY(Al,Av)}}else{if(u&&Aw){u=false;Ac()}}};var As=d>0&&((e.transitionDuration&&h.transitionDuration===0)||(e.animationDuration&&h.animationDuration===0))&&Math.max(h.animationDelay,h.transitionDelay);if(As){P(Au,Math.floor(As*d*B8),false)}else{Au()}Ap.resume=function(){Ar(true)};Ap.pause=function(){Ar(false)};function Au(){if(Ai){return}X(false);B1(Al,function(AD){var AF=AD[0];var AE=AD[1];c.style[AF]=AE});N(n,An);M.addClass(n,Ah);if(s.recalculateTimingStyles){g=c.className+" "+p;Ab=T(c,g);e=J(c,g,Ab);Ae=e.maxDelay;q=Math.max(Ae,0);x=e.maxDuration;if(x===0){Ac();return}s.hasTransitions=e.transitionDuration>0;s.hasAnimations=e.animationDuration>0}if(s.applyAnimationDelay){Ae=typeof An.delay!=="boolean"&&BZ(An.delay)?parseFloat(An.delay):Ae;q=Math.max(Ae,0);e.animationDelay=Ae;V=A7(Ae,true);Al.push(V);c.style[V[0]]=V[1]}Ag=q*B8;Am=x*B8;if(An.easing){var Az,Av=An.easing;if(s.hasTransitions){Az=By+BG;Al.push([Az,Av]);c.style[Az]=Av}if(s.hasAnimations){Az=Bw+BG;Al.push([Az,Av]);c.style[Az]=Av}}if(e.transitionDuration){a.push(B4)}if(e.animationDuration){a.push(BD)}Ak=Date.now();var AC=Ag+Cb*Am;var AA=Ak+AC;var Ay=n.data(Bh)||[];var Ax=true;if(Ay.length){var AB=Ay[0];Ax=AA>AB.expectedEndTime;if(Ax){P.cancel(AB.timer)}else{Ay.push(Ac)}}if(Ax){var Aw=P(At,AC,false);Ay[0]={timer:Aw,expectedEndTime:AA};Ay.push(Ac);n.data(Bh,Ay)}if(a.length){n.on(a.join(" "),Ad)}if(An.to){if(An.cleanupStyles){Bf(f,c,Object.keys(An.to))}B0(n,An)}}function At(){var Aw=n.data(Bh);if(Aw){for(var Av=1;Av<Aw.length;Av++){Aw[Av]()}n.removeData(Bh)}}}}}]}];var A6=["$$animationProvider",function(B){B.drivers.push("$$animateCssDriver");var D="ng-animate-shim";var A="ng-anchor";var F="ng-anchor-out";var C="ng-anchor-in";function E(G){return G.parentNode&&G.parentNode.nodeType===11}this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(U,H,N,O,J,S,V){if(!J.animations&&!J.transitions){return Bn}var P=V[0].body;var W=AW(O);var L=Bm(E(W)||P.contains(W)?W:P);var Q=A0(S);return function I(X){return X.from&&X.to?T(X.from,X.to,X.classes,X.anchors):K(X)};function R(X){return X.replace(/\bng-\S+\b/g,"")}function M(Y,X){if(BW(Y)){Y=Y.split(" ")}if(BW(X)){X=X.split(" ")}return Y.filter(function(Z){return X.indexOf(Z)===-1}).join(" ")}function G(g,d,f){var h=Bm(AW(d).cloneNode(true));var j=R(Z(h));d.addClass(D);f.addClass(D);h.addClass(A);L.append(h);var Y,e=X();if(!e){Y=a();if(!Y){return c()}}var b=e||Y;return{start:function(){var m;var k=b.start();k.done(function(){k=null;if(!Y){Y=a();if(Y){k=Y.start();k.done(function(){k=null;c();m.complete()});return k}}c();m.complete()});m=new N({end:l,cancel:l});return m;function l(){if(k){k.end()}}}};function i(l){var k={};var m=AW(l).getBoundingClientRect();B1(["width","height","top","left"],function(n){var o=m[n];switch(n){case"top":o+=P.scrollTop;break;case"left":o+=P.scrollLeft;break}k[n]=Math.floor(o)+"px"});return k}function X(){var k=U(h,{addClass:F,delay:true,from:i(d)});return k.$$willAnimate?k:null}function Z(k){return k.attr("class")||""}function a(){var n=R(Z(f));var l=M(n,j);var k=M(j,n);var m=U(h,{to:i(f),addClass:C+" "+l,removeClass:F+" "+k,delay:true});return m.$$willAnimate?m:null}function c(){h.remove();d.removeClass(D);f.removeClass(D)}}function T(c,Y,d,X){var a=K(c,Bn);var b=K(Y,Bn);var Z=[];B1(X,function(f){var e=f["out"];var g=f["in"];var h=G(d,e,g);if(h){Z.push(h)}});if(!a&&!b&&Z.length===0){return}return{start:function(){var g=[];if(a){g.push(a.start())}if(b){g.push(b.start())}B1(Z,function(h){g.push(h.start())});var e=new N({end:f,cancel:f});N.all(g,function(h){e.complete(h)});return e;function f(){B1(g,function(h){h.end()})}}}}function K(Z){var Y=Z.element;var X=Z.options||{};if(Z.structural){X.event=Z.event;X.structural=true;X.applyClassesEarly=true;if(Z.event==="leave"){X.onDone=X.domOperation}}if(X.preparationClasses){X.event=BV(X.event,X.preparationClasses)}var a=U(Y,X);return a.$$willAnimate?a:null}}]}];var BN=["$animateProvider",function(A){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(E,F,B){var C=A0(B);return function(L,V,M,T){var W=false;if(arguments.length===3&&BM(M)){T=M;M=null}T=Bj(T);if(!M){M=L.attr("class")||"";if(T.addClass){M+=" "+T.addClass}if(T.removeClass){M+=" "+T.removeClass}}var P=T.addClass;var R=T.removeClass;var J=D(M);var H,S;if(J.length){var K,Q;if(V=="leave"){Q="leave";K="afterLeave"}else{Q="before"+V.charAt(0).toUpperCase()+V.substr(1);K=V}if(V!=="enter"&&V!=="move"){H=G(L,V,T,J,Q)}S=G(L,V,T,J,K)}if(!H&&!S){return}function X(){T.domOperation();C(L,T)}function N(){W=true;X();A9(L,T)}var O;return{$$willAnimate:true,end:function(){if(O){O.end()}else{N();O=new F();O.complete(true)}return O},start:function(){if(O){return O}O=new F();var Y;var b=[];if(H){b.push(function(c){Y=H(c)})}if(b.length){b.push(function(c){X();c(true)})}else{X()}if(S){b.push(function(c){Y=S(c)})}O.setHost({end:function(){Z()},cancel:function(){Z(true)}});F.chain(b,a);return O;function a(c){N(c);O.complete(c)}function Z(c){if(!W){(Y||Bn)(c);a(c)}}}};function U(Y,e,b,a,d){var Z;switch(b){case"animate":Z=[e,a.from,a.to,d];break;case"setClass":Z=[e,P,R,d];break;case"addClass":Z=[e,P,d];break;case"removeClass":Z=[e,R,d];break;default:Z=[e,d];break}Z.push(a);var c=Y.apply(Y,Z);if(c){if(BJ(c.start)){c=c.start()}if(c instanceof F){c.done(d)}else{if(BJ(c)){return c}}}return Bn}function I(a,Z,Y,c,d){var b=[];B1(c,function(f){var e=f[d];if(!e){return}b.push(function(){var g;var h;var i=false;var j=function(k){if(!i){i=true;(h||Bn)(k);g.complete(!k)}};g=new F({end:function(){j()},cancel:function(){j(true)}});h=U(e,a,Z,Y,function(l){var k=l===false;j(k)});return g})});return b}function G(f,g,e,b,Z){var c=I(f,g,e,b,Z);if(c.length===0){var Y,d;if(Z==="beforeSetClass"){Y=I(f,"removeClass",e,b,"beforeRemoveClass");d=I(f,"addClass",e,b,"beforeAddClass")}else{if(Z==="setClass"){Y=I(f,"removeClass",e,b,"removeClass");d=I(f,"addClass",e,b,"addClass")}}if(Y){c=c.concat(Y)}if(d){c=c.concat(d)}}if(c.length===0){return}return function a(h){var i=[];if(c.length){B1(c,function(k){i.push(k())})}i.length?F.all(i,h):h();return function j(k){B1(i,function(l){k?l.cancel():l.end()})}}}};function D(K){K=BS(K)?K:K.split(" ");var J=[],H={};for(var I=0;I<K.length;I++){var G=K[I],L=A.$$registeredAnimations[G];if(L&&!H[G]){J.push(E.get(L));H[G]=true}}return J}}]}];var Ca=["$$animationProvider",function(A){A.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(B,E){return function D(F){if(F.from&&F.to){var G=C(F.from);var H=C(F.to);if(!G&&!H){return}return{start:function(){var K=[];if(G){K.push(G.start())}if(H){K.push(H.start())}E.all(K,J);var I=new E({end:L(),cancel:L()});return I;function L(){return function(){B1(K,function(M){M.end()})}}function J(M){I.complete(M)}}}}else{return C(F)}};function C(G){var F=G.element;var J=G.event;var I=G.options;var H=G.classes;return B(F,J,H,I)}}]}];var A2="data-ng-animate";var A4="$ngAnimatePin";var AX=["$animateProvider",function(B){var C=1;var D=2;var G=" ";var F=this.rules={skip:[],cancel:[],join:[]};function H(K){if(!K){return null}var L=K.split(G);var J=Object.create(null);B1(L,function(M){J[M]=true});return J}function E(K,J){if(K&&J){var L=H(J);return K.split(G).some(function(M){return L[M]})}}function A(J,L,K,M){return F[J].some(function(N){return N(L,K,M)})}function I(J,K){var L=(J.addClass||"").length>0;var M=(J.removeClass||"").length>0;return K?L&&M:L||M}F.join.push(function(L,J,K){return !J.structural&&I(J)});F.skip.push(function(L,J,K){return !J.structural&&!I(J)});F.skip.push(function(L,J,K){return K.event=="leave"&&J.structural});F.skip.push(function(L,J,K){return K.structural&&K.state===D&&!J.structural});F.cancel.push(function(L,J,K){return K.structural&&J.structural});F.cancel.push(function(L,J,K){return K.state===D&&J.structural});F.cancel.push(function(M,L,O){if(O.structural){return false}var P=L.addClass;var K=L.removeClass;var N=O.addClass;var J=O.removeClass;if((Ba(P)&&Ba(K))||(Ba(N)&&Ba(J))){return false}return E(P,J)||E(K,N)});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(c,a,T,K,m,l,h,S,J,g){var n=new m();var N=new m();var P=null;function O(){var o=false;return function(p){if(o){p()}else{a.$$postDigest(function(){o=true;p()})}}}var L=a.$watch(function(){return S.totalPendingRequests===0},function(o){if(!o){return}L();a.$$postDigest(function(){a.$$postDigest(function(){if(P===null){P=true}})})});var i={};var X=B.classNameFilter();var W=!X?function(){return true}:function(o){return X.test(o)};var b=A0(J);function d(o,p){return Bq(o,p,{})}var j=BX.Node.prototype.contains||function(o){return this===o||!!(this.compareDocumentPosition(o)&16)};function k(p,s,t){var r=AW(s);var u=AW(p);var q=[];var o=i[t];if(o){B1(o,function(v){if(j.call(v.node,r)){q.push(v.callback)}else{if(t==="leave"&&j.call(v.node,u)){q.push(v.callback)}}})}return q}function M(o,r,q){var p=Bl(r);return o.filter(function(s){var t=s.node===p&&(!q||s.callback===q);return !t})}function e(o,p){if(o==="close"&&!p[0].parentNode){f.off(p)}}var f={on:function(q,p,r){var o=Bl(p);i[q]=i[q]||[];i[q].push({node:o,callback:r});Bm(p).on("$destroy",function(){var s=n.get(o);if(!s){f.off(q,p,r)}})},off:function(r,q,s){if(arguments.length===1&&!BP.isString(arguments[0])){q=arguments[0];for(var p in i){i[p]=M(i[p],q)}return}var o=i[r];if(!o){return}i[r]=arguments.length===1?null:M(o,q,s)},pin:function(o,p){A3(Bo(o),"element","not an element");A3(Bo(p),"parentElement","not an element");o.data(A4,p)},push:function(q,p,o,r){o=o||{};o.domOperation=r;return Q(q,p,o)},enabled:function(o,p){var t=arguments.length;if(t===0){p=!!P}else{var s=Bo(o);if(!s){p=P=!!o}else{var r=AW(o);var q=N.get(r);if(t===1){p=!q}else{N.put(r,!p)}}}return p}};return f;function Q(Ag,Ac,Ah){var u=BL(Ah);var Af,o;Ag=Bs(Ag);if(Ag){Af=AW(Ag);o=Ag.parent()}u=Bj(u);var q=new h();var Aj=O();if(BS(u.addClass)){u.addClass=u.addClass.join(" ")}if(u.addClass&&!BW(u.addClass)){u.addClass=null}if(BS(u.removeClass)){u.removeClass=u.removeClass.join(" ")}if(u.removeClass&&!BW(u.removeClass)){u.removeClass=null}if(u.from&&!BM(u.from)){u.from=null}if(u.to&&!BM(u.to)){u.to=null}if(!Af){t();return q}var Aa=[Af.className,u.addClass,u.removeClass].join(" ");if(!W(Aa)){t();return q}var x=["enter","move","leave"].indexOf(Ac)>=0;var Ai=K[0].hidden;var z=!P||Ai||N.get(Af);var Ae=(!z&&n.get(Af))||{};var v=!!Ae.state;if(!z&&(!v||Ae.state!=C)){z=!R(Ag,o,Ac)}if(z){if(Ai){w(q,Ac,"start")}t();if(Ai){w(q,Ac,"close")}return q}if(x){Y(Ag)}var r={structural:x,element:Ag,event:Ac,addClass:u.addClass,removeClass:u.removeClass,close:t,options:u,runner:q};if(v){var y=A("skip",Ag,r,Ae);if(y){if(Ae.state===D){t();return q}else{Bq(Ag,Ae,r);return Ae.runner}}var Ad=A("cancel",Ag,r,Ae);if(Ad){if(Ae.state===D){Ae.runner.end()}else{if(Ae.structural){Ae.close()}else{Bq(Ag,Ae,r);return Ae.runner}}}else{var s=A("join",Ag,r,Ae);if(s){if(Ae.state===D){d(Ag,r)}else{BI(Ag,x?Ac:null,u);Ac=r.event=Ae.event;u=Bq(Ag,Ae,r);return Ae.runner}}}}else{d(Ag,r)}var Ab=r.structural;if(!Ab){Ab=(r.event==="animate"&&Object.keys(r.options.to||{}).length>0)||I(r)}if(!Ab){t();V(Ag);return q}var p=(Ae.counter||0)+1;r.counter=p;Z(Ag,C,r);a.$$postDigest(function(){var An=n.get(Af);var Ak=!An;An=An||{};var Am=Ag.parent()||[];var Al=Am.length>0&&(An.event==="animate"||An.structural||I(An));if(Ak||An.counter!==p||!Al){if(Ak){b(Ag,u);A9(Ag,u)}if(Ak||(x&&An.event!==Ac)){u.domOperation();q.end()}if(!Al){V(Ag)}return}Ac=!An.structural&&I(An,true)?"setClass":An.event;Z(Ag,D);var Ao=l(Ag,Ac,An.options);q.setHost(Ao);w(q,Ac,"start",{});Ao.done(function(Ap){t(!Ap);var Aq=n.get(Af);if(Aq&&Aq.counter===p){V(AW(Ag))}w(q,Ac,"close",{})})});return q;function w(Al,Ak,Am,An){Aj(function(){var Ao=k(o,Ag,Ak);if(Ao.length){c(function(){B1(Ao,function(Ap){Ap(Ag,Am,An)});e(Am,Ag)})}else{e(Am,Ag)}});Al.progress(Ak,Am,An)}function t(Ak){B9(Ag,u);b(Ag,u);A9(Ag,u);u.domOperation();q.complete(!Ak)}}function Y(o){var q=AW(o);var p=q.querySelectorAll("["+A2+"]");B1(p,function(r){var s=parseInt(r.getAttribute(A2));var t=n.get(r);if(t){switch(s){case D:t.runner.end();case C:n.remove(r);break}}})}function V(o){var p=AW(o);p.removeAttribute(A2);n.remove(p)}function U(o,p){return AW(o)===AW(p)}function R(z,v,t){var Ab=Bm(K[0].body);var o=U(z,Ab)||z[0].nodeName==="HTML";var s=U(z,T);var y=false;var q;var x=N.get(AW(z));var u=Bm.data(z[0],A4);if(u){v=u}v=AW(v);while(v){if(!s){s=U(v,T)}if(v.nodeType!==Cd){break}var p=n.get(v)||{};if(!y){var Aa=N.get(v);if(Aa===true&&x!==false){x=true;break}else{if(Aa===false){x=false}}y=p.structural}if(Ba(q)||q===true){var r=Bm.data(v,Bx);if(BU(r)){q=r}}if(y&&q===false){break}if(!o){o=U(v,Ab)}if(o&&s){break}if(!s){u=Bm.data(v,A4);if(u){v=AW(u);continue}}v=v.parentNode}var w=(!y||q)&&x!==true;return w&&s&&o}function Z(s,p,r){r=r||{};r.state=p;var q=AW(s);q.setAttribute(A2,p);var t=n.get(q);var o=t?Bb(t,r):r;n.put(q,o)}}]}];var Bp=["$animateProvider",function(F){var E="ng-animate-ref";var D=this.drivers=[];var C="$$animationRunner";function G(I,H){I.data(C,H)}function B(H){H.removeData(C)}function A(H){return H.data(C)}this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(K,H,N,O,J,L){var M=[];var P=A0(K);function I(W){var U={children:[]};var V,Q=new J();for(V=0;V<W.length;V++){var T=W[V];Q.put(T.domNode,W[V]={domNode:T.domNode,fn:T.fn,children:[]})}for(V=0;V<W.length;V++){R(W[V])}return S(U);function R(X){if(X.processed){return X}X.processed=true;var Y=X.domNode;var Z=Y.parentNode;Q.put(Y,X);var a;while(Z){a=Q.get(Z);if(a){if(!a.processed){a=R(a)}break}Z=Z.parentNode}(a||U).children.push(X);return X}function S(a){var Z=[];var d=[];var b;for(b=0;b<a.children.length;b++){d.push(a.children[b])}var X=d.length;var Y=0;var c=[];for(b=0;b<d.length;b++){var e=d[b];if(X<=0){X=Y;Y=0;Z.push(c);c=[]}c.push(e.fn);e.children.forEach(function(f){Y++;d.push(f)});X--}if(c.length){Z.push(c)}return Z}}return function(d,Z,c){c=Bj(c);var W=["enter","move","leave"].indexOf(Z)>=0;var Q=new O({end:function(){Y()},cancel:function(){Y(true)}});if(!D.length){Y();return Q}G(d,Q);var U=BB(d.attr("class"),BB(c.addClass,c.removeClass));var X=c.tempClasses;if(X){U+=" "+X;c.tempClasses=null}var T;if(W){T="ng-"+Z+AN;K.addClass(d,T)}M.push({element:d,classes:U,event:Z,structural:W,options:c,beforeStart:a,close:Y});d.on("$destroy",R);if(M.length>1){return Q}H.$$postDigest(function(){var g=[];B1(M,function(j){if(A(j.element)){g.push(j)}else{j.close()}});M.length=0;var h=S(g);var i=[];B1(h,function(k){i.push({domNode:AW(k.from?k.from.element:k.element),fn:function j(){k.beforeStart();var l,m=k.close;var p=k.anchors?(k.from.element||k.to.element):k.element;if(A(p)){var o=e(k);if(o){l=o.start}}if(!l){m()}else{var n=l();n.done(function(q){m(!q)});V(k,n)}}})});L(I(i))});return Q;function b(g){var i="["+E+"]";var h=g.hasAttribute(E)?[g]:g.querySelectorAll(i);var j=[];B1(h,function(l){var k=l.getAttribute(E);if(k&&k.length){j.push(l)}});return j}function S(j){var h=[];var k={};B1(j,function(q,o){var s=q.element;var m=AW(s);var r=q.event;var p=["enter","move"].indexOf(r)>=0;var n=q.structural?b(m):[];if(n.length){var l=p?"to":"from";B1(n,function(u){var t=u.getAttribute(E);k[t]=k[t]||{};k[t][l]={animationID:o,element:Bm(u)}})}else{h.push(q)}});var g={};var i={};B1(k,function(o,s){var r=o.from;var p=o.to;if(!r||!p){var l=r?r.animationID:p.animationID;var q=l.toString();if(!g[q]){g[q]=true;h.push(j[l])}return}var u=j[r.animationID];var n=j[p.animationID];var m=r.animationID.toString();if(!i[m]){var t=i[m]={structural:true,beforeStart:function(){u.beforeStart();n.beforeStart()},close:function(){u.close();n.close()},classes:f(u.classes,n.classes),from:u,to:n,anchors:[]};if(t.classes.length){h.push(t)}else{h.push(u);h.push(n)}}i[m].anchors.push({"out":r.element,"in":p.element})});return h}function f(k,j){k=k.split(" ");j=j.split(" ");var i=[];for(var h=0;h<k.length;h++){var g=k[h];if(g.substring(0,3)==="ng-"){continue}for(var l=0;l<j.length;l++){if(g===j[l]){i.push(g);break}}}return i.join(" ")}function e(g){for(var k=D.length-1;k>=0;k--){var h=D[k];if(!N.has(h)){continue}var j=N.get(h);var i=j(g);if(i){return i}}}function a(){d.addClass(BK);if(X){K.addClass(d,X)}if(T){K.removeClass(d,T);T=null}}function V(i,h){if(i.from&&i.to){g(i.from.element);g(i.to.element)}else{g(i.element)}function g(j){A(j).setHost(h)}}function R(){var g=A(d);if(g&&(Z!=="leave"||!c.$$domOperationFired)){g.end()}}function Y(g){d.off("$destroy",R);B(d);P(d,c);A9(d,c);c.domOperation();if(X){K.removeClass(d,X)}d.removeClass(BK);Q.complete(!g)}}}]}];var Bg=["$animate","$rootScope",function(B,A){return{restrict:"A",transclude:"element",terminal:true,priority:600,link:function(E,F,I,D,H){var C,G;E.$watchCollection(I.ngAnimateSwap||I["for"],function(J){if(C){B.leave(C)}if(G){G.$destroy();G=null}if(J||J===0){G=E.$new();H(G,function(K){C=K;B.enter(K,null,F)})}})}}}];BP.module("ngAnimate",[]).directive("ngAnimateSwap",Bg).directive("ngAnimateChildren",BF).factory("$$rAFScheduler",Be).provider("$$animateQueue",AX).provider("$$animation",Bp).provider("$animateCss",BR).provider("$$animateCssDriver",A6).provider("$$animateJs",BN).provider("$$animateJsDriver",Ca)})(window,window.angular);