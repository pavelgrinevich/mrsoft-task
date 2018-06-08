const categoriesArray = document.querySelectorAll('.category');
const delCategoriesBtn = document.querySelector('#del-categories');

const productsInputArray = document.querySelectorAll('.checkbox input');
const delProductsBtn = document.querySelector('#del-products');
const productList = document.querySelector('.products .list');
const empty = document.querySelector('#empty');

delCategoriesBtn.disabled = true;
delProductsBtn.disabled = true;

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('category')) {
    target.classList.toggle('selected');

    const selectedCategories = getSelectedCategories(categoriesArray);

    if (selectedCategories) {
      ajaxRequest('/productlist', JSON.stringify(selectedCategories))
      .then((data) => {
        drawProducts(null, data, productList, empty);
      })
      .catch((error) => { 
        drawProducts(error);
      });

      if (selectedCategories.length === 1 && !selectedCategories[0]) {
        delCategoriesBtn.disabled = true;
      } else delCategoriesBtn.disabled = false;
    } else {
      empty.style.display = 'block';
      productList.innerText = '';
      delCategoriesBtn.disabled = true;
    }
  }

  if (getSelectedProducts(productsInputArray)) {
    delProductsBtn.disabled = false;
  } else {
    delProductsBtn.disabled = true;
  }
});

function getSelectedCategories(categoriesArray) {
  let selectedCategories = [].filter.call(categoriesArray, (el => {
    if (el.classList.contains('selected')) return true;
  }));

  if (selectedCategories.length === 0) {
    selectedCategories = null;
  } else {
    selectedCategories = selectedCategories.map((el) => {
      return el.id === 'unassigned' ? null : el.id;
    });
  }
  
  return selectedCategories;
}

function getSelectedProducts(productsInputArray) {
  let selectedProducts = [].filter.call(productsInputArray, (el => {
    if (el.checked) return true;
  }));

  if (selectedProducts.length === 0) {
    selectedProducts = null;
  }

  return selectedProducts;
}

function ajaxRequest(url, data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: data,
  };
  
  return fetch(url, options)
    .then((result) => {
      if (result.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${result.status}`);  
        return;
      }
      return result.json();
    })
}

function drawProducts(err, productArray, productList, empty) {
  if (err) throw err;

  if (productArray.length === 0) {
    empty.style.display = 'block';
    productList.innerText = '';
  } else {
    empty.style.display = 'none';
    let html = '';

    for (let i = 0; i < productArray.length; i++) {
      if (!productArray[i].Description) productArray[i].Description = '';
      html += `
        <table>
          <tr>
            <td rowspan="5" class="checkbox">
              <input type="checkbox" id=${productArray[i].Id}>
            </td>
            <th>Name:</th>
            <td>${productArray[i].Name}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>${productArray[i].Price}</td>
          </tr>
          <tr>
            <th>Count:</th>
            <td>${productArray[i].Count}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>
              ${productArray[i].Description}
            </td>
          </tr>
          <tr>
            <th></th>
            <td class="control">
              <button id="del-product" class="del">Delete</button>
              <button id="edit-product" class="edit-product">Edit</button>
            </td>
          </tr>
        </table>
      `;
    }

    productList.innerHTML = html;
  }
}
