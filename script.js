const cardsRobot = ['robot-1', 'robot-1', 'robot-2', 'robot-2', 'robot-3', 'robot-3', 'robot-4', 'robot-4', 'robot-5', 'robot-5', 'robot-6', 'robot-6', 'robot-7', 'robot-7', 'robot-8', 'robot-8', 'robot-9', 'robot-9', 'robot-10', 'robot-10'];

let cards = document.querySelectorAll('div');
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = '';
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const playMemory = (e) => {

    activeCard = e.target;

    if (activeCard === activeCards[0]) return;

    activeCard.classList.remove('hidden');

    if (activeCards.length === 0) {
        activeCards.push(activeCard);
        return;
    } else {
        activeCards.push(activeCard);
        cards.forEach(card => {
            card.removeEventListener('click', playMemory);
        })

        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {

                activeCards.forEach(activeCard => {
                    activeCard.classList.add('off');
                })

                gameResult++;

                cards = cards.filter(card => {
                    return !card.classList.contains('off');
                })

                if (gameResult === gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = ((endTime - startTime) / 1000).toFixed(1);
                    alert(`Twój czas gry: ${gameTime} sekund.`);
                    // location.reload();
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
                }
            } else {

                activeCards.forEach(activeCard => {
                    activeCard.classList.add('hidden');
                })
            }

            activeCard = '';
            activeCards.length = 0;

            cards.forEach(card => {
                card.addEventListener('click', playMemory);
            })
        }, 1000);
    };
}

const init = () => {
    cards.forEach(card => {
        const index = Math.floor(Math.random() * cardsRobot.length);
        card.className = cardsRobot[index];

        cardsRobot.splice(index, 1);
    })
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('hidden');
            card.addEventListener('click', playMemory);
        })
    }, 2000)
};
init();