// set json's url
const url = 'http://www.mrsoft.by/data.json';

const substring = document.querySelector('#substring');
const lengthButton = document.querySelector('#length-btn');
const substrButton = document.querySelector('#substr-btn');
const caseSensativeWrap = document.querySelector('.case-checkbox');
const caseSensative = document.querySelector('#case');
const resultDiv = document.querySelector('.result');

lengthButton.disabled = true;
substrButton.disabled = true;
caseSensativeWrap.classList.add('hidden');

substring.addEventListener('input', () => {
  if (substring.value === '') {
    lengthButton.disabled = true;
    substrButton.disabled = true;
    caseSensativeWrap.classList.add('hidden');
    return;
  }

  const substr = Number(substring.value);

  if (substr !== substr) {
    lengthButton.disabled = true;
    substrButton.disabled = false;
    caseSensativeWrap.classList.remove('hidden');
  } else {
    lengthButton.disabled = false;
    substrButton.disabled = true;
    caseSensativeWrap.classList.add('hidden');
  }
});

document.addEventListener('click', (e) => {
  const target = e.target;

  if (target === lengthButton) {
    resultDiv.innerText = 'please wait, loading ...';
    requestData(url)
    .then((data) => {
      data = data.data;
      filterByLength(data, substring.value, resultDiv);
    })
    .catch((error) => { 
      resultDiv.style.color = 'red';
      resultDiv.innerText = error;
    });
  }

  if (target === substrButton) {
    resultDiv.innerText = 'please wait, loading ...';
    requestData(url)
      .then((data) => {
        data = data.data;
        substringFilter(data, substring.value, caseSensative.checked, resultDiv);
      })
      .catch((error) => { 
        resultDiv.style.color = 'red';
        resultDiv.innerText = error;
      });
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

function filterByLength(data, length, domElement) {
  data = data.filter((elem) => {
    if (elem.length > length) return true;
    return false;
  });

  if (data.length > 0) {
    domElement.innerText = `found ${data.length} records:`;
    const table = document.createElement('table');
    data.forEach(elem => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.innerText = elem;
      tr.appendChild(td);
      table.appendChild(tr);
    });

    domElement.appendChild(table);
  }
  else domElement.innerText = 'nothing found';
}

function substringFilter(data, substring, caseSensative, domElement) {
  if (caseSensative) {
    data = data.filter((elem) => {
      if (elem.indexOf(substring) !== -1) return true;
      return false;
    });
  } else {
    data = data.filter((elem) => {
      if (elem.toLowerCase().indexOf(substring.toLowerCase()) !== -1) return true;
      return false;
    });
  }

  if (data.length > 0) {
    domElement.innerText = `found ${data.length} records:`;
    const table = document.createElement('table');
    data.forEach(elem => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.innerText = elem;
      tr.appendChild(td);
      table.appendChild(tr);
    });

    domElement.appendChild(table);
  }
  else domElement.innerText = 'nothing found';
}
