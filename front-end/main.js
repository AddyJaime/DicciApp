

let fullName;
let email;
let password;


// here we are sending a post request to the server 
const fetchUser = async () => {
  try {
    // the response of the server is saved here in respnsoe 
    const response = await fetch('http://localhost:3000/users/login', {
      method: "POST",
      body: 
      {
        
        "email": "alice.smith@example.com",
        "password": "securepassword"
      }
      
        
      
    })

    // This line waits for the server response to be converted to JSON format using the json() method. The result is saved in the data variable.
    const data = await response.json();
    // The content of the data variable, which contains the server response in JSON format, is printed to the console.
    console.log(data);

  } catch (error) {
    console.log(error);
  }
};

fetchUser()


