const getProducts = (done) => {
  fetch("https://desafio-bsale-backend-heroku.herokuapp.com/")
    .then((res) => res.json())
    .then((data) => done(data))
    .catch((err) => console.log(err));
};
