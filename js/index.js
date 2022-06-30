function filter(searchMakeValue, filterWirelessCarPlay, filterCarKey) {
  let makeElements = document.getElementsByClassName('make')
  for(var i = 0; i < makeElements.length; i++) {
    var make = makeElements[i];
    var display = true
    if (searchMakeValue.length > 0 && make.dataset.name.toLowerCase().indexOf(searchMakeValue) < 0) {
      display = false
    }
    if (filterWirelessCarPlay && !make.classList.contains('wireless-carplay')) {
      display = false
    }
    if (filterCarKey && !make.classList.contains('carkey')) {
      display = false
    }
    make.style.display = display ? 'block' : 'none';
  }


  let modelElements = document.getElementsByClassName('model')
  for (var i = 0; i < modelElements.length; i++) {
    var model = modelElements[i];
    var display = true
    if (filterWirelessCarPlay && !model.classList.contains('wireless-carplay')) {
      display = false
    }
    if (filterCarKey && !model.classList.contains('carkey')) {
      display = false
    }
  }
}

async function setupFiltering() {
    let searchMakeInput = document.getElementById('searchMake');
    let carKeyInput = document.getElementById('carKey');
    let wirelessCarPlayInput = document.getElementById('wirelessCarPlay');

    searchMakeInput.addEventListener("input", function (e) {
      filter(searchMakeInput.value, wirelessCarPlayInput.checked, carKeyInput.checked)
    })
    carKeyInput.addEventListener("input", function(e) {
      filter(searchMakeInput.value, wirelessCarPlayInput.checked, carKeyInput.checked)
    })
    wirelessCarPlayInput.addEventListener("input", function(e) {
      filter(searchMakeInput.value, wirelessCarPlayInput.checked, carKeyInput.checked)
    })
}

setupFiltering();