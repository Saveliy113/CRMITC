let token = '465f9a675caab0cca0c3752fd3a8912a8c4f5640';
let paymentData;
let studentData;
const studentsTable = document.getElementById('students__table');
const rowsFilter = document.getElementById('select__rows');
const searchInput = document.querySelector('#search');
const contentBox = document.querySelector('.content__box');
const paginationBox = document.querySelector('.pagination__container');
let rowsNumber = rowsFilter.value;
let pagesAmount;

//-------------STUDENTS DATA REQUEST------------------------//
const getPaymentsData = async () => {
    const response = await sendRequest(
        'GET',
        'http://165.22.49.123:5000/api/v1/students/payment_students/',
        token
    );
    paymentData = response;
    console.log(paymentData);
};
const getStudentsData = async () => {
    const response = await sendRequest(
        'GET',
        'http://165.22.49.123:5000/api/v1/students/students/',
        token
    );
    studentsData = response;
    console.log(studentsData);
};

//-------------SETTING STUDENTS DATA TO TABLE---------------//
const setPaymentsData = (async () => {
    await getPaymentsData();
    await getStudentsData();
    pagesAmount = Math.round(paymentData.length / rowsNumber);
    const paginationButtons = new PaginationButtons(pagesAmount);
    paginationButtons.render();
    currentPage = 1;
    tableRender(currentPage);
})();

//------------------ROWS AMOUNT FILTER---------------------//
function slct() {
    rowsNumber = rowsFilter.value;
    pagesAmount = Math.ceil(paymentData.length / rowsNumber);
    console.log('PagesAmount value is equal to ' + pagesAmount);
    if (isNaN(pagesAmount) == true) {
        pagesAmount = 1;
    }
    const paginationButtons = new PaginationButtons(
        pagesAmount,
        pagesAmount < 5 ? pagesAmount : undefined
    );
    paginationButtons.render();
    console.log('Value was changed to ' + rowsFilter.value);
    console.log('New pages amount will be ' + pagesAmount);
    tableRender(currentPage);
}

//-----------------------SEARCHING-------------------------//
searchInput.addEventListener('input', () => {
    let currentPaymentsData = document.querySelectorAll('.student__name');
    console.log(currentPaymentsData);
    console.log(searchInput.value);
    currentPaymentsData.forEach((el) => {
        console.log(el.parentElement);
    });
    let whatToSearch = searchInput.value.trim().toLowerCase();
    if (whatToSearch !== '') {
        currentPaymentsData.forEach((element) => {
            const studentName = element.innerText.toLowerCase();
            console.log(studentName);
            if (studentName.search(whatToSearch) == -1) {
                element.parentElement.classList.add('hide');
            } else {
                element.parentElement.classList.remove('hide');
            }
        });
    } else {
        currentPaymentsData.forEach((element) => {
            element.parentElement.classList.remove('hide');
        });
    }
});

//------------------TABLE RENDERING-----------------------//
function tableRender(page) {
    // console.log(page);
    let i = 0;
    let rowsPerPage = Number(rowsFilter.value);
    console.log(rowsPerPage);
    if (isNaN(rowsPerPage) == true) {
        rowsPerPage = paymentData.length;
    }
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    console.log(start);
    console.log(end);
    let items = paymentData.slice(start, end);
    console.log(items);

    studentsTable.innerHTML = `
    <thead>
        <tr>
            <th>ID</th>
            <th>??????</th>
            <th>??????????</th>
            <th>????????????????</th>
            <th>????????</th>
            <th>??????????????????????</th>
        </tr>
    </thead>
    `
    items.forEach((element, index) => {
        studentsData.map((item) => {
            if (item.id === element.student) {
                studentsTable.innerHTML += `
        <tr class="table__row">
            <td>${start + index + 1}</td>
            <td class="student__name">
                ${item.full_name}
            </td>
            <td>${element.sum}</td>
            <td>${element.recruiter}</td>
            <td>${element.date}</td>
            <td>${element.comment}</td>
        </tr>
        `
            }
        })
    });
}

