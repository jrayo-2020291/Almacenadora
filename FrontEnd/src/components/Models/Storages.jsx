export const Storage = ({name, description, location, size, availability, monthlyPrice})=>{ 
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{location}</td>
            <td>{size}</td>
            <td>{availability}</td>
            <td>{monthlyPrice}</td>
        </>
    )
}