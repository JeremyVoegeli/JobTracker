import { useState, useEffect } from 'react';
import Header from './components/Header';
import ApplicationTable from './components/ApplicationTable';
import FilterBar from './components/FilterBar';

function App() {
	//async function to get applications from API
	async function fetchApplications(){
		const response = await fetch("http://localhost:5000/api/applications");
		const data = await response.json();
		return data;
	}

	//set state to contain applications array and current filter
	const [applications, setApplications] = useState([]);
	const [activeFilter, setActiveFilter] = useState("All");

	//Create variable for filtered applications
	const filteredApplications = activeFilter === 'All' ? applications
		: applications.filter(app => app.status === activeFilter);

	//runs on initial creation of App component
	useEffect(() => {
		async function load(){
			const data = await fetchApplications();
		setApplications(data);
		}
		load();
	}, []);

	return (
        <div>
            <Header />
			<ApplicationTable applications={filteredApplications}/>
			<FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>
	);
}

export default App;