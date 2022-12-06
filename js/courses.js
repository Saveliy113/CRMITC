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
      <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.date_start}</td>
        <td>${item.finish_date}</td>
        <td>${item.price}</td>
      </tr>
      `
   });
  });

// fetch('/login_ajax.php', {
//   method: 'POST',
//   body: params
// }).then(
//   response => {
//      return response.text();
//   }
// ).then(
//   text => {
//      document.getElementById('result').innerHTML = text;
//   }
// );


  function addCourseOpen() {
    addCourseForm.classList.remove('visually-hidden');
  }

  function addCourseClose() {
    addCourseForm.classList.add('visually-hidden');
  }

  function getValue() {
    console.log(enent.target.value);
  }


  