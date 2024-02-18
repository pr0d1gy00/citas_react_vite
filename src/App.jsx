import { useState, useEffect } from "react"
import Header from "./components/header"
import Formulario from "./components/Formulario"
import ListadoPaciente from "./components/ListadoPaciente"

function App() {
  // JSON.parse(localStorage.getItem('pacientes')) ?? 
  const INITIAL = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [pacientes,setPacientes] = useState(INITIAL);
  const [paciente, setPaciente] = useState({});

  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  },[pacientes])
  
  const eliminarPaciente = (id)=>{
    const pacientesActualizados=pacientes.filter(paciente=>paciente.id !== paciente.id)

    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-[1px]">
      <Header
      />
      <div className="mt-12 md:flex ">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPaciente
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
