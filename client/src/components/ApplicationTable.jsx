import ApplicationRow from './ApplicationRow';

function ApplicationTable({ applications }){
    return (
        <table>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Link</th>
                    <th>Site</th>
                    <th>Application Date</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((application) => (
                    <ApplicationRow key={application.id} application={application} />
                ))}
            </tbody>
        </table>
    )
}

export default ApplicationTable;