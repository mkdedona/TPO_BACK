const URL = "http://127.0.0.1:5000/" 
const app = Vue.createApp({
    data() { 
        return { 
            codigo: '', 
            descripcion: '', 
            cantidad: '', 
            precio: '', 
            mostrarDatosPlato: false,
         };
    },
    
    methods: {
        obtenerPlato() {
            fetch(URL + 'platos/' + this.codigo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error al obtener los datos del plato.')
                }
            })
            .then(data => {
                this.descripcion = data.descripcion; 
                this.cantidad = data.cantidad; 
                this.precio = data.precio; 
                this.mostrarDatosPlato = true;
            })
            .catch(error => {
                console.log(error);
                alert('Código no encontrado.');
            })
        },

        guardarCambios() { 
            const formData = new FormData(); 
            formData.append('codigo', this.codigo); 
            formData.append('descripcion', this.descripcion); 
            formData.append('cantidad', this.cantidad); 
            formData.append('precio', this.precio);
            
            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error al guardar los cambios del plato.')
                    } 
                })
                .then(data => {
                    alert('Plato actualizado correctamente.'); 
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el plato.');
                });
            },

            limpiarFormulario() { 
                this.codigo = ''; 
                this.descripcion = ''; 
                this.cantidad = '';
                this.precio = '';
                this.mostrarDatosPlato = false;
                } 
            } 
        }); 
        app.mount('#app');

