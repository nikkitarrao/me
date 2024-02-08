
document.addEventListener('DOMContentLoaded', function() {
  //Rendering Initial View
  backEndRestAPI("questionsQ1", 1, "#initialScreen");


//event delegation for views
document.querySelector('#display-data').addEventListener('click', (e) => {
  handleViewEvents(e);
});


return false;
}); //end of DOMContentLoaded 



let counter = 0;

handleViewEvents =  (e) => {
  if (e.target.type !== 'radio') {
   e.preventDefault();
  }
  if (e.target.dataset.viewaction == "startQuiz") {
  //saving user entered name
  console.log(e.target.dataset.viewaction);
  var name = document.querySelector('#name').value; 
  console.log(name);
  qid = 1;
    //entering quiz 1
    if((document.querySelector('#quiz-selection').value === "1")){
      quizId = "questionsQ1";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    //entering quiz 2
    else if(document.querySelector('#quiz-selection').value === "2"){
      quizId = "questionsQ2";
      console.log(quizId);
      backEndRestAPI(quizId, qid, "#quiz_view");
    }
    return false;
  }

//handling each question
console.log(qid);
console.log(quizId);
if(e.target.dataset.viewaction == "continue"){ 
  qid++;
  backEndRestAPI(quizId, qid, "#quiz_view");
  console.log(qid);
  console.log(counter);
}
//end of test screen
//choice 1
else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 >= 0.8){
  backEndRestAPI(quizId, qid, "#finalScreenPassed");
  console.log(counter);
  onsole.log(counter/5);
  document.querySelector('#name').innerHTML = name;
}
else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 >= 0.8){
//choice 2
}
else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 >= 0.8){
//choice 3
}
else if(e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 >= 0.8){
  //choice 4
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
  if(e.target.value == document.querySelector('#form').dataset.correctChoice){
    rightAnswer = true;
    console.log(e.target.value);
    console.log(document.querySelector('#form').dataset.correctChoice);
    console.log(rightAnswer);
  }
  else{
    rightAnswer = false;
    console.log(e.target.value);
    console.log(document.querySelector('#form').dataset.correctChoice);
    console.log(rightAnswer);
  }
}


return false;
} //end of handleViewsEvent


//Asynchronous Network Request
async function backEndRestAPI(quizId,qid, view){
  let api_endpoint = `https://my-json-server.typicode.com/nikkitarrao/SinglePageApplication/${quizId}/${qid}`
  const response = await fetch(api_endpoint)
  const data = await response.json()
  console.log(data)
  console.log(view)
  const html_element = renderView(data, view)
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

