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
            let tablaPlatos = document.getElementById('tablaPlatos');
            for (let plato of data) {
                let fila = document.createElement('tr');
                fila.innerHTML = '<td>' + plato.codigo + '</td>' +
                    '<td>' + plato.descripcion + '</td>' +
                    '<td align="right">' + plato.cantidad + '</td>' + 
                    '<td align="right">' + plato.precio + '</td>';
                tablaPlatos.appendChild(fila);
                } 
        }) 
        .catch(function (error) {
            alert('Error al agregar el plato.');
            console.error('Error:', error);
        })
        