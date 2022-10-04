// navbar with dropdown categories
// input that filter by name that execute itself by pressing the 'Enter' key
// and a button as a complemenet to execute the filter

document.getElementById("customNav").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5 p-3 rounded-bottom >
  <div class="container-fluid">
    <a class="navbar-brand" >
      Desafio Bsale FrontEnd
    </a>
    <button
      class="navbar-toggler "
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
      <div class="d-flex" role="search">
        <input
          class="form-control me-3 ms-3"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          
        />
        
        <button class="btn btn-outline-light" type="submit">
          Buscar
        </button>
        </div>
    </div>
  </div>
</nav>
`;
