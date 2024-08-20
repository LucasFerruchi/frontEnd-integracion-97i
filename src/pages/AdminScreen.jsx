import React, { useEffect, useState } from "react";

//importar componente de tabla
import TableCursos from "../components/TableCursos";

//traer los cursos
import { getCursos } from "../helpers/cursoApi";

const AdminScreen = () => {
  //estado para controlar los cursos
  const [cursos, setCursos] = useState([]);

  //Total de cursos
  const [totalCursos, setTotalCursos] = useState(0);

  //cargar cursos en el montaje
  useEffect(() => {
    traerCursos();
  }, [cursos]);

  const traerCursos = async () => {
    //Ejecutar petición a la API
    const { cursos, total } = await getCursos();
    setCursos(cursos);
    setTotalCursos(total);
  };

  return (
    <div className="bg-dark">
      <div className="container bg-light min-vh-100">
        <div className="row  py-5">
          <div className="col text-center ">
            <h1>
              <span>
                <i className="fa fa-cogs" aria-hidden="true"></i>{" "}
              </span>
              Panel administrador
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            {/* Tabla de cursos*/}
            {cursos.length > 0 ? (
              <>
                <h4>Total de cursos: {totalCursos}</h4>

                <TableCursos cursos={cursos} traerCursos={traerCursos} />
              </>
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
