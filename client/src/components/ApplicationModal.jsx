import { useState, useEffect } from 'react';

function ApplicationModal({ isModalOpen, selectedApplication, onClose, onSave }){
    const [formData, setFormData] = useState({});

    //Runs on any change to selectedApplication
    useEffect(() => {
        const initialData = selectedApplication || 
        {
            jobTitle:'',
            company:'',
            location:'',
            status:'Applied',
            link:'',
            site:'',
            applicationDate:(new Date().toISOString().split('T')[0]),
            notes:''
        };
        setFormData(initialData)
    }, [selectedApplication]);

    //handles modifying the form data from the inputs given
    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(){
        const url = selectedApplication ? `${import.meta.env.VITE_API_URL}/api/applications/${selectedApplication.id}` : `${import.meta.env.VITE_API_URL}/api/applications`;
        const method = selectedApplication ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });

        if(response.ok){
            onSave();
            onClose();
        }
    }
    
    //don't render anything if the modal is closed
    if(!isModalOpen){return null;}

    //determines the label for the submit button
    const submitLabel = selectedApplication ? "Save Changes" : "Add Application";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-600 rounded-lg p-6 w-full max-w-2xl border-zinc-500 border-2">
                <h2 className="text-xl font-bold text-white mb-4">
                    {selectedApplication ? "Edit Application" : "Add Application"}
                </h2>
                <form className="text-slate-100">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Job Title</label>
                            <input 
                                type="text" 
                                name="jobTitle"
                                value={formData.jobTitle || ''}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Company</label>
                            <input 
                                type="text" 
                                name="company"
                                value={formData.company || ''}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Location</label>
                            <input 
                                type="text" 
                                name="location"
                                value={formData.location || ''}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500">
                                <option value="Applied">Applied</option>
                                <option value="Assessment">Assessment</option>
                                <option value="Phone Screen">Phone Screen</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Withdrawn">Withdrawn</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Link</label>
                            <input 
                                type="text" 
                                name="link"
                                value={formData.link || ''}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Site</label>
                            <input 
                                type="text" 
                                name="site"
                                value={formData.site || ''}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-300 mb-1">Application Date</label>
                            <input 
                                type="date" 
                                name="applicationDate"
                                value={formData.applicationDate || ''}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3 col-span-2">
                            <label className="block text-sm text-gray-300 mb-1">Notes</label>
                            <textarea  
                                name="notes"
                                value={formData.notes || ''}
                                onChange={handleChange}
                                className="w-full h-30 bg-zinc-700 text-white rounded px-3 py-2 border border-zinc-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className=" mb-3 col-span-2 flex justify-end gap-3 mt-4">
                            <button 
                                onClick={() => onClose()}
                                type="button"
                                className="px-4 py-2 rounded-lg text-gray-300 border border-zinc-500 hover:bg-zinc-500 cursor-pointer"
                                >Cancel
                            </button>
                            <button 
                                onClick={() => handleSubmit()}
                                type="button"
                                className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-300 to-indigo-800 text-white font-semibold hover:opacity-90 cursor-pointer"
                                >{submitLabel}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplicationModal;