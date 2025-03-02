function displayEvents() {
  document.getElementById('eventsButton').style.display == "none";
  document.getElementById('rsvpButton').style.display == "block";
  document.getElementById('rsvpDropDown').style.display == "block";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("main").innerHTML = this.responseText;
    }
  }
  xhttp.open("GET", "events.txt", true);
  xhttp.send();
}

function hide() {
  document.querySelector('#rsvpButton').style.display == "none";
  document.querySelector('#rsvpDropDown').style.display == "none";
}

function rsvp() {
  var eventID = document.getElementById("rsvpDropDown").value;
  fetch('/rsvps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eventID })
  })
    .then(response => {
      if (!response.status === 200) {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => console.error('Error:', error));
  alert("RSVPing Successful! :)");
}

function foster() {
  const animalID = document.getElementById("name").innerText;
  fetch('/animals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ animalID })
  })
    .then(response => {
      if (!response.status === 200) {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => console.error('Error:', error));
  alert("Fostering Successful! :)");
}

function editProfile() {
  var name = document.getElementById("name").value;
  var bio = document.getElementById("bio").value;

  var div = document.getElementById("personal_div");
  div.innerHTML = "<br/>Name: "+name+"<br/><br/>"+"Bio: "+bio+"<hr/>";
}

function hideDiv(a, b) {
  const x = document.getElementById(a);
  const y = document.getElementById(b);
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}

document.getElementById("login").style.display = "none";
document.getElementById("signup").style.display = "none";
document.getElementById("google").style.display = "none";

function showDiv(a, b) {
  const x = document.getElementById(a);
  const y = document.getElementById(b);
  if (y.style.display === "none") {
    y.style.display = "block";
    x.style.display = "none";
  } else {
    y.style.display = "none";
    x.style.display = "block";
  }
}

// function darkmode_on() {
//     document.body.style.backgroundColor = "#8e3563";
//     document.getElementsByClassName("header_div")[0].style.backgroundColor = "#572649";
//     document.getElementsByTagName("h1")[0].style.color = "#e0bbd2";
//     document.getElementsByClassName("fa-solid fa-paw")[0].style.color = "#e0bbd2";
//     document.getElementsByClassName("border")[0].style.borderColor = "#402037";
//     document.getElementsByClassName("footerMain")[0].style.backgroundColor = "#572649";
//     document.getElementsByClassName("footerMain")[0].style.color = "#e0bbd2";

//     let hovers = document.getElementsByClassName("header_item");
//     for (let i = 0; i < hovers.length; i++) {
//         hovers[i].classList.remove("light_hover");
//         hovers[i].classList.add("dark_hover");
//     }

//     let h2s = document.getElementsByTagName("h2");
//     for (let i = 0; i < h2s.length; i++) {
//         h2s[i].style.color = "#e0bbd2";
//     }
//     let h3s = document.getElementsByTagName("h3");
//     for (let i = 0; i < h3s.length; i++) {
//         h3s[i].style.color = "#e0bbd2";
//     }

//     let buttons = document.getElementsByTagName("button");
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].style.color = "#e0bbd2";
//         buttons[i].style.borderColor = "#572649";
//         buttons[i].style.backgroundColor = "#8e3563";
//     }

//     let items = document.getElementsByClassName("header_item");
//     for (let i = 0; i < items.length; i++) {
//         items[i].style.color = "#e0bbd2";
//         items[i].style.borderColor = "#402037";
//     }

//     let paragraphs = document.getElementsByTagName("p");
//     for (var i = 0; i < paragraphs.length; i++){
//         paragraphs[i].style.color = "#e0bbd2";
//     }
// }

// function darkmode_off() {
//     document.body.style.backgroundColor = "white";
//     document.getElementsByClassName("header_div")[0].style.backgroundColor = "lightpink";
//     document.getElementsByClassName("title")[0].style.color = "palevioletred";
//     document.getElementsByClassName("fa-solid fa-paw")[0].style.color = "palevioletred";
//     document.getElementsByClassName("border")[0].style.borderColor = "palevioletred";
//     document.getElementsByClassName("footerMain")[0].style.backgroundColor = "palevioletred";
//     document.getElementsByClassName("footerMain")[0].style.color = "white";

//     let hovers2 = document.getElementsByClassName("header_item");
//     for (let i = 0; i < hovers2.length; i++) {
//         hovers2[i].classList.remove("dark_hover");
//         hovers2[i].classList.add("light_hover");
//     }

//     let h2s2 = document.getElementsByTagName("h2");
//     for (let i = 0; i < h2s2.length; i++) {
//         h2s2[i].style.color = "palevioletred";
//     }
//     let h3s2 = document.getElementsByTagName("h3");
//     for (let i = 0; i < h3s2.length; i++) {
//         h3s2[i].style.color = "palevioletred";
//     }

//     let items2 = document.getElementsByClassName("header_item");
//     for (let i = 0; i < items2.length; i++) {
//         items2[i].style.color = "palevioletred";
//         items2[i].style.borderColor = "palevioletred";
//     }

//     let buttons2 = document.getElementsByTagName("button");
//     for (let i = 0; i < buttons2.length; i++) {
//         buttons2[i].style.color = "palevioletred";
//         buttons2[i].style.borderColor = "palevioletred";
//         buttons2[i].style.backgroundColor = "white";
//     }

//     let paragraphs2 = document.getElementsByTagName("p");
//     for (var i = 0; i < paragraphs2.length; i++){
//         paragraphs2[i].style.color = "palevioletred";
//     }

//     document.getElementsByClassName("white")[0].style.color = "white";
// }

function submitInfo() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const firstName = document.getElementById('signup-first-name').value;
  const lastName = document.getElementById('signup-last-name').value;
  const location = document.getElementById('signup-location').value;
  const phone = document.getElementById('signup-phone').value;
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, location, phone, email, password })
  })
    .then(response => {
      if (response.status === 200) {
        alert("Successfully added! Please login!");
        //Redirect to login page
        hideDiv('signup', 'default');
        showDiv('default', 'login');

      } else {
        console.error('Error adding user:', response.statusText);
        alert("Error signing up");
      }
    })
    .catch(error => console.error('Error adding user:', error));
}

