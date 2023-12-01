const URL = "http://127.0.0.1:5000/"  

document.getElementById('formulario').addEventListener('submit', function (event) { 
    event.preventDefault();
    var formData = new FormData(); 
    formData.append('codigo', document.getElementById('codigo').value); 
    formData.append('descripcion', document.getElementById('descripcion').value); 
    formData.append('cantidad', document.getElementById('cantidad').value); 
    formData.append('precio', document.getElementById('precio').value); 
    fetch(URL + 'platos', { 
        method: 'POST', 
        body: formData 
        }) 
        .then(function (response) { 
            if (response.ok) { 
                return response.json();
            } else { 
                throw new Error('Error al agregar el producto.'); 
            } 
        })
        .then(function () {
            alert('Producto agregado correctamente.');
        })
        .catch(function (error) {
            alert('Error al agregar el producto.');
            console.error('Error:', error);
        })
        .finally(function () {
            document.getElementById('codigo').value = ""; 
            document.getElementById('descripcion').value = ""; 
            document.getElementById('cantidad').value = ""; 
            document.getElementById('precio').value = ""; 
        });
    })

