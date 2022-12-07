const table = document.querySelector('.table__body');
// const addButton = document.querySelector('.add-button');
const addCourseForm = document.querySelector('.form-container')

const token = '27c71e5ad1261aa245f3481d9e57f50dc99e13a4';

const headers = {
  "Content-type": "application/json",
  "Authorization": `Token ${token}`
}

fetch('http://165.22.49.123:5000/api/v1/mainapp/course/', {
  headers: headers
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    data.map(item => {
      table.innerHTML += 
      `
      <tr class="table__row">
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.date_start}</td>
        <td>${item.finish_date}</td>
        <td>${item.price}</td>
      </tr>
      `
   });
  });

const params = {};  

function saveNewCourse() {  
  fetch('http://165.22.49.123:5000/api/v1/mainapp/course/', {
    headers: headers,
    method: "POST",
    body: JSON.stringify(params)
  })
  .then(response => response.json())
  .then(json => console.log(json));
}


function addCourseOpen() {
  addCourseForm.classList.remove('visually-hidden');
}

function addCourseClose() {
  addCourseForm.classList.add('visually-hidden');
  for (var key in params) {
    delete params[key];
  }
}

function getValue(name, value) {
  params[name] = value;
}

  