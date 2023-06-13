import {
  Modal,
  Button,
  Text,
  Input,
  // useInput,
  Grid,
  Radio,
} from "@nextui-org/react";
import { AddIcon } from "../icons";
import { firebaseAddData } from "../../firebase/firebase";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

export const ModalCustomers = ({
  setVisible,
  bindings,
  dataModal,
  setDataModal,
  title,
  email,
  setRecordModified,
}) => {
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
  // const nombreCustomer = useInput("");
  // const dniCustomer = useInput("");
  // const razonSocialCustomer = useInput("");
  // const email = useInput("");
  // const ciudadCustomer = useInput("");
  // const codPostalCustomer = useInput("");
  // const provinciaCustomer = useInput("");
  // const telefonoCustomer = useInput("");
  // const fechaAltaCustomer = useInput("");
  const onSubmit = async (data) => {
    const dataArray = [];
    dataArray.push(data);
    try {
      firebaseAddData(email, "customers", dataArray, dataModal?.id);
      await setRecordModified((prevValue) => !prevValue);
      setVisible(false);
      Swal.fire({
        title: "Operación realizada",
        text: "Datos actualizados",
        icon: "success",
        button: "Iniciar sesión",
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   // setVisible(false);
  // };

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

      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Last name"
          {...register("Last name", { required: true })}
        />
        <input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          placeholder="Mobile number"
          {...register("Mobile number", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        <select {...register("Title", { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>

        <input
          {...register("Developer", { required: true })}
          type="radio"
          value="Yes"
        />
        <input
          {...register("Developer", { required: true })}
          type="radio"
          value="No"
        />

        <input type="submit" />
      </form> */}

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
                  {/* <Input
                    label="Nombre"
                    width="100%"
                    status={errors.nombre ? "error" : "default"}
                    type="text"
                    defaultValue={dataModal?.nombre}
                    {...register("nombre", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu nombre.",
                      },
                    })}
                  /> */}

                  <div className={`inputGroup ${errors.nombre && "error"}`}>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.nombre}
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Por favor ingresa tu nombre.",
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

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div className={`inputGroup ${errors.dni && "error"}`}>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.dni}
                      {...register("dni", {
                        required: {
                          value: true,
                          message: "Por favor ingresa tu D.N.I.",
                        },
                      })}
                    />
                    <label htmlFor="name">D.N.I</label>
                    {errors.dni && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.dni.message}
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
                  {/* <Input
                    label="Razón Social"
                    width="100%"
                    status={errors.razon ? "error" : "default"}
                    type="text"
                    value={dataModal.razon}
                    {...register("razon", {
                      required: {
                        value: true,
                        message: "Por favor ingresa razón",
                      },
                    })}
                  /> */}
                  <div className={`inputGroup ${errors.razon && "error"}`}>
                    <input
                      id="razon"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.razon}
                      {...register("razon", {
                        required: {
                          value: true,
                          message: "Por favor ingresa razón social",
                        },
                      })}
                    />
                    <label htmlFor="razon">Razón Social</label>
                    {errors.razon && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.razon.message}
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
                  {/* <Input
                    label="Email"
                    width="100%"
                    status={errors.email ? "error" : "default"}
                    type="text"
                    value={dataModal.email}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Por favor ingresa Email",
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Ingresa un correo electrónico válido.",
                      },
                    })}
                  /> */}
                  <div className={`inputGroup ${errors.email && "error"}`}>
                    <input
                      id="email"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.email}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Por favor ingresa Email",
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Ingresa un correo electrónico válido.",
                        },
                      })}
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && (
                      <Text color="#ff4ecd" size="$md">
                        {errors.email.message}
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
                      id="direccion"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.direccion}
                      {...register("direccion", {})}
                    />
                    <label htmlFor="direccion">Dirección</label>
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
                      id="ciudad"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.ciudad}
                      {...register("ciudad", {})}
                    />
                    <label htmlFor="ciudad">Ciudad</label>
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
                      id="codpostal"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.codpostal}
                      {...register("codpostal", {})}
                    />
                    <label htmlFor="codpostal">Codigo postal</label>
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
                    label="Provincia"
                    width="100%"
                    status={"default"}
                    type="text"
                    value={dataModal.provincia}
                    {...register("provincia", {})}
                  /> */}
                  <div className="inputGroup">
                    <input
                      id="provincia"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.provincia}
                      {...register("provincia", {})}
                    />
                    <label htmlFor="provincia">Provincia</label>
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
                    label="Teléfono"
                    width="100%"
                    status={"default"}
                    type="text"
                    value={dataModal.telefono}
                    {...register("telefono", {})}
                  /> */}
                  <div className="inputGroup">
                    <input
                      id="telefono"
                      type="text"
                      autoComplete="off"
                      defaultValue={dataModal?.telefono}
                      {...register("telefono", {})}
                    />
                    <label htmlFor="telefono">Teléfono</label>
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
                    label="Fecha de alta"
                    width="100%"
                    status={"default"}
                    type="date"
                    value={dataModal.fecha}
                    {...register("fecha", {})}
                  /> */}

                  <div className="inputGroup">
                    <input
                      id="fecha"
                      type="date"
                      autoComplete="off"
                      defaultValue={dataModal?.fecha}
                      {...register("fecha", {})}
                    />
                    <label htmlFor="fecha">Fecha</label>
                  </div>
                </div>
              </Grid>

              {/* <Grid xs={12} md={6}>
                <Input
                  rounded
                  bordered
                  
                  label="Fecha de alta"
                  placeholder="Fecha de alta"
                  color="default"
                  width="100%"
                  type="date"
                  // {...fechaAltaCustomer.bindings}
                />
              </Grid> */}

              <Grid xs={12}>
                {/* <input type="checkbox" placeholder="aaaa" {...register("aaaa", {})} /> */}
                {/* <input {...register("bbbb")} type="radio" value="hola, mundo" /> */}
                <label>
                  <input
                    type="radio"
                    name="estatus"
                    value="activo"
                    style={{
                      marginRight: "8px",
                    }}
                    {...register("estatus")}
                    checked={dataModal.estatus === "activo"}
                    onChange={handleOptionChange}
                  />
                  Activo
                </label>

                <label
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  <input
                    type="radio"
                    value="bloqueado"
                    name="estatus"
                    style={{
                      marginRight: "8px",
                    }}
                    {...register("estatus")}
                    checked={dataModal.estatus === "bloqueado"}
                    onChange={handleOptionChange}
                  />
                  Bloqueado
                </label>

                {/* 
                <Radio.Group
                  orientation="horizontal"
                  label="Estatus"
                  defaultValue="false"
                  css={{
                    width: "100%",
                  }}
                  {...register("estatus", {})}
                >
                  <Radio value="activo" size="sm">
                    Activo
                  </Radio>
                  <Radio value="bloqueado" size="sm">
                    Bloqueado
                  </Radio>
                </Radio.Group> */}
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
