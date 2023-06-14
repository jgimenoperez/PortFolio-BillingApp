import {
  Modal,
  Button,
  Text,
  Grid,
} from "@nextui-org/react";
import { AddIcon } from "../icons";
import { firebaseAddData } from "../../firebase/firebase";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { actions } from "../../types/types";

export const ModalProducts = ({
  setVisible,
  bindings,
  dataModal,
  setDataModal,
  title,
  email,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, []);

  const handleOptionChange = (event) => {
    setDataModal({ ...dataModal, estatus: event.target.value });
  };

  const onSubmit = async (data) => {
    const dataArray = [];
    dataArray.push(data);
    try {
      await firebaseAddData(email, "products", dataArray, dataModal?.id);
      await dispatch({
        type: actions.UPATE_DATA_MAINTENANCE,
        payload: {
          table: "products",
        },
      });

      setVisible(false);
      Swal.fire({
        title: "Operación realizada",
        text: "Datos actualizados",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        button: "Ok",
      });
    }

    
  };

  return (
    <div>
      <Button
        auto
        shadow
        color="gradient"
        onPress={() => {
          setDataModal({ estatus: "activo" });
          setVisible(true);
        }}
        css={{ marginTop: "25px" }}
        icon={<AddIcon size={20} fill="#FF0080" />}
      >
        Nuevo
      </Button>


      <Modal
        width="800px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        animated="true"
        onOpen={reset}
        {...bindings}
      >
        {" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>
            <Text
              h2
              size={60}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              <strong>{title}</strong>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Grid.Container gap={2} justify="center">
              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >

                  <div className={`inputGroup ${errors.codigo && "error"}`}>
                    <input
                      id="codigo"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.codigo}
                      {...register("codigo", {
                        required: {
                          value: true,
                          message: "Por favor ingresa el código del producto.",
                        },
                      })}
                    />
                    <label htmlFor="name">Código</label>
                    {errors.codigo && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.codigo.message}
                      </Text>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div className={`inputGroup ${errors.nombre && "error"}`}>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.nombre}
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Por favor ingresa nombre del producto",
                        },
                      })}
                    />
                    <label htmlFor="name">Nombre</label>
                    {errors.nombre && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.nombre.message}
                      </Text>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid xs={12}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div className={`inputGroup ${errors.descripcion && "error"}`}>
                    <input
                      id="descripcion"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.descripcion}
                      {...register("descripcion", {
                        required: {
                          value: true,
                          message: "Por favor ingresa la descripción del producto",
                        },
                      })}
                    />
                    <label htmlFor="razon">Descripción</label>
                    {errors.descripcion && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.descripcion.message}
                      </Text>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid xs={12}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div className={`inputGroup ${errors.precio && "error"}`}>
                    <input
                      id="precio"
                      type="number" step="0.01" min="0" 
                      autoComplete="off"
                      defaultValue={dataModal?.precio}
                      {...register("precio", {
                        required: {
                          value: true,
                          message: "Por favor ingresa precio",
                        },
                        // pattern: {
                        //   value: /^\S+@\S+$/i,
                        //   message: "Ingresa un correo electrónico válido.",
                        // },
                      })}
                    />
                    <label htmlFor="precio">Precio</label>
                    {errors.email && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.email.precio}
                      </Text>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  {/* <Input
                    label="Dirección"
                    width="100%"
                    status={"default"}
                    type="text"
                    value={dataModal.direccion}
                    {...register("direccion", {})}
                  /> */}

                  <div className="inputGroup">
                    <input
                      id="stock"
                      type="number"
                      autoComplete="off"
                      defaultValue={dataModal?.stock}
                      {...register("stock", {})}
                    />
                    <label htmlFor="stock">Stock</label>
                  </div>
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  {/* <Input
                    label="Ciudad"
                    width="100%"
                    status={"default"}
                    type="text"
                    value={dataModal.ciudad}
                    {...register("ciudad", {})}
                  /> */}

                  <div className="inputGroup">
                    <input
                      id="categoria"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.categoria}
                      {...register("categoria", {})}
                    />
                    <label htmlFor="categoria">Categoria</label>
                  </div>
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  {/* <Input
                    label="Cod Postal"
                    width="100%"
                    status={"default"}
                    type="text"
                    value={dataModal.codpostal}
                    {...register("codpostal", {})}
                  /> */}
                  <div className="inputGroup">
                    <input
                      id="proveedor"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.proveedor}
                      {...register("proveedor", {})}
                    />
                    <label htmlFor="proveedor">Proveedor</label>
                  </div>
                </div>
              </Grid>

            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="error"
              onPress={() => {
                setVisible(false);
              }}
            >
              Cerrar
            </Button>
            <Button auto type="submit">
              Aceptar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
