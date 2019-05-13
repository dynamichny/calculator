$('document').ready(()=>{
    $('.value').html('0');
    $('button.number').click(numClick);
    $('button.clear').click(clearClick);
    $('button.operator').click(operatorClick);
    $('button.equals').click(equalsClick);
    $('button').mousedown(mousedownn);
    $('button').mouseup(mouseupp);
});

let previousNumber = '';
let currentNumber = '';
let operator = '';


function numClick(button){
    currentNumber += button.currentTarget.value;
    $('.value').html(currentNumber)
}

function clearClick(){
    previousNumber = '';
    currentNumber = '';
    operator = '';
    $('.value').html('0');

}
function operatorClick(button){
    previousNumber = currentNumber;
    currentNumber = '';
    operator = button.currentTarget.value;
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
}

function textScale(){
    console.log('11')
}




function mousedownn(event){
    $(event.target).addClass('clicked');
}
function mouseupp(event){
    $(event.target).removeClass('clicked');
}