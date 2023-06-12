import {
  Modal,
  useModal,
  Button,
  Text,
  Input,
  // useInput,
  Grid,
  Radio,
} from "@nextui-org/react";
import { AddIcon } from "../icons";
import { useForm } from "react-hook-form";
import { firebaseAddData } from "../../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";

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
    reset()
  

  }, [])
  
  // const { setVisible, bindings } = useModal();
  const [selectedOption, setSelectedOption] = useState("activo");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
  const onSubmit = (data) => {
    const dataArray = [];
    dataArray.push(data);
    firebaseAddData(email, "customers", dataArray);
    setRecordModified((prevValue) => !prevValue);
    reset();
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
          setDataModal({})
          setVisible(true)}}
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
                  <Input
                    label="Nombre"
                    width="100%"
                    status={errors.nombre ? "error" : "default"}
                    type="text"
                    value={dataModal?.nombre}
                    {...register("nombre", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu nombre.",
                      },
                    })}
                  />
                  {errors.nombre && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.nombre.message}
                    </Text>
                  )}
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="D.N.I"
                    width="100%"
                    status={errors.dni ? "error" : "default"}
                    type="text"
                    {...register("dni", {
                      required: {
                        value: true,
                        message: "Por favor ingresa D.N.I",
                      },
                    })}
                  />
                  {errors.dni && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.dni.message}
                    </Text>
                  )}
                </div>
              </Grid>

              <Grid xs={12}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Razón Social"
                    width="100%"
                    status={errors.razon ? "error" : "default"}
                    type="text"
                    {...register("razon", {
                      required: {
                        value: true,
                        message: "Por favor ingresa razón",
                      },
                    })}
                  />
                  {errors.razon && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.razon.message}
                    </Text>
                  )}
                </div>
              </Grid>

              <Grid xs={12}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Email"
                    width="100%"
                    status={errors.email ? "error" : "default"}
                    type="text"
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
                  {errors.dni && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.email.message}
                    </Text>
                  )}
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Dirección"
                    width="100%"
                    status={"default"}
                    type="text"
                    {...register("direccion", {})}
                  />
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Ciudad"
                    width="100%"
                    status={"default"}
                    type="text"
                    {...register("ciudad", {})}
                  />
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Cod Postal"
                    width="100%"
                    status={"default"}
                    type="text"
                    {...register("codpostal", {})}
                  />
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Provincia"
                    width="100%"
                    status={"default"}
                    type="text"
                    {...register("provincia", {})}
                  />
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Teléfono"
                    width="100%"
                    status={"default"}
                    type="text"
                    {...register("telefono", {})}
                  />
                </div>
              </Grid>

              <Grid xs={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Fecha de alta"
                    width="100%"
                    status={"default"}
                    type="date"
                    {...register("fecha", {})}
                  />
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
                    value="activo"
                    name="estatus"
                    style={{
                      marginRight: "8px",
                    }}
                    {...register("estatus", { required: true })}
                    checked={selectedOption === "activo"}
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
                    {...register("estatus", { required: true })}
                    checked={selectedOption === "bloqueado"}
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
