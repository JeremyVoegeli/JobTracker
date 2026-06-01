function ApplicationRow( {application, onEdit, onDelete} ){
    const tdClass = "text-slate-100 p-3 border-y border-gray-950 first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg";
    return(
        <tr onClick={() => onEdit(application)} className="bg-zinc-600 shadow-sm hover:bg-zinc-500 hover:shadow-black rounded-lg">
            <td className={tdClass}>{application.jobTitle}</td>
            <td className={tdClass}>{application.company}</td>
            <td className={tdClass}>{application.location}</td>
            <td className={tdClass}>{application.status}</td>
            <td className={tdClass}>
                <a href={application.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>View Posting</a>
            </td>
            <td className={tdClass}>{application.site}</td>
            <td className={tdClass}>{application.applicationDate}</td>
            <td className={tdClass}>{application.lastUpdated}</td>
            <td className={tdClass}>
                <button onClick={(e) => {e.stopPropagation(); onDelete(application)}}>Delete</button>
            </td>
        </tr>
    );
}

export default ApplicationRow;