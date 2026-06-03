import { useState, useEffect } from 'react';
import Header from './components/Header';
import ApplicationTable from './components/ApplicationTable';
import FilterBar from './components/FilterBar';
import ApplicationModal from './components/ApplicationModal';
import DeleteConfirmDialogue from './components/DeleteConfirmDialogue';

function App() {
	//async function to get applications from API
	async function fetchApplications(){
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`);
		const data = await response.json();
		return data;
	}

	//fetches applications and saves them to the state
	async function loadApplications(){
		const data = await fetchApplications()
		setApplications(data);
	}

	//States:
	const [applications, setApplications] = useState([]); //list of all applications from API
	const [activeFilter, setActiveFilter] = useState("All"); //filter status currently set
	const [isModalOpen, setIsModalOpen] = useState(false); //bool for whether or not ApplicationModal is open
	const [selectedApplication, setSelectedApplication] = useState(null); //selected application to edit with modal, or null for creating new application
	const [isDeleteOpen, setIsDeleteOpen] = useState(false); //bool for whether or not delete confirmation dialogue is open
	const [applicationToDelete, setApplicationToDelete] = useState(null); //application to be deleted

	//runs on initial creation of App component
	useEffect(() => {
		loadApplications()
	}, []);

	//Create variable for filtered applications
	const filteredApplications = activeFilter === 'All' ? applications
		: applications.filter(app => app.status === activeFilter);

	//sets state values for an open modal
	function handleOpenModal(application){
		setIsModalOpen(true);
		setSelectedApplication(application);
	}

	//sets state values for a closed modal
	function handleCloseModal(){
		setIsModalOpen(false);
		setSelectedApplication(null);
	}

	//sets state values for open delete confirm dialogue
	function handleOpenDelete(application){
		setIsDeleteOpen(true);
		setApplicationToDelete(application);
	}

	//closes the delete confirmation dialogue
	function handleCloseDelete(){
		setIsDeleteOpen(false);
		setApplicationToDelete(null);
	}

	async function handleConfirmDelete(){
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${applicationToDelete.id}`, {method:"DELETE"});
		
		if(response.ok){
			loadApplications();
			handleCloseDelete();
		}
	}

	return (
		<div className="max-w-screen mx-auto p-6">
			<Header onAdd={handleOpenModal}/>
			<ApplicationModal isModalOpen={isModalOpen} selectedApplication={selectedApplication} onClose={handleCloseModal} onSave={loadApplications} />
			<div className="flex gap-4 max-height-min">
				<ApplicationTable applications={filteredApplications} onEdit={handleOpenModal} onDelete={handleOpenDelete} />
				<FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
			</div>
			<DeleteConfirmDialogue isDeleteOpen={isDeleteOpen} applicationToDelete={applicationToDelete} onClose={handleCloseDelete} onConfirm={handleConfirmDelete} />
		</div>
	);
}

export default App;