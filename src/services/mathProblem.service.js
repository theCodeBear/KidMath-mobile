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
    // if (level === 2) options.difficultyFactor = 2;
    // else if (level === 3) {
    //   options.difficultyFactor = 2;
    //   options.negatives = true;
    // } else if (level === 4) {
    //   options.difficultyFactor = 10;
    //   options.negatives = true;
    // } else if (level === 5) {
    //   options.difficultyFactor = 10;
    //   options.negatives = true;
    //   options.operands = 3;
    // } else if (level === 6) {
    //   options.difficultyFactor = 1000;
    //   options.negatives = true;
    //   options.operands = 3;
    // }
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
    switch(level) {
      case '2':
        options.difficultyFactor = 2;
        options.negatives = true;
        break;
      case '3':// maybe do one level of just doubles, one of triples, and
        // one of 1-10 * only 5,10,15,or 20

        break;
      case '4':
        options.difficultyFactor = 3;
        options.negatives = true;
        break;
      case '5':
        options.difficultyFactor = 3;
        options.negatives = true;
        options.operands = 3;
        break;
      case '6':
        options.difficultyFactor = 200;
        options.negatives = true;
        break;
      case '7':
        options.difficultyFactor = 200;
        options.negatives = true;
        options.operands = 3;
        break;
      default:
        break;
    }
    let operands = [];
    for (let i=0; i<options.operands; i++)
      operands.push(makeOperand(options));
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
  function makeOperand({baseMax, difficultyFactor, negatives}, prevOperand, type) {
    console.log('max before', baseMax);
    if (prevOperand !== null) {
      if (type === 'subtract') baseMax = prevOperand;
    }
    console.log('prevOp', prevOperand);
    console.log('max after', baseMax);
    let operand = Math.floor(Math.random() * (baseMax+1) * difficultyFactor);
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