import { useState, useEffect } from 'react'
import './App.css'
import  type { Users } from './types';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers]=useState<Users[]>([])
  const [color, setColor] = useState(false)
  const [ sort, setSort ] = useState(false)

  const sortedUsers = sort ? users.toSorted((a, b)=> a.location.country.localeCompare(b.location.country)): users
  const onRemoveRow =(id:string)=> {  setUsers(users.filter(user => user.login.uuid !== id))}

  useEffect(() => {    
    fetch('https://randomuser.me/api/?results=100')
    .then(response => response.json())
    .then(data => setUsers(data.results))
    .catch(err =>{
      throw new Error("Error fetching data " + err);      
    })   
  }, []);  

  return (
    <>     
        <h1>Listado de Usuarios</h1>
      <header style={{marginBottom:'2em', display:'flex', justifyContent:'center', gap:5}}>
        <button onClick={()=>setColor(!color)} >{color && 'No '}Colorear Filas</button>
        <button onClick={()=>setSort(!sort)} >{sort && 'No '}Ordenar por País</button>
      </header>
      <main>
        <UsersList users={sortedUsers} showColor={color} handleRemove={onRemoveRow}/>
      </main>
     
    </>
  )
}

export default App
