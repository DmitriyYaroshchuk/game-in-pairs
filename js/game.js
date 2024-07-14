document.addEventListener('DOMContentLoaded', () => {
  let game = document.querySelector('#game');
  let arrOfNumbers = [];
  let firstCard = null;
  let secondCard = null;

  function startGame() {
    const numberOfCards = Number(prompt('Введите кол-во пар', '4'));
    arrOfNumbers = [];
    firstCard = null;
    secondCard = null;
    game.innerHTML = '';

    // Заполняем массив карточек
    for (let i = 1; i < numberOfCards; i++) {
      arrOfNumbers.push(i, i);
    }

    // Перемешиваем массив
    for (let i = 0; i < arrOfNumbers.length; i++) {
      const randomIndex = Math.floor(Math.random() * arrOfNumbers.length);
      const temp = arrOfNumbers[i];
      arrOfNumbers[i] = arrOfNumbers[randomIndex];
      arrOfNumbers[randomIndex] = temp;
    }

    // Создаем карточки
    for (let item of arrOfNumbers) {
      const card = document.createElement("div");
      card.classList.add('card');
      card.textContent = item;
      game.append(card);
    }
  }
  startGame();




  // Слушаем клик на game
  game.addEventListener('click', event => {
    const card = event.target.closest('.card');
    if (!card) return;

    if (card.classList.contains('open') || card.classList.contains('success')) return;

    // Если карточки не совпали
    if (firstCard !== null && secondCard !== null) {
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');

      firstCard = null;
      secondCard = null;
    }

    card.classList.add('open');

    if (firstCard === null) {
      firstCard = card;
    } else {
      secondCard = card;
    }

    // Если карточки совпали
    if (firstCard !== null && secondCard !== null) {
      const firstCardNumber = Number(firstCard.textContent);
      const secondCardNumber = Number(secondCard.textContent);

      if (firstCardNumber === secondCardNumber) {
        firstCard.classList.add('success');
        secondCard.classList.add('success');
      }
    }

    // Проверяем завершена ли игра
    if (game.querySelectorAll('.success').length === arrOfNumbers.length) {
      setTimeout(() => {
        alert('Победа');
        startGame();
      }, 300);
    }
  })
});