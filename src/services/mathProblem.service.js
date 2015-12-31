'use strict';

angular.module('kidmath')

.factory('MathProblem', MathProblem);

MathProblem.$inject = [];
function MathProblem() {

  let answer;
  let remainder;

  const service = {
    createProblem,
    checkAnswer
  };

  return service;


  function createProblem(operator, level) {
    remainder = null;
    answer = null;
    let problem = {};
    problem.operator = Array.isArray(operator) ? chooseOperator(operator) : operator;
    problem.operands = makeProblem(problem.operator, level);
    return problem;
  }

  function checkAnswer(userAnswer) {
    if (remainder) {
      if (userAnswer.indexOf('r') !== -1) {
        let divisionAnswer = userAnswer.split(' r ');
        return (+ divisionAnswer[0] === answer && + divisionAnswer[1] === remainder);
      } else return false;
    }
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
    const options = { baseMin: 0, baseMax: 10, operands: 2, negatives: false };
    switch(level) {
      case '2':
        options.baseMax = 20;
        break;
      case '3':
        options.baseMax = 20;
        options.negatives = true;
        break;
      case '4':
        options.baseMax = 100;
        options.negatives = true;
        break;
      case '5':
        options.baseMax = 100;
        options.negatives = true;
        options.operands = 3;
        break;
      case '6':
        options.baseMax = 1000;
        options.negatives = true;
        options.operands = 3;
        break;
      case '7':
        options.baseMax = 10000;
        options.negatives = true;
        options.operands = 3;
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
    const options = { baseMin: 0, baseMax: 10, operands: 2, negatives: false };
    switch(level) {
      case '2':
        options.baseMax = 20;
        break;
      case '3':
        options.baseMax = 100;
        break;
      case '4':
        options.baseMax = 20;
        options.negatives = true;
        break;
      case '5':
        options.baseMax = 100;
        options.negatives = true;
        break;
      case '6':
        options.baseMax = 1000;
        options.negatives = true;
        break;
      case '7':
        options.baseMax = 10000;
        options.negatives = true;
        options.operands = 3;
        break;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options, (i && !options.negatives) ? difference(operands.slice(0,i)) : null, 'subtract'));
    answer = difference(operands);
    return operands;
  }

  function multiplication(level) {
    const options = { baseMin: 0, baseMax: 5, operands: 2, negatives: false };
    let specialRules;
    switch(level) {
      case '1':     // second operand only 1, 2, or 3
        options.baseMax = 10;
        options.baseMin = 1;
        specialRules = 'oneTwoThree';
        break;
      case '3':     // squares only
        options.baseMax = 10;
        specialRules = 'sameAsLast';
        break;
      case '4':
        options.baseMax = 10;
        options.negatives = true;
        break;
      case '5':  // doing cubes only, and only up to 5 (with negatives)
        options.negatives = true;
        options.operands = 3;
        specialRules = 'sameAsLast';
        break;
      case '6':  // doing cubes only, and up to 10 (with negatives)
        options.baseMax = 10;
        options.negatives = true;
        options.operands = 3;
        specialRules = 'sameAsLast';
        break;
      case '7':
        options.baseMax = 20;
        options.baseMin = 6
        options.negatives = true;
        break;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options, i ? operands[i-1] : null, specialRules));
    answer = product(operands);
    return operands;
  }

  function division(level) {
    const options = { dividendMaxSqrt: 5, dividendMax: 25, negatives: false, remainder: false };
    /* second number can never be zero, remainders answers are always positive
    1: dividend max 25
    2: dividend max 100
    3: dividend max 100, negatives
    4: 25, remainders
    5: 100, remainders
    6: 900, negatives
    7: 1000, remainders
    */
    switch(level) {
      case '2':
        options.dividendMaxSqrt = 10;
        break;
      case '3':
        options.dividendMaxSqrt = 10;
        options.negatives = true;
        break;
      case '4':
        options.remainder = true;
        break;
      case '5':
        options.dividendMax = 100;
        options.remainder = true;
        break;
      case '6':
        options.dividendMaxSqrt = 30;
        options.negatives = true;
        break;
      case '7':
        options.dividendMax = 1000;
        options.remainder = true;
        break;
      default:
        break;
    }
    let operands = makeDivisionOperands(options);
    return operands;
  }

  function makeOperand({baseMin, baseMax, negatives}, prevOperand, specialRules) {
    let operand = null;
    if (prevOperand !== null) {
      if (specialRules === 'subtract') baseMax = prevOperand;
      else if (specialRules === 'oneTwoThree') baseMax = 3;
      else if (specialRules === 'sameAsLast') operand = prevOperand;
    }
    // the baseMax+1 is so that the actual baseMax can be hit instead of <baseMax (due to Math.floor)
    operand = (operand !== null) ? operand : Math.floor(Math.random() * (baseMax+1 - baseMin)) + baseMin;
    return (negatives && Math.random() > .5) ? operand *= -1 : operand;
  }

  function makeDivisionOperands({dividendMaxSqrt, dividendMax, negatives, remainder:useRemainder}) {
    let divisor, dividend;
    if (useRemainder) {
      dividend = Math.floor(Math.random() * (dividendMax + 1));
      divisor = Math.ceil(Math.random() * (dividendMax / 5));
      answer = Math.floor(dividend / divisor);
      remainder = dividend % divisor;
    } else {
      divisor = Math.ceil(Math.random() * dividendMaxSqrt);
      if (negatives && Math.random() < .5) divisor *= -1;
      answer = Math.floor(Math.random() * (dividendMaxSqrt + 1));
      if (negatives && Math.random() < .6) answer *= -1;
      dividend = answer * divisor;
    }
    return [dividend, divisor];
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

  // function quotient(operands) {
  //   return operands.reduce((prev, next) => prev / (next || 1), Math.pow(operands[0],2));
  // }

}