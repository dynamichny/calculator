/* eslint-disable no-continue */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const calculator = document.querySelector('.mainContainer');
const buttons = document.querySelectorAll('.mainContainer>button');
const signs = [];
let currentNumber = '';
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operators = ['-', '*', '/', '+'];

window.onload = function() {
  // eslint-disable-next-line no-undef
  TweenMax.set(calculator, { visibility: 'visible' });
  TweenMax.fromTo(calculator, 1.5, { opacity: 0 }, { opacity: 1 });
  window.addEventListener('keydown', keyClick);
  buttons.forEach(button => {
    button.addEventListener('click', calc);
    button.addEventListener('mousedown', mousedownn);
    button.addEventListener('mouseup', mouseupp);
  });
};

function calc(value) {
  const val = this.value || value;
  if (numbers.includes(val)) {
    if (operators.includes(signs[signs.length - 1])) {
      currentNumber += val;
      signs.push(currentNumber);
      document.querySelector('.value').innerHTML = signs[signs.length - 1];
      textScale();
      return;
    }
    currentNumber += val;
    signs.splice(signs.length - 1, 1, currentNumber);
  }
  if (operators.includes(val)) {
    currentNumber = '';
    if (!signs.length) {
      return;
    }
    if (operators.includes(signs[signs.length - 1])) {
      signs.splice(signs.length - 1, 1, val);
      return;
    }
    signs.push(val);
    return;
  }
  if (val === '=') {
    while (true) {
      console.log(signs);
      if (signs.indexOf('*') !== -1) {
        if (
          signs.indexOf('*') > signs.indexOf('/') &&
          signs.indexOf('/') >= 0
        ) {
          const id = signs.indexOf('/');
          const result = parseFloat(signs[id - 1]) / parseFloat(signs[id + 1]);
          signs.splice(id - 1, 3, result);
          continue;
        } else {
          const id = signs.indexOf('*');
          const result = parseFloat(signs[id - 1]) * parseFloat(signs[id + 1]);
          signs.splice(id - 1, 3, result);
          continue;
        }
      }
      if (signs.indexOf('/') !== -1) {
        const id = signs.indexOf('/');
        const result = parseFloat(signs[id - 1]) / parseFloat(signs[id + 1]);
        signs.splice(id - 1, 3, result);
        continue;
      }
      if (signs.indexOf('+') !== -1) {
        if (
          signs.indexOf('+') > signs.indexOf('-') &&
          signs.indexOf('-') >= 0
        ) {
          const id = signs.indexOf('-');
          const result = parseFloat(signs[id - 1]) - parseFloat(signs[id + 1]);
          signs.splice(id - 1, 3, result);
          continue;
        } else {
          const id = signs.indexOf('+');
          const result = parseFloat(signs[id - 1]) + parseFloat(signs[id + 1]);
          signs.splice(id - 1, 3, result);
          continue;
        }
      }
      if (signs.indexOf('-') !== -1) {
        const id = signs.indexOf('-');
        const result = parseFloat(signs[id - 1]) - parseFloat(signs[id + 1]);
        signs.splice(id - 1, 3, result);
        continue;
      }
      currentNumber = signs[0];
      break;
    }
  }
  if (val === 'c') {
    signs.splice(0, signs.length);
    currentNumber = '';
    document.querySelector('.value').innerHTML = '0';
    textScale();
    return;
  }
  if (signs.length) {
    document.querySelector('.value').innerHTML = signs[signs.length - 1];
    textScale();
  }
}

function textScale() {
  const pWidth = document.querySelector('.value').offsetWidth;
  const divWidth = document.querySelector('.valueDiv').offsetWidth - 20;
  const p = document.querySelector('.value');
  if (pWidth / divWidth > 1) {
    p.style.transform = `scale(${divWidth / pWidth})`;
  } else {
    p.style.transform = `scale(1)`;
  }
}

function mousedownn() {
  this.classList.add('clicked');
}
function mouseupp() {
  this.classList.remove('clicked');
}

function keyClick(e) {
  const { key } = e;
  if (
    numbers.includes(key) ||
    operators.includes(key) ||
    key === 'Enter' ||
    key === 'Backspace'
  ) {
    if (key === 'Enter') {
      calc('=');
    }
    if (key === 'Backspace') {
      calc('c');
    }
    calc(key);
  }
}
