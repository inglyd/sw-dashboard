const quantPersonagens = document.querySelector('#personagens');
const quantLuas = document.querySelector('#luas');
const quantPlanetas = document.querySelector('#planetas');
const quantNaves = document.querySelector('#naves');

preencherQuantidade();
preencherTabela();

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await swapiGet('vehicles/ ');
  const vehiclesArray = response.data.results
  console.log(vehiclesArray)

  const dataArray = [];
  dataArray.push(['Veículos', 'Passageiros']);
  vehiclesArray.forEach(vehicle => {
  dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  })

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: 'Maiores veículos',
    legend: 'none'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}


function preencherQuantidade() {
  Promise.all([
    swapiGet('people/'),
    swapiGet('vehicles/ '),
    swapiGet('planets/ '),
    swapiGet('starships/ '),
  ]).then(function (results) {
    quantPersonagens.innerHTML = results[0].data.count;
    quantLuas.innerHTML = results[1].data.count;
    quantPlanetas.innerHTML = results[2].data.count;
    quantNaves.innerHTML = results[3].data.count;
  });
}

async function preencherTabela() {
  const response = await swapiGet('films/');
  const tableData = response.data.results
  tableData.forEach( film => {
$("#films-table").append(`<tr>
<td>${film.title}</td>
<td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
<td>${film.director}</td>
<td>${film.episode_id}</td>
</tr>`)
  })
}

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}
