const cardList = document.getElementById("cardList");
const dropDownMenu = document.getElementById("dropdownMenu");

let products = [];
let categories = [];
const button = document
  .querySelector("button[type=submit]")
  .addEventListener("click", () => onClickButton());

const getProducts = async () => {
  try {
    const res = await fetch("https://desafio-bsale-api-heroku.herokuapp.com/");
    products = await res.json();
    makingProducts(products);
  } catch (err) {
    console.log(err);
  }
};

const onClickButton = async () => {
  const inputValue = document.querySelector("input").value;

  const options = {
    method: "POST",
    body: new URLSearchParams({ name: inputValue }),
  };

  try {
    const res = await fetch(
      "https://desafio-bsale-api-heroku.herokuapp.com/product",
      options
    );
    products = await res.json();
    makingProducts(products);
  } catch (err) {
    console.log(err);
  }
};

const getCategories = async () => {
  try {
    const res = await fetch(
      "https://desafio-bsale-api-heroku.herokuapp.com/categories"
    );
    categories = await res.json();
    makingCategories(categories);
  } catch (err) {
    console.log(err);
  }
};

const makingProducts = (products) => {
  const html = products
    .map((product) => {
      return `
    <div class="col">
    <div class="card card-height h-100">
    <div class="img-container h-100">
    <img src="${product.url_image}" class="card-img "  alt="no img" >
    </div>
      <div class="card-body">
        <span class="card-title h6 ">${product.name}</span>
        <span class="card-text h5 text-warning"> $${product.price}</span>
      </div>
    </div>
  </div>        
    `;
    })
    .join(" ");
  cardList.innerHTML = html;
};

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

const onChangeDropDown = async () => {
  if (dropDownMenu.value) {
    const inputValue = dropDownMenu.value;
    const options = {
      method: "POST",
      body: new URLSearchParams({ name: inputValue }),
    };

    try {
      const res = await fetch(
        "https://desafio-bsale-api-heroku.herokuapp.com/product",
        options
      );
      products = await res.json();
      makingProducts(products);
    } catch (err) {
      console.log(err);
    }
  }
};
dropDownMenu.onchange = onChangeDropDown;
onChangeDropDown();

getProducts();
getCategories();