function logInfo() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
   .then(response => {
      if (response.status === 200) {
        alert("Successfully logged in!");
        // Redirect to the checker route, which will redirect to the correct profile page
        window.location.href = '/checker';
      } else {
        console.error('Error logging in:', response.statusText);
        alert("Error logging in");
      }
    })
   .catch(error => {
      console.error('Error logging in:', error);
      alert("Error logging in");
    });
}
//darkmode
function darkmode_on() {
  document.body.style.backgroundColor = "#8e3563";
  document.getElementsByClassName("header_div")[0].style.backgroundColor = "#572649";
  document.getElementsByTagName("h1")[0].style.color = "#e0bbd2";
  document.getElementsByClassName("fa-solid fa-paw")[0].style.color = "#e0bbd2";
  document.getElementsByClassName("border")[0].style.borderColor = "#402037";
  document.getElementsByClassName("footerMain")[0].style.backgroundColor = "#572649";
  document.getElementsByClassName("footerMain")[0].style.color = "#e0bbd2";

  let hovers = document.getElementsByClassName("header_item");
  for (let i = 0; i < hovers.length; i++) {
    hovers[i].classList.remove("light_hover");
    hovers[i].classList.add("dark_hover");
  }

  let h2s = document.getElementsByTagName("h2");
  for (let i = 0; i < h2s.length; i++) {
    h2s[i].style.color = "#e0bbd2";
  }

  let h3s = document.getElementsByTagName("h3");
  for (let i = 0; i < h3s.length; i++) {
    h3s[i].style.color = "#e0bbd2";
  }

  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.color = "#e0bbd2";
    buttons[i].style.borderColor = "#572649";
    buttons[i].style.backgroundColor = "#8e3563";
  }

  let items = document.getElementsByClassName("header_item");
  for (let i = 0; i < items.length; i++) {
    items[i].style.color = "#e0bbd2";
    items[i].style.borderColor = "#402037";
  }

  let paragraphs = document.getElementsByTagName("p");
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = "#e0bbd2";
  }

  document.cookie = "darkMode=true; path=/";
}

function darkmode_off() {
  document.body.style.backgroundColor = "white";
  document.getElementsByClassName("header_div")[0].style.backgroundColor = "lightpink";
  document.getElementsByClassName("title")[0].style.color = "palevioletred";
  document.getElementsByClassName("fa-solid fa-paw")[0].style.color = "palevioletred";
  document.getElementsByClassName("border")[0].style.borderColor = "palevioletred";
  document.getElementsByClassName("footerMain")[0].style.backgroundColor = "palevioletred";
  document.getElementsByClassName("footerMain")[0].style.color = "white";

  let hovers2 = document.getElementsByClassName("header_item");
  for (let i = 0; i < hovers2.length; i++) {
    hovers2[i].classList.remove("dark_hover");
    hovers2[i].classList.add("light_hover");
  }

  let h2s2 = document.getElementsByTagName("h2");
  for (let i = 0; i < h2s2.length; i++) {
    h2s2[i].style.color = "palevioletred";
  }

  let h3s2 = document.getElementsByTagName("h3");
  for (let i = 0; i < h3s2.length; i++) {
    h3s2[i].style.color = "palevioletred";
  }

  let items2 = document.getElementsByClassName("header_item");
  for (let i = 0; i < items2.length; i++) {
    items2[i].style.color = "palevioletred";
    items2[i].style.borderColor = "palevioletred";
  }

  let buttons2 = document.getElementsByTagName("button");
  for (let i = 0; i < buttons2.length; i++) {
    buttons2[i].style.color = "palevioletred";
    buttons2[i].style.borderColor = "palevioletred";
    buttons2[i].style.backgroundColor = "white";
  }

  let paragraphs2 = document.getElementsByTagName("p");
  for (let i = 0; i < paragraphs2.length; i++) {
    paragraphs2[i].style.color = "palevioletred";
  }

  document.cookie = "darkMode=false; path=/";
}

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function checkCookie() {
  let darkMode = getCookie("darkMode");
  if (darkMode == true) {
    darkmode_on();
  } else {
    darkmode_off();
  }
}

