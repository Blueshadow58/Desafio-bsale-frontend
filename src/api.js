const cardList = document.getElementById("cardList");
const dropDownMenu = document.getElementById("dropdownMenu");
const pageSpan = document.getElementById("pageSpan");
// def products & categories as an array and the page with the starter value
//def value for current category
let products = [];
let categories = [];
let page = 1;
let currentCategory = "";

pageSpan.textContent = `Página ${page}`;
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
const nextBtn = document.getElementById("nextPage");
nextBtn.addEventListener("click", () => nextPage());
// substract function previous page
const previousBtn = document.getElementById("previousPage");
previousBtn.addEventListener("click", () => previousPage());
//disable previous page at the start
document.getElementById("previousPage").disabled = true;

//put current category in the current category button
const btnCurrentCategory = document.getElementById("btnCurrentCategory");
// dont dysplay the button at the start
btnCurrentCategory.style.display = "none";
btnCurrentCategory.addEventListener("click", () => cleanFilter());

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
    console.error(err);
  }
};

// filter products by name by the text in the input
const onClickButton = async () => {
  // text from input
  const inputValue = document.querySelector("input").value;

  // if the input has data then make a filter with that
  if (inputValue !== "") {
    //set onfilter states -> hiden paginated btn and show filter btn
    onFilter(inputValue);
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
      // clean input after filter
      document.querySelector("input").value = null;
    } catch (err) {
      console.error(err);
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
    console.error(err);
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
    <img src="${
      product.url_image || ""
    }"  class="card-img" onerror="this.onerror=null;this.src='https://stores.lifestylestores.com/VendorpageTheme/Enterprise/EThemeForLifestyleUpdated/images/product-not-found.jpg';"  alt="no img" >
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
  const optionDefault = `<option class="dropdown-item text-capitalize" selected disabled>Categoria</option> `;
  dropDownMenu.innerHTML = optionDefault + html;
};

// detect value selected in the dropdown categories
const onChangeDropDown = async () => {
  if (dropDownMenu.value) {
    try {
      // get the dropdown value
      const idCategory = dropDownMenu.value;
      //get name of the selected category
      currentCategory = categories.find((cat) => cat.id == idCategory).name;
      //set onfilter states -> hiden paginated btn and show filter btn
      onFilter(currentCategory);

      const options = {
        method: "POST",
        body: new URLSearchParams({ id: idCategory }),
      };
      const res = await fetch(
        "https://desafio-bsale-api-heroku.herokuapp.com/api/products/category",
        options
      );
      products = await res.json();
      // create the cards
      makingProducts(products);
    } catch (error) {
      console.error(error);
    }
  }
};

//clean current filter by cateogry
const cleanFilter = () => {
  getProducts();
  //reset states of navigation btn and page span
  currentCategory = "";
  btnCurrentCategory.style.display = "none";
  nextBtn.style.display = "inline";
  previousBtn.style.display = "inline";
  pageSpan.style.display = "inline";
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
  pageSpan.textContent = `Página ${page}`;
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
  pageSpan.textContent = `Página ${page}`;
  // products.next.page;
  getProducts();
};

async function onFilter(filterData) {
  //put drop content-text into btn current category
  btnCurrentCategory.textContent = `Borrar filtro:  ${filterData}`;
  //visible current category button
  btnCurrentCategory.style.display = "block";
  // non display page span
  pageSpan.style.display = "none";
  //non display the paginated button
  nextBtn.style.display = "none";
  previousBtn.style.display = "none";
}

dropDownMenu.onchange = onChangeDropDown;

// get functions
getCategories();
getProducts();
onChangeDropDown();
