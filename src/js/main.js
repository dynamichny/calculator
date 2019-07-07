/* eslint-disable no-continue */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const calculator = document.querySelector('.mainContainer');
const buttons = document.querySelectorAll('.mainContainer>button');
const valueP = document.querySelector('.value');
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
  });
};

function calc(value) {
  const val = this.value || value;
  if (numbers.includes(val)) {
    if (signs.length && signs[signs.length - 1].includes('.') && val === '.') {
      return;
    }
    if (operators.includes(signs[signs.length - 1])) {
      currentNumber += val;
      signs.push(currentNumber);
      valueP.innerHTML = signs[signs.length - 1];
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
      activeOperator(val);
      return;
    }
    activeOperator(val);
    signs.push(val);
    return;
  }
  if (val === '=') {
    if (!signs.length || operators.includes(signs[signs.length - 1])) {
      return;
    }
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
      valueP.innerHTML = signs[signs.length - 1];
      textScale();
      currentNumber = signs[signs.length - 1];
      document
        .querySelector('.active-operator')
        .classList.remove('active-operator');
      break;
    }
  }
  if (val === 'c') {
    signs.splice(0, signs.length);
    currentNumber = '';
    valueP.innerHTML = '0';
    if (document.querySelector('.active-operator')) {
      document
        .querySelector('.active-operator')
        .classList.remove('active-operator');
    }
    textScale();
    return;
  }
  if (signs.length) {
    valueP.innerHTML = signs[signs.length - 1];
    textScale();
  }
}

function activeOperator(val) {
  if (document.querySelector('.active-operator')) {
    document
      .querySelector('.active-operator')
      .classList.remove('active-operator');
  }
  document
    .querySelector(`button[value='${val}']`)
    .classList.add('active-operator');
}

function textScale() {
  const valueWidth = valueP.offsetWidth;
  const valueAreaWidth = document.querySelector('.valueDiv').offsetWidth - 20;
  if (valueWidth / valueAreaWidth > 1) {
    valueP.style.transform = `scale(${valueAreaWidth / valueWidth})`;
  } else {
    valueP.style.transform = `scale(1)`;
  }
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
