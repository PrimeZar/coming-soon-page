let countdownTime = new Date(" April 10, 2024 16:00:00 ").getTime();

let end = "00:00:00";
    
let time = setInterval( () => {
    let now = new Date().getTime();

    // find the distance between now and the count down time.
    let distance = countdownTime - now;
    

    let days = Math.floor(distance/(1000*60*60*24));
    let hours = Math.floor((distance %(1000*60*60*24)) / (1000*60*60));
    let minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    let seconds = Math.floor((distance%(1000*60) / 1000));

    document.querySelector('.days p').textContent = days;
    document.querySelector('.hours p').textContent = hours
    document.querySelector('.minutes p').textContent = minutes
    let sec = document.querySelector('.seconds p');
    sec.textContent= seconds;

        if (distance < 0) {
        clearInterval(time);
        const end = document.getElementById('launch-time');
        end.textContent = 'finished';
        end.style.color = 'pink';
        end.style.fontSize = '2rem';
    }
}, 1000);



// ========= Section Two ================
    const input_con= document.getElementById('input-box');
    const list_con = document.getElementById('list-container');

    const task = () => {
        if(!input_con.value){
        alert('fill in your tasks');
    } else{
        let li = document.createElement('li');
        li.innerHTML = input_con.value;
        list_con.appendChild(li); 
        let span = document.createElement('span');
        span.innerHTML ="\u00d7";
        li.appendChild(span);

        input_con.value= ' ';
        saveData();
    }
}

list_con.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI'){
    e.target.classList.toggle('checked');
    }
    else if (e.target.tagName === 'SPAN'){
    e.target.parentElement.remove();
    }}
)

const saveData = () => {
    localStorage.setItem("data", list_con.innerHTML);
}

function showData() {
    list_con.innerHTML = localStorage.getItem('data');
}


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// ======== section 3 Quiz App ===========-----------------------------------------

const questions = [ 
    { question: "Which is the largest animal in the world ?",
    answers: [
        { text: 'Shark', correct: false},
        { text: 'Blue whale', correct: true},
        { text: 'Elephant', correct: false},
        { text: 'Giraffe', correct: false},
]}, { question: "Which is the smallest country in the world ?",
    answers: [
        { text: 'Vatican City', correct: true},
        { text: 'Bhutan', correct: false},
        { text: 'Nepal', correct: false},
        { text: 'Shri Lanka', correct: false},
]}, {question: "Which is the largest desert in the world ?",
    answers: [
        { text: 'kalahari', correct: false},
        { text: 'Gobi', correct: false},
        { text: 'Sahara', correct: false},
        { text: 'Antarctica', correct: true},
]}, {question: "Which is smallest continent in the world ?",
    answers: [
        { text: 'Asia', correct: false},
        { text: 'Australia', correct: true},
        { text: 'Arctic', correct: false},
        { text: 'Africa', correct: false},
]}

];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('sec_3_btn_next');

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    score = 0;
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showGame();
}

function showGame(){
    resetState();
    // index
    let currentQuestion = questions[currentQuestionIndex];
    // // increments index
    let questionNo = currentQuestionIndex +1;

    // // show Question
    questionElement.innerHTML = questionNo +'. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => { 
        const button = document.createElement('button');
        button.classList.add('btn_sec_3');
        button.innerHTML = answer.text;
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
    
        }
        button.addEventListener('click', selectedAnswer);
    })
}

function selectedAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButton.children).forEach(button =>{
        if( button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
        nextButton.style.display = 'block';
    })

}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML= `You Scored ${score} out of ${questions.length}`;
    nextButton.style.display = 'block';
    nextButton.innerHTML = " PLAY AGAIN";
}

