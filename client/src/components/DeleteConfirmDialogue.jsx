function DeleteConfirmDialogue({ isDeleteOpen, applicationToDelete, onClose, onConfirm }){
    if(!isDeleteOpen){return null;}
    
    return(
        <div>
            <h1>Are you sure you want to delete this application?</h1>
            <h2>Job Title: {applicationToDelete.jobTitle}</h2>
            <h2>Company: {applicationToDelete.company}</h2>
            <button onClick={onClose}>Cancel</button>
            <button onClick={onConfirm}>Delete</button>
        </div>
    );
}

export default DeleteConfirmDialogue;