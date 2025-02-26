const { createApp } = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_biblioteca'); // Cambiado a un nombre más general

// Definir la base de datos
db.version(1).stores({
    autores: '++idAutor, codigo, nombre, pais, telefono',
    libros: '++idLibro, idAutor, isbn, titulo, editorial, edicion' // Nueva tabla para libros
});

const app = createApp({
    components: {
        autor,
        buscarAutor,
        libro, // Registrar el componente de libro
        buscarLibro // Registrar el componente de buscarLibro
    },
    data() {
        return {
            forms: {
                autor: { mostrar: false },
                buscarAutor: { mostrar: false },
                libro: { mostrar: false }, // Nuevo formulario de libro
                buscarLibro: { mostrar: false } // Nuevo formulario de buscarLibro
            }
        };
    },
    methods: {
        buscar(form, metodo) {
            if (this.$refs[form] && this.$refs[form][metodo]) {
                this.$refs[form][metodo](); // Llamar al método en el componente
            } else {
                console.error(`El método ${metodo} no existe en el componente ${form}`);
            }
        },
        abrirFormulario(componente) {
            // Ocultar todos los formularios primero
            for (let key in this.forms) {
                this.forms[key].mostrar = false;
            }
            // Mostrar el formulario seleccionado
            this.forms[componente].mostrar = !this.forms[componente].mostrar;
        },
        modificar(form, metodo, datos) {
            if (this.$refs[form] && this.$refs[form][metodo]) {
                this.$refs[form][metodo](datos); // Llamar al método en el componente
            } else {
                console.error(`El método ${metodo} no existe en el componente ${form}`);
            }
        }
    }
});

app.mount('#app');