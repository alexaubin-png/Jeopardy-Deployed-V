
 

//pulling our elements with the correct IDS(only elements we need IDS for)
let startButton= document.getElementById('start-Btn')
let guessButton = document.getElementById('guess-Button')
let passButton = document.getElementById('pass-Button')
let nextRound = document.getElementById('next-Round')
let switchPlayers1 = document.getElementById('switchPlayers1')
let PlayerTwosPersonalScore = document.getElementById('playerTwoScore')
let passButton1 = document.getElementById('Passto1')

let points;
//state machine to keep track of if were adding points, also holds all our questions and categorys reffer to eventListeners to see the action
const questions = [//questions [q].questions.find(q=>q.question)
     
 {category: "Comedy", value: 100, question:"which comedian played a role in the movie 'Scary Movie'?", answer:"kevin hart"},
 {category: "Comedy", value: 200, question:"which comedian was born in  Philadelphia?", answer:"kevin hart"},
 {category: "Comedy", value: 300, question:"which comedian is a ufc commentator?", answer:"joe rogan"},
 {category: "Comedy", value: 400, question:"which comedian is african american, accomplished six emmy awards, five grammys, and starts with a D?", answer:"dave chappelle "},
 {category: "Comedy", value: 500, question:"which comedian signed a $20 million dollar deal with netflix per episode?", answer:"dave chappelle"},

 {category: "States", value: 100, question:"is the size of Vermont small or big", answer:"small"},
 {category: "States", value: 200, question:"The spelling of Vermont starts with which letter", answer:"V"},
 {category: "States", value: 300, question:"the captial of Vermont is where", answer:"montpelier"},
 {category: "States", value: 400, question:"Vermont is known for maple syrup true or false?", answer:"true"},
 {category: "States", value: 500, question:"true or false, vermonts known as the state of beauty", answer:"true"},

{category: "Human", value: 100, question:"how many finger does the average human have", answer:"10"},
{category: "Human", value: 200, question:"how many valves does the human heart have", answer:"4"},
{category: "Human", value: 300, question:"is it true or false that, toes greatly help with balance", answer:"true"},
{category: "Human", value: 400, question:"Special cells called gustatory receptors are responsible for your sense of this", answer:"taste"},
{category: "Human", value: 500, question:"This pancake-shaped temporary organ in pregnant women supplies the fetus with food & oxygen", answer:"The Placenta" && "placenta"},

{category: "History", value: 100, question:"whos on the five dollar bill", answer:"abraham lincoln"},
{category: "History", value: 200, question:"whos on the 10 dollar bill", answer:"Alexander Hamilton"},
{category: "History", value: 300, question:"This historic figure was the 3rd president of the US, and a founding father", answer:"Thomas Jefferson"},
{category: "History", value: 400, question:"Whos the 16th US president", answer:"abraham lincoln"},
{category: "History", value: 500, question:"In 1945 scientists in this state witnessed the detonation of the world's first atomic bomb", answer:"new mexico"},

{category: "JavaScript", value: 100, question:"Whats the Abbreviation JS stand for ", answer:"JavaScript" },
{category: "JavaScript", value: 200, question:"to declare variables we use let, var, and what else", answer:"const"},
{category: "JavaScript", value: 300, question:"what operator is missing here: assignment, addition, multiplication", answer:"comparison"},
{category: "JavaScript", value: 400, question:"when assining values to variables we can use assignment operators whats the assignment operator", answer:"="},
{category: "JavaScript", value: 500, question:"Java script objects are declared with which opening and closing keys", answer:"{}"},

  ]

//create variables of the current player and the starting scores
    let currentPlayer = 1
    let scores = { player1: 0, player2: 0 }
    let selectedCardId;

    function submitAnswer() {
      // Grab the user's answer
      const userAnswer = document.getElementById('answer').value.toLowerCase();
  
      const correctAnswer = questions.find(q => q.question.toLowerCase() === document.getElementById(selectedCardId).textContent.toLowerCase()).answer.toLowerCase();
      selectedCardId = " ";
  
      // Check if the user's answer matches the correct answer
      if (userAnswer === correctAnswer) {
          // Give an alert for a correct answer
          alert('Correct Answer');
  
          // Increment the score of the current player
          scores[`player${currentPlayer}`] += points;
  
          // Update the displayed score
          document.getElementById("player" + currentPlayer + "-score").textContent = scores[`player${currentPlayer}`];
  
          // Save scores to local storage
          localStorage.setItem('scores', JSON.stringify(scores));
  
      } else {
          // Give alert for an incorrect answer
          scores[`player${currentPlayer}`] -= points;
          document.getElementById("player" + currentPlayer + "-score").textContent = scores[`player${currentPlayer}`];
          alert('Incorrect Answer');
          switchPlayers();
      }
  }
  
  // Function to load scores from local storage when the game starts
  function loadScores() {
      const savedScores = localStorage.getItem('scores');
      if (savedScores) {
          scores = JSON.parse(savedScores);
          document.getElementById("player1-score").textContent = scores.player1;
          document.getElementById("player2-score").textContent = scores.player2;
      }
  }
  
  // Call loadScores when your game initializes
  loadScores();
  
    guessButton.addEventListener('click', function(e){//handles input value for correct or wrong answer by invoking submitAnswer() also prvent default because its a button
    e.preventDefault()
        disableButtons()
        submitAnswer()
   
})

