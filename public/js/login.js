const loginFormHandler = async (event) => {
  event.preventDefault();

  //takes in user data from login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    //targets the route in userRoutes
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      console.log(response);
      window.alert("please input username/password");
    }
  }
};

//handles the form for a new user
const signupFormHandler = async (event) => {
  event.preventDefault();

  //takes in user data from signup form
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    //targets the route in userRoutes
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // If successful, redirect the browser to the dashboard page
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response);
      window.alert("please input username/password");
    }
  }
};
