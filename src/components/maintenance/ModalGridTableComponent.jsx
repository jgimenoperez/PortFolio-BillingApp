import {
  Table,
  Row,
  Button,
  Col,
  Text,
  Container,
  Input,
  styled,
  useModal,
  Loading,
  Modal,
} from "@nextui-org/react";
import { BillIcon, EyeIcon, UserIcon } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actions } from "../../types/types";
import { setCurrenCustomer } from "../../reducers/dataMaintenanceReducer";
// eslint-disable-next-line react/prop-types
export const ModalGridTableComponent = ({ nameFields, title, collection }) => {
  const dispatch = useDispatch();
  const dataGrid = useSelector((state) => state.data.dataMaintenance);
  const { setVisible, bindings } = useModal();
  const [directionSort, setDirectionSort] = useState(true);
  const [dataGridFiltered, setDataGridFiltered] = useState({});
  const [searchTerm, setSearchTerm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch({
          type: actions.UPATE_DATA_MAINTENANCE,
          payload: {
            table: collection,
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
      setLoading(false);
      searchTerm != null && filterData();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

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
      case "actions":
        return (
          <div className="card-body">
            <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                {/* AQUI */}{" "}
                <Button
                  auto
                  css={{
                    backgroundColor: "#B97509",
                  }}
                  onPress={() => {
                    dispatch(setCurrenCustomer(item));
                    setVisible(false);
                  }}
                >
                  Seleccionar
                </Button>
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
      dataGrid.length > 0 && setDataGridFiltered(dataGrid);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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
  } else {
    return (
      // <h1>{dataGridFiltered.length}</h1>
      <div>
        <Button
          bordered
          color="primary"
          auto
          icon={<BillIcon width={55} fill="red" />}
          style={{
            height: "35px",
            // borderRadius: "0px",
            // border: "0px solid  rgb(200, 200, 200)",
          }}
          onPress={() => {
            setVisible(true);
          }}
        ></Button>
        <Modal
          width="1300px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          animated="true"
          {...bindings}
          onOpen={() => {
            setDataGridFiltered(dataGrid);
          }}
        >
          <div className="busquedas">
            <Container>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  h3
                  size={40}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  }}
                  weight="bold"
                >
                  <strong>{`Seleccion ${title}`}</strong>
                </Text>
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
                  textAlign: "left",
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
                />
              </Table>
            </Container>
          </div>
        </Modal>
      </div>
    );
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
