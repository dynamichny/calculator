$('document').ready(()=>{
    $('.value').html('0');
    $('button.number').click(numClick);
    $('button.clear').click(clearClick);
    $('button.operator').click(operatorClick);
    $('button.equals').click(equalsClick);
    $('button').mousedown(mousedownn);
    $('button').mouseup(mouseupp,);
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
    $('.value').css("transform", `scale(1)`);

}
function operatorClick(button){
    previousNumber = currentNumber;
    currentNumber = '';
    operator = button.currentTarget.value;
    $('.value').html(previousNumber)
    textScale();
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
    textScale();
}

function textScale(){
    let pWidth = $('.value')[0].offsetWidth;
    let divWidth = $('.valueDiv')[0].offsetWidth - 20;
    let p = $('.value');
    if(pWidth / divWidth > 1){
        p.css("transform", `scale(${divWidth/pWidth})`);
        p.css("left", "5px");
    }
}

function mousedownn(event){
    $(event.target).addClass('clicked');
}
function mouseupp(event){
    $(event.target).removeClass('clicked');
}