function switchPlayers(){
  if(currentPlayer === 1) {//checks that current player is one
    currentPlayer = 2//switches charcter by executing new data type

  }else{
    currentPlayer = 1//switches charcter by executing else statment to backup if statement

  }
  
 

    switchPlayers1.textContent = "Player " + currentPlayer + " Please pick a card";//updating display of notfication area informing user its their turn
    guessButton.disabled = true;
    passButton.disabled = true;
    nextRound.disabled = true;
    passButton1.disabled = true;//enabling buttons when the passbutton is clicked and scoped within the function for compatibility throughout the entireity of the game
  
}

nextRound.addEventListener('click', (e)=>{
    e.preventDefault()
submitAnswer()
})


function passingAnswer(){
    switchPlayers()
}

function clearScore(event) {
   if (event) {
       event.preventDefault(); // Prevent default action if an event is passed
   }
   localStorage.removeItem('scores'); // Remove the score from local storage
}

 function clearBoard(){
   guessButton.disabled = true;
   passButton.disabled = true;
   nextRound.disabled = true;
   document.getElementById('answer').value = "";
 }

function disableButtons(){//disables buttons because global variables speak to the whole document
    guessButton.disabled = true;
    passButton.disabled = true;
    nextRound.disabled = true;
    passButton1.disabled = true;
  
}
disableButtons()
function enablesButtons(){//enables buttons because we call upon them when a question is clicked
    guessButton.disabled = false;
    passButton.disabled = false;
    nextRound.disabled = false;
    passButton1.disabled = false;
}
 
    passButton.addEventListener('click', (e)=>{//preventing page refresh and alerting user with a button
   e.preventDefault()
   alert("you passed the current question!")
  
  switchPlayers1.textContent = "player2 " + "please pick a card"//updating display of notfication area
   nextRound.disabled = false;//enables nextround button
   passButton1.disabled = false;//enables player1 Button

  
 })
 function saveScore() {
   localStorage.setItem("playerScore", playerScore);
}

  comedy100.addEventListener("click", (e)=>{
  points = 100; selectedCardId = comedy100.id
   let categoryQuestions = questions.filter(q=>q.category === "Comedy")
   let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    comedy100.textContent = currentQuestion
    enablesButtons()


    
  })
  
  comedy200.addEventListener("click", (e)=>{
    points = 200; selectedCardId = comedy200.id
    let categoryQuestions = questions.filter(q=>q.category === "Comedy")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    comedy200.textContent = currentQuestion
    enablesButtons()

  })
  
  comedy300.addEventListener("click", (e)=>{
    points = 300; selectedCardId = comedy300.id
    let categoryQuestions = questions.filter(q=>q.category === "Comedy")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    comedy300.textContent = currentQuestion
    enablesButtons()
  
  })
  comedy400.addEventListener("click", (e)=>{
    points = 400; selectedCardId = comedy400.id
    let categoryQuestions = questions.filter(q=>q.category === "Comedy")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    comedy400.textContent = currentQuestion
    enablesButtons()
  })
  comedy500.addEventListener("click", (e)=>{
    points = 500; selectedCardId = comedy500.id
    let categoryQuestions = questions.filter(q=>q.category === "Comedy")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    comedy500.textContent = currentQuestion
    enablesButtons()
  })
  states100.addEventListener("click", (e)=>{
    points = 100; selectedCardId = states100.id
    let categoryQuestions = questions.filter(q=>q.category === "States")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    states100.textContent = currentQuestion
    enablesButtons()
  })
  states200.addEventListener("click", (e)=>{
    points = 200; selectedCardId = states200.id
    let categoryQuestions = questions.filter(q=>q.category === "States")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    states200.textContent = currentQuestion
    enablesButtons()
  })
  states300.addEventListener("click", (e)=>{
    points = 300; selectedCardId = states300.id
    let categoryQuestions = questions.filter(q=>q.category === "States")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    states300.textContent = currentQuestion
    enablesButtons()
  })
 states400.addEventListener("click", (e)=>{
    points = 400; selectedCardId = states400.id
    let categoryQuestions = questions.filter(q=>q.category === "States")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    states400.textContent = currentQuestion
    enablesButtons()
 
 })
 states500.addEventListener("click", (e)=>{
    points = 500; selectedCardId = states500.id
    let categoryQuestions = questions.filter(q=>q.category === "States")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    states500.textContent = currentQuestion
    enablesButtons()
 })
 humanBody100.addEventListener("click", (e)=>{
    points = 100; selectedCardId = humanBody100.id
    let categoryQuestions = questions.filter(q=>q.category === "Human")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    humanBody100.textContent = currentQuestion
    enablesButtons()
 })
 humanBody200.addEventListener("click", (e)=>{
    points = 200; selectedCardId = humanBody200.id
    let categoryQuestions = questions.filter(q=>q.category === "Human")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    humanBody200.textContent = currentQuestion
    enablesButtons()
 })
 humanBody300.addEventListener("click", (e)=>{
    points = 300; selectedCardId = humanBody300.id
    let categoryQuestions = questions.filter(q=>q.category === "Human")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    humanBody300.textContent = currentQuestion
    enablesButtons()
 })
 humanBody400.addEventListener("click", (e)=>{
    points = 400; selectedCardId = humanBody400.id
    let categoryQuestions = questions.filter(q=>q.category === "Human")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    humanBody400.textContent = currentQuestion
    enablesButtons()
 })
 humanBody500.addEventListener("click", (e)=>{
    points = 500; selectedCardId = humanBody500.id
    let categoryQuestions = questions.filter(q=>q.category === "Human")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    humanBody500.textContent = currentQuestion
    enablesButtons()
 })
 history100.addEventListener('click', (e)=>{
    points = 100; selectedCardId = history100.id
    let categoryQuestions = questions.filter(q=>q.category === "History")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    history100.textContent = currentQuestion
    enablesButtons()
 })
 history200.addEventListener('click', (e)=>{
    points = 200; selectedCardId = history200.id
    let categoryQuestions = questions.filter(q=>q.category === "History")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    history200.textContent = currentQuestion
   enablesButtons() 
 })
 history300.addEventListener('click', (e)=>{
    points = 300; selectedCardId = history300.id
    let categoryQuestions = questions.filter(q=>q.category === "History")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    history300.textContent = currentQuestion
     enablesButtons()
  })
 history400.addEventListener('click', (e)=>{
    points = 400; selectedCardId = history400.id
    let categoryQuestions = questions.filter(q=>q.category === "History")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    history400.textContent = currentQuestion
    enablesButtons()
 })
 history500.addEventListener('click', (e)=>{
    points = 500; selectedCardId = history500.id
    let categoryQuestions = questions.filter(q=>q.category === "History")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    history500.textContent = currentQuestion
    enablesButtons()
 })
 Java100.addEventListener("click", (e)=>{
    points = 100; selectedCardId = Java100.id
    let categoryQuestions = questions.filter(q=>q.category === "JavaScript")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    Java100.textContent = currentQuestion
    enablesButtons()
 })
 Java200.addEventListener("click", (e)=>{
    points = 200; selectedCardId = Java200.id
    let categoryQuestions = questions.filter(q=>q.category === "JavaScript")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    Java200.textContent = currentQuestion
    enablesButtons()
 })
 Java300.addEventListener("click", (e)=>{
    points = 300; selectedCardId = Java300.id
    let categoryQuestions = questions.filter(q=>q.category === "JavaScript")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    Java300.textContent = currentQuestion                                                                      
    enablesButtons()
 })
 Java400.addEventListener("click", (e)=>{
    points = 400; selectedCardId = Java400.id
    let categoryQuestions = questions.filter(q=>q.category === "JavaScript")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    Java400.textContent = currentQuestion
    enablesButtons()
 })
 Java500.addEventListener("click", (e)=>{
    points = 500; selectedCardId = Java500.id
    let categoryQuestions = questions.filter(q=>q.category === "JavaScript")
    let currentQuestion = categoryQuestions.find(q=> q.value === points).question
    Java500.textContent = currentQuestion
    enablesButtons()
 })
 saveScore()