const modal = document.getElementById('modal');
const closeBtn = modal.querySelector('.modal-close');

const modalForm = document.querySelector('.modal-form');
const goodName = modalForm.querySelector('input.modal-input[name="chosenGood"]');
const customerName = document.querySelector('input.modal-input[name="name"]');
const customerPhone = document.querySelector('input.modal-input[name="phone"]');

const goodsContainer = document.querySelector('.long-goods-list');


// Отрисовка карточек товара

const renderGoods = () => {
    const goodsContainer = document.querySelector('.long-goods-list');
    const goods = JSON.parse(localStorage.getItem('goods'));

    goodsContainer.innerHTML = "";

    goods.forEach(good => {
        const goodBlock = document.createElement('div');

        goodBlock.classList.add('col-lg-3');
        goodBlock.classList.add('col-sm-6');

        goodBlock.innerHTML = `
            <div class="goods-card">
                <div class="goods-header">
                    <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
                    <img src="db/${good.img}" alt="${good.name}" class="goods-image">
                </div>
                <div class="goods-body">
                    <h3 class="goods-title">${good.name}</h3>
                    <p class="goods-description">${good.description}</p>  
                    <button class="button goods-card-btn add-to-cart buyBtn" data-id="${good.id}">
                        <span class="button-price">$${good.price}</span>
                    </button>
                </div>
            </div>
        `;

        goodsContainer.append(goodBlock);
    });
};

// Отправка формы

const sendForm = async () => {

    const formData = new FormData(modalForm);

    let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
    });

    if (response) {
        let result = await response.json();
        alert(result.message);
        modalForm.reset();
    }
}

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
    modal.style.display = '';
});


// Первичная загрузка из БД и отслеживание кликов на кнопки

fetch('/db/db.json')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('goods', JSON.stringify(data));
        renderGoods();
    })
    .then(info => {
        const buyBtn = document.querySelectorAll('.buyBtn');

        buyBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'flex';
            });
        });
    })

// Название товара в модальном окне берется из кликнутой карточки

goodsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.add-to-cart')) {

        const goodId = event.target.closest('.add-to-cart').dataset.id;
        const data = JSON.parse(localStorage.getItem('goods'));

        data.forEach(item => {
            if (item.id === goodId) {
                goodName.value = item.name;
                return goodName;
            }
        });
    }
});

// Валидация ввода в поля формы

customerName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^а-яА-Яa-zA-Z ]/g, "").trim()
});

customerPhone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, "").trim()
});

//  Закрытие модального окна

closeBtn.addEventListener('click', () => {
    modal.style.display = '';
});

modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
        modal.style.display = '';
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = '';
    }
});
