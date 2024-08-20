const url = "http://localhost:3000/api/categorias";
const token = JSON.parse(localStorage.getItem("token"));
const limite = 6;

//traer categorias - GET
export const getCategorias = async (desde = 0) => {
  try {
    const resp = await fetch(url + "?limite=" + limite + "&desde=" + desde, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la informacion!");
  }
};

//Traer categoría por id - GET
export const getCategoriaById = async (id) => {};

//crear categoria - POST
export const crearCategoria = async () => {};

//actualizar Categoría - PUT
export const actualizarCategoria = async (id) => {};

//borrar Categoría - DELETE
export const borrarCategoria = async (id) => {};
