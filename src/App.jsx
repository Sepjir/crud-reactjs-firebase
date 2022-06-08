import React from 'react';
import {firebase} from './firebase'

function App() {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState("")
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
        console.log(arrayData)
        setTareas(arrayData)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])

  const agregarTarea = async (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log("Elemento vacio")
      return
    }
    try {

      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }

      const data = await db.collection("tareas").add(nuevaTarea)
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setTarea("")
    
    } catch (error) {
      console.log(error)
      
    }
  }

  const eliminarTarea = async (id) => {
    try {

      const db = firebase.firestore()
      await db.collection("tareas").doc(id).delete()

      const arrayFiltrado = tareas.filter( item => item.id !== id)
      setTareas(arrayFiltrado)
      
    } catch (error) {
      console.log(error)
    }

  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editarTarea = async (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log("vacio")
      return
    }

    try {

      const db = firebase.firestore()
      await db.collection("tareas").doc(id).update({
        name: tarea
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
      ))

      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea("")
      setId("")
      
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className='list-group'>
            {
              tareas.map( item => (
                <li className='list-group-item' key={item.id}>
                  {item.name}
                  <button className="btn btn-danger btn-sm float-end" onClick={() => eliminarTarea(item.id)}>Eliminar</button>
                  <button className="btn btn-warning btn-sm float-end mx-2" onClick={() => activarEdicion(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar Tarea':'Agregar Tarea'
            }
          </h3>
          <form onSubmit={modoEdicion ? editarTarea :agregarTarea}>
            <input 
              type="text"
              placeholder='Ingrese tarea'
              className='form-control mb-2'
              onChange={e => setTarea(e.target.value)}
              value={tarea} />

              <button className={
                modoEdicion ? "btn btn-warning btn-block col-12": "btn btn-dark btn-block col-12"
              } type='submit'>
                {
                  modoEdicion ? 'Editar':'Agregar'
                }
              </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default App;
