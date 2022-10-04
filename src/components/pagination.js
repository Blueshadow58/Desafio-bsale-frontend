// pagination buttons previous and next
document.getElementById("pagination").innerHTML = `
<div class="row justify-content-between mb-3"> 
  <div class="col-md-auto">
    <button type="button" id="btnCurrentCategory" class="btn btn-danger"></button>
  </div>  

  <div class="col-md-auto d-inline gap-3">
    <button type="button" id="previousPage" class="btn btn-dark">Anterior</button>
    <button type="button" id="nextPage" class="btn btn-dark mx-2 me-4">Siguente</button>
    <span class="align-middle" id='pageSpan' ></span>
  </div>  
</div>
`;
