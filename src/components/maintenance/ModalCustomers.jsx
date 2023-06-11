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

export const ModalCustomers = ({ title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setVisible, bindings } = useModal();
  // const nombreCustomer = useInput("");
  // const dniCustomer = useInput("");
  // const razonSocialCustomer = useInput("");
  // const email = useInput("");
  // const ciudadCustomer = useInput("");
  // const codPostalCustomer = useInput("");
  // const provinciaCustomer = useInput("");
  // const telefonoCustomer = useInput("");
  // const fechaAltaCustomer = useInput("");
  const onSubmit = (data) => console.log(data);
  console.log(1, errors.Nombre);

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
        onPress={() => setVisible(true)}
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
              <Grid sm={12} md={6}>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    label="Nombre"
                    width="100%"
                    status={errors.Nombre ? "error" : "default"}
                    type="text"
                    {...register("Nombre", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu nombre.",
                      },
                    })}
                  />
                  {errors.Nombre && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.Nombre.message}
                    </Text>
                  )}
                </div>
              </Grid>

              <Grid sm={12} md={6}>
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

              <Grid sm={12}>
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

              <Grid sm={12}>
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

              <Grid sm={12} md={6}>
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
                    {...register("Dirección", {})}
                  />
                </div>
              </Grid>

              <Grid sm={12} md={6}>
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
                    {...register("Ciudad", {})}
                  />
                </div>
              </Grid>

              <Grid sm={12} md={6}>
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
                    {...register("CodPostal", {})}
                  />
                </div>
              </Grid>

              <Grid sm={12} md={6}>
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
                    {...register("Provincia", {})}
                  />
                </div>
              </Grid>

              <Grid sm={12} md={6}>
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
                    {...register("Telefono", {})}
                  />
                </div>
              </Grid>

              <Grid sm={12} md={6}>
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
                    {...register("FechaAlta", {})}
                  />
                </div>
              </Grid>

              {/* <Grid sm={12} md={6}>
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
              <Grid sm={12}>
                <Radio.Group
                  orientation="horizontal"
                  label="Estatus"
                  defaultValue="false"
                  css={{
                    width: "100%",
                  }}
                >
                  <Radio value="false" size="sm">
                    Activo
                  </Radio>
                  <Radio value="true" size="sm">
                    Bloqueado
                  </Radio>
                </Radio.Group>
              </Grid>
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={() => setVisible(false)}>
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
