import { Layout } from "../components/navbar/layout";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState,useCallback } from "react";
import { useRef } from "react";
import Flatpickr from "react-flatpickr";
import { TableContainer } from "../components/utils/TableContainer";

export const Customers = () => {
  const [customerStatus, setcustomerStatus] = useState({
    value: "Todos",
    label: "Todos",
  });

  const customerstatus = [
    { value: "Todos", label: "Todos" },
    { value: "Activo", label: "Activo" },
    { value: "Bloqueado", label: "Bloqueado" },
  ];

  const customermocalstatus = [
    {
      options: [
        { label: "Activo", value: "Activo" },
        { label: "Bloqueado", value: "Bloqueado" },
      ],
    },
  ];

  const date = useRef(null);
  const dispatch = useDispatch();
  const [customerModalStatus, setcustomerModalStatus] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  // const toggle = useCallback(() => {
  //   if (modal) {
  //     setModal(false);
  //     setCustomer(null);
  //   } else {
  //     setModal(true);
  //     // setDate(dateFormat());
  //   }
  // }, [modal]);

  // const { customers } = useSelector((state) => ({
  //   customers: state.Ecommerce.customers,
  // }));

  // function handlecustomerStatus(customerStatus) {
  //   setcustomerStatus(customerStatus);
  // }

  // function handlemodalcustomerStatus(customerModalStatus) {
  //   setcustomerModalStatus(customerModalStatus);
  // }

  // function handleSearch(text) {
  //   setSearch(text);
  //   searchFilterFunction(text);
  // }

  // const searchFilterFunction = (text) => {
  //   const botonfiltrar = () => {
  //     var result;
  //     if (date.current) {
  //       if (customerStatus?.value === "Todos") {
  //         result = customers.filter((customer) => {
  //           console.table(customer.fecha.toString(), date.current);
  //           return customer.fecha.toString() === date.current;
  //         });
  //       } else {
  //         result = customers.filter(
  //           (customer) =>
  //             customer.fecha.toString() === date.current &&
  //             customer.estatus === customerStatus.value
  //         );
  //       }
  //       setFilteredData(result);
  //     } else if (customerStatus?.value === "Todos") {
  //       setFilteredData(customers);
  //     } else {
  //       result = customers.filter(
  //         (customer) => customer.estatus === customerStatus.value
  //       );
  //       setFilteredData(result);
  //     }
  //   };

  //   if (text) {
  //     const newData = customers.filter((item) => {
  //       return Object.keys(item).some((key) =>
  //         item[key]?.toString().toUpperCase().includes(text.toUpperCase())
  //       );
  //     });

  //     setFilteredData(newData);
  //   } else {
  //     setFilteredData(customers);
  //   }
  // };

  // Update Data
  // const handleCustomerClick = useCallback(
  //   (arg) => {
  //     const customer = arg;
  //     setCustomer({
  //       firebaseid: customer.firebaseid,
  //       id: customer.id,
  //       dni: customer.dni,
  //       direccion: customer.direccion,
  //       fecha: customer.fecha,
  //       cliente: customer.cliente,
  //       email: customer.email,
  //       ciudad: customer.ciudad,
  //       codigopostal: customer.codigopostal,
  //       estatus: customer.estatus,
  //       provincia: customer.provincia,
  //       telefono: customer.telefono,
  //       razonsocial: customer.razonsocial,
  //     });

  //     setIsEdit(true);
  //     toggle();
  //   },
  //   [toggle]
  // );

  // Delete Data
  // const onClickDelete = (customer) => {
  //   setCustomer(customer);
  //   setDeleteModal(true);
  // };


  // const handleDeleteCustomer = () => {
  //   if (customer.id) {
  //     dispatch(onDeleteCustomer(customer));
  //     setDeleteModal(false);
  //   }
  // };

  // Get Data
  // useEffect(() => {
  //   dispatch(onGetCustomers());
  // }, [dispatch]);

  // useEffect(() => {
  //   setCustomer(customers);
  //   setFilteredData(customers);
  // }, [customers]);

  // Add Data
  // const handleCustomerClicks = () => {
  //   setCustomer("");
  //   setIsEdit(false);
  //   toggle();
  // };

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        // Header: "FirebaseID",
        accessor: "firebaseid",
        Cell: (cell) => {
          return <input type="hidden" value={cell.value} />;
        },
      },
      {
        Header: "Id",
        accessor: "id",
        // hiddenColumns: true,
        // Cell: (cell) => {
        //   return <input type="hidden" value={cell.value} />;
        // }
      },
      {
        Header: "Cliente",
        accessor: "cliente",
        filterable: false,
      },
      {
        Header: "Razón Social",
        accessor: "razonsocial",
        filterable: false,
      },
      {
        Header: "D.N.I",
        accessor: "dni",
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Telefono",
        accessor: "telefono",
        filterable: false,
      },
      {
        Header: "Ciudad",
        accessor: "ciudad",
        filterable: false,
      },
      {
        Header: "Provincia",
        accessor: "provincia",
        filterable: false,
      },
      {
        Header: "Dirección",
        accessor: "direccion",
        filterable: false,
      },
      {
        Header: "Código Postal",
        accessor: "codigopostal",
        filterable: false,
      },
      {
        Header: "Fecha",
        accessor: "fecha",
        filterable: false,
      },
      {
        Header: "Estatus",
        accessor: "estatus",
        Cell: (cell) => {
          switch (cell.value) {
            case "Active":
              return (
                <span className="badge text-uppercase badge-soft-success">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Block":
              return (
                <span className="badge text-uppercase badge-soft-danger">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase badge-soft-info">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
          }
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                <a
                  href="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    // handleCustomerClick(customerData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </a>
              </li>
              <li className="list-inline-item" title="Remove">
                <a
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    // onClickDelete(customerData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </a>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div id="customerList" className="card">
                  <div className="card-header border-bottom-dashed">
                    {/* <div className="row g-4 align-items-center">
                      <div className="col-sm">
                        <div>
                          <h5 className="card-title mb-0">Lista de clientes</h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div>
                          <button
                            type="button"
                            className="btn btn-success add-btn"
                            id="create-btn"
                            onClick={() => {
                              setIsEdit(false);
                              setCustomer({});
                              toggle();
                            }}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Nuevo Cliente
                          </button>{" "}
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="card-body border-bottom-dashed border-bottom">
                    {/* <form>
                      <div className="row g-3">
                        <div className="col-xl-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Busqueda de clientes por email,telefono,codigo,D.N.I"
                              value={search}
                              onChange={(e) => handleSearch(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="row g-3">
                            <div className="col-sm-4">
                              <div className="">
                                <Flatpickr
                                  className="form-control"
                                  id="datepicker-publish-input"
                                  placeholder="Seleccione fecha1"
                                  options={{
                                    altInput: true,
                                    altFormat: "F j, Y",
                                    // mode: "multiple",
                                    dateFormat: "d.m.y",
                                    locale: "es",
                                  }}
                                  locale="es"
                                  onChange={(e) => {
                                    dateformate(e);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <select
                                  value={customerstatus.value}
                                  className="form-select"
                                  onChange={(e) => {
                                    handlecustomerStatus(e);
                                  }}
                                  name="choices-single-default"
                                  id="idStatus"
                                >
                                  {customerstatus.map((option, index) => (
                                    <option key={index} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary w-100"
                                  onClick={() => {
                                    botonfiltrar();
                                  }}
                                >
                                  <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                  Filtros
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form> */}
                  </div>

                  <div className="card-body">
                    <TableContainer
                      columns={columns}
                      data={filteredData}
                      isGlobalFilter={false}
                      isAddUserList={false}
                      customPageSize={30}
                      divClass="overflow-auto"
                      // handleCustomerClick={handleCustomerClicks}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};
