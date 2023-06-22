import { Layout } from "../components/navbar/layout";
import {
  Text,
  Grid,
  Container,
  Button,
  Spacer,
  Avatar,
  styled,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { ModalGridTableComponent } from "../components/maintenance/ModalGridTableComponent";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { getCounterBills } from "../firebase/firebase";

export const Invoices = () => {
  const dispatch = useDispatch();

  const camposLineasRef = useRef([
    {
      numfactura: "",
      producto: "",
      descripcion: "",
      precio: 0,
      cantidad: null,
    },
  ]);

  const { user } = useSelector((state) => state.user);
  const { currentCustomer } = useSelector((state) => state.data);
  const [toggleState, setToggleState] = useState(false);
  const [nameCustomersFields, setCustomersNameFields] = useState([
    { name: "NOMBRE", uid: "nombre" },
    { name: "RÁZON SOCIAL", uid: "razon" },
    { name: "D.N.I", uid: "dni" },
    { name: "TELÉFONO", uid: "telefono" },
    { name: "CIUDAD", uid: "ciudad" },
    { name: "ACTIONS", uid: "actions" },
  ]);

  const [numFactura, setNunFactura] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({});
 
  useEffect(() => {
    getCounterBills(dispatch)
  }, [])
  


  // getCounterBills()
  // .then((contador) => {
  //   console.log("Valor del contador:", contador);
  //   // Puedes realizar acciones con el valor del contador aquí
  // })
  // .catch((error) => {
  //   console.error("Error:", error);
  //   // Manejar el error si ocurre
  // });

  // useEffect(() => {
  //   console.log(111,numFactura)
  // }, [numFactura])

  useEffect(() => {
    setValue("nombreCliente", currentCustomer.nombre);
    setValue("dni", currentCustomer.dni);
    setValue("direccion", currentCustomer.direccion);
    setValue("ciudad", currentCustomer.ciudad);
    setValue("codpostal", currentCustomer.codpostal);
    setValue("provincia", currentCustomer.provincia);
    setValue("email", currentCustomer.email);
    setValue("telefono", currentCustomer.telefono);
  }, [currentCustomer]);

  const StyledInput = styled("input", {
    backgroundColor: "$gray100",
  });

  const StyledSelect = styled("select", {
    backgroundColor: "$gray100",
  });

  const StyledParrafo = styled("p", {
    backgroundColor: "$gray100",
  });

  const StyledTextArea = styled("textarea", {
    backgroundColor: "$gray100",
  });

  const agregarLinea = () => {
    camposLineasRef.current = [
      ...camposLineasRef.current,
      {
        numfactura: "",
        producto: "",
        descripcion: "",
        precio: 0,
        cantidad: null,
      },
    ];

    setToggleState(!toggleState);
  };

  const borrarLinea = (e, index) => {
    const lineasFacturasAux = [...camposLineasRef.current];
    lineasFacturasAux.splice(index, 1);
    camposLineasRef.current = lineasFacturasAux;
    setToggleState(!toggleState);
  };

  const lineas = watch("linea") || []; // Obtener los valores de las líneas

  const calcularTotal = (index) =>
    lineas[index]?.precio * lineas[index]?.cantidad;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container
          lg
          gap={0}
          css={{
            borderRadius: "10px",
            padding: "20px",
            marginTop: "20px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Grid.Container gap={2} justify="space-between">
            <Grid xs={12} sm={4}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <Avatar
                  css={{ size: "120px" }}
                  squared
                  text={
                    user?.typeProvider === "email" ? user?.email : user?.name
                  }
                  src={user?.image}
                />
                <Text h2>{"DIRECCIÓN"}</Text>
                <div className="inputGroup" style={{ backgroundColor: "red" }}>
                  <StyledInput
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                    readOnly
                    type="text"
                    autoComplete="off"
                    defaultValue={`${user.address}`}
                  />
                </div>
                <div className="inputGroup">
                  <StyledInput
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                    readOnly
                    type="text"
                    autoComplete="off"
                    defaultValue={`${user.village} (${user.province})  ${user.postalCode}`}
                  />
                </div>
                <div className="inputGroup">
                  <StyledInput
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                    readOnly
                    type="text"
                    autoComplete="off"
                    defaultValue={`Teléfono: ${user.phone}`}
                  />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={4}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <Text h2>{"FACTURA"}</Text>
                <div className="inputGroup">
                  <StyledInput
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                    readOnly
                    type="text"
                    autoComplete="off"
                    defaultValue={`D.N.I: ${user.dni}`}
                  />
                </div>
                <div className="inputGroup">
                  <StyledInput
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                    readOnly
                    type="text"
                    autoComplete="off"
                    defaultValue={` ${user.name}`}
                  />
                </div>
                <div className="inputGroup">
                  <StyledInput
                    style={{
                      width: "100%",
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                    readOnly
                    type="text"
                    autoComplete="off"
                    defaultValue={`${user.email}`}
                  />
                </div>
              </div>
            </Grid>
          </Grid.Container>
          <hr className="linea-separadora" />
          <Text style={{ marginLeft: "8px" }} h2>
            {"Datos de facturación"}
          </Text>
          <Grid.Container gap={2} justify="space-between">
            <Grid xs={12} sm={4}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <label htmlFor="buscarfac">Buscar factura</label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <StyledInput
                    type="text"
                    autoComplete="off"
                    value={user.nextNumBill}
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                    }}
                  />
                  {/* <Spacer x={0.5} /> */}
                  <ModalGridTableComponent
                    nameFields={nameCustomersFields}
                    title="Clientes"
                    collection="customers"
                  />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={4}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="fechafac">Fecha</label>
                  <StyledInput
                    {...register("fechaFactura", {
                      required: {
                        value: true,
                        message: "Por favor ingrese la fecha de la factura",
                      },
                    })}
                    autoComplete="off"
                    type="date"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  {errors.fechaFactura && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.fechaFactura.message}
                    </Text>
                  )}
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={4}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="formapago">Forma de pago</label>
                  <StyledSelect
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  >
                    <option value="contado">contado</option>
                    <option value="transferencia">transferencia</option>
                    <option value="bizum">bizum</option>
                  </StyledSelect>
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
          </Grid.Container>
          <hr className="linea-separadora" />
          <Text style={{ marginLeft: "8px" }} h2>
            {"Facturar a:"}
          </Text>
          <Grid.Container gap={1}>
            <Grid xs={12} sm={6}>
              <div style={{ display: "block", width: "100%" }}>
                <StyledInput
                  {...register("nombreCliente", {
                    required: {
                      value: true,
                      message: "Por favor ingrese el nombre del cliente",
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  placeholder="Nombre cliente"
                  style={{
                    height: "35px",
                    borderRadius: "0px",
                    border: "0px solid  rgb(200, 200, 200)",
                    width: "100%",
                  }}
                />
                {errors.nombreCliente && (
                  <Text color="#ff4ecd" size="$md">
                    {errors.nombreCliente.message}
                  </Text>
                )}
              </div>
              <Spacer x={0.5} />
              <ModalGridTableComponent
                nameFields={nameCustomersFields}
                title="Clientes"
                collection="customers"
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledInput
                    {...register("dni", {
                      required: {
                        value: true,
                        message: "Por favor ingrese dni",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="D.N.I"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  {errors.dni && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.dni.message}
                    </Text>
                  )}
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <StyledInput
                    {...register("direccion", {
                      required: {
                        value: true,
                        message: "Por favor ingrese direccion",
                      },
                    })}
                    type="text"
                    autoComplete="off"
                    placeholder="Dirección"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={2}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledInput
                    {...register("ciudad", {
                      required: {
                        value: true,
                        message: "Por favor ingrese ciudad",
                      },
                    })}
                    autoComplete="off"
                    placeholder="Ciudad"
                    type="text"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={2}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledInput
                    {...register("codpostal", {
                      required: {
                        value: true,
                        message: "Por favor ingrese codpostal",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="Cóodigo postal"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={2}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledInput
                    {...register("provincia", {
                      required: {
                        value: true,
                        message: "Por favor ingrese provincia",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="Provincia"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledInput
                    {...register("email", {
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Ingresa un correo electrónico válido.",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="Email"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  {errors.email && (
                    <Text color="#ff4ecd" size="$md">
                      {errors.email.message}
                    </Text>
                  )}
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledInput
                    {...register("telefono", {
                      required: {
                        value: true,
                        message: "Por favor ingrese telefono",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="Teléfono"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                    }}
                  />
                  <Spacer x={0.5} />
                </div>
              </div>
            </Grid>
          </Grid.Container>

          <hr className="linea-separadora" />

          <Text style={{ marginLeft: "8px" }} h2>
            {"Líneas factura"}
          </Text>
          <Grid.Container
            gap={0}
            style={{
              marginLeft: "5px",
            }}
          >
            <Grid xs={12} sm={1}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <StyledParrafo
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                    }}
                  >
                    #
                  </StyledParrafo>
                </div>
              </div>
            </Grid>

            <Grid xs={12} sm={3}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledParrafo
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                      paddingLeft: "5px",
                    }}
                  >
                    Producto/Servicio
                  </StyledParrafo>
                </div>
              </div>
            </Grid>

            <Grid xs={12} sm={2}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledParrafo
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                      paddingLeft: "5px",
                    }}
                  >
                    Precio
                  </StyledParrafo>
                </div>
              </div>
            </Grid>

            <Grid xs={12} sm={4}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledParrafo
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                      paddingLeft: "5px",
                    }}
                  >
                    Cantidad
                  </StyledParrafo>
                </div>
              </div>
            </Grid>

            <Grid xs={12} sm={2}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StyledParrafo
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                      paddingLeft: "5px",
                    }}
                  >
                    Total
                  </StyledParrafo>
                </div>
              </div>
            </Grid>
          </Grid.Container>

          {camposLineasRef.current.map((linea, index) => {
            return (
              <div key={index}>
                <Grid.Container gap={1}>
                  <Grid xs={12} sm={1}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <StyledParrafo
                          style={{
                            textIndent: "10px",
                            height: "35px",
                            borderRadius: "10px",
                            border: "0px solid  rgb(200, 200, 200)",
                            width: "100%",
                          }}
                        >
                          {index + 1}
                        </StyledParrafo>
                      </div>
                    </div>
                  </Grid>

                  <Grid xs={12} sm={3}>
                    <StyledInput
                      {...register(`linea.${index}.producto`)}
                      type="text"
                      autoComplete="off"
                      placeholder="Producto / Servicio"
                      style={{
                        textIndent: "10px",
                        width: "100%",
                        height: "35px",
                        borderRadius: "10px",
                        border: "0px solid  rgb(200, 200, 200)",
                      }}
                    />
                  </Grid>

                  <Grid xs={12} sm={2}>
                    <StyledInput
                      style={{
                        textIndent: "10px",
                        width: "100%",
                        height: "35px",
                        borderRadius: "10px",
                        border: "0px solid  rgb(200, 200, 200)",
                      }}
                      key={index}
                      type="number"
                      autoComplete="off"
                      placeholder="Precio"
                      // {...register(`linea[${index}].precio`)}
                      {...register(`linea.${index}.precio`)}
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <StyledInput
                      style={{
                        textIndent: "10px",
                        width: "100%",
                        height: "35px",
                        borderRadius: "10px",
                        border: "0px solid  rgb(200, 200, 200)",
                      }}
                      type="number"
                      autoComplete="off"
                      placeholder="Cantidad"
                      {...register(`linea.${index}.cantidad`)}
                    />
                  </Grid>

                  <Grid xs={12} sm={2}>
                    <Grid.Container justify="space-between">
                      <Grid xs={12} sm={12}>
                        <StyledInput
                          style={{
                            textIndent: "10px",
                            width: "100%",
                            height: "35px",
                            borderRadius: "10px",
                            border: "0px solid  rgb(200, 200, 200)",
                          }}
                          type="number"
                          autoComplete="off"
                          placeholder="Total"
                          readOnly
                          value={calcularTotal(index)}
                        />
                      </Grid>
                    </Grid.Container>
                    <Spacer x={0.5} />
                    <Button
                      auto
                      bordered
                      color="primary"
                      style={{
                        height: "35px",
                        borderRadius: "10px",
                        // border: "0px solid  rgb(200, 200, 200)",
                        // width: "50%",
                      }}
                      onClick={(e) => {
                        borrarLinea(e, index);
                      }}
                    >
                      Borrar
                    </Button>
                  </Grid>
                </Grid.Container>

                <Grid.Container gap={1}>
                  <Grid xs={12} sm={6}>
                    <StyledTextArea
                      style={{
                        textIndent: "10px",
                        width: "100%",
                        height: "100px",
                        borderRadius: "10px",
                        border: "0px solid  rgb(200, 200, 200)",
                      }}
                      type="number"
                      autoComplete="off"
                      placeholder="Descripción"
                      {...register(`linea.${index}.descripcion`)}
                    />
                  </Grid>
                </Grid.Container>
              </div>
            );
          })}
          <Grid.Container gap={1}>
            <Button
              auto
              bordered
              style={{
                height: "35px",
                borderRadius: "10px",
              }}
              onClick={() => {
                agregarLinea();
              }}
            >
              + Agregar Producto
            </Button>
          </Grid.Container>
          <hr className="linea-separadora" />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <tr>
              <div className="table-sm  mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Sub Total</th>
                    <td style={{ width: "150px" }}>
                      <StyledInput
                        type="text"
                        placeholder="0.00€"
                        readOnly
                        style={{
                          height: "35px",
                          borderRadius: "0px",
                          border: "0px solid  rgb(200, 200, 200)",
                          width: "100%",
                        }}
                        // value={totales.subtotal + "€"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Tipo IVA</th>
                    <td>
                      <StyledInput
                        type="text"
                        placeholder="21%"
                        readOnly
                        value="21%"
                        style={{
                          height: "35px",
                          borderRadius: "0px",
                          border: "0px solid  rgb(200, 200, 200)",
                          width: "100%",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Descuentos </th>
                    <td>
                      <StyledInput
                        type="text"
                        placeholder="0.00€"
                        readOnly
                        style={{
                          height: "35px",
                          borderRadius: "0px",
                          border: "0px solid  rgb(200, 200, 200)",
                          width: "100%",
                        }}
                        // value={totales.descuento + "€"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Impuestos</th>
                    <td>
                      <StyledInput
                        type="text"
                        placeholder="0.00€"
                        readOnly
                        style={{
                          height: "35px",
                          borderRadius: "0px",
                          border: "0px solid  rgb(200, 200, 200)",
                          width: "100%",
                        }}
                        // value={totales.impuesto + "€"}
                      />
                    </td>
                  </tr>
                  <tr className="border-top border-top-dashed">
                    <th scope="row">Total</th>
                    <td>
                      <StyledInput
                        type="text"
                        placeholder="0.00€"
                        readOnly
                        style={{
                          height: "35px",
                          borderRadius: "0px",
                          border: "0px solid  rgb(200, 200, 200)",
                          width: "100%",
                        }}
                        // value={totales.total + "€"}
                      />
                    </td>
                  </tr>
                </tbody>
              </div>
            </tr>
          </div>

          <div className="hstack gap-2 justify-content-end d-print-none mt-4">
            <button type="submit" className="btn btn-success">
              <i className="ri-save-line align-bottom me-1"></i> Guardar
            </button>

            <button to="#" className="btn btn-danger">
              <i className="ri-newspaper-line align-bottom me-1"></i> Nueva
              Factura
            </button>

            <button to="#" className="btn btn-secondary">
              <i className="ri-printer-line align-bottom me-1"></i> Imprimir
            </button>

            {/* <Link to="#" className="btn btn-danger">
                      <i className="ri-send-plane-fill align-bottom me-1"></i>{" "}
                      Send Invoice
                    </Link> */}
          </div>
        </Container>
      </form>
    </Layout>
  );
};
