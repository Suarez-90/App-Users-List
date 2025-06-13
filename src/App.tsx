import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import type { Users } from "./types.d";
import { SortBy } from "./types.d";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [color, setColor] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const initalState = useRef(users);
  
  const onHandleSorting = (sort: SortBy)=>{
    const newSorting = sorting === SortBy.NONE ? sort: SortBy.NONE
    setSorting(newSorting)
  }
  
  const filterUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
     if (sorting === SortBy.COUNTRY){
       return filterUsers.toSorted((a, b) =>
           a.location.country.localeCompare(b.location.country)
         )}
     if (sorting === SortBy.LAST){
      return filterUsers.toSorted((a, b) =>
           a.name.last.localeCompare(b.name.last)
         )}
     if (sorting === SortBy.NAME){
       return filterUsers.toSorted((a, b) =>
           a.name.first.localeCompare(b.name.first)
         )}
      return filterUsers;
  }, [filterUsers, sorting]);

  const onRemoveRow = (id: string) => {
    setUsers(users.filter((user) => user.login.uuid !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCountry(e.target.value);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        initalState.current = data.results;
      })
      .catch((err) => {
        throw new Error("Error while fetching data " + err);
      });
  }, []);

  return (
    <>
      <h1>Listado de Usuarios</h1>
      <header
        style={{
          marginBottom: "2em",
          display: "flex",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <button onClick={() => setColor(!color)}>
          {color && "No "}Colorear Filas
        </button>
        <button onClick={()=>onHandleSorting(SortBy.COUNTRY)}>
          {sorting === SortBy.COUNTRY && "No "}Ordenar por País
        </button>
        <button onClick={() => setUsers(initalState.current)}>
          Estado Inicial
        </button>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Ej: Germany, Australia ..."
        />
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          showColor={color}
          handleRemove={onRemoveRow}
          handleSorting={onHandleSorting}
        />
      </main>
    </>
  );
}

export default App;
