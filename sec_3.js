// ======== section 3 Quiz App ===========-----------------------------------------

const questions = [ 
    { question: "which is largest animal in the world ?",
    answers: [
        { text: 'shark', correct: false},
        { text: 'Blue whale', correct: true},
        { text: 'Elephant', correct: false},
        { text: 'Giraffe', correct: false},
]}, { question: "which is smallest country in the world ?",
    answers: [
        { text: 'Vatican City', correct: true},
        { text: 'Bhutan', correct: false},
        { text: 'Nepal', correct: false},
        { text: 'Shri Lanka', correct: false},
]}, {question: "which is largest desert in the world ?",
    answers: [
        { text: 'kalahari', correct: false},
        { text: 'Gobi', correct: false},
        { text: 'Sahara', correct: false},
        { text: 'Antarctica', correct: true},
]}, {question: "which is smallest continent in the world ?",
    answers: [
        { text: 'Asia', correct: false},
        { text: 'Australia', correct: true},
        { text: 'Arctic', correct: false},
        { text: 'Africa', correct: false},
]},

];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('sec_3_btn_next');

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () =>{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    // get the question index
    let currentQuestion = questions[currentQuestionIndex];
    // increment the index
    let questionNo = currentQuestionIndex +1;
    // display it
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach( answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn_sec_3');
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();