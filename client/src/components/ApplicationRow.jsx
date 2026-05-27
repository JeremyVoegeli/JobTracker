function ApplicationRow( {application} ){
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
        </tr>
    );
}

export default ApplicationRow;