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
        break;
      case '7':
        options.difficultyFactor = 1000;
        options.negatives = true;
        options.operands = 4;
        break;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options));
    answer = sum(operands);
    return operands;
  }

  function subtraction(level) {
    const options = { baseMin: 0, baseMax: 10, operands: 2, difficultyFactor: 1 , negatives: false };
    switch(level) {
      case '2':
        options.difficultyFactor = 2;
        break;
      case '3':
        options.difficultyFactor = 10;
        break;
      case '4':
        options.difficultyFactor = 10;
        options.operands = 3;
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
        break;
      case '7':
        options.difficultyFactor = 1000;
        options.negatives = true;
        options.operands = 4;
        break;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++) {
      console.log('ops', operands);
      operands.push(makeOperand(options, (i && !options.negatives) ? difference(operands.slice(0,i)) : null, 'subtract'));
    }
    answer = difference(operands);
    console.log('ans', answer);
    return operands;
  }

  function multiplication(level) {
    const options = { baseMin: 0, baseMax: 5, operands: 2, difficultyFactor: 1, negatives: false };
    let specialRules;
    switch(level) {
      case '1':     // second operand only 1, 2, or 3
        options.baseMax = 10;
        options.baseMin = 1;
        specialRules = 'oneTwoThree';
        break;
      case '3':     // squares only
        options.difficultyFactor = 2;
        specialRules = 'sameAsLast';
        break;
      case '4':
        options.difficultyFactor = 2;
        options.negatives = true;
        break;
      case '5':  // doing cubes only, and only up to 5 (with negatives)
        options.negatives = true;
        options.operands = 3;
        specialRules = 'sameAsLast';
        break;
      case '6':  // doing cubes only, and up to 10 (with negatives)
        options.difficultyFactor = 2;
        options.negatives = true;
        options.operands = 3;
        specialRules = 'sameAsLast';
        break;
      case '7':
        options.difficultyFactor = 3;
        options.negatives = true;
        break;
      default:  // uses default options
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options, i ? operands[i-1] : null, specialRules));
    answer = product(operands);
    return operands;
  }

  function division(level) {
    const options = { operands: 2, baseMax: 10, difficultyFactor: 1, negatives: false };
    switch(level) {
      case '2':
        options.difficultyFactor = 2;
        break;
      case '3':
        options.difficultyFactor = 5;
        break;
      case '4':
        options.difficultyFactor = 3;
        options.negatives = true;
        break;
      case '5':
        options.difficultyFactor = 3;
        options.negatives = true;
        break;
      case '6':
        options.difficultyFactor = 200;
        options.negatives = true;
        break;
      case '7':
        options.difficultyFactor = 200;
        options.negatives = true;
        break;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options));
    answer = quotient(operands);
    return operands;
  }

  // options: baseMin, baseMax, difficultyFactor, negatives
  function makeOperand({baseMin, baseMax, difficultyFactor, negatives}, prevOperand, type) {
    console.log('max before', baseMax);
    let operand = null;
    if (prevOperand !== null) {
      console.log('prevOperand is true');
      if (type === 'subtract') baseMax = prevOperand;
      else if (type === 'oneTwoThree') baseMax = 3;
      else if (type === 'sameAsLast') operand = prevOperand;
    }
    console.log('new operand', operand);
    console.log('prevOp', prevOperand);
    console.log('max after', baseMax);
    operand = (operand !== null) ? operand : Math.floor(Math.random() * (baseMax/*+1*/ - baseMin) * difficultyFactor) + baseMin;
    return (negatives && Math.random() > .5) ? operand *= -1 : operand;
  }

  function sum(operands) {
    return operands.reduce((prev, next) => prev + next, 0);
  }

  function difference(operands) {
    return operands.reduce((prev, next) => prev - next, operands[0]*2);
  }

  function product(operands) {
    return operands.reduce((prev, next) => prev * next, 1);
  }

  function quotient(operands) {
    return operands.reduce((prev, next) => prev / (next || 1), Math.pow(operands[0],2));
  }

}