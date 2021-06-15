import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const URL = `https://hidden-harbor-11546.herokuapp.com/words`;
//const LOCAL = `http://localhost:4000/words`;

function FlashCardOnView() {
    const [card, setCard] = useState({});
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetch(`${URL}/${id}`)
            .then(r => r.json())
            .then(cardData => {
                setCard(cardData);
            })
            .catch(err => console.error(err));
    }, [id]);

    function handleReviewClick() {
        // reviewCard(id);
    }
    
    return (
        <div className="card-on-view-container">
            {
                Object.keys(card).length === 0
                ?   <div className="loading">
                        Loading...
                    </div>
                :   
                   <div className="card-on-view-wrapper">
                        <div className="card-on-view-inner">                            
                            <div className="card-on-view-front">
                                <h2 className="card-on-view-headword">
                                    {card.headword}
                                </h2>
                                <p className="card-on-view-functional-label">
                                    {card.functionalLabel}
                                </p>
                                <div className="review-button-container">
                                    <button className="button" onClick={handleReviewClick}>
                                        ✔
                                    </button>
                                    <button className="button" onClick={handleReviewClick}>
                                        ✖
                                    </button>
                                </div>
                            </div>
                            <div className="card-on-view-back">
                                <p className="card-on-view-definition">
                                    <span style={{color: "navy", fontWeight: "bolder"}}>:</span>
                                        {card.definition}
                                </p><br></br>
                                <p className="card-on-view-verbal-illustration">
                                    <span style={{color: "navy"}}>e.g., </span>
                                        {card.verbalIllustration}
                                </p>
                            </div>                                                         
                        </div>
                    </div>
            }
        </div>
    );
}

export default FlashCardOnView;
