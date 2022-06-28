const modal = document.getElementById('modal');
const closeBtn = modal.querySelector('.modal-close');

const modalForm = document.querySelector('.modal-form');
const goodName = modalForm.querySelector('input.modal-input[name="chosenGood"]');
const costomerName = modalForm.querySelector('input.modal-input[name="name"]');
const costomerPhone = modalForm.querySelector('input.modal-input[name="phone"]');

const goodsContainer = document.querySelector('.long-goods-list');


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
                <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
                <img src="db/${good.img}" alt="${good.name}" class="goods-image">
                <h3 class="goods-title">${good.name}</h3>
                <p class="goods-description">${good.description}</p>  
                <button class="button goods-card-btn add-to-cart buyBtn" data-id="${good.id}">
                    <span class="button-price">$${good.price}</span>
                </button>
            </div>
        `;

        goodsContainer.append(goodBlock);

    });
};

const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(modalForm);

    fetch('https://jsonplaceholder.typicode.com/posts', {    //sendmail.php
            method: 'POST',
            body: formData
        })
        .then((res) => {
            res.json();
            modal.style.display = '';
        });
};


fetch('/db/db.json')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('goods', JSON.stringify(data));
        renderGoods();
    })
    .then(info => {
        const buyBtn = document.querySelectorAll('.buyBtn');

        buyBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                modal.style.display = 'flex';
            })
        })
    })

goodsContainer.addEventListener('click', (event) => {
    if (event.target.closest('.add-to-cart')) {

        const goodId = event.target.closest('.add-to-cart').dataset.id;

        fetch('/db/db.json')
            .then((res) => res.json())
            .then((data) => {
                data.forEach(item => {
                    if (item.id === goodId) {
                        goodName.value = item.name;
                    }
                })
            })
    }
});

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
});


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