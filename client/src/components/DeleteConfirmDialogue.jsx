function DeleteConfirmDialogue({ isDeleteOpen, applicationToDelete, onClose, onConfirm }){
    if(!isDeleteOpen){return null;}
    
    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center text-center bg-zinc-600 rounded-lg p-6 w-full max-w-md border-zinc-500 border-2 text-slate-100">
                <h1>Are you sure you want to delete this application?</h1>
                <h2>Job Title: {applicationToDelete.jobTitle}</h2>
                <h2>Company: {applicationToDelete.company}</h2>
                <div className="flex justify-center gap-3 mt-6">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-gray-300 border border-zinc-500 hover:bg-zinc-500 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-900 border-2 border-red-500 text-white font-semibold hover:bg-red-500 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmDialogue;