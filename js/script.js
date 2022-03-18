window.addEventListener('DOMContentLoaded', () => {
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    /* параметри за замовчанням */
    showTabContent(0);

    /* обробник події кліка */
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /* Timer */
    // задаємо дедлайн
    const deadline = '2022-05-30';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / 1000 * 60 * 60) % 24);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // створюємо функцію додавання нолика
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // встановлюємо наш таймер на сторінку
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // визиваємо оновлення годинника миттєво на самому початку
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            // тут треба підставляти 0, якщо треба
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // блокуємо повторний автоматичний виклик модалки
        clearInterval(modalTimerId);
    }

    /* Modal */
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // зачиняємо при кліку на темноту
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // відкриваємо модалку по таймеру
    //3.48. коментую виклик модалки
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек
    // 1. Создаю шаблонный класс
    class MenuCard {
        // додаю в кінці аргумент classes
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        // метод для конвертації ціни в гривню
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            //прописуємо умову як аналог умави по замовчуванню
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            // треба розмістити цей елемент на сторінці
            this.parent.append(element);
        }
    }

    // рендеримо наш об'єкт
    new MenuCard(
        // всередині класу передаємо аргументи
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        
    ).render();
    new MenuCard(
        // всередині класу передаємо аргументи
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        10,
        '.menu .container',
        
    ).render();
    new MenuCard(
        // всередині класу передаємо аргументи
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        11,
        '.menu .container',
        
    ).render();

    /* Requests */
    //Forms - отримаємо всі форми з тегом form
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    // підв'язуємо функцію під нашу форму
    forms.forEach(item => {
        postData(item);
    });

    // Функція, що буде відповідати за постінг даних
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Замість div
            // const statusMessage = document.createElement('div');
            // Створюємо тег img
            const statusMessage = document.createElement('img');
            // statusMessage.classList.add('status');
            statusMessage.src = message.loading;
            // statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            // додаємо спінер в нормальне місце після форми зв'язку
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // для налаштування json налаштовуємо header (1)
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            // створюємо пустий об'єкт (2)
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            // (3)
            const json = JSON.stringify(object);
            // (4) відправка вже json
            request.send(json);
            // коментую (5)
            // request.send(formData);

            request.addEventListener('load', () => {
                // 1. після успішної відповіді від сервера
                if (request.status === 200) {
                    // 2. виводимо в консоль результат
                    console.log(request.response);
                    //заміняю
                    // statusMessage.textContent = message.success;
                    //на
                    // 3. за
                    showThanksModal(message.success);
                    form.reset();
                    //звільняю statusMessage від тайм-аута
                    /* setTimeout(() => {
                        statusMessage.remove();
                    }, 2000); */
                    //тому що він буде використаний лише для лоадінга
                    statusMessage.remove();
                } else {
                    // заміняю оце
                    // statusMessage.textContent = message.failure;
                    // на це
                    showThanksModal(message.failure);
                }
            });
        });
    }

    // показуємо красиве вікно 054
    function showThanksModal(message) {
        // сховаємо старий контент
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        // створюємо новий контент
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" date-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        // прибираємо новий контент з модалки та показуємо старий через якийсь час
        setTimeout(() => {
            //скриваємо новий котент
            thanksModal.remove();
            // показуємо старий з формою
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            // закриваємо модальне вікно, щоб не заважати користувачу
            closeModal();
        }, 4000);
    }

});