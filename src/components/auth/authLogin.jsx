import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Navbar,
} from "@nextui-org/react";
import { useState, } from "react";
import {
  firebaseLoginWithGoogle,
  firebaseLoginWithEmailNotPersistence,
  firebaseLoginWithGoogleNoPersistence,
  firebaseLoginWithEmail,
} from "../../firebase/firebase";
import { GooleIcon } from "../icons/GithubIcon";

export const ModalLogin = () => {
  const [visible, setVisible] = useState(false);
  const [remenberSession, setRemenberSession] = useState(false);
 
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    // firebaseLogout()
  };

  const handleRememberSessionChange = (e) => {
    setRemenberSession(e)
  };

  const handleGoogleLoginWithGoogle = () => {
    console.log(4444444)
    remenberSession ?  firebaseLoginWithGoogle() : firebaseLoginWithGoogleNoPersistence();
  };

  const handlFirebaseLoginWithEmail = () => {
    console.log(333333333)
     remenberSession ?  firebaseLoginWithEmail() : firebaseLoginWithEmailNotPersistence();
  };

  return (
    <div>
      <Navbar.Link onClick={handler}>Login</Navbar.Link>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Inice seión en su cuenta <br />
            <Text b size={18}>
              {"Manos {DEV} troll"}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            //   contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            //   contentLeft={<Password fill="currentColor" />}
          />
          <Text
            b
            className="lineWrapper"
            css={{
              textAlign: "center",
            }}
            TextTransforms="fullWidth"
            size="$2x"
          >
            o
          </Text>

          <Button auto flat onClick={()=>{handleGoogleLoginWithGoogle()}}>
            <GooleIcon />
          </Button>

          <Row justify="space-between">
            <Checkbox
              checked={handleRememberSessionChange}
              onChange={(e)=>{handleRememberSessionChange(e)}}
            >
              <Text size={14}>Recordar sesión</Text>
            </Checkbox>
            <Text size={14}>¿Olvidó la contraseña?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cerrar
          </Button>
          <Button auto onClick={()=>{handlFirebaseLoginWithEmail()}}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
