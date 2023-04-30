export const A_Service = ({name, description, price, date})=>{ 
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td>{date}</td>
        </>
    )
}