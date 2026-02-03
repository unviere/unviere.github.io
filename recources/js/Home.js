        const CommScroller = document.getElementById('Comm-Scroller')

        const CommCards = document.querySelectorAll('.Comunity-Card')

        CommCards.forEach(Card => {
          var copy = Card.cloneNode(true);
          CommScroller.appendChild(copy);
        })