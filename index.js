const quantPersonagens = document.querySelector('#personagens');
const quantLuas = document.querySelector('#luas');
const quantPlanetas = document.querySelector('#planetas');
const quantNaves = document.querySelector('#naves');

preencherQuantidade();

function preencherQuantidade() {
  Promise.all([swapiGet('people/'), swapiGet('vehicles/ '), swapiGet('planets/ '), swapiGet('starships/ ')]).then(
    function (results) {
      quantPersonagens.innerHTML = results[0].data.count;
      quantLuas.innerHTML = results[1].data.count;
      quantPlanetas.innerHTML = results[2].data.count;
      quantNaves.innerHTML = results[3].data.count;
    },
  );
}

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}
