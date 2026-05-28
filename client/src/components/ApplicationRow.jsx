function ApplicationRow( {application, onEdit, onDelete} ){
    const tdClass = "p-3 border-y border-gray-950 first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg";
    return(
        <tr className="bg-zinc-600 shadow-sm hover:bg-zinc-500;shadow-gray-300 cursor-pointer">
            <td className={tdClass}>{application.jobTitle}</td>
            <td className={tdClass}>{application.company}</td>
            <td className={tdClass}>{application.location}</td>
            <td className={tdClass}>{application.status}</td>
            <td className={tdClass}>
                <a href={application.link} target="_blank" rel="noreferrer">View Posting</a>
            </td>
            <td className={tdClass}>{application.site}</td>
            <td className={tdClass}>{application.applicationDate}</td>
            <td className={tdClass}>{application.lastUpdated}</td>
            <td className={tdClass}>
                <button onClick={() => onEdit(application)}>Edit</button>
            </td>
            <td className={tdClass}>
                <button onClick={() => onDelete(application)}>Delete</button>
            </td>
        </tr>
    );
}

export default ApplicationRow;