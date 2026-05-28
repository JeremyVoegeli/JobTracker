function ApplicationRow( {application, onEdit, onDelete} ){
    return(
        <tr>
            <td>{application.jobTitle}</td>
            <td>{application.company}</td>
            <td>{application.location}</td>
            <td>{application.status}</td>
            <td>
                <a href={application.link} target="_blank" rel="noreferrer">View Posting</a>
            </td>
            <td>{application.site}</td>
            <td>{application.applicationDate}</td>
            <td>{application.lastUpdated}</td>
            <td>
                <button onClick={() => onEdit(application)}>Edit</button>
            </td>
            <td>
                <button onClick={() => onDelete(application)}>Delete</button>
            </td>
        </tr>
    );
}

export default ApplicationRow;