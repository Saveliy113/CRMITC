let params = new URL(document.location).searchParams;
const studentId = params.get('id');
const token = '465f9a675caab0cca0c3752fd3a8912a8c4f5640';
let studentData;
let recrouterData;
let courseData;
const studentContent = document.querySelector('.studentInfo__content');
console.log(studentId);

//-------------GETTING STUDENT DATA FROM TABLE---------------//
const getStudentData = async () => {
  const studentResponse = await sendGetRequest(
    'GET',
    `http://165.22.49.123:5000/api/v1/students/students/${studentId}/`,
    token
  );
  studentData = studentResponse;
  const recrouterResponse = await sendGetRequest(
    'GET',
    'http://165.22.49.123:5000/api/users/users',
    token
  );
  recrouterData = recrouterResponse;
  const courseResponse = await sendGetRequest(
    'GET',
    'http://165.22.49.123:5000/api/v1/mainapp/course/',
    token
  );
  courseData = courseResponse;
};

//-------------SETTING STUDENTS DATA TO TABLE---------------//
const setStudentData = (async () => {
  await getStudentData();
  studentContentRender();
  console.log(studentData);
  console.log(courseData);
  console.log(recrouterData);
})();

//-------------STUDENT CONTENT RENDERING-------------------//
function studentContentRender() {
  studentContent.innerHTML = `
    <div class="studentInfo__item">
        <h2>Студент: </h2>
        <p id="student__name">${studentData.full_name}</p>
    </div>
    <div class="studentInfo__item course">
        <h2>Группа: </h2>
    </div>
    <div class="studentInfo__item">
        <h2>Телефон: </h2>
        <p id="student__phone">${studentData.phone}</p>
    </div>
    <div class="studentInfo__item">
        <h2>WhatsApp: </h2>
        <a id="student__whatsapp" href="${studentData.whatsapp}">Написать</a>
    </div>
    <div class="studentInfo__item">
        <h2>Telegram: </h2>
        <a id="student__telegram" href="${studentData.telegram}">Написать</a>
    </div>
    <div class="studentInfo__item">
        <h2>Email: </h2>
        <p id="student__email">${studentData.email}</p>
    </div>
    <div class="studentInfo__item">
        <h2>Скидка: </h2>
        <p id="discount">${studentData.discount}</p> 
    </div>
    <div class="studentInfo__item">
        <h2>Месяц начала: </h2>
        <p id="start__mount">${studentData.start_mount}</p>
    </div>
    <div class="studentInfo__item">
        <h2>Оплата: </h2>
        <p id="payment">${studentData.payment}</p>&nbsp ₸
    </div>
    <div class="studentInfo__item">
        <h2>Полная сумма: </h2>
        <p id="full__payment">${studentData.full_payment} </p>&nbsp ₸
    </div>
    <div class="studentInfo__item">
        <h2>Остаток за текущий месяц: </h2>
        <p id="current__remainder">${
          studentData.remainder_for_current_mount
        } </p>&nbsp ₸
    </div>
    <div class="studentInfo__item">
        <h2>Осталось всего: </h2>
        <p id="remainder">${studentData.remainder} </p>&nbsp ₸
    </div>
    <div class="studentInfo__item">
        <h2>Учится: </h2>
        <p id="studies">${studentData.studies ? '✔️' : '❌'}</p>
    </div>
    <div class="studentInfo__item recrouter">
        <h2>Рекрутер: </h2>
    </div>
    <div class="studentInfo__item">
        <h2>Договор: </h2>
        <p id="contract">${studentData.contract ? '✔️' : '❌'}</p>
    </div>
    <div class="studentInfo__item">
        <h2>Дата записи: </h2>
        <p id="date">${new Date(studentData.create_at).toLocaleDateString()}</p>
    </div>
    <div class="studentInfo__item">
        <h2>Комментарий: </h2>
        <p id="comment">${
          studentData.coomment ? studentData.comment : 'нет комментария'
        }</p>
    </div>
    `;
  const courseItem = document.querySelector('.studentInfo__item.course');
  console.log(courseItem);
  const recrouterItem = document.querySelector('.studentInfo__item.recrouter');
  courseData.forEach((element) => {
    if (element.id === studentData.course) {
      courseItem.innerHTML += `<p id="course">${element.title}</p>`;
    }
  });
  recrouterData.forEach((element) => {
    if (element.id === studentData.recruiter) {
      recrouterItem.innerHTML += `<p id="recruiter">${element.username}</p>`;
    }
  });
}