function handleNextButton(){
    currentQuestionIndex ++;
    
    if(currentQuestionIndex < questions.length){
        showGame();
    } else {
        showScore();
    }

}
nextButton.addEventListener('click', () =>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// =========== SECTION 4 === Random Name Generator ======
const passwordBox = document.getElementById('password');
const pass_str = document.getElementById('pass_strength');
const eye_icon = document.getElementById('eye_icon');
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+~{}|[]:|?><.;'\=-!";

const allChars = upperCase + lowerCase + number + symbol;

function createPassword() {
    let password = " ";

    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (length > password.length){
        password += allChars[Math.floor(Math.random() * allChars.length)];  
    }
    passwordBox.value = password;
}

function copyPassWord() {
    // passwordBox.select();
    navigator.clipboard.writeText(passwordBox.value);
    // document.execCommand('copy');
    passwordBox.value ='';
}

passwordBox.addEventListener('click', () =>{
    if (!passwordBox.value){
        pass_str.style.display = 'none';
    }
})

eye_icon.addEventListener('click', () => {
    if(passwordBox.value.length > 0){
        pass_str.style.display = 'block';
        
    }else {
        pass_str.style.display = 'none';
    }

    if (passwordBox.value.length <= 4){
        pass_str.innerHTML = 'weak';
        pass_str.style.color ='red';

    } else if ( passwordBox.value.length >= 4 && passwordBox.value.length <= 6 ){
        pass_str.innerHTML = 'medium';
        pass_str.style.color ='#f1db0f';

    } else if( passwordBox.value.length >= 8){
        pass_str.innerHTML = 'strong';
        pass_str.style.color ='green';
    }

    if (passwordBox.type == 'password'){
        passwordBox.type = 'text';
        eye_icon.src='sec_4_images/eye-open.png';
    } else {
        passwordBox.type = "password";
        eye_icon.src = "sec_4_images/eye-close.png";
    }
})



// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// Section 5 ===== Notes App =========
const notesContainer = document.querySelector(".sec_5_container");
const sec_5_createBtn = document.querySelector('.btn_sec_5');
let sec_5_notes = document.querySelectorAll('.sec_5_input-box');


showNotes();

function updateNote(){
    localStorage.setItem('myNotes', notesContainer.innerHTML);
}

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem('myNotes');
}

sec_5_createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = "sec_5_input-box";
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "sec_5_images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG'){
        e.target.parentElement.remove();
        updateNote();

    } else if (e.target.tagName === 'P'){
        notes = document.querySelectorAll(".sec_5_input-box");
        notes.forEach(nt => { 
            nt.onkeyup = function(){
                updateNote();
            }
        })
    }
})

// document.addEventListener('keydown', event =>{
//     if (event.key === 'Enter'){
//     document.execCommand("insertLineBreak");
//     event.preventDefault();
//     }
// })


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// ===== Section 6 ==== Age Calc ========

let userInput = document.getElementById('date');
    userInput.max = new Date().toISOString().split("T")[0];
const sec_6_result = document.getElementById("sec_6_result");

function calculateAge(){
    let birthDate = new Date(userInput.value);

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() +1;
    let y1 = birthDate.getFullYear();


    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth() +1;
    let y2 = today.getFullYear();

    let d3, m3, y3;
    y3 = y2 - y1;

    if( m2 >= m1){
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if(d2 >= d1){
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }
    if (m3 < 0){
        y3--;
        m3 = 11;
    }
    console.log(y3,m3,d3);
    sec_6_result.innerHTML = `You are <span>${y3}<span> years, <span>${m3}<span> months and <span>${d3}<span> days old`;
}

function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// ===== section 07 === Quote ===== 

const quote = document.getElementById('quote');
const author = document.getElementById('author');

    const api_url = 'https://api.quotable.io/random';


async function getMyQuote(url){
    const response = await fetch(url);
    let data = await response.json();

    quote.innerHTML = data.content;
    author.innerHTML = data.author;
    

}

function twitter(){
    window.open('https://twitter.com/intent/tweet?text=' + quote.innerHTML + '  -----by  ' + author.innerHTML, 'Twitter Window', 'width=600, height=300');
}

getMyQuote(api_url);



// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

//======= SECTION 08 ===== QR CODE SCANNER =====

let qrText = document.getElementById('qr_text');
let qrImage = document.getElementById('qr_image');
let qrImageBox = document.querySelector('.qr_image_box');

function getQRCode (){
    if( qrText.value.length >0){
        qrImage.src ='https://quickchart.io/qr?text=Hello world ';
        qrImageBox.classList.add('show-image');
        console.log(qrText.value);
        qrText.value = ' ';
    
    } else {
        qrText.classList.add('error');
        setTimeout(() =>{
            qrText.classList.remove('error');
        }, 1000);
        
    }
}

sec_5_createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = "sec_5_input-box";
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "sec_5_images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

    // "https://api.qrserver.com/v1/create-qr-code/?size=150x1500&data" + qrInput.value;
    
    // https://quickchart.io/qr?text=Hello world

    // qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?data=" + qrInput.value;


    
// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

    // SECTION 09 ===== MEDIA player =======
window.addEventListener('load', () =>{
    song.pause();
})
    const progress = document.getElementById('progress');
    const playIcon = document.getElementById('playIcon');
    const song = document.getElementById('song');

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

    function playPause(){
        if (playIcon.classList.contains('fa-play')){
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            song.play();
        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
            song.pause();
        }
    }

if (song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },500);
}   

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
}


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// === SECTION 10 ===== Toast Notification
let toastBox = document.getElementById('toast_box');

let success = ' <i class="fa-solid fa-circle-check"></i> Successfully Submitted';
let secError = ' <i class="fa-solid fa-circle-xmark"></i> Please fix the error';
let invalid = ' <i class="fa-solid fa-circle-exclamation"></i> Invalid Command please check again';

