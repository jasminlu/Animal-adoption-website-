const ANIMALS = [
    { id: 1, name: 'Sunny', age: '12 months', breed: 'Golden retriever', gender: 'Male', personality: 'Silly', home: 'False', url:'/cute_dog.jpeg' },
    { id: 2, name: 'Cotton', age: '7 months', breed: 'Rabbit', gender: 'Female', personality: 'Jumpy', home: 'True', url:'/bunny.jpeg' },
    { id: 3, name: 'Mango', age: '2 years', breed: 'Shorthair', gender: 'Female', personality: 'Playful', home: 'False', url:'/cat.jpeg' },
    { id: 4, name: 'Snowy', age: '16 months', breed: 'Terrier', gender: 'Male', personality: 'Smart', home: 'True', url:'/dog.jpeg' },
  ];

var vueinst = new Vue({
  el: '#vue',
  data: {
      animal: ANIMALS[0]
  }
})

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
}

function darkmode_on() {
  document.body.style.backgroundColor = "#8e3563";
  document.getElementsByClassName("header_div")[0].style.backgroundColor = "#572649";
  document.getElementsByTagName("h1")[0].style.color = "#e0bbd2";
  document.getElementsByClassName("fa-solid fa-paw")[0].style.color = "#e0bbd2";
  document.getElementsByClassName("border")[0].style.borderColor = "#402037";
  document.getElementsByClassName("footerMain")[0].style.backgroundColor = "#572649";
  document.getElementsByClassName("footerMain")[0].style.color = "#e0bbd2";

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
  for (var i = 0; i < paragraphs.length; i++){
      paragraphs[i].style.color = "#e0bbd2";
  }
}

function darkmode_off() {
  document.body.style.backgroundColor = "white";
  document.getElementsByClassName("header_div")[0].style.backgroundColor = "lightpink";
  document.getElementsByClassName("title")[0].style.color = "palevioletred";
  document.getElementsByClassName("fa-solid fa-paw")[0].style.color = "palevioletred";
  document.getElementsByClassName("border")[0].style.borderColor = "palevioletred";
  document.getElementsByClassName("footerMain")[0].style.backgroundColor = "palevioletred";
  document.getElementsByClassName("footerMain")[0].style.color = "white";

  let h2s = document.getElementsByTagName("h2");
  for (let i = 0; i < h2s.length; i++) {
      h2s[i].style.color = "palevioletred";
  }
  let h3s = document.getElementsByTagName("h3");
  for (let i = 0; i < h3s.length; i++) {
      h3s[i].style.color = "palevioletred";
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
  for (var i = 0; i < paragraphs2.length; i++){
      paragraphs2[i].style.color = "palevioletred";
  }
}