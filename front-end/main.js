document.addEventListener('DOMContentLoaded', () => {

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const nameInput = document.getElementById("name");
  const nameLabel = document.getElementById("name-label");

  const submit = document.getElementById("submit");

  // here is the link for the sign up when you click 
  const changeForm = document.getElementById("change-form");

  // main html variables
  const searchButton = document.getElementById('searchButton')
  const wordInput = document.getElementById('wordInput')
  const wordName = document.getElementById('wordName')
  const definition = document.getElementById('definition')
  const partOfSpeech = document.getElementById('partOfSpeech')
  const example = document.getElementById('example')
  const synonyms = document.getElementById('synonyms')


  const logOutBtn = document.getElementById('logOutBtn')
  

  // // here is the token that is saved in the locaStorage
  const sid = localStorage.getItem("sid");

  if (sid) {
    console.log("Already logged in");
  } else {
    console.log("Not logged in");
  }

  // here if it is checking if the changeform exiist in this page and if it is true execute this
  if (changeForm) {
    
     nameInput.style.display = 'none';
     nameLabel.style.display = 'none';


    changeForm.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.innerText === "Sign Up") {
        
        nameInput.style.display = "block";
        nameLabel.style.display = "block";
        e.target.innerText = "Login";
        submit.value = "Sign Up";
      } else {
        nameInput.style.display = "none";
        nameLabel.style.display = "none";
        e.target.innerText = "Sign Up";
        submit.value = "Login";
      }
    });



  }

  const login = async (e) => {
    e.preventDefault();

    if (email.value === "" || password.value === "") {
      // change this later on to show on the loggin page
      console.log("Please enter email and password");

      return;

    } else {

      try {
        // here is the fetch to the backEnd
        const response = await fetch('http://localhost:3000/users/login', {

          method: "POST",
          // here is the headeers that is been sent to the back in json format
          headers: {
            'Content-Type': 'application/json'
          },
          // Converts the email and password values to a JSON string to send as the body of the POST request.
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });


        const data = await response.json();
        console.log(data);

        if (response.ok) {
          // if the response from the server is okay this line save a token in the local stoage and then let you in main.html
          localStorage.setItem('sid', data.token);
          window.location.href = "./main.html";
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // here if it is checking if the submit exiist in this page and if it is true execute this code

  if (submit) {

    submit.addEventListener("click", login);
  }

  // here is my api  for unsplashAPI
  const unsplashApiKey = 'N2T8g7oMb65LYBX5e0Dp_YguPYsyboVLaU4Dy146LVM'
  
  // here if it is checking if the searchbutton  exiist in this page and if it is true execute this
  if (searchButton) {


    searchButton.addEventListener('click', () => {

      // here word is saving whaever the user put in the put
      const word = wordInput.value;
     

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        // fetch will return a promise 
        // once the promise is done 
        // will return a response this promise willbe transforminto json 
        .then(response => response.json())
        .then(data => {
            
          console.log(data)

        //  if there is data in here
         if(data.length > 0){
           
          // save the first result into this variable 
          const firstResult = data[0]
          // here is accessing to the first object of the array and telling that we are only instering in the meanings 
          const meanings = firstResult.meanings[0];

          wordName.textContent = firstResult.wordName;
          definition.textContent = `Definition: ${meanings.definitions[0].definition}`;
          partOfSpeech.textContent = `Part of Speech: ${meanings.partOfSpeech}`;
          example.textContent = `Example : ${meanings.definitions[0].example}`;
          synonyms.textContent = `Synonyms: : ${meanings.definitions[0].synonyms.join(', ')}`;
       

          // after finding out that the api of the words found results this code is inisizling a new fetch
        return  fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=${unsplashApiKey}`);
         } else {
          alert('Word not found')
         }

        })
        // here the reesponse is been transformed into json 
        .then(response => response.json())
        .then(data => {

          // When a request is make to the Unsplash API, the response includes a JSON object that contains several fields, one of which is results. This results field is an array of objects, where each object represents an image that matches the search criteria. we are mase sure that there is a filed name result inside of the data wa that was 
          if (data && data.results && data.results.length > 0) {
            
            document.getElementById('wordImage').src = data.results[0].urls.regular;
            document.getElementById('wordImage').alt = `image related with the word ${word}`;
          }
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          wordName.textContent = "Error fetching data";
          definition.textContent = "";
        partOfSpeech.textContent = "";
        example.textContent = "";
        synonyms.textContent = "";
        });

    })
  }

})

logOutBtn.addEventListener('click', () => {
  localStorage.removeItem('sid');
  window.location.href = "./index.html";
})