getProducts((data) => {
  data.forEach((product) => {
    const result = document.createRange().createContextualFragment(`
    <div class="col">
    <div class="card card-height h-100">
    <div class="img-container h-100">
    <img src="${product.url_image}" class="card-img "  alt=".." onerror="this.src='https://freepikpsd.com/file/2019/10/image-not-found-png-4-Transparent-Images.png'">
    </div>
    

      <div class="card-body">
        <h6 class="card-title">${product.name}</h6>
        <span class="card-text h5 text-warning"> $ ${product.price}</span>
      </div>
    </div>
  </div>        
    `);

    const cardList = document.getElementById("cardList");
    cardList.append(result);
  });
});