//-------------------STUDENT DELETE-----------------------//
function studentDelete() {
  sendGetRequest(
    'DELETE',
    `http://165.22.49.123:5000/api/v1/students/students/${studentId}/`,
    token
  );
  location.href = 'http://127.0.0.1:5500/CRMITC/students.html';
}

//-------------------STUDENT EDIT------------------------//
function studentEdit() {
  const name = document.querySelector('#student__name');
  const course = document.querySelector('#course');
  const phone = document.querySelector('#student__phone');
  const whatsapp = document.querySelector('#student__whatsapp');
  const telegram = document.querySelector('#student__telegram');
  const email = document.querySelector('#student__email');
  const discount = document.querySelector('#discount');
  const startMount = document.querySelector('#start__mount');
  const payment = document.querySelector('#payment');
  const fullPayment = document.querySelector('#full__payment');
  const currentRemainder = document.querySelector('#current__remainder');
  const remainder = document.querySelector('#remainder');
  const studies = document.querySelector('#studies');
  const recruiter = document.querySelector('#recruiter');
  const contract = document.querySelector('#contract');
  const date = document.querySelector('#date');
  const comment = document.querySelector('#comment');
  studentContent.innerHTML = `
  <div class="studentInfo__item">
      <h2>Студент: </h2>
      <input type="text" value="${name.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Группа: </h2>
      <select name="" id="selector__course">
          <option value="#" selected hidden>Выберите курс</option>
      </select>
  </div>
  <div class="studentInfo__item">
      <h2>Телефон:</h2>
      <input type="text" value="${phone.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>WhatsApp: </h2>
      <p></p>
  </div>
  <div class="studentInfo__item">
      <h2>Telegram: </h2>
      <p></p>
  </div>
  <div class="studentInfo__item">
      <h2>Email: </h2>
      <input type="text" value="${email.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Скидка: </h2>
      <input type="text" value="${discount.innerText}"> 
  </div>
  <div class="studentInfo__item">
      <h2>Месяц начала: </h2>
      <input type="text" value="${startMount.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Оплата: </h2>
      <input type="text" value="${payment.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Полная сумма: </h2>
      <input type="text" value="${fullPayment.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Остаток за текущий месяц: </h2>
      <input type="text" value="${currentRemainder.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Осталось всего: </h2>
      <input type="text" value="${remainder.innerText}">
  </div>
  <div class="studentInfo__item">
      <h2>Учится: </h2>
      <input type="checkbox" ${studies.innerText == '✔️' ? 'checked' : ''}>
  </div>
  <div class="studentInfo__item">
      <h2>Рекрутер: </h2>
      <select name="" id="selector__recrouter">
        <option value="#" selected hidden>Выберите рекрутера</option>
      </select>
  </div>
  <div class="studentInfo__item">
      <h2>Договор: </h2>
      <input type="checkbox" ${contract.innerText == '✔️' ? 'checked' : ''}>
  </div>
  <div class="studentInfo__item">
      <h2>Дата записи: </h2>
      <input type="date" value="${new Date(
        studentData.create_at
      ).toLocaleDateString('en-ca')}"
  </div>
  <div class="studentInfo__item">
      <h2>Комментарий: </h2>
      <textarea>${comment.innerText}</textarea>
  </div>
  `;
  const courseSelector = document.querySelector('#selector__course');
  courseData.forEach((element) => {
    courseSelector.innerHTML += `
          <option value="${element.id}" ${
      element.title == course.innerText ? 'selected' : ''
    }>${element.title}</option>
    `;
  });
  const recrouterSelector = document.querySelector('#selector__recrouter');
  recrouterData.forEach((element) => {
    recrouterSelector.innerHTML += `
          <option value="${element.id}" ${
      element.username == recruiter.innerText ? 'selected' : ''
    }>${element.username}</option>
    `;
  });
}

//-------------REQUEST TO SERVER WITH FETCH---------------//
function sendGetRequest(method, url, token) {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + token,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return response.json().then((error) => {
      const e = new Error('Что-то пошло не так');
      e.data = error;
      throw e;
    });
  });
}
