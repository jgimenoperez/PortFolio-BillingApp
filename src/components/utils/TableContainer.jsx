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
useStae

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
        <div className="col-sm-4">
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

      <div className="row justify-content-md-end justify-content-center align-items-center pe-2 m-0">
        <div className="col">
          <div className="d-flex gap-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
          </div>
        </div>
        <div className="col">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <div className="col">
          <input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </div>

        <div className="col">
          <div className="d-flex gap-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};
