import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Container,
  Input,
  styled,
  Modal,
  useModal,
  Loading,
} from "@nextui-org/react";
import { EyeIcon, EditIcon, DeleteIcon, AddIcon } from "../icons";
import { firebaseDeleteData } from "../../firebase/firebase";
import { IconButton, StyledBadge } from "../utils";
import { ModalCustomers } from "./ModalCustomers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { actions } from "../../types/types";

// eslint-disable-next-line react/prop-types
export const MaintenancesGridComponent = ({
  nameFields,
  title,
  collection,
}) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user.user);
  const dataGrid = useSelector((state) => state.data.dataMaintenance);
  const { setVisible, bindings } = useModal();
  const [directionSort, setDirectionSort] = useState(true);
  const [dataGridFiltered, setDataGridFiltered] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [dataModal, setDataModal] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch({
          type: actions.UPATE_DATA_MAINTENANCE,
          payload: {
            table: "customers",
          },
        });
      } catch (error) {
        console.warn("Error al obtener o actualizar los datos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataGridFiltered(dataGrid);
  }, [dataGrid]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      filterData();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    dataGridFiltered.length>0 && setLoading(false)
  }, [dataGridFiltered]);

  async function sort({ column }) {
    setDirectionSort(!directionSort);
    setDataGridFiltered(
      dataGridFiltered.sort((a, b) => {
        if (directionSort) {
          if (a[column] < b[column]) {
            return -1;
          }
        }

        if (!directionSort) {
          if (a[column] > b[column]) {
            return -1;
          }
        }
        return 0;
      })
    );
  }

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={item.avatar} name={cellValue} css={{ p: 0 }}>
            {item.email}
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
                {item.team}
              </Text>
            </Row>
          </Col>
        );
      case "estatus":
        return <StyledBadge type={item.estatus}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <div className="card-body">
            <Row justify="center" align="center">
              {/* <Col css={{ d: "flex" }}>
                <Tooltip content="Detalles">
                  <IconButton onClick={() => console.log("Ver", item.id)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col> */}
              <Col css={{ d: "flex" }}>
                <Tooltip content="Editar">
                  <IconButton
                    onClick={() => {
                      setDataModal(item);
                      setVisible(true);
                    }}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip
                  content="Eliminar"
                  color="error"
                  onClick={() => deleteRecord(item.id)}
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

  const filterData = () => {

    if (searchTerm.length > 0) {
      const data = dataGrid.filter((row) => {
        return Object.values(row).some((valor) => {
          if (typeof valor === "string") {
            return valor.toLowerCase().includes(searchTerm.toLowerCase());
          }
        });
      });
      setDataGridFiltered(data);
    } else {
      dataGrid.length>0 && setDataGridFiltered(dataGrid);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteRecord = (recordId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El registro será eliminado permanentemente.",
      icon: "warning",
      buttons: ["No", true],
    }).then(async (response) => {
      if (response) {
        try {
          await firebaseDeleteData(email, collection, recordId);
          await dispatch({
            type: actions.UPATE_DATA_MAINTENANCE,
            payload: {
              table: "customers",
            },
          });
          Swal.fire("Eliminado", "", "success");
        } catch (error) {
          console.warn(error);
        }
      }
    });
  };

  if (loading) {
    return (
      <Loading
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading
      </Loading>
    );
  }else{
    return (
      // <h1>{dataGridFiltered.length}</h1>
      <div className="mantenimientos">
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input
              clearable
              contentRightStyling={false}
              onChange={handleInputChange}
              // labelPlaceholder="Buscar"
              contentRight={
                <SendButton>
                  <EyeIcon fill="currentColor" size="18" />
                </SendButton>
              }
              labelPlaceholder="Buscar"
              css={{ marginTop: "25px" }}
            />
            <Text
              h2
              size={60}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              <strong>{title}</strong>
            </Text>
            <ModalCustomers
              setVisible={setVisible}
              bindings={bindings}
              dataModal={dataModal}
              setDataModal={setDataModal}
              title={title}
              email={email}
            />
          </div>
          <Table
            lined
            headerLined
            aria-label="estatic collection table"
            css={{
              height: "150px",
              minWidth: "8%",
              backgroundColor: "$gray200",
              marginTop: "15px",
              borderRadius: "10px",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
            // bordered
            shadow={true}
            striped
            // fixed
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
            <Table.Body items={dataGridFiltered}>
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
              rowsPerPage={10}
  
              // onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Container>
      </div>
    )
  }


};

export const SendButton = styled("button", {
  // reset button styles
  background: "transparent",
  border: "none",
  padding: 0,

  // styles
  width: "24px",
  margin: "0 10px",
  dflex: "center",
  // bg: "$primary",
  borderRadius: "$rounded",
  cursor: "pointer",
  transition: "opacity 0.25s ease 0s, transform 0.25s ease 0s",
  svg: {
    size: "100%",
    padding: "4px",
    transition: "transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms",
    boxShadow: "0 5px 20px -5px rgba(0, 0, 0, 0.1)",
  },
  "&:hover": {
    opacity: 0.8,
  },
  "&:active": {
    transform: "scale(0.9)",
    svg: {
      transform: "translate(24px, -24px)",
      opacity: 0,
    },
  },
});
