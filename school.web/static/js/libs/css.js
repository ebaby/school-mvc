define(function(){if(typeof window=="undefined"){return{load:function(C,B,A){A()}}}var T=document.getElementsByTagName("head")[0];var S=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0;var d=false;var X=true;if(S[1]||S[7]){d=parseInt(S[1])<6||parseInt(S[7])<=9}else{if(S[2]||S[8]){X=false}else{if(S[4]){d=parseInt(S[4])<18}}}var Z={};Z.pluginBuilder="./css-builder";var W,c;var P=function(){W=document.createElement("style");T.appendChild(W);c=W.styleSheet||W.sheet};var R=0;var a=[];var U;var Q=function(A){c.addImport(A);W.onload=function(){V()};R++;if(R==31){P();R=0}};var V=function(){U();var A=a.shift();if(!A){U=null;return}U=A[1];Q(A[0])};var b=function(C,B){if(!c||!c.addImport){P()}if(c&&c.addImport){if(U){a.push([C,B])}else{Q(C);U=B}}else{W.textContent='@import "'+C+'";';var A=setInterval(function(){try{W.sheet.cssRules;clearInterval(A);B()}catch(D){}},10)}};var Y=function(A,C){var B=document.createElement("link");B.type="text/css";B.rel="stylesheet";if(X){B.onload=function(){B.onload=function(){};setTimeout(C,7)}}else{var D=setInterval(function(){for(var E=0;E<document.styleSheets.length;E++){var F=document.styleSheets[E];if(F.href==B.href){clearInterval(D);return C()}}},10)}B.href=A;T.appendChild(B)};Z.normalize=function(B,A){if(B.substr(B.length-4,4)==".css"){B=B.substr(0,B.length-4)}return A(B)};Z.load=function(D,C,A,B){(d?b:Y)(C.toUrl(D+".css"),A)};return Z});