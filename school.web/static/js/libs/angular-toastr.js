(function(){angular.module("toastr",[]).factory("toastr",B);B.$inject=["$animate","$injector","$document","$rootScope","$sce","toastrConfig","$q"];function B(o,b,w,A,v,g,j){var h;var c=0;var l=[];var p="";var n={};var f=j.defer();var u={active:x,clear:e,error:m,info:s,remove:i,success:a,warning:d};return u;function x(){return l.length}function e(C){if(arguments.length===1&&!C){return}if(C){i(C.toastId)}else{for(var D=0;D<l.length;D++){i(l[D].toastId)}}}function m(C,E,D){var F=q().iconClasses.error;return t(F,C,E,D)}function s(C,E,D){var F=q().iconClasses.info;return t(F,C,E,D)}function a(C,E,D){var F=q().iconClasses.success;return t(F,C,E,D)}function d(C,E,D){var F=q().iconClasses.warning;return t(F,C,E,D)}function i(E,F){var D=G(E);if(D&&!D.deleting){D.deleting=true;D.isOpened=false;o.leave(D.el).then(function(){if(D.scope.options.onHidden){D.scope.options.onHidden(!!F,D)}D.scope.$destroy();var H=l.indexOf(D);delete n[D.scope.message];l.splice(H,1);var I=g.maxOpened;if(I&&l.length>=I){l[I-1].open.resolve()}if(C()){h.remove();h=null;f=j.defer()}})}function G(H){for(var I=0;I<l.length;I++){if(l[I].toastId===H){return l[I]}}}function C(){return !l.length}}function t(F,C,E,D){if(angular.isObject(E)){D=E;E=null}return k({iconClass:F,message:C,optionsOverride:D,title:E})}function q(){return angular.extend({},g)}function r(D){if(h){return f.promise}h=angular.element("<div></div>");h.attr("id",D.containerId);h.addClass(D.positionClass);h.css({"pointer-events":"auto"});var C=angular.element(document.querySelector(D.target));if(!C||!C.length){throw"Target for toasts doesn't exist"}o.enter(h,C).then(function(){f.resolve()});return f.promise}function k(G){var L=q();if(I()){return}var J=H();l.push(J);if(F()){var M=l.slice(0,(l.length-L.maxOpened));for(var N=0,D=M.length;N<D;N++){i(M[N].toastId)}}if(K()){J.open.resolve()}J.open.promise.then(function(){r(L).then(function(){J.isOpened=true;if(L.newestOnTop){o.enter(J.el,h).then(function(){J.scope.init()})}else{var O=h[0].lastChild?angular.element(h[0].lastChild):null;o.enter(J.el,h,O).then(function(){J.scope.init()})}})});return J;function F(){return L.autoDismiss&&L.maxOpened&&l.length>L.maxOpened}function C(Q,O,P){if(P.allowHtml){Q.scope.allowHtml=true;Q.scope.title=v.trustAsHtml(O.title);Q.scope.message=v.trustAsHtml(O.message)}else{Q.scope.title=O.title;Q.scope.message=O.message}Q.scope.toastType=Q.iconClass;Q.scope.toastId=Q.toastId;Q.scope.extraData=P.extraData;Q.scope.options={extendedTimeOut:P.extendedTimeOut,messageClass:P.messageClass,onHidden:P.onHidden,onShown:R("onShown"),onTap:R("onTap"),progressBar:P.progressBar,tapToDismiss:P.tapToDismiss,timeOut:P.timeOut,titleClass:P.titleClass,toastClass:P.toastClass};if(P.closeButton){Q.scope.options.closeHtml=P.closeHtml}function R(S){if(P[S]){return function(){P[S](Q)}}}}function H(){var P={toastId:c++,isOpened:false,scope:A.$new(),open:j.defer()};P.iconClass=G.iconClass;if(G.optionsOverride){angular.extend(L,O(G.optionsOverride));P.iconClass=G.optionsOverride.iconClass||P.iconClass}C(P,G,L);P.el=E(P.scope);return P;function O(Q){var R=["containerId","iconClasses","maxOpened","newestOnTop","positionClass","preventDuplicates","preventOpenDuplicates","templates"];for(var S=0,T=R.length;S<T;S++){delete Q[R[S]]}return Q}}function E(O){var P=angular.element("<div toast></div>"),Q=b.get("$compile");return Q(P)(O)}function K(){return L.maxOpened&&l.length<=L.maxOpened||!L.maxOpened}function I(){var P=L.preventDuplicates&&G.message===p;var O=L.preventOpenDuplicates&&n[G.message];if(P||O){return true}p=G.message;n[G.message]=true;return false}}}}());(function(){angular.module("toastr").constant("toastrConfig",{allowHtml:false,autoDismiss:false,closeButton:false,closeHtml:"<button>&times;</button>",containerId:"toast-container",extendedTimeOut:1000,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},maxOpened:0,messageClass:"toast-message",newestOnTop:true,onHidden:null,onShown:null,onTap:null,positionClass:"toast-top-right",preventDuplicates:false,preventOpenDuplicates:false,progressBar:false,tapToDismiss:true,target:"body",templates:{toast:"directives/toast/toast.html",progressbar:"directives/progressbar/progressbar.html"},timeOut:5000,titleClass:"toast-title",toastClass:"toast"})}());(function(){angular.module("toastr").directive("progressBar",B);B.$inject=["toastrConfig"];function B(A){return{replace:true,require:"^toast",templateUrl:function(){return A.templates.progressbar},link:D};function D(N,P,Q,O){var L,R,M;O.progressBar=N;N.start=function(E){if(L){clearInterval(L)}R=parseFloat(E);M=new Date().getTime()+R;L=setInterval(C,10)};N.stop=function(){if(L){clearInterval(L)}};function C(){var E=((M-(new Date().getTime()))/R)*100;P.css("width",E+"%")}N.$on("$destroy",function(){clearInterval(L)})}}}());(function(){angular.module("toastr").controller("ToastController",B);function B(){this.progressBar=null;this.startProgressBar=function(A){if(this.progressBar){this.progressBar.start(A)}};this.stopProgressBar=function(){if(this.progressBar){this.progressBar.stop()}}}}());(function(){angular.module("toastr").directive("toast",B);B.$inject=["$injector","$interval","toastrConfig","toastr"];function B(G,A,J,I){return{replace:true,templateUrl:function(){return J.templates.toast},controller:"ToastController",link:H};function H(E,T,D,V){var C;E.toastClass=E.options.toastClass;E.titleClass=E.options.titleClass;E.messageClass=E.options.messageClass;E.progressBar=E.options.progressBar;if(U()){var S=angular.element(E.options.closeHtml),Q=G.get("$compile");S.addClass("toast-close-button");S.attr("ng-click","close(true, $event)");Q(S)(E);T.prepend(S)}E.init=function(){if(E.options.timeOut){C=R(E.options.timeOut)}if(E.options.onShown){E.options.onShown()}};T.on("mouseenter",function(){F();if(C){A.cancel(C)}});E.tapToast=function(){if(angular.isFunction(E.options.onTap)){E.options.onTap()}if(E.options.tapToDismiss){E.close(true)}};E.close=function(K,L){if(L&&angular.isFunction(L.stopPropagation)){L.stopPropagation()}I.remove(E.toastId,K)};T.on("mouseleave",function(){if(E.options.timeOut===0&&E.options.extendedTimeOut===0){return}E.$apply(function(){E.progressBar=E.options.progressBar});C=R(E.options.extendedTimeOut)});function R(K){V.startProgressBar(K);return A(function(){V.stopProgressBar();I.remove(E.toastId)},K,1)}function F(){E.progressBar=false;V.stopProgressBar()}function U(){return E.options.closeHtml}}}}());