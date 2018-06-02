const url = 'http://www.mrsoft.by/data.json';

const substring = document.querySelector('#substring');
const lengthButton = document.querySelector('#length-btn');
const substrButton = document.querySelector('#substr-btn');
const caseSensative = document.querySelector('#case');
const resultDiv = document.querySelector('.result');

lengthButton.disabled = true;
substrButton.disabled = true;;

substring.addEventListener('input', () => {
  if (substring.value === '') {
    lengthButton.disabled = true;
    substrButton.disabled = true;
    return;
  }

  const substr = Number(substring.value);

  if (substr !== substr) {
    lengthButton.disabled = true;
    substrButton.disabled = false;
  } else {
    lengthButton.disabled = false;
    substrButton.disabled = true;
  }
});

function requestData(url) {
  const options = {
    method: 'POST',
    headers: {
      "Content-type": "text/plain"  
    },
    body: url,
  };
  
  return fetch('/get', options)
    .then((result) => {
      if (result.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${result.status}`);  
        return;
      }
      return result.json();
    })
}

document.addEventListener('click', (e) => {
  const target = e.target;

  if (target === lengthButton) {
    resultDiv.innerText = 'please wait, loading ...';
  }

  if ( target === substrButton) {
    resultDiv.innerText = 'please wait, loading ...';
    requestData(url)
      .then((data) => {
        data = data.data;
        console.log(data);
      })
      .catch((error) => { 
        resultDiv.style.color = 'red';
        resultDiv.innerText = error;
      });
  }

  /*resultDiv.innerText = 'nothing found';
  resultDiv.innerText = `found ${10} records`;*/
});
