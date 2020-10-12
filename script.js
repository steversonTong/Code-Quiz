
    var total_seconds = 60;
    var secondsConv = parseInt(total_seconds % 60);
    var timer;
    
    function CheckTime() {
      document.getElementById("timeShower").innerHTML = 'Time Left: ' + secondsConv + ' seconds ';
    
      if (total_seconds == 0) {
        alert("You ran out of time!");
        showResults();
      } else {
        total_seconds = total_seconds - 1;
        secondsConv = parseInt(total_seconds % 60);
        timer = setTimeout(CheckTime, 1000);
      }
    }
    timer = setTimeout(CheckTime, 1000);

    function buildQuiz(){
      var output = [];
  
      quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          var answers = [];
  
          for(letter in currentQuestion.answers){
  
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      var answerContainers = quizContainer.querySelectorAll('.answers');
  
      let numCorrect = 0;
  
      quizQuestions.forEach( (currentQuestion, questionNumber) => {
  
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        if(userAnswer === currentQuestion.correctAnswer){
          numCorrect++;
        }
      });
      var initials = prompt("Please enter your initials");
      resultsContainer.innerHTML = `${initials} - ${numCorrect} out of ${quizQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }


  
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var quizQuestions = [
      {
        question: "Commonly used Data Types DO NOT include:",
        answers: {
          a: "strings",
          b: "booleans",
          c: "alerts",
          d: "numbers"
        },
        correctAnswer: "c"
      },
      {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: {
          a: "numbers and strings",
          b: "other arrays",
          c: "booleans",
          d: "all of the above"
        },
        correctAnswer: "d"
      },
      {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: {
          a: "quotes",
          b: "curly brackets",
          c: "parentheses",
          d: "square brackets"
        },
        correctAnswer: "c"
      },
      {
          question: "String values must be enclosed within ____ when being assigned to variables.",
          answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parentheses"
          },
          correctAnswer: "c"
        },
        {
          question: "A very useful tool used during development and debugging for printing content to the debugger is:",
          answers: {
            a: "JavaScript",
            b: "terminal / bash",
            c: "for loops",
            d: "console.log"
          },
          correctAnswer: "d"
        }
    ];
  
    buildQuiz();
  
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(currentSlide);
  
    
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  


  