const listaU = document.getElementById("body-usuarios")
const boton = document.getElementById("boton")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const pais = document.getElementById("pais")
const indice = document.getElementById("indice")
const btn_limpiar = document.getElementById("limpiar")

let usuarios = [];
let botonesEliminar = null;
let botonesModificar = null;


function IncorporarUsuarios () {
    const usuariosRender = usuarios.map((usuario,indice) => 
      `<tr>
        <td>${usuario.nombre ? usuario.nombre : "Vacio"}</td>
        <td>${usuario.apellido ? usuario.apellido : "Vacio"}</td>
        <td>${usuario.pais ? usuario.pais : "Vacio"}</td>
        <td><a class="ver" href = "/index2.html?usuario=${indice}">Ver</a></td>
        <td><button class="editar" data-indice = ${indice}>Modificar</button></td>
        <td><button class="eliminar" data-indice = ${indice}>Eliminar</button></td> 
      </tr>`)
    .join("")
    console.log(usuariosRender)
    listaU.innerHTML = usuariosRender

    botonesEliminar = document.getElementsByClassName("eliminar");
    Array.from(botonesEliminar).forEach(botonEliminar => {
        botonEliminar.onclick = EliminarUsuario;
    });

    botonesModificar = document.getElementsByClassName("editar");
    Array.from(botonesModificar).forEach(botonModificar => {
        botonModificar.onclick = ModificarUsuario;
    })
  }
  
actualizar();

  function EnviarDatos (e)
  {
    e.preventDefault();
    const accion = e.target.innerText;
    console.log("Acción:",accion);

    const datos = 
    {
        nombre:nombre.value, 
        apellido: apellido.value, 
        pais: pais.value
    };

    let url = null;
    let method = null;

    if(accion ==="Crear")
    {
      url = `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios`;
      method = "POST"
    }
    else if(accion === "Modificar")
    {
      if(indice.value)
      {
        url = `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${indice.value}`;
        method = "PUT"
      }
      else
      {
        return;
      }
    }
    else
    {
      return;
    }


    fetch(url,
    {
        method,
        headers: 
        {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
    }).then(respuesta => respuesta.json())
      .then(respuestaJSON => 
        {
            console.log("Datos: ",respuestaJSON)
            actualizar();
        })
      .catch(razon => console.log("ERROR:",razon))

      Limpiar();
  }

  function EliminarUsuario (e)
  {
    e.preventDefault();
    console.log("Eliminando Usuario",e)
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.indice}`,
    {
        method:"DELETE"
    }).then(respuesta => respuesta.json())
      .then(respuestaJSON => 
        {
            console.log("Datos: ",respuestaJSON)
            actualizar();
        })
      .catch(razon => console.log("ERROR:",razon))
  }

  function ModificarUsuario (e)
  {
    e.preventDefault();
    console.log("Modificando Usuario",e)

    if(e.target.dataset.indice)
    {
      const UsuarioSeleccionado = usuarios[e.target.dataset.indice]
      console.log(UsuarioSeleccionado);
  
      nombre.value = UsuarioSeleccionado.nombre ? UsuarioSeleccionado.nombre : "";
      apellido.value = UsuarioSeleccionado.apellido ? UsuarioSeleccionado.apellido : "";
      pais.value= UsuarioSeleccionado.pais ? UsuarioSeleccionado.pais : "";
      indice.value = e.target.dataset.indice;
      boton.innerText="Modificar"
    }
    else
    {
      boton.innerText="Crear"
    }

  }

  function actualizar ()
  {
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
    .then(usuarios=>usuarios.json())
    .then(usuariosJSON => 
        {
            usuarios = usuariosJSON
            console.log(usuariosJSON)
            IncorporarUsuarios()
        })

  }

  function Limpiar()
  {
    boton.innerText="Crear";
    nombre.value="";
    apellido.value ="";
    pais.value="";
  }

  boton.onclick = EnviarDatos;
  btn_limpiar.onclick = Limpiar;