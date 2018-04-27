define([require, angular], function (require, angular) {
    var funcs = {
        sureDialog: _sureDialog,
        getScore:_getScore
    }
    return funcs;
    function _sureDialog() {

    }
    function _getScore(maxscore, answervalue) {
        var score = 0;
        var maxscore = parseInt(maxscore);
        if (answervalue == 1) {
            score = maxscore;
        } else if (answervalue == 2) {
            score = parseInt(maxscore / 2);
        } else if (answervalue == 3) {
            score = 0;
        }
        return score;
    }
})