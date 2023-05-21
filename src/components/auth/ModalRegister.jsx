import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Navbar,
  useInput,
} from "@nextui-org/react";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  firebaseLoginWithGoogle,
  firebaseLoginWithEmailNotPersistence,
  firebaseLoginWithGoogleNoPersistence,
  firebaseLoginWithEmail,
} from "../../firebase/firebase";
import { GooleIcon } from "../icons/GithubIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Mail } from "../navbar/icons";
import { validateEmail } from "../../utils/utils";

export const ModalRegister = () => {
  const navigate = useNavigate();
  const { value, reset, bindings } = useInput("");
  const { logged } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [remenberSession, setRemenberSession] = useState(false);
  const handler = () => setVisible(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
    const email=emailRef.current.value
    const password = passwordRef.current.value
    if (!validateEmail(email)) {
      emailRef.current.focus();
      return
    }
    remenberSession
      ? firebaseLoginWithEmail(navigate,email,password)
      : firebaseLoginWithEmailNotPersistence(navigate,email,password);
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

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
            Inice sesión en su cuentaq <br />
            <Text b size={18}>
              {"Manos {DEV} troll"}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            {...bindings}
            clearable
            bordered      
            fullWidth      
            color="primary"            
            onClearClick={reset}
            status={helper.color}
            helperColor={helper.color}
            type="email"
            contentLeft={<Mail fill="currentColor" />}
            ref={emailRef}
            // color={helper.color}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Contraseña"
            ref={passwordRef}
            // visibleIcon={<Troll fill="currentColor" />}
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
          {/* <Button
            auto
            flat
            color="error"
            onClick={() => {
              closeHandler();
            }}
          >
            Cerrar
          </Button> */}
          <Text
            b
            className="lineWrapper"
            css={{
              textAlign: "center",
            }}
            // textTransforms="fullWidth"
            size="$2x"
          >
            o inicia sesión con
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};