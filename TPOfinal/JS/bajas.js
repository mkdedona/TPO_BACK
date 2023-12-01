const URL = "http://127.0.0.1:5000/" 
const app = Vue.createApp({ 
    data() {
        return { 
            platos: [] 
        }
         
    }, 
            
    methods: { 
        obtenerPlatos() { // Obtenemos el contenido del inventario 
            fetch(URL + 'platos') 
            .then(response => {
                if (response.ok) { return response.json(); } 
            }) 
            .then(data => {
                 
                this.productos = data;
            }) 
            .catch(error => { 
                console.log('Error:', error);
                alert('Error al obtener los platos.');
             });
            }, 
            eliminarPlato(codigo) { 
                if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
                    fetch(URL + `platos/${codigo}`, { method: 'DELETE' }) 
                    .then(response => {
                        if (response.ok) {
                            this.platos = this.platos.filter(plato => plato.codigo !== codigo); alert('Plato eliminado correctamente.');
                        }
                    }) 
                    .catch(error => { 
                        alert(error.message);
                     });
                } 
            } 
        }, 
        mounted() { //Al cargar la página, obtenemos la lista de productos 
            this.obtenerProductos(); 
        } 
    }); 
    app.mount('body');