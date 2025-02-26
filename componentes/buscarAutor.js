const buscarAutor = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            autores: [] // Lista de autores
        };
    },
    methods: {
        // Método para listar autores desde la base de datos
        listarAutores() {
            console.log("Ejecutando listarAutores...");
            if (db && db.autores) {
                db.autores.toArray()
                    .then((autores) => {
                        this.autores = autores;
                        console.log("Autores cargados:", this.autores);
                    })
                    .catch((error) => {
                        console.error('Error al listar autores:', error);
                        alertify.error('Error al listar autores');
                    });
            } else {
                console.error("Error: La base de datos no está inicializada correctamente.");
            }
        },
        // Método para modificar un autor
        modificarAutor(autor) {
            this.$emit('modificar', autor);
        },
        // Método para eliminar un autor
        eliminarAutor(autor) {
            alertify.confirm('Eliminar Autor', `¿Está seguro de eliminar al autor ${autor.nombre}?`, () => {
                db.autores.delete(autor.idAutor)
                    .then(() => {
                        this.listarAutores(); // Actualizar la lista después de eliminar
                        alertify.success(`Autor ${autor.nombre} eliminado`);
                    })
                    .catch((error) => {
                        console.error('Error al eliminar autor:', error);
                        alertify.error('Error al eliminar autor');
                    });
            }, () => { });
        }
    },
    mounted() {
        console.log("Componente buscarAutor montado");
        this.listarAutores();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>BUSCAR POR</th>
                            <th>
                                <select v-model="buscarTipo" class="form-control">
                                    <option value="codigo">CÓDIGO</option>
                                    <option value="nombre">NOMBRE</option>
                                    <option value="pais">PAÍS</option>
                                    <option value="telefono">TELÉFONO</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" v-model="buscar" class="form-control" placeholder="Buscar...">
                            </th>
                        </tr>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOMBRE</th>
                            <th>PAÍS</th>
                            <th>TELÉFONO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="autor in autores" @click="modificarAutor(autor)" :key="autor.idAutor">
                            <td>{{ autor.codigo }}</td>
                            <td>{{ autor.nombre }}</td>
                            <td>{{ autor.pais }}</td>
                            <td>{{ autor.telefono }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click.stop="eliminarAutor(autor)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};
