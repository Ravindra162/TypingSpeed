var Time = document.querySelector(".DisplayTimer");
var Speed = document.querySelector("#Speed")
var j = 0;
var correctClick = new Audio("MatchClick.mp3")
var wrongClick = new Audio("WrongClick.mp3")
var countdownStarted = false
function countdown() {
  if (j <= 120) {
    Time.innerHTML = j;
    j = j + 1;
    setTimeout(countdown, 1000);
  }
}
let LetterQuote = []
var Textarea = document.querySelector("#UserTypes")
var Input = document.querySelector("#UserTypes")
document.querySelector(".start").addEventListener('click',countdown);
const URL = "https://api.quotable.io/random"
async function getRandom(){
    const response = await fetch(URL);
    const data = await response.json()
    return data.content
}
async function Quote(){
const Quote = await getRandom()
 LetterQuote = Quote.split('')
LetterQuote.forEach((Character)=>{
    const span = document.createElement('span')
    span.innerText = Character
    document.querySelector('.Quotation').appendChild(span)
})
}
Input.addEventListener("input", (event) => {
    if (event.data) {
      // If the user starts typing, trigger the countdown
      if (!countdownStarted) {
        countdown();
        countdownStarted = true;
      }
    }})
Quote()
var i = 0
var correct = 0 ;
var wrong = 0 ;
Input.addEventListener("input",(event)=>{
     if(document.querySelector('.Quotation').children[LetterQuote.length-2].classList.contains('correct') || document.querySelector('.Quotation').children[LetterQuote.length-1].classList.contains('wrong'))
    {
        // alert("Corrected letters : "+ correct + " Wrong letters : "+ wrong)
        countdown=null
        const WPM = ((correct + wrong)/5) / (j / 60);
        const ACC = correct/(correct + wrong);
        const wpm = Math.round(WPM)
        Speed.textContent = wpm 
        document.querySelector(".Accuracycontent").innerHTML = Math.round(ACC*100)
        alert("Typing Speed displayed enter OK to view")
        
    }
    else if(event.data === LetterQuote[i])
    {
        document.querySelector('.Quotation').children[i].classList.add('correct');
        correct++;
        correctClick.play()
        i++
    }
    else if(event.data === null){
        i--
        if(document.querySelector('.Quotation').children[i].classList.contains('correct')){
        document.querySelector('.Quotation').children[i].classList.remove('correct');
    correct--;}
        else if(document.querySelector('.Quotation').children[i].classList.contains('wrong')){
        document.querySelector('.Quotation').children[i].classList.remove('wrong');
    wrong--;}
    }
    else {
        document.querySelector('.Quotation').children[i].classList.add('wrong');
        wrong++;
        wrongClick.play()
        i++
    }
})