const url = "http://localhost:8080/api/categorias";
const token = JSON.parse(localStorage.getItem("token"));
const limite = 10;

export const getCategorias = async (pagina = 0) => {
  try {
    const resp = await fetch(url + "?limite=" + limite + "&desde=" + pagina, {
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
    throw new Error("No se pudo obtener la info");
  }
};

//Traer categorías por el id
export const getCategoriaById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
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
    throw new Error("No se pudo obtener la info");
  }
};

//crear categoria
export const crearCategoria = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "no se conectó al backend" };
  }
};

//Actualizar Categoría
export const actualizarCategoria = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "no se conectó al backend" };
  }
};

//Borrar Categoría
export const borrarCategoria = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "no se conectó al backend" };
  }
};
