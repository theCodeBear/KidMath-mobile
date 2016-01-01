'use strict';

angular.module('kidmath')

.factory('Utility', Utility);

Utility.$inject = [];
function Utility() {

  const service = {
    chooseOperand,
    decimalOrRemainder
  };

  return service;


  function chooseOperand(type) {
    switch(type) {
      case 'addition':        return '+';
      case 'subtraction':     return '&#8722;';
      case 'multiplication':  return '&#215;';
      case 'division':        return '&#247;';
      case 'arithmetic':      return ['+', '&#8722;', '&#215;', '&#247;'];
      default:                throw new Error('problem type did not match defined types');
    }
  }

  // in the future I'll add problem types that use decimal points
  function decimalOrRemainder(level, type) {
    if (type === 'decimal') return decimal;
    else return 'remainder';
  }

}