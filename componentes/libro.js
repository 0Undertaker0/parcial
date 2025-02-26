const libro = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idLibro: '',
            idAutor: '',
            isbn: '',
            titulo: '',
            editorial: '',
            edicion: ''
        }
    },
    methods: {
        buscarLibro() {
            this.forms.buscarLibro.mostrar = !this.forms.buscarLibro.mostrar;
            this.$emit('buscar');
        },
        modificarLibro(libro) {
            this.accion = 'modificar';
            this.idLibro = libro.idLibro;
            this.idAutor = libro.idAutor;
            this.isbn = libro.isbn;
            this.titulo = libro.titulo;
            this.editorial = libro.editorial;
            this.edicion = libro.edicion;
        },
        guardarLibro() {
            let libro = {
                idAutor: this.idAutor,
                isbn: this.isbn,
                titulo: this.titulo,
                editorial: this.editorial,
                edicion: this.edicion
            };
            if (this.accion == 'modificar') {
                libro.idLibro = this.idLibro;
            }
            db.libros.put(libro);
            this.nuevoLibro();
        },
        nuevoLibro() {
            this.accion = 'nuevo';
            this.idLibro = '';
            this.idAutor = '';
            this.isbn = '';
            this.titulo = '';
            this.editorial = '';
            this.edicion = '';
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmLibro" name="frmLibro" @submit.prevent="guardarLibro">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Libros</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">ISBN</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="isbn" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TITULO</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="titulo" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDITORIAL</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="editorial" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDICION</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="edicion" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">ID AUTOR</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="idAutor" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                            <input type="submit" value="Guardar" class="btn btn-primary"> 
                            <input type="reset" value="Nuevo" class="btn btn-warning">
                            <input type="button" @click="buscarLibro" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};