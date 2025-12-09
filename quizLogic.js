
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
      console.log(quizId);
      console.log(qid);
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 2
    else if (document.querySelector('#quiz-selection').value === "2") {
      quizId = "questionsQ2";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 3
    else if (document.querySelector('#quiz-selection').value === "3") {
      quizId = "questionsQ3";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 4
    else if (document.querySelector('#quiz-selection').value === "4") {
      quizId = "questionsQ4";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view");
    }

    return false;
  }

  //handling each question
  console.log("qid: " + qid);
  if (e.target.dataset.viewaction == "nextQuestion") {
    qid++;



    backEndRestAPI(quizId, qid, "#quiz_view");
    console.log(qid);
  }
  //end of test screen
  //choice 1
  else if (e.target.dataset.viewaction == "nextQuestion" && qid > 5 && counter / 5 >= 0.8) {
    backEndRestAPI(quizId, qid, "#finalScreenPassed");
    console.log(counter);
    onsole.log(counter / 5);
    // document.querySelector('#name').innerHTML = name;
  }
  else if (e.target.dataset.viewaction == "nextQuestion" && qid > 5 && counter / 5 >= 0.8) {
    backEndRestAPI(quizId, qid, "#finalScreenFailed");
  }
  else if (e.target.dataset.viewaction == "nextQuestion" && qid > 5 && counter === 0) {
    backEndRestAPI(quizId, qid, "#finalScreen");
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
      }
      else {
        rightAnswer = false;
        console.log(e.target.value);
        console.log(document.querySelector('#form').dataset.correctChoice);
        console.log(rightAnswer);
      }
    } else {
        answers.push(e.target.value);
    }
  }


  return false;
} //end of handleViewsEvent


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

