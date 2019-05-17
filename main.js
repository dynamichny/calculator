$('document').ready(()=>{
    $('.value').html('0');
    $('button.number').click(numClick);
    $('button.clear').click(clearClick);
    $('button.operator').click(operatorClick);
    $('button.equals').click(equalsClick);
    $('button').mousedown(mousedownn);
    $('button').mouseup(mouseupp);
    $(window).keydown(keydownF);
});

let previousNumber = '';
let currentNumber = '';
let operator = '';
const numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
const operators = ['-', '*', '/','+'];

function numClick(button){
    currentNumber += button.currentTarget.value;
    $('.value').html(currentNumber)
    textScale();
}

function clearClick(){
    previousNumber = '';
    currentNumber = '';
    operator = '';
    $('.value').html('0');
    $('.value').css("transform", `scale(1)`);

}
function operatorClick(button){
    operator = button.currentTarget.value;
    if(!currentNumber) return;
    previousNumber = currentNumber;
    currentNumber = '';
    $('.value').html(previousNumber)
}

function equalsClick(){
    if(operator == '' || previousNumber == '' || currentNumber == '') return;
    let solution;
    switch(operator){
        case '+':{
            solution = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        }
        case '-':{
            solution = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        }
        case '*':{
            solution = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        }
        case '/':{
            solution = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        }
    }
    $('.value').html(solution);
    currentNumber = solution;
    previousNumber = '';
    textScale();
}

function textScale(){
    let pWidth = $('.value')[0].offsetWidth;
    let divWidth = $('.valueDiv')[0].offsetWidth - 20;
    let p = $('.value');
    if(pWidth / divWidth > 1){
        p.css("transform", `scale(${divWidth/pWidth})`);
    }
}

function mousedownn(event){
    $(event.target).addClass('clicked');
}
function mouseupp(event){
    $(event.target).removeClass('clicked');
}

function keydownF(event){
    let key = event.key;
    if(numbers.includes(key.toString())){
        currentNumber += key;
        $('.value').html(currentNumber)
        textScale();
    }
    if(operators.includes(key.toString())){
        previousNumber = currentNumber;
        currentNumber = '';
        operator = key;
        $('.value').html(previousNumber)
    }
    if(key === 'Enter'){
        equalsClick();
    }
    if(key === 'Backspace'){
        clearClick();
    }

}