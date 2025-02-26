const autor = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idAutor: '',
            codigo: '',
            nombre: '',
            pais: '',
            telefono: '',
            autores: [], // Nueva propiedad para almacenar la lista de autores
        };
    },
    methods: {
        // Método para listar autores desde la base de datos
        listarAutores() {
            db.autores.toArray() // Obtener todos los autores de la base de datos
                .then((autores) => {
                    this.autores = autores; // Actualizar la lista de autores
                })
                .catch((error) => {
                    console.error('Error al listar autores:', error);
                    alertify.error('Error al listar autores');
                });
        },
        // Método para mostrar/ocultar el formulario de búsqueda y emitir el evento "buscar"
        buscarAutor() {
            this.forms.buscarAutor.mostrar = !this.forms.buscarAutor.mostrar;
            this.$emit('buscar');
        },
        // Método para modificar un autor
        modificarAutor(autor) {
            this.accion = 'modificar';
            this.idAutor = autor.idAutor;
            this.codigo = autor.codigo;
            this.nombre = autor.nombre;
            this.pais = autor.pais;
            this.telefono = autor.telefono;
        },
        // Método para guardar un autor (nuevo o modificado)
        guardarAutor() {
            let autor = {
                codigo: this.codigo,
                nombre: this.nombre,
                pais: this.pais,
                telefono: this.telefono
            };
            if (this.accion == 'modificar') {
                autor.idAutor = this.idAutor;
            }
            db.autores.put(autor)
                .then(() => {
                    this.listarAutores(); // Actualizar la lista de autores después de guardar
                    this.nuevoAutor(); // Reiniciar el formulario
                    alertify.success('Autor guardado correctamente');
                })
                .catch((error) => {
                    console.error('Error al guardar autor:', error);
                    alertify.error('Error al guardar autor');
                });
        },
        // Método para reiniciar el formulario
        nuevoAutor() {
            this.accion = 'nuevo';
            this.idAutor = '';
            this.codigo = '';
            this.nombre = '';
            this.pais = '';
            this.telefono = '';
        }
    },
    // Hook de ciclo de vida: se ejecuta cuando el componente se monta
    mounted() {
        this.listarAutores(); // Llamar al método para cargar la lista de autores al montar el componente
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAutor" name="frmAutor" @submit.prevent="guardarAutor">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Autores</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="codigo" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">PAIS</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="pais" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="telefono" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarAutor" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};