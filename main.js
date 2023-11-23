
async function fetchData() {
    try {
      const response = await fetch('datos.json');
      const data = await response.json();

      const selectElement = document.getElementById('hora');

      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.turno;
        option.textContent = item.hora;
        selectElement.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();

  let horasSeleccionadas = [];

  document.getElementById('asignarTurno').addEventListener('click', function () {
      const nombre = document.getElementById('nombre').value;
      const servicio = document.getElementById('servicio').value;
      const hora = document.getElementById('hora').value;

      if (!nombre.trim()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingresa un nombre antes de asignar un turno.",

          });
        return;
    }

      if (horasSeleccionadas.includes(hora)) {
          alert("La hora seleccionada ya ha sido asignada. Por favor, elige otra hora.");
          return;
      }
      

      if (parseInt(hora) <= 20) {
        const turnoTexto = `
        ${nombre} - Servicio: ${servicio} - Hora: ${
            parseInt(hora) <= 12 ? `${hora}:00 AM` : `${hora - 12}:00 PM`
          }`;
    
        const nuevoP = document.createElement('p');
        nuevoP.textContent = turnoTexto;
        document.getElementById('turnosAsignados').appendChild(nuevoP);
    
        const horaSelect = document.getElementById('hora');
        const horaValue = horaSelect.value;
    
        let optionToRemove = null;
    
        for (let i = 0; i < horaSelect.options.length; i++) {
          if (parseInt(horaSelect.options[i].value) === parseInt(horaValue)) {
            optionToRemove = horaSelect.options[i];
            break;
          }
        }
    
        if (optionToRemove) {
          horaSelect.removeChild(optionToRemove);
        }
    
        horasSeleccionadas.push({hora});
      } 

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Turno asignado con exito",
        showConfirmButton: false,
        timer: 2000
      });
    });
    
    // Función para realizar la búsqueda de turnos en el localStorage
    function buscarTurnos() {
      const buscarInput = document.getElementById('buscarInput');
      const resultadosBusqueda = document.getElementById('resultadosBusqueda');
    
      const nombreABuscar = buscarInput.value.trim();
      if (nombreABuscar === "") {
        resultadosBusqueda.textContent = "Ingrese un nombre para buscar.";
        return;
      }
    
      let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    
      const resultados = turnos.filter(turno => turno.includes(nombreABuscar));
    
      if (resultados.length > 0) {
        const listaResultados = document.createElement('ul');
        resultados.forEach(resultado => {
          const item = document.createElement('li');
          item.textContent = resultado;
          listaResultados.appendChild(item);
        });
        resultadosBusqueda.innerHTML = "";
        resultadosBusqueda.appendChild(listaResultados);
      } else {
        resultadosBusqueda.textContent = "No se encontraron resultados.";
      }
    }
    
    document.getElementById('buscarTurno').addEventListener('click', buscarTurnos);