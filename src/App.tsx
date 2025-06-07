import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import  type { Users } from './types';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers]=useState<Users[]>([])
  const [color, setColor] = useState(false)
  const [ sort, setSort ] = useState(false)
  const [ filterCountry, setFilterCountry] = useState<string | null>(null)
  const initalState = useRef(users)

  const filterUsers = useMemo(()=>{
    return filterCountry !== null && filterCountry.length > 0 ?
      users.filter(user => user.location.country.toLowerCase().includes((filterCountry).toLowerCase()))
      : users
  },[users, filterCountry])

  const sortedUsers = useMemo (()=>{
    return sort ? filterUsers.toSorted((a, b)=> a.location.country.localeCompare(b.location.country)): filterUsers
  },[filterUsers, sort])
  
  const onRemoveRow =(id:string)=> {  setUsers(users.filter(user => user.login.uuid !== id))}
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFilterCountry(e.target.value)
  }
  
  useEffect(() => {    
    fetch('https://randomuser.me/api/?results=100')
    .then(response => response.json())
    .then(data => {
      setUsers(data.results)
      initalState.current = data.results
    })
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
        <button onClick={()=>setUsers(initalState.current)} >Estado Inicial</button>
        <input type="text" onChange={handleChange} placeholder='Ej: Germany, Australia ...' />
      </header>
      <main>
        <UsersList users={sortedUsers} showColor={color} handleRemove={onRemoveRow}/>
      </main>
     
    </>
  )
}

export default App
