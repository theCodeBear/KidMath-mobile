'use strict';

angular.module('kidmath')

.factory('MathProblem', MathProblem);

MathProblem.$inject = [];
function MathProblem() {

  let answer;

  const service = {
    createProblem,
    checkAnswer
  };

  return service;


  function createProblem(operator, level) {
    let problem = {};
    problem.operator = Array.isArray(operator) ? chooseOperator(operator) : operator;
    problem.operands = makeProblem(problem.operator, level);
    return problem;
  }

  function checkAnswer(userAnswer) {
    return answer === + userAnswer
  }

  // PRIVATE FUNCTIONS
  function chooseOperator(opArray) {
    let randomIndex = Math.floor(Math.random() * opArray.length);
    return opArray[randomIndex];
  }

  function makeProblem(operator, level) {
    switch(operator) {
      case '+':         return addition(level);
      case '&#8722;':   return subtraction(level);
      case '&#215;':    return multiplication(level);
      case '&#247;':    return division(level);
    }
  }

  function addition(level) {
    const options = { baseMin: 0, baseMax: 10, operands: 2, difficultyFactor: 1, negatives: false };
    switch(level) {
      case '2':
        options.difficultyFactor = 2;
        break;
      case '3':
        options.difficultyFactor = 2;
        options.negatives = true;
        break;
      case '4':
        options.difficultyFactor = 10;
        options.negatives = true;
        break;
      case '5':
        options.difficultyFactor = 10;
        options.negatives = true;
        options.operands = 3;
        break;
      case '6':
        options.difficultyFactor = 1000;
        options.negatives = true;
        options.operands = 3;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options));
    answer = operands.reduce((prev, next) => prev + next, 0);
    return operands;
  }

  function subtraction(level) {
    const options = { operands: 2, difficultyFactor: 1 , negatives: false };
  }

  function multiplication(level) {
    const options = { operands: 2, difficultyFactor: 1, negatives: false };
  }

  function division(level) {
    const options = { operands: 2, difficultyFactor: 1, negatives: false };
  }

  // options: baseMin, baseMax, difficultyFactor, negatives
  function makeOperand({baseMax, difficultyFactor, negatives}) {
    console.log('diff', difficultyFactor);
    let operand = Math.floor(Math.random() * baseMax * difficultyFactor);
    return (negatives && Math.random() > .5) ? operand *= -1 : operand;
  }

}