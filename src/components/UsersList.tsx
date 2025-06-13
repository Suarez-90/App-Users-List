import { SortBy, type Users } from "../types.d"

interface Props {
    users: Users[]
    showColor: boolean
    handleRemove: (id:string)=>void
    handleSorting:(sort: SortBy)=>void
    
}

function UsersList({users, showColor, handleRemove,handleSorting }:Props) {
     
    
  return (
    <table>
        <thead>
            <tr>
                <th>Foto</th>
                <th onClick={()=>handleSorting(SortBy.NAME)}>Nombre</th>
                <th onClick={()=>handleSorting(SortBy.LAST)}>Apellidos</th>
                <th onClick={()=>handleSorting(SortBy.COUNTRY)}>País</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user,index) =>{                    
                    const colorRow = index % 2==0 ? '#1a1a1a' : '#3d3c3c'
                    const className = showColor ? colorRow : ''
                    
                    return(
                        <tr key={user.email} style={{backgroundColor: className}} >
                            <td>
                                <img src={user.picture.thumbnail} alt="images User" />
                            </td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={()=>{handleRemove(user.login.uuid)}}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default UsersList