import {useState, useEffect} from 'react';
import Error from './Error';

function Formulario({pacientes, setPacientes,paciente,setPaciente}) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] =useState(false);



  useEffect(()=>{
    if(Object.keys(paciente).length>0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])



  const generarId= ()=>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }
  const handleSubmit= (e)=>{
    e.preventDefault();

    //validacion del formulario
    if([nombre, propietario,email,fecha,sintomas].includes('')){
      setError(true);
      return;
    }
    setError(false);

    //objeto de pacientes

    const objetoPaciente={
      nombre : nombre,
      propietario : propietario,
      email : email,
      fecha : fecha,
      sintomas : sintomas,
    
    }

    if(paciente.id){
      //editando registro
      objetoPaciente.id=paciente.id      
      const pacientesActualizados=pacientes.map(pacienteState=>pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      //Nuevo registro}
      objetoPaciente.id=generarId();
      setPacientes([...pacientes,objetoPaciente]);
    //   
    }
      //reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')  
  }
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento paciente</h2>

      <p className="text-lg | mt-5 | mb-10 | text-center">
        añade pacientes y {""}
        <span className="text-indigo-600 | font-bold | text-lg">Administralos</span>
      </p>
      
      <form onSubmit={handleSubmit} action="" className="bg-white | shadow-md | rounded-lg | py-10 | px-5 | mb-10">

        {error && <Error>
                    <p>
                      Todos los campos son obligatorios
                    </p>
                  </Error> }

        <div className="mb-5">
          <label htmlFor="mascota" className="block | text-gray-70 | uppercase | font-bold">Nombre Mascota</label>
          <input type="text" id="mascota"
            placeholder="Nombre de la mascota"
            className="border-2 | w-full | p-2 | mt-2 | placeholder-gray-600 | rounded-lg"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="Propietario" className="block | text-gray-70 | uppercase | font-bold">Nombre Propietario</label>
          <input type="text" id="Propietario"
            placeholder="Nombre del propietario"
            className="border-2 | w-full | p-2 | mt-2 | placeholder-gray-600 | rounded-lg"
            value={propietario}
            onChange={(e)=>setPropietario(e.target.value)}
            />
        </div>

        
        <div className="mb-5">
          <label htmlFor="Email" className="block | text-gray-70 | uppercase | font-bold">Email</label>
          <input type="email" id="Email"
            placeholder="Email"
            className="border-2 | w-full | p-2 | mt-2 | placeholder-gray-600 | rounded-lg"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="Alta" className="block | text-gray-70 | uppercase | font-bold">Alta</label>
          <input type="date" id="Alta"
            placeholder="Alta"
            className="border-2 | w-full | p-2 | mt-2 | placeholder-gray-600 | rounded-lg"
            value={fecha}
            onChange={(e)=>setFecha(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="Sintomas" className="block | text-gray-70 | uppercase | font-bold">Sintomas</label>
          <textarea 
            id="Sintomas"
            placeholder="Describe los Sintomas"
            className="border-2 | w-full | p-2 | mt-2 | placeholder-gray-600 | rounded-lg"
            value={sintomas}
            onChange={(e)=>setSintomas(e.target.value)}
            />
        </div>
        <input type="submit"
          className="bg-indigo-600 | w-full | p-3 | text-white | uppercase | font-bold | hover:bg-indigo-700 | cursor-pointer | transition-all"
          value={paciente.id ? 'Editar paciente' : "Agregar paciente"}/>
      </form>
    </div>
  )
}

export default Formulario

