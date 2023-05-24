import { Layout } from "../components/navbar/Layout";
import {
  Text,
  Divider,
  Card,
  Grid,
  Container,
  Input,
  Button,
} from "@nextui-org/react";
import { Flex } from "../components/styles/flex";
import { Box } from "../components/styles/box";
import { useSelector,useDispatch } from "react-redux";
import { useInput } from "../hooks/useImputjs";
import { uploadAvatar } from "../cloudinary/cloudinary";


export const Profile = () => {

  const { user } = useSelector((state) => state.auth);
  const inputNombre = useInput("")
  const inputApellido = useInput("")
  const inputEmail = useInput("")
  const inputClaveActual = useInput("")
  const inputNuevaClave = useInput("")
  const inputConfirmeNuevaClave = useInput("")
  const inputAvatar = useInput("")

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    uploadAvatar(file,user.docId,'avatar')

    // // Subir la imagen a Cloudinary
    // cloudinaryCore.upload_resource(file, {}, (error, result) => {
    //   if (result) {
    //     const imageUrl = result.url; // Obtener la URL de la imagen subida
    //     setUploadedImage(imageUrl); // Actualizar el estado con la URL de la imagen
    //   } else {
    //     console.error(error);
    //   }
    // });
  };


  return (
    <Layout>
      <>
        <Box
          css={{
            px: "$6",
            pb: "$14",
            height: "100vh",
          }}
        >
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            css={{
              pt: "$20",
            }}
          >
            {/* <Text span css={{ color: "$blue600" }}>
              Mi perfil
            </Text> */}
            <Text h3>{`Bienvenido ${ (user.name ? user.name : user.email)}`}</Text>
            <Text
              span
              css={{
                maxWidth: "800px",
                color: "$accents8",
                textAlign: "center",
              }}
            >
              Edita tu nombre, añade tu avatar y modifica el acceso
            </Text>
            <Container xs gap={0} css={{
              borderRadius:"10px",
              padding:"20px",
              marginTop:"20px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.4)"
            }}>
              <form action="">
                <Grid.Container gap={5} justify="center">
                  <Grid
                    xs={6}
                    sm={6}
                    css={{ display: "flex", flexDirection: "column" }}
                  >
                    <Input
                      rounded
                      bordered
                      label="Nombre"
                      placeholder="Nombre"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputNombre}
                    />
                    <Input
                      rounded
                      bordered
                      label="Apellido"
                      placeholder="Apellido"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputApellido}             
                    />
                    <Input
                      rounded
                      bordered
                      label="Email"
                      placeholder="Email"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputEmail}
                    />

                    <Text color="primary">
                     Avatar
                    </Text>

                    <label htmlFor="fileInput" className="custom-file-upload">
                      <img src={user.image} alt="Imagen" style={{width: '80px', height:'80px', marginTop:"3px"}}/>
                      <input id="fileInput" type="file" {...inputAvatar} onChange={handleImageUpload}/>
                    </label>

                  </Grid>

                  <Grid
                    xs={6}
                    sm={6}
                    css={{ display: "flex", flexDirection: "column" }}
                  >
                    <Input
                      rounded
                      bordered
                      label="Clave actual"
                      placeholder="Clave actual"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputClaveActual}                      
                    />
                    <Input
                      rounded
                      bordered
                      label="Nueva clave"
                      placeholder="Nueva clave"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputNuevaClave}
                    />
                    <Input
                      rounded
                      bordered
                      label="Confirme nueva clave"
                      placeholder="Confirme nueva clave"
                      color="primary"
                      css={{ marginBottom: "15px" }}
                      {...inputConfirmeNuevaClave}
                    />
                    <Button
                      auto
                      // css={{width:"50%",  marginLeft: 'auto' }}
                    >
                      Guardar cambios
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

        <Divider
          css={{ position: "absolute", inset: "0p", left: "0", mt: "$5" }}
        />
      </>
    </Layout>
  );
};
