define(function(){var K=/([^:])\/+/g;var I=function(A){return A.replace(K,"$1/")};var P=/[^\:\/]*:\/\/([^\/])*/;var J=/^(\/|data:)/;function L(C,B,E){if(C.match(J)||C.match(P)){return C}C=I(C);var D=E.match(P);var A=B.match(P);if(A&&(!D||D[1]!=A[1]||D[2]!=A[2])){return O(C,B)}else{return M(O(C,B),E)}}function O(D,A){if(D.substr(0,2)=="./"){D=D.substr(2)}if(D.match(J)||D.match(P)){return D}var B=A.split("/");var C=D.split("/");B.pop();while(curPart=C.shift()){if(curPart==".."){B.pop()}else{B.push(curPart)}}return B.join("/")}function M(D,A){var B=A.split("/");B.pop();A=B.join("/")+"/";i=0;while(A.substr(i,1)==D.substr(i,1)){i++}while(A.substr(i,1)!="/"){i--}A=A.substr(i+1);D=D.substr(i+1);B=A.split("/");var C=D.split("/");out="";while(B.shift()){out+="../"}while(curPart=C.shift()){out+=curPart+"/"}return out.substr(0,out.length-1)}var N=function(F,D,H){D=I(D);H=I(H);var G=/@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/ig;var B,C,F;while(B=G.exec(F)){C=B[3]||B[2]||B[5]||B[6]||B[4];var A;A=L(C,D,H);var E=B[5]||B[6]?1:0;F=F.substr(0,G.lastIndex-C.length-E-1)+A+F.substr(G.lastIndex-E-1);G.lastIndex=G.lastIndex+(A.length-C.length)}return F};N.convertURIBase=L;N.absoluteURI=O;N.relativeURI=M;return N});