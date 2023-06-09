import { customerFields, firebaseGetCustomers } from "../firebase/firebase";
import { Layout } from "../components/navbar/layout";
import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Container,
} from "@nextui-org/react";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { IconButton, StyledBadge } from "../components/utils";
import { EyeIcon, EditIcon, DeleteIcon } from "../components/icons";

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [nameFields, setNameFields] = useState([{ name: "", uid: "" }]);
  const [directionSort, setDirectionSort] = useState(true);
  const { email } = useSelector((state) => state.user.user);

  useEffect(() => {
    firebaseGetCustomers(email).then((data) => {
      setCustomers(data);
    });
  }, []);

  useEffect(() => {
    const data = customerFields.map((item) => {
      return {
        name: item.toUpperCase(),
        uid: item.toLowerCase(),
      };
    });
    setNameFields(data);
  }, []);

  async function sort({ column }) {
    setDirectionSort(!directionSort);
    const data = customers.sort((a, b) => {
      if (a[column] < b[column] && !directionSort) {
        return -1;
      }

      if (a[column] > b[column] && !directionSort) {
        return 1;
      }

      // return 0;
    });
    setCustomers(data);
  }

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "estatus":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <div className="card-body">
            <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Details">
                  <IconButton onClick={() => console.log("View user", user.id)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit user">
                  <IconButton onClick={() => console.log("Edit user", user.id)}>
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip
                  content="Delete user"
                  color="error"
                  onClick={() => console.log("Delete user", user.id)}
                >
                  <IconButton>
                    <DeleteIcon size={20} fill="#FF0080" />
                  </IconButton>
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Layout>
      <div className="mantenimientos">
        <Container>
          <Table
            aria-label="Example table with custom cells"
            css={{
              height: "150px",
              minWidth: "8%",
              backgroundColor: "$gray200",
              marginTop: "15px",
              borderRadius: "10px",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
            bordered
            shadow={false}
            striped
            fixed
            color="primary"
            selectionMode="single"
            hoverable={true}
            onSortChange={(e) => {
              sort(e);
            }}
          >
            <Table.Header columns={nameFields}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={customers}>
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={15}
              // onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Container>
      </div>
    </Layout>
  );
};
