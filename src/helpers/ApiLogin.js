const url = "http://localhost:3000/api/auth/login";

export const authLogin = async (datos) => {
  try {
    //lo que funciona
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    //los errores
    console.log(error);
    return { msg: "No se conectó con backend" };
  }
};
