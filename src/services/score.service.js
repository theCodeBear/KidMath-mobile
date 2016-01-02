'use strict';

angular.module('kidmath')

.factory('Score', Score);

Score.$inject = [];
function Score() {

  let correct = 0;
  let wrong = 0;

  const service = {
    getScore,
    setCorrect,
    setWrong
  };

  return service;


  function getScore(resetScore) {
    if (resetScore) {
      let tempC = correct, tempW = wrong;
      correct = 0, wrong = 0;
      return { correct: tempC, wrong: tempW };
    } else return {correct, wrong};
  }

  function setCorrect(score) {
    correct = score;
    return correct;
  }

  function setWrong(score) {
    wrong = score;
    return wrong;
  }
}