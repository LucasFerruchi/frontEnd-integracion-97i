import React, { useEffect, useState } from "react";
import { getCursoById, actualizarCurso } from "../helpers/cursoApi";
import { getCategorias } from "../helpers/categoriaApi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Modal from "react-bootstrap/Modal";

const ModalEdit = ({ show, handleClose, cid }) => {
  const MySwal = withReactContent(Swal);

  const [curso, setCurso] = useState(null);
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    traerDatosDeCurso();
    traerCategorias();
  }, []);

  const traerDatosDeCurso = async () => {
    //petición a la API de curso por id
    const { curso } = await getCursoById(cid);
    setCurso(curso);
  };

  const traerCategorias = async () => {
    //petición a la API de categorias
    const { categorias } = await getCategorias();
    setCategorias(categorias);
  };

  const handleChange = (e) => {
    //Manejar el evento change del formulario y guardar los datos en el estado
    let valueCheck = false;
    if (e.target.name === "destacado") {
      if (e.target.checked) {
        valueCheck = true;
      } else {
        valueCheck = false;
      }
      setCurso({
        ...curso,
        [e.target.name]: valueCheck,
      });
    } else {
      setCurso({
        ...curso,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Ejecutar funcion para actualizar el curso con los datos del estado
    await actualizarCurso(cid, curso);
    MySwal.fire("Curso actualizado", "", "success");
    //cerrar el modal luego de editar
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {curso ? (
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={curso.nombre}
                name="nombre"
                onChange={handleChange}
              />
              <label className="fw-bold">descripción</label>
              <textarea
                className="form-control"
                value={curso.descripcion}
                onChange={handleChange}
                name="descripcion"
              ></textarea>
              <label className="fw-bold">Precio</label>
              <input
                type="number"
                className="form-control"
                value={curso.precio}
                onChange={handleChange}
                name="precio"
              />
              <div className="my-2">
                <p>
                  <span className="fw-bold">Categoría actual:</span>{" "}
                  {curso.categoria.nombre}
                </p>
                <label className="fw-bold">Cambiar categoría</label>
                <select
                  className="form-select"
                  name="categoria"
                  onChange={handleChange}
                >
                  <option value={curso.categoria.nombre}>
                    Elije una categoría
                  </option>
                  {categorias &&
                    categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={curso.destacado}
                  onChange={handleChange}
                  name="destacado"
                />
                <label className="form-check-label fw-bold">Destacado</label>
              </div>
              <div className="d-grid mt-2">
                <button className="btn btn-warning">Actualizar</button>
              </div>
            </form>
          ) : (
            <h3>Cargando...</h3>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEdit;
