const buscarLibro = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'titulo', // Cambiado a campos de libro
            libros: [], // Cambiado a lista de libros
        };
    },
    methods: {
        modificarLibro(libro) {
            this.$emit('modificar', libro); // Emitir evento para modificar libro
        },
        eliminarLibro(libro) {
            alertify.confirm('Eliminar Libro', `¿Está seguro de eliminar el libro "${libro.titulo}"?`, () => {
                db.libros.delete(libro.idLibro) // Cambiado a tabla de libros
                    .then(() => {
                        alertify.success(`Libro "${libro.titulo}" eliminado`);
                    })
                    .catch((error) => {
                        console.error('Error al eliminar libro:', error);
                        alertify.error('Error al eliminar libro');
                    });
            }, () => { });
        }
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
                                    <option value="isbn">ISBN</option>
                                    <option value="titulo">TÍTULO</option>
                                    <option value="editorial">EDITORIAL</option>
                                    <option value="edicion">EDICIÓN</option>
                                </select>
                            </th>
                            <th colspan="4">
                                <input type="text" v-model="buscar" class="form-control" placeholder="Buscar...">
                            </th>
                        </tr>
                        <tr>
                            <th>ISBN</th>
                            <th>TÍTULO</th>
                            <th>EDITORIAL</th>
                            <th>EDICIÓN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="libro in libros" @click="modificarLibro(libro)" :key="libro.idLibro">
                            <td>{{ libro.isbn }}</td>
                            <td>{{ libro.titulo }}</td>
                            <td>{{ libro.editorial }}</td>
                            <td>{{ libro.edicion }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click.stop="eliminarLibro(libro)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};