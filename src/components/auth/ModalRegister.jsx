import {
  Modal,
  Input,
  Button,
  Text,
  Navbar,
  useInput,
  Spacer,
} from "@nextui-org/react";

import { firebaseAddUser } from "../../firebase/firebase";
import { Mail } from "../navbar/icons";
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { validateEmail, passwordValidator } from "../../utils/utils";

export const ModalRegister = () => {
  const navigate = useNavigate();
  const email = useInput("");
  const { logged } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [passError, setPassError] = useState({ color: "", text: "" });
  const handler = () => setVisible(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const checkPasswordRef = useRef(null);

  useEffect(() => {
    setVisible(!logged);
  }, [logged]);

  useEffect(() => {}, [visible]);

  const closeHandler = () => {
    setVisible(false);
  };

  const handlFirebaseLoginWithEmail = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const checkPassword = checkPasswordRef.current.value;

    if (!validateEmail(email)) {
      emailRef.current.focus();
      return;
    }

    if (password !== checkPassword) {
      setPassError({ color: "error", text: "No coincide la contraseña" });
      passwordRef.current.focus();
      return;
    } else {
      setPassError({ color: "", text: "" });
    }

    if (!passwordValidator(password)) {
      setPassError({
        color: "error",
        text: "La contraseña debe tener al menos 7 caracteres mayusculas, minusculas,números y caracteres especiales.",
      });
      passwordRef.current.focus();
      return;
    }

    firebaseAddUser(navigate, email, password);
  };

  const helper = useMemo(() => {
    if (!email.value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(email.value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [email.value]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handlFirebaseLoginWithEmail();
    }
  };

  return (
    <div>
      <Navbar.Link onClick={handler}>Registro</Navbar.Link>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Crear usuario <br />
            <Text b size={18}>
              {"Manos {DEV} troll"}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            {...email.bindings}
            clearable
            bordered
            fullWidth
            color="primary"
            status={helper.color}
            helperColor={helper.color}
            type="email"
            contentLeft={<Mail fill="currentColor" />}
            ref={emailRef}
            value={email.value}
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
            status={passError.color}
            helperColor={passError.color}
            onBlur={() => {
              setPassError({ color: "", text: "" });
            }}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Repita contraseña"
            ref={checkPasswordRef}
            status={passError.text}
            helperColor={passError.color}
            helperText={passError.text}
            onBlur={() => {
              setPassError({ color: "", text: "" });
            }}
            onKeyDown={handleKeyPress}
          />
          <Spacer y={1} />{" "}
          <Button
            auto
            onClick={() => {
              handlFirebaseLoginWithEmail();
            }}
          >
            Crear usuario
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
            ¿Ya tiene usuario? <Link to="/login"> Login</Link>
          </Text>
        </Modal.Footer>{" "}
      </Modal>
    </div>
  );
};
