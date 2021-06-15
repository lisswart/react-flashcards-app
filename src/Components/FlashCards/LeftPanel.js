import FlashCardsDeck from "./FlashCardsDeck";
import { useState } from "react";


function LeftPanel({ cards, isOnSearchMode, 
                    isOnSortMode, setIsOnSortMode,
                    query, isNewCard, 
                    setIsNewCard, isOnEditMode, 
                    setIsOnEditMode, cardToBeEdited, 
                    setCardToBeEdited, editCard, 
                    deleteCard, masteredCard }) {

    const [cardIndex, setCardIndex] = useState(0);

    function handleNewCardClick() {
        setIsNewCard(!isNewCard);
    }

    function handleSortClickIncreasing() {
        setIsOnSortMode(!isOnSortMode);
        sortIncreasing();
    }

    function sortIncreasing() {
        cards.sort((a,b) => {
            let ha = a.headword.toLowerCase();
            let hb = b.headword.toLowerCase();

            if(ha < hb) {
                return -1;
            }
            if(ha > hb) {
                return 1;
            }
            return 0;
        });
    }

    function handleSortClickDecreasing() {
        setIsOnSortMode(!isOnSortMode);
        sortDecreasing();
    }

    function sortDecreasing() {
        cards.sort((a,b) => {
            let ha = a.headword.toLowerCase();
            let hb = b.headword.toLowerCase();

            if(ha < hb) {
                return 1;
            }
            if(ha > hb) {
                return -1;
            }
            return 0;
        });
    }

    function handleClickMore() {
        setCardIndex((cardIndex) => (cardIndex + 6) % cards.length)
    }

    function handleClickBackward() {
        if(cardIndex >= 0) {
            setCardIndex((cardIndex) => 
                (cardIndex - 6) % cards.length);
        }
    }

    return (
        <div className="left-panel-div">

            <div className="sort-button-div">
                <button className="sort-button"
                        onClick={handleSortClickIncreasing}>
                        Sort ↑
                </button>
                <button className="sort-button"
                        onClick={handleSortClickDecreasing}>
                        Sort ↓
                </button>
                {
                    isNewCard
                    ?   <div className="new-button-div">
                            <button className="new-button"
                                    onClick={handleNewCardClick}>
                                Cancel
                            </button>
                        </div>
                    :   <div className="new-button-div">
                            <button className="new-button"
                                    onClick={handleNewCardClick}>
                                New
                            </button>
                        </div>
                }
                <div className="forward-backward-buttons-container">
                    <div className="click-more-button-container">
                        <button onClick={handleClickBackward}
                                className="click-more-button">
                            ◀
                        </button>
                    </div>
                    <div className="click-more-button-container">
                        <button onClick={handleClickMore}
                                className="click-more-button">
                            ▶
                        </button>
                    </div>
                </div> 
            </div>

            <FlashCardsDeck cards={cards}
                cardIndex={cardIndex}
                isOnSearchMode={isOnSearchMode}
                query={query}
                handleSortClickIncreasing={handleSortClickIncreasing}
                handleSortClickDecreasing={handleSortClickDecreasing}
                isOnEditMode={isOnEditMode}
                setIsOnEditMode={setIsOnEditMode}
                cardToBeEdited={cardToBeEdited}
                setCardToBeEdited={setCardToBeEdited}
                editCard={editCard}
                deleteCard={deleteCard}
                masteredCard={masteredCard} />
                
        </div>
    );
}

export default LeftPanel;
