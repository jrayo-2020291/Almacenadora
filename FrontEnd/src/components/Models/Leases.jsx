export const Lease = ({user, storage, description, dueDate, services, total})=>{ 
    return (
        <>
            <td>{user}</td>
            <td>{storage}</td>
            <td>{description}</td>
            <td>{dueDate}</td>
            <td>{total}</td>
        </>
    )
}