import { statusColors } from '../constants';

function ApplicationRow( {application, onEdit, onDelete} ){
    const tdClass = "text-slate-100 p-3 border-y border-gray-950 first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg";
    return(
        <tr onClick={() => onEdit(application)} className="bg-zinc-600 shadow-sm hover:bg-zinc-500 hover:shadow-black rounded-lg">
            <td className={tdClass}>{application.jobTitle}</td>
            <td className={tdClass}>{application.company}</td>
            <td className={tdClass}>{application.location}</td>
            <td className={tdClass}>
                <span className={`border-2 ${statusColors[application.status]} px-2 py-1 rounded-full text-xs font-semibold text-white`}>
                    {application.status}
                </span></td>
            <td className={tdClass}>
                <a 
                    className="bg-gradient-to-br from-blue-300 to-indigo-800 text-white text-sm font-semibold px-3 py-1 rounded-lg hover:opacity-75"
                    href={application.link}
                    target="_blank"
                    rel="noreferrer" 
                    onClick={(e) => {e.stopPropagation();
                        if(!application.link||!application.link.startsWith('http')){
                            e.preventDefault();
                        }
                }}>View Posting</a>
            </td>
            <td className={tdClass}>{application.site}</td>
            <td className={tdClass}>{application.applicationDate.split('T')[0]}</td>
            <td className={tdClass}>{application.lastUpdated.split('T')[0]}</td>
            <td className={tdClass}>
                <button 
                    onClick={(e) => {e.stopPropagation(); onDelete(application)}}
                    className="bg-zinc-500 border-1 border-red-500 hover:bg-zinc-400 text-sm font-semibold px-3 py-1 rounded-lg hover:opacity-90"
                    >Delete
                </button>
            </td>
        </tr>
    );
}

export default ApplicationRow;