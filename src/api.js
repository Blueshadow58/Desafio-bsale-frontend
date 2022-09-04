const cardList = document.getElementById("cardList");
let products = [];

const getProducts = async () => {
  try {
    //const res = await fetch("https://api.publicapis.org/entries");
    const res = await fetch("https://pacific-reaches-62974.herokuapp.com/");

    products = await res.json();
    makingProducts(products);
    console.log(products);
  } catch (err) {
    console.error(err);
  }
};

const makingProducts = (products) => {
  const html = products
    ?.map((product) => {
      return `
    <div class="col">
    <div class="card card-height h-100">
    <div class="img-container h-100">
    <img src="${product.url_image}" class="card-img "  alt="no img" >
    </div>

      <div class="card-body">
        <h6 class="card-title">${product.name}</h6>
        <span class="card-text h5 text-warning"> $ ${product.price}</span>
      </div>
    </div>
  </div>        
    `;
    })
    .join(" ");

  cardList.innerHTML = html;
};

getProducts();
