let dropdown = document.getElementById("dropdown")
let searchField = document.getElementById("searchField")
dropdown.addEventListener('change', (event) => {
   
  let selectedItem= dropdown.options[dropdown.selectedIndex].text;
  filterData(selectedItem)
})


const apiUrl = "https://script.google.com/macros/s/AKfycbzICtPX_Rj474ig7TG_qRQhsh_IcjzR23sM7nssh2d4k8fCP-J0kNlBDG10Ll9LbZYaWQ/exec"
let fetchedData = []
let filteredData = []
fetch(apiUrl).then((response) => {
  response.json().then((data) =>{
    if(data[0].data.length === 0) {
      alert("No data associated with the provided email")
    }
    else
    {
      fetchedData = data[0].data
      filteredData = fetchedData
      populateTable(fetchedData)
      document.body.classList.remove("loading-body")
      document.getElementsByClassName("table-container")[0].style.display = "block";
      
    }
    document.getElementsByClassName("spinner-box")[0].style.display = "none";

    document.getElementById('top-row').style.display = "flex"
    document.getElementById('header').style.display = "flex"
    
  })
})



function populateTable(resultArry) {
  let searchResultBox = document.getElementById("searchResults");
  searchResultBox.innerHTML = ''
  let templatetBox = document.getElementById("rowTemplate");
  let template = templatetBox.content;



  resultArry.forEach(function(r,i){

  let tr = template.cloneNode(true)

  let idCol = tr.querySelector(".sn")
  let subsCol = tr.querySelector(".subscriber")
  let occupationCol = tr.querySelector(".occupation")
  let incomeCol = tr.querySelector(".income")
  let upozilaCol = tr.querySelector(".upozila")
  let unionCol = tr.querySelector(".union")
  let addCol = tr.querySelector(".addrs")
  let nidCol = tr.querySelector(".nid")
  let phnCol = tr.querySelector(".phn")
  let imgCol = tr.querySelector(".img")
  

  idCol.textContent = r.sn;
  subsCol.textContent = r.subscriber
  occupationCol.textContent = r.occupation
  incomeCol.textContent = r.income
  upozilaCol.textContent = r.upozila
  unionCol.textContent = r.union
  addCol.textContent = r.addrs
  nidCol.textContent = r.nid
  phnCol.textContent = r.phn
  let img = document.createElement('img')
  img.src = r.img
  imgCol.appendChild(img) 
  searchResultBox.appendChild(tr);
   });
}



function filterData(e) {
  if(e === 'Reset' || e === 'Choose a Upozila')
  {
    populateTable(fetchedData)  
  }
  else {
    filteredData = fetchedData.filter( row => Object.values(row).includes(e))
    populateTable(filteredData)
  }
}

function search() {
  
  const searchBy = searchField.value
  console.log(searchBy)
  filteredData = fetchedData.filter( row => Object.values(row).join('').includes(searchBy))
    populateTable(filteredData)
}

let  timerId;
//let  searchBoxDom  =  document.getElementById('search-box');


// Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
let  debounceFunction  =  function (func, delay) {
	// Cancels the setTimeout method execution
	clearTimeout(timerId)

	// Executes the func after delay time.
	timerId  =  setTimeout(func, delay)
}

// Event listener on the input box
searchField.addEventListener('input', function () {


	// Debounces makeAPICall method
	debounceFunction(search, 500)
})