import { Modal, Input, Button, Text, Navbar, Spacer } from "@nextui-org/react";

import { firebaseChangePassword } from "../../firebase/firebase";
import { passwordValidator } from "../../utils/utils";
import { useEffect, useState, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const ModalResetPass = () => {
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [passError, setPassError] = useState({ color: "", text: "" });
  const handler = () => setVisible(true);
  const passwordRef = useRef(null);
  const checkPasswordRef = useRef(null);


  useEffect(() => {
    setVisible(!logged);
  }, [logged]);

  const closeHandler = () => {
    setVisible(false);
  };

  const handlFirebaseChangePassword = () => {
    const password = passwordRef.current.value;
    const checkPassword = checkPasswordRef.current.value;

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


    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");
    let count = 5;

    firebaseChangePassword(oobCode,password)
    .then(()=>{

      const timer = setInterval(() => {
        console.log(count);
        count -= 1;
        setMessage(
          `Se ha restablecido la contraseña\n Será redirigio a la pantalla de login en ${count} segundos`
        );
        if (count === 0) {
          clearInterval(timer);
          navigate("/login");
  
        }
      }, 1000);


    })
  };

  return (
    <div>
      <Navbar.Link onClick={handler}>Reset</Navbar.Link>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Restablecer contraseña <br />
            <Text b size={18}>
              {"Manos {DEV} troll"}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
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
            style={{ helperText: { fontSize: '24px'} }}
            onBlur={() => {
              setPassError({ color: "", text: "" });
            }}
          />
          {message ? (
            <Text
              css={{
                textAlign: "center",
                whiteSpace: "pre-line",
              }}
              // textTransforms="fullWidth"
              size="$1x"
              color="error"
            >
              {message}
            </Text>
          ) : null}


          <Spacer y={1} />{" "}
          <Button
            auto
            onClick={() => {
              handlFirebaseChangePassword();
            }}
          >
            Restablecer contraseña
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
            ¿Ya tiene usuario?   <Link to="/login">  Login</Link>
          
          </Text>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
