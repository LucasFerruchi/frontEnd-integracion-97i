const url = "http://localhost:8080/api/cursos";
const token = JSON.parse(localStorage.getItem("token"));
const limite = 6;
//Traer cursos
export const getCursos = async (pagina = 0) => {};

//Traer cursos por el id
export const getCursoById = async (id) => {};

//crear un curso
export const crearCurso = async (datos) => {};

//Actualizar un curso
export const actualizarCurso = async (id, datos) => {};

//Borrar un curso
export const borrarCurso = async (id) => {};
