import { Modal, Input, Button, Text, Navbar, Spacer } from "@nextui-org/react";

import { firebaseChangePassword } from "../../firebase/firebase";
import { passwordValidator } from "../../utils/utils";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount((prevCount) => prevCount - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // useEffect(() => {
  //   // console.log(count)
  //   // if (count === 0) {
  //   //   // setMessage('Redirigiendo al inicio de sesión...');
  //   //   setTimeout(() => {
  //   //     history.push('/login');
  //   //   }, 1000);
  //   // } else {
  //   //   setPassError(`Contando... ${count}`);
  //   // }
  // }, [count]);

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

    // if (!passwordValidator(password)) {
    //   setPassError({
    //     color: "error",
    //     text: "La contraseña debe tener al menos 7 caracteres mayusculas, minusculas,números y caracteres especiales.",
    //   });
    //   passwordRef.current.focus();
    //   return;
    // }
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};
