import {
  Modal,
  useModal,
  Button,
  Text,
  Input,
  useInput,
  Grid,
} from "@nextui-org/react";
import { AddIcon } from "../icons";

export const ModalCustomers = ({ title }) => {
  const { setVisible, bindings } = useModal();
  const nameCustomer = useInput("");
  console.log(nameCustomer.value);

  const handleSubmit = (e) => {
    console.log(1111);
  };

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
      <Modal
        width="800px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        animated="true"
        {...bindings}
      >
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
          <form onSubmit={handleSubmit}>
            <Grid.Container gap={2} justify="center">
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Nombre"
                  placeholder="Nombre"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="D.N.I"
                  placeholder="D.N.I"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12}>
                <Input
                  rounded
                  bordered
                  label="Razón Social"
                  placeholder="Razón social"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12}>
                <Input
                  rounded
                  bordered
                  label="Email"
                  placeholder="Email"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Dirección"
                  placeholder="Dirección"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Ciudad"
                  placeholder="Ciudad"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Cod Postal"
                  placeholder="Cod Postal"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Provincia"
                  placeholder="Provincia"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Teléfono"
                  placeholder="Teléfono"
                  color="default"
                  width="100%"
                />
              </Grid>
              <Grid sm={12} md={6}>
                <Input
                  rounded
                  bordered
                  label="Fecha de alta"
                  placeholder="Fecha de alta"
                  color="default"
                  width="100%"
                  type="date"
                />
              </Grid>
            </Grid.Container>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Cerrar
          </Button>
          <Button auto type="submit" onPress={() => setVisible(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
