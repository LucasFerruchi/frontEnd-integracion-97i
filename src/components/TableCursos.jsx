import React, { useState } from "react";

//importar funcion para borrar cursos de la API
import { borrarCurso } from "../helpers/cursoApi";

//Librería sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//import componente de modal para editar
import ModalEdit from "./ModalEdit";

const TableCursos = ({ cursos = [] }) => {
  const MySwal = withReactContent(Swal);

  //Manejo del modal--------------------
  const [show, setShow] = useState(false);
  const [cid, setCid] = useState(null);

  //manejar cierre de modal
  const handleClose = () => {
    setCid(null);
    setShow(false);
  };

  //Manejar apertura de modal
  const handleShow = (id) => {
    setCid(id);
    setShow(true);
  };

  //borrrar curso
  const inactivarCurso = async (nombre, id) => {
    MySwal.fire({
      title: `Está seguro que quiere inactivar el curso ${nombre}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        borrarCurso(id).then((resultado) => {
          // console.log(resultado)
          MySwal.fire("", `${resultado.msg}`, "success");
        });
      } else if (result.isDenied) {
        MySwal.fire("El curso no se inactivó", "", "info");
      }
    });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Destacado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso._id}>
              <th>{curso.nombre}</th>
              <td>{curso.categoria.nombre}</td>
              <td>{curso.precio}</td>
              <td>
                {curso.destacado ? (
                  <i className="fa fa-star" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                )}
              </td>
              <td>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleShow(curso._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => inactivarCurso(curso.nombre, curso._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show && <ModalEdit show={show} handleClose={handleClose} cid={cid} />}
    </>
  );
};

export default TableCursos;