//-------------------PAGINATION---------------------------//
const pageNumbers = (total, max, current) => {
    //total = 2
    const half = Math.round(max / 2); //half = 1
    let to = max; // max = 2
    if (current + half >= total) {
        to = total;
    } else if (current > half) {
        to = current + half;
    }
    let from = to - max;
    return Array.from({ length: max }, (_, i) => i + 1 + from);
};

function PaginationButtons(totalPages, maxPageVisible = 5, currentPage = 1) {
    // console.log(`Max visible page is ${maxPageVisible}`)
    console.log('Received new pagesAmount which is equal to ' + totalPages);
    let pages = pageNumbers(totalPages, maxPageVisible, (currentPage = 1));
    console.log('Pages generated: ' + pages);
    let currentPageBtn = null;
    const buttons = new Map();
    const fragment = document.createDocumentFragment();

    const paginationButtonsContainer = document.createElement('div');
    paginationButtonsContainer.className = 'pagination-buttons';

    const disabled = {
        start: () => pages[0] === 1,
        prev: () => currentPage === 1,
        end: () => pages.slice(-1)[0] === totalPages,
        next: () => currentPage === totalPages,
    };

    const createAndSetupButton = (
        label = '',
        cls = '',
        disabled = false,
        handleClick = () => { }
    ) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.className = `page-btn ${cls}`;
        button.disabled = disabled;
        button.addEventListener('click', (event) => {
            if (event.target.innerText == currentPage) {
                return;
            }
            handleClick(event);
            this.update();
            paginationButtonsContainer.value = currentPage;
            // console.log('Current page is ' + currentPage)
            paginationButtonsContainer.dispatchEvent(new Event('change'));
            tableRender(currentPage);
        });

        return button;
    };
    const onPageButtonClick = (e) =>
        (currentPage = Number(e.currentTarget.textContent));
    const onPageButtonUpdate = (index) => (btn) => {
        btn.textContent = pages[index];
        if (pages[index] === currentPage) {
            console.log('Current page focus block');
            currentPageBtn.classList.remove('active');
            btn.classList.add('active');
            currentPageBtn = btn;
            currentPageBtn.focus();
        }
    };

    buttons.set(
        createAndSetupButton(
            'start',
            'start-page',
            disabled.start(),
            () => (currentPage = 1)
        ),
        (btn) => (btn.disabled = disabled.start())
    );
    buttons.set(
        createAndSetupButton(
            'prev',
            'prev-page',
            disabled.prev(),
            () => (currentPage -= 1)
        ),
        (btn) => (btn.disabled = disabled.prev())
    );

    pages.forEach((pageNumber, index) => {
        const isCurrentPage = pageNumber === currentPage;
        const button = createAndSetupButton(
            pageNumber,
            isCurrentPage ? 'active' : '',
            false,
            onPageButtonClick
        );
        if (isCurrentPage) {
            currentPageBtn = button;
        }
        buttons.set(button, onPageButtonUpdate(index));
    });

    buttons.set(
        createAndSetupButton(
            'next',
            'next-page',
            disabled.next(),
            () => (currentPage += 1)
        ),
        (btn) => (btn.disabled = disabled.next())
    );
    buttons.set(
        createAndSetupButton(
            'end',
            'end-page',
            disabled.end(),
            () => (currentPage = totalPages)
        ),
        (btn) => (btn.disabled = disabled.end())
    );

    buttons.forEach((_, btn) => fragment.appendChild(btn));

    this.render = (container = paginationBox) => {
        paginationBox.innerHTML = '';
        paginationButtonsContainer.appendChild(fragment);
        container.appendChild(paginationButtonsContainer);
    };
    this.update = (newPageNumber = currentPage) => {
        currentPage = newPageNumber;
        pages = pageNumbers(totalPages, maxPageVisible, currentPage);
        buttons.forEach((updateButton, button) => updateButton(button));
    };
    this.onchange = (handler) => {
        paginationButtonsContainer.addEventListener('change', handler);
    };
}

//-------------REQUEST TO SERVER WITH FETCH---------------//
function sendRequest(method, url, token) {
    return fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token,
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then((error) => {
            const e = new Error('??????-???? ?????????? ???? ??????');
            e.data = error;
            throw e;
        });
    });
}
