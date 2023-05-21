import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Navbar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  firebaseLoginWithGoogle,
  firebaseLoginWithEmailNotPersistence,
  firebaseLoginWithGoogleNoPersistence,
  firebaseLoginWithEmail,
} from "../../firebase/firebase";
import { GooleIcon } from "../icons/GithubIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Mail, Troll } from "../navbar/icons";

export const ModalLogin = () => {
  const navigate = useNavigate();

  const { logged } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [remenberSession, setRemenberSession] = useState(false);
  const handler = () => setVisible(true);

  useEffect(() => {
    setVisible(!logged);
  }, [logged]);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleRememberSessionChange = (e) => {
    setRemenberSession(e);
  };

  const handleGoogleLoginWithGoogle = () => {
    remenberSession
      ? firebaseLoginWithGoogle(navigate)
      : firebaseLoginWithGoogleNoPersistence(navigate);
  };

  const handlFirebaseLoginWithEmail = () => {
    remenberSession
      ? firebaseLoginWithEmail(navigate)
      : firebaseLoginWithEmailNotPersistence(navigate);
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
            Inice sesión en su cuenta <br />
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
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Contraseña"
            visibleIcon={<Troll fill="currentColor" />}

            //   contentLeft={<Password fill="currentColor" />}
          />

          <Button
            auto
            onClick={() => {
              handlFirebaseLoginWithEmail();
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            auto
            flat
            color="error"
            onClick={() => {
              closeHandler();
            }}
          >
            Cerrar
          </Button>
          <Text
            b
            className="lineWrapper"
            css={{
              textAlign: "center",
            }}
            // textTransforms="fullWidth"
            size="$2x"
          >
            o
          </Text>

          <Button
            auto
            flat
            onClick={() => {
              handleGoogleLoginWithGoogle();
            }}
          >
            <GooleIcon />
          </Button>

          <Row justify="space-between">
            <Checkbox
              checked={remenberSession}
              onChange={(e) => {
                handleRememberSessionChange(e);
              }}
            >
              <Text size={14}>Recordar sesión</Text>
            </Checkbox>
            <Text size={14}>¿Olvidó la contraseña?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
