import "./FlashCards.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useState, useEffect } from "react";
import NewFlashCardEntryForm from "./NewFlashCardEntryForm";
import EditForm from "./EditForm";

const URL = `https://hidden-harbor-11546.herokuapp.com/words`;
//const LOCAL = `http://localhost:4000/words`;

function FlashCardsContainer() {
    const [cards, setCards] = useState([]);    
    const [formState, setFormState] = useState({});
    const [isNewCard, setIsNewCard] = useState(false);
    const [isOnEditMode, setIsOnEditMode] = useState(false);
    const [cardToBeEdited, setCardToBeEdited] = useState({});
    const [editFormState, setEditFormState] = useState({});
    const [isOnSearchMode, setIsOnSearchMode] = useState(false);
    const [query, setQuery] = useState("");
    const [isOnSortMode, setIsOnSortMode] = useState(false);
    const [learnedCards, setLearnedCards] = useState([]);  // only stores the ones from the current session, forgets previous sessions
    const [needToReviewCards, setNeedToReviewCards] = useState([]);
    const [countOfLearnedCards, setCountOfLearnedCards] = useState(0);
    
    useEffect(() => {        
        fetch(URL)
            .then(r => r.json())
            .then(cardObjs => setCards(cardObjs)
            );
    }, []);

    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, currObj) => {
            let key = currObj[property];
            if(!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(currObj);
            return acc;
        }, {});
    }

    const learnedCards_1 = groupBy(cards, "needsReview");
    useEffect(() => {
        console.log(learnedCards_1); // => {}
        // console.log(learnedCards_1.false.length);  //on first render, 
        // this line throws an error, since learnedCards_1 is still an empty object
        // as it depends on cards, whose completion is asynchronous
        // likewise, for the following line
        // setCountOfLearnedCards((learnedCards_1.false).length);
        console.log(countOfLearnedCards); // => 0
    }, [learnedCards_1]);

    useEffect(() => setLearnedCards(learnedCards), [learnedCards]);

    function addCard(card) {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        })
            .then(r => {
                console.log(r);
                r.json();
            })
            .then(newCard => {
                const augmentedDeckOfCards = [...cards, newCard];
                setCards(augmentedDeckOfCards);
            });
    }

    function deleteCard(cardId) {
        fetch(`${URL}/${cardId}`, {
            method: "DELETE"            
        })
            .then(r => {
                console.log(r);
                r.json();
            })
            .then(() => {
                const updatedDeckOfCards = cards.filter(card => card.id !== cardId);
                setCards(updatedDeckOfCards);
            });
    }

    function editCard(id, updatedCard) {
        fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCard)
        })
            .then(r => r.json())
            .then((updatedCard) => {
                console.log(updatedCard);
                const updatedCards = cards.map((card) => {
                    if(card.id === updatedCard.id) return updatedCard;
                    return card;
                });
                setCards(updatedCards);
            });
    }

    function updateLearnedCard(id, learnedCard) {
        console.log(learnedCard);
        fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(learnedCard)
        })
            .then(r => r.json())
            .then(learnedCard => {
                console.log(learnedCard);
                const updatedCards = cards.filter(card => card.id !== learnedCard.id);
                setCards(updatedCards);
                setLearnedCards([...learnedCards, learnedCard]);
                console.log(learnedCards);
            })
    }

    function updateNeedToReviewCards(id, needToReviewCard) {
        fetch(``)
    }

    return (
        <div className="flashcards-container scroll-section">
            <LeftPanel cards={cards}
                isOnSearchMode={isOnSearchMode}
                query={query}
                isOnSortMode={isOnSortMode}
                setIsOnSortMode={setIsOnSortMode}
                isNewCard={isNewCard}
                setIsNewCard={setIsNewCard} 
                isOnEditMode={isOnEditMode}
                setIsOnEditMode={setIsOnEditMode}
                cardToBeEdited={cardToBeEdited}
                setCardToBeEdited={setCardToBeEdited} 
                editCard={editCard} 
                deleteCard={deleteCard}
                updateLearnedCard={updateLearnedCard}
                countOfLearnedCards={countOfLearnedCards}
                setCountOfLearnedCards={setCountOfLearnedCards}
                updateNeedToReviewCards={updateNeedToReviewCards}
                setCards={setCards} />
            {
                isNewCard 
                ?   <NewFlashCardEntryForm                            
                        formState={formState} 
                        setFormState={setFormState} 
                        addCard={addCard} 
                        setIsNewCard={setIsNewCard} />
                :   isOnEditMode 
                ?   <EditForm editFormState={editFormState} 
                        setEditFormState={setEditFormState} 
                        cardToBeEdited={cardToBeEdited}
                        isOnEditMode={isOnEditMode}
                        setIsOnEditMode={setIsOnEditMode} 
                        editCard={editCard} />
                :   <RightPanel 
                        setIsOnSearchMode={setIsOnSearchMode}
                        setQuery={setQuery}
                        cards={cards} />
            } 
        </div>
    );
}

export default FlashCardsContainer;
