const xhr = new XMLHttpRequest();
xhr.open('GET', '/userinfo', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    const responseHtml = xhr.responseText;
    document.getElementById('post-div').innerHTML = responseHtml;
  }
};

xhr.send();
