import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import { DefaultColumnFilter } from "./Filters";
import { useState } from "react";
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <div className="col-sm-4 ">
        <div className="search-box me-2 mb-2 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export const TableContainer = ({
  columns,
  data,
  isGlobalSearch,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  tableClass,
  theadClass,
  thClass,
  divClass,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };
  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const columns2 = [
    { name: "NAME", uid: "name", },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
    { name: "AGE", uid: "age" },
  ];
  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Technical Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Senior Developer",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "William Howard",
      role: "Community Manager",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "Sales Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com",
    },
  ];

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
      //   case "status":
      //     return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <div>
            <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Details">
                  {/* <IconButton onClick={() => console.log("View user", user.id)}>
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton> */}
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Edit user">
                  {/* <IconButton onClick={() => console.log("Edit user", user.id)}>
                      <EditIcon size={20} fill="#979797" />
                    </IconButton> */}
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip
                  content="Delete user"
                  color="error"
                  onClick={() => console.log("Delete user", user.id)}
                >
                  {/* <IconButton>
                      <DeleteIcon size={20} fill="#FF0080" />
                    </IconButton> */}
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
    <>
      {isGlobalSearch ||
        isGlobalFilter ||
        isAddOptions ||
        isAddUserList ||
        (isAddCustList && (
          <div className="mb-2">
            {isGlobalSearch && (
              <div className="col-md-1">
                <select
                  className="form-select"
                  value={pageSize}
                  onChange={onChangeInSelect}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isGlobalFilter && (
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            )}
            {isAddOptions && (
              <div className="col-sm-7">
                <div className="text-sm-end">
                  <button
                    type="button"
                    className="btn btn-success rounded mb-2 me-2"
                    onClick={handleOrderClicks}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add New Order
                  </button>
                </div>
              </div>
            )}
            {isAddUserList && (
              <div className="col-sm-7">
                <div className="text-sm-end">
                  <button
                    type="button"
                    className="btn btn-primary mb-2 me-2"
                    onClick={handleUserClick}
                  >
                    <i className="mdi mdi-plus-circle-outline me-1" />
                    Create New User
                  </button>
                </div>
              </div>
            )}
            {isAddCustList && (
              <div className="col-sm-7">
                <div className="text-sm-end">
                  <button
                    type="button"
                    className="btn btn-success rounded mb-2 me-2"
                    onClick={handleCustomerClick}
                  >
                    <i className="mdi mdi-plus me-1" />
                    New Customers
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

      <div className={divClass}>
        <table className={`table ${tableClass}`}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={thClass}
                    {...column.getSortByToggleProps()}
                  >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {page.map((row) => {
              prepareRow(row);
              return (
                <div key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>

      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns2}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div className="row justify-content-end justify-content-right align-items-right text-end">
        <div className="col-auto d-flex gap-1">
          <div className="row justify-content-end justify-content-right align-items-right text-end">
            <div className="col-auto d-flex gap-1">
              {" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={previousPage}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>
            </div>
            <div className="col-auto d-flex gap-1">
              {" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </div>
            <div className="col-auto d-flex gap-1">
              {" "}
              <strong>
                <input
                  type="number"
                  min={1}
                  style={{ width: 70 }}
                  max={pageOptions.length}
                  defaultValue={pageIndex + 1}
                  onChange={onChangeInInput}
                />
              </strong>
            </div>
            <div className="col-auto d-flex gap-1">
              {" "}
              <strong>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextPage}
                  disabled={!canNextPage}
                >
                  {">"}
                </button>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};