function showToast (mgs){
    let show_toast = document.createElement('div');
    show_toast.classList.add('toast');
    show_toast.innerHTML = mgs;
    toastBox.appendChild(show_toast);
    
    if (mgs.includes("Successfully")){
        show_toast.classList.add('success');
    }

    if(mgs.includes('error')){
        show_toast.classList.add('toast_error');
    }

    if (mgs.includes('Invalid')){
        show_toast.classList.add('invalid');
    }

    setTimeout(() => {
        show_toast.remove();
    }, 5000);
}


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// ====Sec 11 ====== Stop Watch ==== 
    let DisplayTime = document.getElementById('displayTime');
    let [stopWatch_seconds, stopWatch_minutes, stopWatch_hours] = [0,0,0];
    let timer = null;

function startWatch(){
    stopWatch_seconds++;
    if(stopWatch_seconds == 60){
        stopWatch_seconds = 0;
        stopWatch_minutes++;
        if (stopWatch_minutes == 60){
            stopWatch_minutes = 0;
            stopWatch_hours++;
        }
    } 

    let s = stopWatch_seconds < 10 ? '0' + stopWatch_seconds:stopWatch_seconds;
    let m = stopWatch_minutes < 10 ? '0' + stopWatch_minutes:stopWatch_minutes;
    let h = stopWatch_hours < 10 ? '0' + stopWatch_hours:stopWatch_hours;

    DisplayTime.innerHTML = h + ' : ' + m + ' : ' + s;
}

function watchStop(){
    clearInterval(timer);
}
function watchReset(){
    clearInterval(timer);
    [stopWatch_seconds, stopWatch_minutes, stopWatch_hours] = [0,0,0];
    DisplayTime.innerHTML = "00:00:00";
}

function watchStart(){
    if(timer!== null){
    clearInterval(timer);
    }

    timer = setInterval(startWatch,1000);
}


// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// NO CODE FOR CALCULATOR PROJECT 12 HERE ---
// Section 13 ===== Pop Up =====
let popUp = document.getElementById('popUp');

function openPopUp(){
    popUp.classList.add('open_popUp');
}

function closePopUp() {
    popUp.classList.remove('open_popUp');
}



// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

// Section 14 ==== Dark Theme changer =====

const sec_14 = document.getElementById('sec_14');
const moon = document.getElementById('moon');


sec_14_moon.onclick = function(){
    sec_14.classList.toggle('dark_theme');
    if(sec_14.classList.contains('dark_theme')){
        moon.src = 'sec_14_dark theme icon/sun.png';
    } else {
        moon.src = 'sec_14_dark theme icon/moon.png';
    }
}

// SECTION_15_Drag_and_Drop
    let sec_15_left_box = document.getElementById('sec_15_left_box');
    let sec_15_right_box = document.getElementById('sec_15_right_box');
    let sec_lists = document.getElementById('sec15List');


    for (flist of sec15List ){
        flist.addEventListener('dragstart', (e) => {
            let selected = e.target;

            sec_15_right_box.addEventListener('dragover', (e) =>{
                e.preventDefault();
            });

            sec_15_right_box.addEventListener('drop', (e)=> {
                sec_15_right_box.appendChild(selected);
                selected = null;
            });

            // left box
            sec_15_left_box.addEventListener('dragover', (e) =>{
                e.preventDefault();
            });

            sec_15_left_box.addEventListener('drop', (e)=> {
                sec_15_left_box.appendChild(selected);
                selected = null;
            });
        });
    }


    // =========== Section 16 Form Validation ======= 

let sec_16_nameError = document.getElementById('name-error');
let sec_16_phoneError = document.getElementById('phone-error');
let sec_16_emailError = document.getElementById('email-error');
let sec_16_messageError = document.getElementById('message-error');
let sec_16_submitError = document.getElementById('submit-error');


function validateName(){ 
    let name = document.getElementById('contact-name').value;
    if (name.length === 0){
        sec_16_nameError.innerHTML = 'Full Name is required';
    }

    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        sec_16_nameError.innerHTML = 'Write full name';
        return false;
    }

    sec_16_nameError = '<i class="fas fa-check-circle"></i>';
    return true;

}


function validatePhone(){ 
    let sec_16_phone = document.getElementById('contact-phone').value;
    if (sec_16_phone.length === 11){
        sec_16_phoneError.innerHTML = 'Phone No is required';
    }

    if (!sec_16_phone.match(/^[0-9]{11}$/)) {
        sec_16_phoneError.innerHTML = ' Phone number should be 11 digit';
        return false;
    }

    sec_16_phoneError = '<i class="fas fa-check-circle"></i>';
    return true;

}

// const submitBtn = (e)=>{
//     e.preventDefault();
// }



