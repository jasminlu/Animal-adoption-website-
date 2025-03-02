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

function showDiv(a,b) {
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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
});

function fetchProfile() {
    fetch('/profile')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('name').innerText = data.error;
                document.getElementById('username').innerText = '';
            } else {
                document.getElementById('name').innerText = `Name: ${data.name}`;
                document.getElementById('username').innerText = `Username: ${data.username}`;
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

app.get('/session-check', (req, res) => {
    if (!req.session.userID) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });

  document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/checker', {
            method: 'GET',
            credentials: 'same-origin'
        });

        const result = await response.json();
        const authButton = document.getElementById("authButton");

        if (response.status === 401) {
            authButton.textContent = "LOGIN";
            authButton.onclick = function() {
                window.location.href = 'login.html';
            };
        } else {
            authButton.textContent = "LOGOUT";
            authButton.onclick = logout;
        }
    } catch (error) {
        console.error('Error checking session:', error);
    }
});

window.onload = fetchProfile;