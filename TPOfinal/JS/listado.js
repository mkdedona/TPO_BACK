const URL = "http://127.0.0.1:5000/"

fetch(URL + 'platos') 
    .then(function (response) { 
        if (response.ok) { 
            return response.json();
        } else {
            throw new Error('Error al obtener los platos.');
            } 
        }) 
        .then(function (data) { 
            console.log(data);
            let tablaPlatos = document.getElementById('tablaPlatos');
            for (let plato of data) {
                let fila = document.createElement('tr');
                let celdaCodigo = document.createElement('td');
                let celdaDescripcion = document.createElement('td');
                let celdaCantidad = document.createElement('td');
                let celdaPrecio = document.createElement('td');

                celdaCodigo.textContent = plato[0];
                celdaDescripcion.textContent = plato[1];
                celdaCantidad.textContent = plato[2];
                celdaPrecio.textContent = plato[3];

                fila.appendChild(celdaCodigo);
                fila.appendChild(celdaDescripcion);
                fila.appendChild(celdaCantidad);
                fila.appendChild(celdaPrecio);

                tablaPlatos.appendChild(fila);
            } 
        }) 
        .catch(function (error) {
            alert('Error al agregar el plato.');
            console.error('Error:', error);
        })