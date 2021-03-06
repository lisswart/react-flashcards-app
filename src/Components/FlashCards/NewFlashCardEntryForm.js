
function NewFlashCardEntryForm({ addCard, formState, 
                                setFormState, setIsNewCard}) {

    function handleNewEntryChange(event) {
        const fieldName = event.target.name;
        const userInput = event.target.value;
        console.log(userInput);
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
                        value={formState.headword} required
                        className="inputbar" />
                </div>
                <div className="inputbox" >
                    <label><strong>functional label: </strong></label>
                    <input type="text" onChange={handleNewEntryChange} 
                        name="functionalLabel" 
                        value={formState.functionalLabel} required
                        className="inputbar" />
                </div>
                <div className="inputbox" >
                    <label><strong>definition: </strong></label>
                    <textarea onChange={handleNewEntryChange} 
                        name="definition" 
                        value={formState.definition} required
                        className="textarea" />
                </div>
                <div  className="inputbox">
                    <label><strong>verbal illustration: </strong></label>
                    <textarea onChange={handleNewEntryChange} 
                        name="verbalIllustration" 
                        value={formState.verbalIllustration} required
                        className="textarea" />
                </div>
                <button type="submit" className="button"
                        style={{marginTop: "1em"}}>Submit</button>           
            </form>
        </div>
    );
}

export default NewFlashCardEntryForm;