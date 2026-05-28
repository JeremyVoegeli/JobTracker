import ApplicationRow from './ApplicationRow';

function ApplicationTable({ applications, onEdit, onDelete }){
    return (
        <table className="w-full border-separate border-spacing-y-1">
            <thead>
                <tr>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Job Title</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Company</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Location</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Link</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Site</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Application Date</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((application) => (
                    <ApplicationRow key={application.id} application={application} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    )
}

export default ApplicationTable;