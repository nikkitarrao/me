
document.addEventListener('DOMContentLoaded', function () {
  //Rendering Initial View
  backEndRestAPI("questionsQ1", 1, "#initialScreen");

  //event delegation for views
  document.querySelector('#display-data').addEventListener('click', (e) => {
    handleViewEvents(e);
  });

  return false;
}); //end of DOMContentLoaded 

let qid = 0;
let counter = 0;
let answers = [];

handleViewEvents = (e) => {
  if (e.target.type !== 'radio') {
    e.preventDefault();
  }

  if (e.target.dataset.viewaction == "startQuiz") {
    console.log(e.target.dataset.viewaction);
    qid = 1;
    //entering quiz 1
    if ((document.querySelector('#quiz-selection').value === "1")) {
      quizId = "questionsQ1";
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 2
    else if (document.querySelector('#quiz-selection').value === "2") {
      quizId = "questionsQ2";
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 3
    else if (document.querySelector('#quiz-selection').value === "3") {
      quizId = "questionsQ3";
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 4
    else if (document.querySelector('#quiz-selection').value === "4") {
      quizId = "questionsQ4";
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    return false;
  }

  //handling each question
  console.log("qid: " + qid);
  if (e.target.dataset.viewaction == "nextQuestion" && validateQuiz()) {
    if(qid < 5){
      qid++;
      backEndRestAPI(quizId, qid, "#quiz_view");
      console.log(qid);
       return;
    } 
        // Personality quiz
    if (!document.querySelector('#form').dataset.correctChoice) {
      const result = findMostFrequent(answers);
      backEndRestAPI(quizId, qid, "#finalScreen");
    }
    // Knowledge quiz
    else {
      if (counter / 5 >= 0.8) {
        backEndRestAPI(quizId, qid, "#finalScreenPassed");
      } else {
        backEndRestAPI(quizId, qid, "#finalScreenFailed");
      }

  }
}

  //return button
  if (e.target.dataset.viewaction == "return") {
    qid = 0;
    backEndRestAPI("questionsQ1", 1, "#initialScreen");
  }

  //re-take
  if (e.target.dataset.viewaction == "re-take") {
    qid = 1;
    backEndRestAPI(quizId, 1, "#quiz_view");
  }

  //saving values for the test (multiple choice and image questions)
  if (e.target.type == 'radio') {
    const form = document.querySelector('#form');
    if ('correctChoice' in form.dataset) {
      if (e.target.value == document.querySelector('#form').dataset.correctChoice) {
        rightAnswer = true;
        counter++;
        console.log(e.target.value);
        console.log(document.querySelector('#form').dataset.correctChoice);
        console.log(rightAnswer);
        // backEndRestAPI(quizId, qid, "#finalScreenPaased");
      }
      else {
        rightAnswer = false;
        console.log(e.target.value);
        console.log(document.querySelector('#form').dataset.correctChoice);
        console.log(rightAnswer);
        // backEndRestAPI(quizId, qid, "#finalScreenFailed");
      }
    } else {
        answers[qid - 1] = e.target.value;
    }
  }


  return false;
} //end of handleViewsEvent

function validateQuiz() {
  const selected = document.querySelector('#form input[type="radio"]:checked');
  return !!selected; // true if selected, false if not
}

function findMostFrequent(arr) {
  const frequencyMap = {};
  for (const element of arr) {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  }

  let maxCount = 0;
  let mostFrequentElement;

  for (const element in frequencyMap) {
    if (frequencyMap[element] > maxCount) {
      maxCount = frequencyMap[element];
      mostFrequentElement = element;
    }
  }
  return mostFrequentElement;
}

//Asynchronous Network Request
async function backEndRestAPI(quizId, qid, view) {

  let api_endpoint = `https://raw.githubusercontent.com/nikkitarrao/me/main/db.json`

  const response = await fetch(api_endpoint);
  const data = await response.json();
  console.log("data:", data[quizId])
  console.log("view: " + view)

  const group = data[quizId];
  const question = group.find(q => q.id === qid);

  const html_element = renderView(question, view)
  document.querySelector('#display-data').innerHTML = html_element;
}

//Rendering View and Update DOM
const renderView = (data, view) => {
  source = document.querySelector(view).innerHTML;
  var template = Handlebars.compile(source);
  var html = template(data);
  return html;
}

//making the cursor special
const targetElement = document.querySelector("#for-fun");
new cursoreffects.rainbowCursor({ element: targetElement });