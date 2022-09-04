document.getElementById("customNav").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" >
      Desafio Bsale FrontEnd
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul
        class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
        style="--bs-scroll-height: 100px"
      >
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            
            id="navbarScrollingDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categoria
          </a>
          <select class="dropdown-menu" id='dropdownMenu'  aria-labelledby="navbarScrollingDropdown">
          </select>
        </li>
      </ul>
      
        <input
          class="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          Buscar
        </button>
      
    </div>
  </div>
</nav>;
`;