function applyDarkMode() {
  if (getCookie("darkMode") === "true") {
    darkmode_on();
  } else {
    darkmode_off();
  }
}

// Call applyDarkMode when the page loads
window.onload = checkCookie;

function poster() {
  const userID = 6;
  const postTitle = document.getElementById('title-post').value;
  const message = document.getElementById('content-post').value;
  const privatepub = document.getElementById('public-private').value;
  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userID, postTitle, message, privatepub })
  })
    .then(response => {
      if (response.status === 200) {
        alert("Successfully posted");
      } else {
        console.error('Error logging in:', response.statusText);
        alert("Error posting");
      }
    })
    .catch(error => {
      console.error('Error posting:', error);
      alert("Error posting");
    });
}

function eventer() {
  const eventName = document.getElementById('event-name').value;
  const description = document.getElementById('event-description').value;
  const location = document.getElementById('signup-location').value;
  const dateTime = document.getElementById('time-event').value;
  const rsvp = document.getElementById('rsvp-event').value;
  const eventType = 3; // Changed from eventTypeID

  fetch('/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eventName, description, location, dateTime, rsvp, eventType }) // Changed property names
  })
    .then(response => {
      if (response.status === 200) {
        alert("Successfully posted");
      } else {
        console.error('Error logging in:', response.statusText);
        alert("Error posting");
      }
    })
    .catch(error => {
      console.error('Error posting:', error);
      alert("Error posting");
    });
}


function addAdmin() {
  const userID = document.getElementById('new-user-id').value;
  const position = 1;
  if (!userID) {
    alert('UserID cannot be empty');
    return;
  }
  fetch('/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ position, userID })
  })
    .then(response => {
      if (response.status === 200) {
        alert("Successfully changed");
      } else {
        console.error('Error logging in:', response.statusText);
        alert("Error changing");
      }
    })
    .catch(error => {
      console.error('Error posting:', error);
      alert("Error changing");
    });
}

function getUsers() {
  fetch('/displayuser')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = '';
      data.rows.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.firstName}</td><td>${user.lastName}</td><td>${user.userID}</td>`;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function deleteUser() {
  const userID = document.getElementById('delete-user').value;
  if (!userID) {
    alert('UserID cannot be empty');
    return;
  }
  fetch('/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userID })
  })
    .then(response => {
      if (response.status === 200) {
        alert("Successfully deleted");
        getUsers();
      } else {
        console.error('Error deleting:', response.statusText);
        alert("Error deleting");
      }
    })
    .catch(error => {
      console.error('Error deleting:', error);
      alert("Error deleting");
    });
}

function getManage() {
  fetch('/displayman')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#managerTable tbody');
      tableBody.innerHTML = '';
      data.rows.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.firstName}</td><td>${user.lastName}</td><td>${user.userID}</td>`;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function getRSVP() {
  fetch('/rspvusers')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#rsvpTable tbody');
      tableBody.innerHTML = '';
      data.rows.forEach(rsvp => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${rsvp.rspvID}</td><td>${rsvp.eventName}</td><td>${rsvp.firstName}</td><td>${rsvp.lastName}</td>`;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function deleteRSVP() {
  const rspvID = document.getElementById('delete-rsvp').value;
  if (!rspvID) {
    alert('rspvID cannot be empty!');
    return;
  }
  fetch('/deleteRSVP', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rspvID })
  })
    .then(response => {
      if (response.status === 200) {
        alert("Successfully deleted");
        getRSVP();
      } else {
        console.error('Error deleting:', response.statusText);
        alert("Error deleting");
      }
    })
    .catch(error => {
      console.error('Error deleting:', error);
      alert("Error deleting");
    });
}


//user cookies
fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Login successful');
      fetchProfile();
    } else {
      alert('Invalid credentials');
    }
  });

function fetchProfile() {
  fetch('/profile')
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        document.getElementById('name').innerText = data.error;
      } else {
        document.getElementById('name').innerText = `Name: ${data.firstName}`;
      }
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
}

async function logout() {
    try {
        const response = await fetch('/logout', {
            method: 'GET',
            credentials: 'same-origin'
        });

        if (response.ok) {
            window.location.href = '/';
        } else {
            console.error('Failed to logout');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// document.addEventListener("DOMContentLoaded", async function() {
//     try {
//         const response = await fetch('/checker', {
//             method: 'GET',
//             credentials: 'same-origin'
//         });

//         const result = await response.json();

//         const authButton = document.getElementById("authButton");
//         console.log(result);

//         if (result.status === 401) {
//             authButton.textContent = "LOGIN";
//             authButton.onclick = function() {
//                 window.location.href = 'login.html';
//             };
//         } else {
//             authButton.textContent = "LOGOUT";
//             authButton.onclick = logout;
//             console.log("Hiding button");
//             authButton.style.display = 'none';
//         }
//     } catch (error) {
//         console.error('Error checking session:', error);
//     }
// });



window.onload = fetchProfile;