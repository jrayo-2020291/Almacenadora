export const Lease = ({user, storage, services, description})=>{ 
    return (
        <>
            <td>{user}</td>
            <td>{storage}</td>
            <td>{services}</td>
            <td>{description}</td>
        </>
    )
}