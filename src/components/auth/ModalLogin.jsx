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

import {
  firebaseLoginWithGoogle,
  firebaseLoginWithEmailNotPersistence,
  firebaseLoginWithGoogleNoPersistence,
  firebaseLoginWithEmail,
  firebaseResetPassword,
} from "../../firebase/firebase";
import { GooleIcon } from "../icons";
import { Link } from "react-router-dom";
import { Mail } from "../navbar/icons";
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateEmail } from "../../utils/utils";
import { getUser } from "../../reducers/userReducer";

export const ModalLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value, reset, bindings } = useInput("");
  const { logged } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [errorValidation, setErrorValidation] = useState(null);
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

  const handleGoogleLoginWithGoogle = async () => {
    let user = "";
    if (remenberSession) {
      user = await firebaseLoginWithGoogle(navigate);
    } else {
      user = await firebaseLoginWithGoogleNoPersistence(navigate);
    }
    dispatch(getUser(user));
  };

  const handleFirebaseLoginWithEmail = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!validateEmail(email)) {
      emailRef.current.focus();
      return;
    }
    let user = "";
    if (remenberSession) {
      user = await firebaseLoginWithEmail(
        navigate,
        email,
        password,
        setErrorValidation
      );
    } else {
      user = await firebaseLoginWithEmailNotPersistence(
        navigate,
        email,
        password,
        setErrorValidation
      );
    }
    dispatch(getUser(user));
  };

  const handleResetPass = () => {
    // setErrorValidation(`Enviado correo de restablecimiento a \n${emailRef.current.value}\n Siga las instrucciones`)
    firebaseResetPassword(emailRef.current.value)
      .then(() => {
        setErrorValidation(
          `Enviado correo de restablecimiento a \n${emailRef.current.value}\n Siga las instrucciones`
        );
      })
      .catch(setErrorValidation(`Correo no registrado previamente`));
  };

  const helper = useMemo(() => {
    setErrorValidation(null);
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFirebaseLoginWithEmail();
    }
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
            onChange={() => {
              setErrorValidation(null);
            }}
            onKeyDown={handleKeyPress}
            // visibleIcon={<Troll fill="currentColor" />}
            //   contentLeft={<Password fill="currentColor" />}
          />

          <Button
            auto
            onClick={() => {
              handleFirebaseLoginWithEmail();
            }}
          >
            Iniciar Sesión
          </Button>

          {errorValidation ? (
            <Text
              css={{
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
              // textTransforms="fullWidth"
              size="$1x"
              color="error"
            >
              {errorValidation}
            </Text>
          ) : null}

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
            <Text
              size={14}
              css={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleResetPass();
              }}
            >
              ¿Olvidó la contraseña?
            </Text>
          </Row>
        </Modal.Body>
        <Modal.Footer
          css={{
            justifyContent: "center",
          }}
        >
          <Text
            b
            css={{
              textAlign: "left",
            }}
            // textTransforms="fullWidth"
            size="$2x"
          >
            ¿Nuevo usuario?
            <Link to="/register"> Inscribirse</Link>
          </Text>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
