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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IconButton, StyledBadge } from "../utils";
import { EyeIcon, EditIcon, DeleteIcon } from "../icons";

// eslint-disable-next-line react/prop-types
export const MaintenancesGridComponent = ({ dataGrid, nameFields }) => {
  const [directionSort, setDirectionSort] = useState(true);
  const [dataGridFiltered, setDataGridFiltered] = useState(dataGrid);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      filterData();
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
                <Tooltip content="Detalles">
                  <IconButton onClick={() => console.log("Ver", user.id)}>
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Editar">
                  <IconButton onClick={() => console.log("Editar", user.id)}>
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip
                  content="Eliminar"
                  color="error"
                  onClick={() => console.log("Borrar", user.id)}
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
      console.log(data)
      setDataGridFiltered(data);
    } else {
      setDataGridFiltered(dataGrid);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="mantenimientos">
      <Container>
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
  );
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
