const categoriesArray = document.querySelectorAll('.category');
const delCategoriesBtn = document.querySelector('#del-categories');

const productsInputArray = document.querySelectorAll('.checkbox input');
const delProductsBtn = document.querySelector('#del-products');

delCategoriesBtn.disabled = true;
delProductsBtn.disabled = true;

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('category')) {
    target.classList.toggle('selected');
  }

  if (getSelectedCategories(categoriesArray)) {
    delCategoriesBtn.disabled = false;
  } else {
    delCategoriesBtn.disabled = true;
  }

  if (getSelectedProducts(productsInputArray)) {
    delProductsBtn.disabled = false;
  } else {
    delProductsBtn.disabled = true;
  }
});

function getSelectedCategories(categoriesArray) {
  let selectedCategories = [].filter.call(categoriesArray, (el => {
    if (el.classList.contains('selected') && el.id !== 'unassigned') return true;
  }));

  if (selectedCategories.length === 0) {
    selectedCategories = null;
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
