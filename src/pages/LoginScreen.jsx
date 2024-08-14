import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//importar función de autenticación de API
import { authLogin } from "../helpers/ApiLogin";

import logo from "../assets/logo.png";
import "../css/login.css";

//importar componente para mensaje
import MessageApp from "../components/MessageApp";

const LoginScreen = ({ iniciarSesion, guardarUsuario }) => {
  const navigate = useNavigate(); // defino función para redireccionar

  //Defino estados
  // EStado para guardar correo y password de los inputs
  const [inputCorreo, setInputCorreo] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  //Estado para obtener el mensaje de resultado de la petición
  const [resultado, setResultado] = useState(null);

  //Estado para manejar un loading o carga de datos
  const [loading, setLoading] = useState(false);

  //Función del formulario de login:
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    //obtener datos ingresados
    const datos = {
      correo: inputCorreo,
      password: inputPassword,
    };
    //hacer petición a la API
    const resp = await authLogin(datos);
    console.log(resp);
    if (resp?.token) {
      //guardar token
      localStorage.setItem("token", JSON.stringify(resp.token));
      //ejecutar función de iniciar sesión
      iniciarSesion();
      //Guardar datos del usuario
      guardarUsuario(resp.usuario);
      //redireccionar
      navigate("/");
    }
    setResultado(resp);
    setLoading(false);
  };

  return (
    <div className="bg-dark">
      <div className="container container-login">
        <div className="row px-2">
          <div className="col-12 col-md-4 offset-md-4 card-login">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo} alt="logo" />
            </div>
            <h3 className="text-center mt-2">
              <span>
                <i className="fa fa-user-circle" aria-hidden="true"></i>{" "}
              </span>
              Inicio de sesión
            </h3>
            <form onSubmit={handleLogin}>
              <div className="mt-3">
                <label className="fw-bold">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={inputCorreo}
                  onChange={(e) => setInputCorreo(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="fw-bold">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
              </div>
              <div className="mt-3 d-grid">
                <button className="btn btn-dark" disabled={loading && true}>
                  Iniciar
                </button>
              </div>
            </form>
            {resultado?.msg && (
              <div className="mt-2">
                <MessageApp mensaje={resultado.msg} />
              </div>
            )}
            {/*  Mostrar componente de mensaje obtenido en la respuesta de la API */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
