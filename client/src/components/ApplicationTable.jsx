import ApplicationRow from './ApplicationRow';

function ApplicationTable({ applications, onEdit, onDelete }){
    const thClass = "text-center p-3 text-sm font-semibold text-indigo-100 text-shadow-sm/30 text-shadow-indigo-400"
    return (
        <table className="h-min w-full border-separate border-spacing-y-1 px-1 bg-zinc-700 rounded-[5px]">
            <thead>
                <tr>
                    <th className={thClass}>Job Title</th>
                    <th className={thClass}>Company</th>
                    <th className={thClass}>Location</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Link</th>
                    <th className={thClass}>Site</th>
                    <th className={thClass}>Application Date</th>
                    <th className={thClass}>Last Updated</th>
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