// ========== Section 17 ==== Create Gallery =====


const scrollContainer = document.querySelector('.sec_17_gallery');
const sec_17_backBtn = document.getElementById('btn_17_backBtn');
const sec_17_forwardBtn = document.getElementById('btn_17_forwardBtn');

scrollContainer.addEventListener('wheel', (e) =>{
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
    scrollContainer.style.scrollBehavior = 'auto';
})

sec_17_backBtn.addEventListener('click', () =>{
    scrollContainer.scrollLeft += 200;
    scrollContainer.style.scrollBehavior = 'smooth';
})

sec_17_forwardBtn.addEventListener('click', () =>{
    scrollContainer.scrollLeft -= 200;
    scrollContainer.style.scrollBehavior = 'smooth';
})



// ====== Section 18 ==== Email Subscription ========
const scriptURL = 'https://script.google.com/macros/s/AKfycbxdAnLI5-wrpQeUMUEZAbMfMm1bgLd1yR8OOxB34XLj17VBzn7e2z-RzOu67sdbYXYaqQ/exec';
const form = document.forms['submit-to-google-sheet']
const sec_18_msg = document.getElementById('sec_18_msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { 
        method:'POST', 
        body: new FormData(form)})

        .then(response => 
        sec_18_msg.innerHTML = 'Thank you for your Subcription')
            setInterval(() => {
                sec_18_msg.innerHTML = ' ';
            }, 7000);
            form.reset()

        .catch(error => 
            sec_18_msg.innerHTML = 'Error Occured',
            console.log('Error', error.message))
})

// Section 19 ==== Voice Converter ======= 

let speech = new SpeechSynthesisUtterance();
// let voices = [];


document.querySelector('.sec_19_btn').addEventListener('click', () =>{
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);

});

// to be continued 
Comment


// Section 20 ==== Make Image Background Change ===
    const sec_20_ImgBox = document.querySelector('.sec_20_img_box');
    const imgWrap = document.querySelector('.sec_20_img-wrap');

    const leftSpace = sec_20_ImgBox.offsetLeft;

    sec_20_ImgBox.onmouselmove = function (e){
        e.pageX;
    }

    // To be Continue Sec 20
    Comment


// Section 21 ==== Create Mini Calendar ====
    const date = document.getElementById('date');
    const day = document.getElementById('day');
    const month = document.getElementById('month');
    const year = document.getElementById('year');

    const today = new Date();

    console.log(today);

    // To be continued sec 21
    Comment

// Section 22 ==== Make Select Menu Design ====
    const selectField = document.getElementById('selectField');
    const selectText = document.getElementById('selectText');
    const sec_22_option = document.getElementsByClassName('sec_22_option');

    // To be Continue sec 22
    Comment

// Section 23 ==== Make Circular Progress Bar ===

    let sec_23_number = document.getElementById('sec_23_number');
    let counter = 0;

    setInterval(() =>{
        if(counter === 65){
            clearInterval();
        } else{
            counter += 1;
            sec_23_number.innerHTML = counter + '%'
        }
    },30);
    

// Section 24 ==== Product Page Design =====
let sec_24_productImg = document.getElementById('sec_24_productImg');
let sec_24_btn = document.getElementsByClassName('sec_24_btn');

sec_24_btn[0].onclick = function(){
    sec_24_productImg.src="sec_24_image_product_page_design/120.webp";

    for(bt of sec_24_btn){
        bt.classList.remove("active");
    }
    this.classList.add("active");
}
sec_24_btn[1].onclick = function(){
    sec_24_productImg.src="sec_24_image_product_page_design/122.webp";
    
    for( bt of sec_24_btn ){
        bt.classList.remove("active");
    }
    this.classList.add("active");
}
sec_24_btn[2].onclick = function(){
    sec_24_productImg.src="sec_24_image_product_page_design/121.webp";
    
    for( bt of sec_24_btn ){
        bt.classList.remove("active");
    }
    this.classList.add("active");
}

const color_1= ()=>{
    sec_24_productImg.src="sec_24_image_product_page_design/Mens-Standard-Fit-Heathered-Short-Sleeve-V-Neck-T-Shirt01-600x764.jpg";   
}
const color_2= ()=>{
    sec_24_productImg.src="sec_24_image_product_page_design/Mens-Standard-Fit-Short-Sleeve-Crew-T-Shirt01-600x764.jpg";   
}
const color_3= ()=>{
    sec_24_productImg.src="sec_24_image_product_page_design/3_1.jpg";   
}
const color_4= ()=>{
    sec_24_productImg.src="sec_24_image_product_page_design/140.jpeg";   
}


// Section 25 ==== CrptoCurrency Website ====
// Section 26 ==== Digital Clock ====
// Section 27 ==== Image Search Engine ====



