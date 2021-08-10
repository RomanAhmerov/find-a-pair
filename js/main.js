// IIFE
(() => {
    document.addEventListener('DOMContentLoaded', () => {

// Работа с окнами (первоначальное окно и окно конца игры)
        // Создание переменных для работы приложения
        let startGame = false;
        let inputValue = null;
        // Инициализация элемента DOM 
        const container = document.querySelector('.container');
    

    // Первоначальный экран
        // Создание элементов первоначального экрана (т.к. все эти элементы используются один раз, этот блок кода в функцию можно не превращать)
        const infoGameWrapper = document.createElement('div');
        const infoGameWrapperTitle = document.createElement('h3');
        const infoGameWrapperTitleXS = document.createElement('h2');
        const infoGameWrapperDescription = document.createElement('p');
        const infoGameWrapperForm = document.createElement('form');
        const infoGameWrapperInput = document.createElement('input');
        const infoGameWrapperButton = document.createElement('button');

        // Присвоение элементам соответсвующих классов
        infoGameWrapper.classList.add('info-game-wrapper');
        infoGameWrapperTitle.classList.add('info-game-wrapper__title');
        infoGameWrapperTitleXS.classList.add('info-game-wrapper__title_xs');
        infoGameWrapperForm.classList.add('info-game-wrapper__form');
        infoGameWrapperInput.classList.add('info-game-wrapper__input');
        infoGameWrapperDescription.classList.add('info-game-wrapper__description');
        infoGameWrapperButton.classList.add('info-game-wrapper__button');

        // Добавление атрибутов
        infoGameWrapperInput.setAttribute('type', 'text');
        infoGameWrapperButton.setAttribute('type', 'submit');
        infoGameWrapperInput.setAttribute('placeholder', 'Ввести значение...');

        // Добавление текста
        infoGameWrapperTitle.textContent = 'Найди пару';
        infoGameWrapperTitleXS.textContent = 'Укажите кол-во карточек по вертикали/горизонтали:';
        infoGameWrapperDescription.textContent = 'Четное число от 2 до 10';
        infoGameWrapperButton.textContent = 'Начать игру';

        // Добавление элементов в DOM
        infoGameWrapper.append(infoGameWrapperTitle);
        infoGameWrapper.append(infoGameWrapperTitleXS);
        infoGameWrapper.append(infoGameWrapperForm);

        infoGameWrapperForm.append(infoGameWrapperInput);
        infoGameWrapperForm.append(infoGameWrapperDescription);
        infoGameWrapperForm.append(infoGameWrapperButton);
        container.append(infoGameWrapper);


    // Экран конца игры
        /**
         * Данная функция создает окно (конец игры)
         * @param {string} входной параметр строка указывает название окна (Вы проиграли/выиграли)
         */
        function createEndGameBox(title) {
            // Создание DOM элементов
            const invisibleBox = document.createElement('div');
            const endGameWrapper = document.createElement('div');
            const endGameWrapperTitle = document.createElement('h3');
            const endGameWrapperButton = document.createElement('a');

            // Присвоение элементам соответсвующих классов
            invisibleBox.classList.add('invisible-box__stop-click')
            endGameWrapper.classList.add('info-game-wrapper');
            endGameWrapperTitle.classList.add('info-game-wrapper__title');
            endGameWrapperButton.classList.add('info-game-wrapper__button');

            // Добавление атрибутов
            endGameWrapperButton.setAttribute('href', 'index.html');

            // Добавление текста
            endGameWrapperTitle.textContent = title;
            endGameWrapperButton.textContent = 'Повторить';

            // Добавление элементов в DOM
            endGameWrapper.append(endGameWrapperTitle);
            endGameWrapper.append(endGameWrapperButton);
            container.append(invisibleBox);
            container.append(endGameWrapper);
       }

// Начало игры
        // Обработчик событий и определение количество карт по гор./верт. (предстартовое состояние игры)
        infoGameWrapperForm.addEventListener('submit', function (evt) {
            evt.preventDefault();
            
            if (!infoGameWrapperInput.value) {
                return;

            } else if (infoGameWrapperInput.value <= 10 && infoGameWrapperInput.value >= 2 && infoGameWrapperInput.value % 2 == 0) {
                startGame = true;

                inputValue = Number(infoGameWrapperInput.value);

                infoGameWrapper.classList.toggle('invisible');

            } else {
                startGame = true;

                inputValue = 4;

                infoGameWrapper.classList.toggle('invisible');
            }


// Старт игры
            if (startGame) {

    // Работа с массивом пар чисел 
                // Создание массива пар чисел
                let arrayNumbers = [];
            
                // Наполнение массива пар чисел
                for (let j = 0; j < 2; j++) {
                    let number = 1;
        
                    for (let i = 0; i < Math.pow(inputValue, 2) / 2; i++) {
                        if (number > 8) {
                            number = 1;
                        }
        
                        arrayNumbers.push(number++);
                    }
                }
            
                // Перемешивание массива
                 /**
                 * Данная функция перемешивает элементы массива согласно современному алгориму Фишера - Йетса
                 * @param {array} входной параметр массив парных чисел
                 * @return {array} возвращает перемешанный массив парных чисел
                 */
                function shuffle(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
                
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                };
            
                // Перемешивание массива пар чисел
                shuffle(arrayNumbers);

                
// Таймер игры
                // Количество секунд таймера игры
                let seconds = 60;        

                // Создание таймера в DOM
                const timerWrapper = document.createElement('div')
                const timer = document.createElement('span');

                timerWrapper.classList.add('timer-wrapper');
                timer.classList.add('timer');

                timerWrapper.append(timer);
                container.append(timerWrapper);

                timer.textContent = `Оставшееся время: ${seconds} сек.`;

                // Создание таймера
                let timerGame = setInterval(() => {
                    seconds--;

                    timer.textContent = `Оставшееся время: ${seconds} сек.`;

                    if (seconds == 0) {
                        // Остановка таймера
                        clearInterval(timerGame)
                        
                        // Создание окна (Конец игры)
                        createEndGameBox('Вы проиграли!');
                    }
                }, 1000);   

  
// Колода карт (работа с DOM элементами)
                // Создание отдельной карты
                /**
                 * Данная функция создает карточку
                 * @param {number} входной параметр число которое записывается на карточку
                 * @return {object} возвращает объект DOM (карточку)
                 */
                 function createCard(number) {
                    // Создание элементов
                    const card = document.createElement('div');
                    const backCard = document.createElement('div');
                    const faceCard = document.createElement('div');
                    const numberCard = document.createElement('span');

                    // Присвоение классов элементам 
                    card.classList.add('card');
                    backCard.classList.add('back-card');
                    faceCard.classList.add('face-card');
                    numberCard.classList.add('number-card');

                    // Добавление числа на карту
                    numberCard.textContent = number;

                    // Добавление элементов в DOM  
                    card.append(backCard);
                    card.append(faceCard);
                    faceCard.append(numberCard);

                    // Обработчик событий 'click'
                    card.addEventListener('click', () => {
                        backCard.classList.toggle('back-card_active');
                        faceCard.classList.toggle('face-card_active');
                    });

                    return card;
                }

                // Создание колоды карт
                /**
                 * Данная функция создает колоду карт
                 * @param {number} входной параметр количество карт в ряду (количество карт в ряду соответствует количеству рядов в колоде)
                 */
                function createDeckOfCards(countCards) {    
                    for (let i = 0; i < countCards; i++) {
                            const row = document.createElement('div');

                            row.classList.add('row');   

                        for (let j = 0; j < countCards; j++) {
                            const card = createCard(arrayNumbers[j + i * countCards]);
            
                            row.append(card);
                        }

                        container.append(row);
                    }
                }

                // Создание колоды
                createDeckOfCards(inputValue);
        
        
// Внутренняя логика приложения
                // Обявление переменных для дальнейшей работы с ними
                let numberFirstCard = null;
                let numberSecondCard = null;
                let preIndex = null;
                let couple = false;
                let coplesWhereFound = 0;
        
                // Определение DOM объектов для составления внутренней логики приложения
                const cards = document.querySelectorAll('.card')
                const backCards = document.querySelectorAll('.back-card');
                const faceCards = document.querySelectorAll('.face-card')
                const numberCards = document.querySelectorAll('.number-card');
        
                // Взаимодействие с карточками
                for (let i = 0; i < cards.length; i++) {
                    // Обработчик события click
                    cards[i].addEventListener('click', () => {
                        if (numberFirstCard == null) {
                            numberFirstCard = numberCards[i].textContent;
                            preIndex = i;
    
                        } else if (numberSecondCard == null) {
                            numberSecondCard = numberCards[i].textContent;
                            couple = true;
    
                        } else {
                            numberFirstCard = numberCards[i].textContent;
                            numberSecondCard = null;
                            preIndex = i;
                            couple = false;
                        }
        
                        // Проверка пар карточек
                        if (couple) {
                            // Совпадение пар
                            if (numberFirstCard == numberSecondCard) { 
                                // Количество найденных пар
                                coplesWhereFound++;
                                
                                // Конец игры
                                if (Math.pow(inputValue, 2) / 2 == coplesWhereFound) {
                                    // Остановка таймера
                                    clearInterval(timerGame);

                                    // Создание окна (Конец игры)
                                    createEndGameBox('Вы выиграли!');
                                }
                            // Не совпадение пар
                            } else { 
                                setTimeout(() => {
                                    // Удаление классов у карточек
                                    backCards[preIndex].classList.remove('back-card_active');
                                    faceCards[preIndex].classList.remove('face-card_active');
        
                                    backCards[i].classList.remove('back-card_active');
                                    faceCards[i].classList.remove('face-card_active');                            
                                }, 390);
                            }
                        }
                    });
                }
            }
        });
    });
})()
