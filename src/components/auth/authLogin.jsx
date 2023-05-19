import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Navbar,
} from "@nextui-org/react";
import React from "react";
import { firebaseLoginWithGoogle } from "../../firebase/firebase";

export const ModalLogin = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleGoogleLogin = () => {
    firebaseLoginWithGoogle();
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
            Welcome to
            <Text b size={18}>
              NextUI
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
            css={{
              textAlign:"center"
            }}
            TextTransforms="fullWidth"
            size='$2x'
          >
            or
          </Text>

          <Button auto flat href="#">
            Start free trial
          </Button>
      

          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={handleGoogleLogin}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
