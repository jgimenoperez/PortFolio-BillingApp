import { Layout } from "../components/navbar/layout";
import {
  Text,
  Grid,
  Container,
  Input,
  Button,
  Loading,
  Spacer,
} from "@nextui-org/react";
import { actions } from "../types/types";
import { Box } from "../components/styles/box";
import { Flex } from "../components/styles/flex";
import {  useNavigate } from "react-router-dom";
import { setImageAvatar } from "../reducers/userReducer";
import { uploadAvatar } from "../cloudinary/cloudinary";
import { useEffect } from "react";
import { useInput } from "../hooks/useImputjs";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const inputName = useInput("");
  const inputSurname = useInput("");
  const inputEmail = useInput("");
  const inputDNI = useInput("");
  const inputVillage = useInput("");
  const inputPostalCode = useInput("");
  const inputAdress = useInput("");
  const inputProvince = useInput("");
  const inputAvatar = useInput("");
  const inputPhone = useInput("");
  const inputNextNumBill = useInput("");

  useEffect(() => {
    inputName.setValue(user?.name || "");
    inputSurname.setValue(user?.surname || "");
    inputEmail.setValue(user?.email || "");
    inputDNI.setValue(user?.dni || "");
    inputVillage.setValue(user?.village || "");
    inputPostalCode.setValue(user?.postalCode || "");
    inputAdress.setValue(user?.address || "");
    inputProvince.setValue(user?.province || "");
    inputPhone.setValue(user?.phone || "");
    inputAvatar.setValue(user?.avatar || "");
    inputNextNumBill.setValue(user?.nextNumBill || "");
  }, []);


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        navigate('/')
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Limpia el evento al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleImageUpload = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    const extension = file?.name.split(".").pop();
    uploadAvatar(file, user.docId, "avatar", extension).then((imageAvatar) => {
      dispatch(setImageAvatar(imageAvatar));
      setIsLoading(false);
    });
  };

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: inputEmail.value,
      name: inputName.value,
      surname: inputSurname.value,
      dni: inputDNI?.value,
      village: inputVillage?.value,
      postalCode: inputPostalCode.value,
      address: inputAdress.value,
      province: inputProvince.value,
      phone: inputPhone.value,
    };
    dispatch({
      type: actions.UPDATE_DATA_USER,
      payload: {
        ...user,
      },
    });
    swal({
      title: "Datos actualizados",
      icon: "success",
    });
  };

  return (
    <Layout>
      <>
        <Box
          css={{
            px: "$6",
            pb: "$14",
          }}
        >
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            css={{
              pt: "$20",
              height: "100vh",
            }}
          >
            {/* <Text span css={{ color: "$blue600" }}>
              Mi perfil
            </Text> */}
            <Text h3>{`Bienvenido/a ${user.name ? user.name : user.email}`}</Text>
            <Text
              span
              css={{
                maxWidth: "800px",
                color: "$accents8",
                textAlign: "center",
              }}
            >
              Datos de facturación
            </Text>
            <Container
              xs
              gap={0}
              css={{
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.4)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid.Container gap={5} justify="center">
                  <Grid
                    xs={6}
                    sm={6}
                    css={{ display: "flex", flexDirection: "column" }}
                  >
                    <Input
                      rounded
                      bordered
                      label="D.N.I"
                      placeholder="D.N.I"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputDNI}
                    />
                    <Input
                      rounded
                      bordered
                      label="Nombre"
                      placeholder="Nombre"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputName}
                    />
                    <Input
                      rounded
                      bordered
                      label="Apellido"
                      placeholder="Apellido"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputSurname}
                    />
                    <Input
                      rounded
                      label="Email"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputEmail}
                      readOnly
                    />
                    <Input
                      rounded
                      type="number"
                      bordered
                      label="Próxima factura"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputNextNumBill}
                    />

                    <Text color="primary">Logotipo Factura</Text>

                    {isLoading ? (
                      <Loading color="primary" />
                    ) : (
                      <label
                        htmlFor="fileInput"
                        className="custom-file-upload"
                        style={{ width: "200px", height: "200px" }}
                      >
                        <img
                          src={`${user.image}?random=${Date.now()}`}
                          alt="Imagen"
                          style={{
                            width: "80px",
                            height: "80px",
                            marginTop: "3px",
                          }}
                          className="img-fluid"
                        />
                        <input
                          id="fileInput"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          {...inputAvatar}
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </Grid>

                  <Grid
                    xs={6}
                    sm={6}
                    css={{ display: "flex", flexDirection: "column" }}
                  >
                    <Input
                      rounded
                      bordered
                      label="Poblacion"
                      placeholder="Poblacion"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputVillage}
                    />
                    <Input
                      rounded
                      bordered
                      label="Cod.Postal"
                      placeholder="Cod. Postal"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputPostalCode}
                    />
                    <Input
                      rounded
                      bordered
                      label="Dirección"
                      placeholder="Dirección"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputAdress}
                    />
                    <Input
                      rounded
                      bordered
                      label="Provincia"
                      placeholder="Provincia"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputProvince}
                    />
                    <Input
                      rounded
                      bordered
                      label="Teléfono"
                      placeholder="Teléfono"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputPhone}
                    />
                    <Button
                      auto
                      type="submit"

                      // css={{width:"50%",  marginLeft: 'auto' }}
                    >
                      Guardar cambios
                    </Button>
                    <Spacer />
     

                    <Button
                      auto
                      flat
                      color="error"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Cerrar
                    </Button>
                  </Grid>
                </Grid.Container>

                {/* <Grid.Container gap={2} justify="center">
                  <Grid xs={12} sm={6} css={{ mw: "500px" }}>
                    <Card>
                      <Card.Body>
                        <Input
                          rounded
                          bordered
                          label="Default"
                          placeholder="Default"
                          color="default"
                        />
                        <Text h6 size={15} color="white" css={{ mt: 0 }}>
                          {111}
                        </Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Card css={{ h: "$24", $$cardColor: "$colors$primary" }}>
                      <Card.Body>
                        <Text h6 size={15} color="white" css={{ mt: 0 }}>
                          {222}
                        </Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container> */}
              </form>
            </Container>

            {/* <Flex
              align={"center"}
              justify={"center"}
              wrap={"wrap"}
              css={{
                gap: "1rem",
                pt: "$14",
                width: "100%",
              }}
            ></Flex> */}
          </Flex>

          {/* <Flex
            align={"center"}
            justify={"center"}
            wrap={"wrap"}
            css={{
              gap: "1rem",
              pt: "$14",
            }}
          ></Flex>

          <Flex
            align={"center"}
            wrap={"wrap"}
            justify={"center"}
            css={{
              gap: "1rem",
              pt: "$8",
            }}
          >
            <Card css={{ mw: "500px" }}>
              <Card.Body>
                <Flex css={{ gap: "0.5rem" }}>
                  <BoxIcon />
                  <Flex direction={"column"}>
                    <Input
                      rounded
                      bordered
                      label="Default"
                      placeholder="Default"
                      color="default"
                    />

                    <Input
                      rounded
                      bordered
                      label="Default"
                      placeholder="Default"
                      color="default"
                    />
                    <Text h5>Your Title</Text>
                    <Text span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed condimentum, nisl ut aliquam lacinia, nisl nisl
                      aliquet nisl, nec
                    </Text>
                  </Flex>
                </Flex>
              </Card.Body>
            </Card>
            <Card css={{ mw: "500px" }}>
              <Card.Body>
                <Flex css={{ gap: "0.5rem" }}>
                  <BoxIcon />
                  <Flex direction={"column"}>
                    <Input
                      rounded
                      bordered
                      label="Default"
                      placeholder="Default"
                      color="default"
                    />
                    <Input
                      rounded
                      bordered
                      label="Default"
                      placeholder="Default"
                      color="default"
                    />
                    <Text h5>Your Title</Text>
                    <Text span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed condimentum, nisl ut aliquam lacinia, nisl nisl
                      aliquet nisl, nec
                    </Text>
                  </Flex>
                </Flex>
              </Card.Body>
            </Card>
          </Flex> */}
        </Box>

        {/* <Divider
          css={{ position: "absolute", inset: "0p", left: "0", mt: "$5" }}
        /> */}
      </>
    </Layout>
  );
};
