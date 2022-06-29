function matches(car, searchText, filterCarKeyOnly) {
  var token = searchText.toLowerCase()
  var wasEmpty = token.length === 0
  var makeMatched = false
  var modelMatched = false
  var yearMatched = false

  if (token.indexOf(car.make.toLowerCase()) >= 0) {
    makeMatched = true
    token = token.replace(car.make.toLowerCase(), '')
  }
  if (token.indexOf(car.model.toLowerCase()) >= 0) {
    modelMatched = true
    token = token.replace(car.model.toLowerCase(), '') 
  }
  if (token.indexOf(car.year.toString()) >= 0) {
    yearMatched = true
    token = token.replace(car.year.toString(), '')
  }

  token = token.trim()

  if (wasEmpty || makeMatched || modelMatched || yearMatched) {
    return token.length === 0 && (!filterCarKeyOnly || car.has_carkey)
  } else {
    return false
  }
}

function createCarElement(car) {
  var e = document.createElement('div')
  e.innerHTML = '<p class="font-weight-bold">' + car.make + ' ' + car.model + ' - ' + car.year + '</p>'
  e.innerHTML += '<p>CarPlay: ' + (car.has_carplay ? 'Yes' : 'No') + '</p>'
  e.innerHTML += '<p>CarKey: ' + (car.has_carkey ? 'Yes' : 'No') + '</p>'
  return e
}

function updateSearch(val, filterCarKeyOnly, container, arr) {
  var i;

  /*close any already open lists of autocompleted values*/
  container.innerHTML = ''
  
  /*for each item in the array...*/
  for (i = 0; i < arr.length; i++) {
    var car = arr[i]
    /*check if the item starts with the same letters as the text field value:*/

    if (matches(car, val, filterCarKeyOnly)) {
      var carElement = createCarElement(car)
      container.appendChild(carElement);
    }
  }
}

function updateUrl(val, filterCarKeyOnly) {
  var url = new URL(window.location)
  url.searchParams.set('search', val)
  url.searchParams.set('carKey', filterCarKeyOnly ? '1' : '0')
  window.history.pushState({}, '', url.toString())
}

async function autocomplete(inp, carKeyInp, container, arr) {
  inp.addEventListener("input", function(e) {
    updateSearch(inp.value, carKeyInp.checked, container, arr)
    updateUrl(inp.value, carKeyInp.checked)
  });

  carKeyInp.addEventListener("input", function(e) {
    updateSearch(inp.value, carKeyInp.checked, container, arr)
    updateUrl(inp.value, carKeyInp.checked)
  })

  var url = new URL(window.location)
  var urlSearchValue = url.searchParams.get('search')
  if (urlSearchValue) {
    inp.value = urlSearchValue
  }

  var urlCarKeyFilterValue = url.searchParams.get('carKey') == '1'
  if (urlCarKeyFilterValue) {
    carKeyInp.checked = true
  }

  updateSearch(inp.value, carKeyInp.checked, container, arr)
}

async function loadCars() {
    let url = '/static/cars.json';
    let carsPayload = await (await fetch(url)).json();
    window.cars = carsPayload.cars;
}

async function setupAutocomplete() {
    await loadCars();
    let searchInput = document.getElementById('search')
    let carKeyInput = document.getElementById('carKey')
    let matchesContainer = document.getElementById('matches');
    autocomplete(searchInput, carKeyInput, matchesContainer, window.cars);
}

setupAutocomplete();

