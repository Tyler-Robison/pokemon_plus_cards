import React from "react";
import uuid from "uuid";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import useAxios from "./hooks/useAxios";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const url = 'https://deckofcardsapi.com/api/deck/new/draw/'
  const formattingFunction = (response) => {
    return { id: uuid(), image: response.data.cards[0].image }
  }
  const [cards, addCard, wipeCards] = useAxios(url, formattingFunction, 'cards')

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={(e) => addCard(null, e)}>Add a playing card!</button>
        <button onClick={wipeCards}>Clear Cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
