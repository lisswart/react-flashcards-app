
function NewFlashCardEntryForm({ addCard, formState, 
                                setFormState, setIsNewCard}) {

    function handleNewEntryChange(event) {
        const fieldName = event.target.name;
        const userInput = event.target.value;
        setFormState({
            ...formState,
            [fieldName]: userInput,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const card = {
            headword: formState.headword,
            functionalLabel: formState.functionalLabel,
            definition: formState.definition,
            verbalIllustration: formState.verbalIllustration,
            needsReview: true
        };
        addCard(card);
        setIsNewCard(false);
        setFormState({
            headword: "",
            functionalLabel: "",
            definition: "",
            verbalIllustration: ""
        });
    }

    return (
        <div>
            
            <form onSubmit={handleSubmit} className="form-view">
                <div className="inputbox" >
                    <label><strong>headword: </strong></label>
                    <input type="text" onChange={handleNewEntryChange} 
                        name="headword" 
                        value={formState.headword}
                        className="inputbar" />
                </div>
                <div className="inputbox" >
                    <label><strong>functional label: </strong></label>
                    <input type="text" onChange={handleNewEntryChange} 
                        name="functionalLabel" 
                        value={formState.functionalLabel}
                        className="inputbar" />
                </div>
                <div className="inputbox" >
                    <label><strong>definition: </strong></label>
                    <textarea onChange={handleNewEntryChange} 
                        name="definition" 
                        value={formState.definition}
                        className="textarea" />
                </div>
                <div  className="inputbox">
                    <label><strong>verbal illustration: </strong></label>
                    <textarea onChange={handleNewEntryChange} 
                        name="verbalIllustration" 
                        value={formState.verbalIllustration}
                        className="textarea" />
                </div>
                <button type="submit" className="button"
                        style={{marginTop: "1em"}}>Submit</button>           
            </form>

            <div className="escutcheon">
                <div className="escutcheon-inner-0">
                    <div className="escutcheon-inner-1">
                        <div className="escutcheon-inner-2">
                            ⫶
                        </div>
                    </div>
                </div>
            </div> 

        </div>
    );
}

export default NewFlashCardEntryForm;