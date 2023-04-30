export const User = ({name, surname, DPI, email, phone})=>{ 
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{DPI}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </>
    )
}