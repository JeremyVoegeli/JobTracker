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
        const url = selectedApplication ? `http://localhost:5000/api/applications/${selectedApplication.id}` : "http://localhost:5000/api/applications";
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
        <form>
            <input 
                type="text" 
                name="jobTitle"
                value={formData.jobTitle || ''}
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
            />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Applied">Applied</option>
                <option value="Assessment">Assessment</option>
                <option value="Phone Screen">Phone Screen</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
            </select>
            <input 
                type="text" 
                name="link"
                value={formData.link || ''}
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="site"
                value={formData.site || ''}
                onChange={handleChange}
            />
            <input 
                type="date" 
                name="applicationDate"
                value={formData.applicationDate || ''}
                onChange={handleChange}
            />
            <textarea  
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
            />
            <button onClick={() => onClose()} type="button">Cancel</button>
            <button onClick={() => handleSubmit()} type="button">{submitLabel}</button>
        </form>
    );
}

export default ApplicationModal;