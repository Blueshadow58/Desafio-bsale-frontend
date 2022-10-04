const cardList = document.getElementById("cardList");
const dropDownMenu = document.getElementById("dropdownMenu");

// def products & categories as an array and the page with the starter value
let products = [];
let categories = [];
let page = 1;

// adding on press function to the "buscar" button
const button = document
  .querySelector("button[type=submit]")
  .addEventListener("click", () => onClickButton());

//adding on press "Enter" to input
document.querySelector("input").addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    onClickButton();
  }
});

//adding function next page
document.getElementById("nextPage").addEventListener("click", () => nextPage());
// substract function previous page
document
  .getElementById("previousPage")
  .addEventListener("click", () => previousPage());
document.getElementById("previousPage").disabled = true;

// Get products from api
const getProducts = async () => {
  const options = { method: "GET", mode: "cors" };

  try {
    // get products from the api
    const res = await fetch(
      `https://desafio-bsale-api-heroku.herokuapp.com/api/products?page=${page}&limit=10`,
      options
    );
    data = await res.json();
    // response data to products array
    products = data;
    // create the cards with the porducts data
    makingProducts(data.results);
  } catch (err) {
    console.log(err);
  }
};

// filter products by name by the text in the input
const onClickButton = async () => {
  // text from input
  const inputValue = document.querySelector("input").value;

  if (inputValue === "") {
    // if input value is empty dont make filters
    getProducts();
  } else {
    // if the input isn't empty make a like query with the input data
    const options = {
      method: "POST",
      body: new URLSearchParams({ name: inputValue }),
    };
    try {
      const res = await fetch(
        "https://desafio-bsale-api-heroku.herokuapp.com/api/products",
        options
      );
      products = await res.json();
      // create cards with the filtered products
      makingProducts(products);
    } catch (err) {
      console.log(err);
    }
  }
};

// Get all categoies
const getCategories = async () => {
  try {
    const options = {
      method: "GET",
      mode: "cors",
    };
    const res = await fetch(
      "https://desafio-bsale-api-heroku.herokuapp.com/api/categories",
      options
    );
    categories = await res.json();
    // add the categories to the dropdown in the navbar
    makingCategories(categories);
  } catch (err) {
    console.log(err);
  }
};

// create a card structure with the products data
const makingProducts = (products) => {
  const html = products
    .map((product) => {
      return `
    <div class="col">
    <div class="card card-height h-100">
    <div class="img-container h-100">
    <img src="${product.url_image}"  class="card-img" onerror="this.onerror=null;this.src='https://stores.lifestylestores.com/VendorpageTheme/Enterprise/EThemeForLifestyleUpdated/images/product-not-found.jpg';"  alt="no img" >
    </div>
      <div class="card-body">
      <div>
        <span class="card-title h6 ">${product.name}</span>
        </div>
        <div>
        <span class="card-text h5 text-warning"> $${product.price}</span>
        </div>
      </div>
    </div>
  </div>        
    `;
    })
    .join("");

  if (products.length === 0) {
    // show a span with 'no existen registro' if there isn't values
    const noData = `<span >No existen registros: "${
      document.querySelector("input").value
    }"</span>`;
    cardList.innerHTML = noData;
  } else {
    // put the cards into a cardsList
    cardList.innerHTML = html;
  }
};

// create the drop down opctions with the diferent categories
const makingCategories = (categories) => {
  const html = categories
    .map((category) => {
      return `<option class='dropdown-item text-capitalize' value='${category.id}' >
        ${category.name}
      </option>`;
    })
    .join(" ");
  dropDownMenu.innerHTML = html;
};

// detect value selected in the dropdown categories
const onChangeDropDown = async () => {
  if (dropDownMenu.value) {
    // get the dropdown value
    const inputValue = dropDownMenu.value;
    const options = {
      method: "POST",
      body: new URLSearchParams({ name: inputValue }),
    };
    try {
      const res = await fetch(
        "https://desafio-bsale-api-heroku.herokuapp.com/api/products",
        options
      );
      products = await res.json();
      // create the cards
      makingProducts(products);
    } catch (err) {
      console.log(err);
    }
  }
};

// on click next page button add +1 to page and get the new products
const nextPage = () => {
  page++;
  if (!products.next) {
    // if there is not next page in the products array disable the next button
    document.getElementById("nextPage").disabled = true;
  }
  // enable  previous page button
  document.getElementById("previousPage").disabled = false;
  getProducts();
};

const previousPage = () => {
  if (page === 2) {
    page--;
    // if the page is the first one then disable the previous button
    document.getElementById("previousPage").disabled = true;
  } else {
    page--;
    // enable the nextpage button
    document.getElementById("nextPage").disabled = false;
  }

  // products.next.page;
  getProducts();
};

dropDownMenu.onchange = onChangeDropDown;
// get fucntions
onChangeDropDown();
getProducts();
getCategories();
