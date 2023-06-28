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
import {
  firebaseAddInvoice,
  firebaseUpdateUser,
  getCounterBills,
} from "../firebase/firebase";
import { ModalGridTableComponent } from "../components/maintenance/ModalGridTableComponent";
import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { BillIcon, UserIcon } from "../components/icons";
import {
  setCurrenInvoice,
  upateCurrenCustomer,
} from "../reducers/dataMaintenanceReducer";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Invoices = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentCustomer, currentInvoice } = useSelector(
    (state) => state.data
  );

  const aplanaLineasFactura = useMemo(() => {
    console.log(1111);
    if (currentInvoice.lineas === undefined) return [];

    const arrayPlanoLineas = [];
    currentInvoice.lineas.map(function (linea) {
      arrayPlanoLineas.push([
        { text: linea.producto + "\n" + linea.descripcion },
        { text: linea.cantidad },
        { text: linea.precio },
        { text: linea.total, alignment: "right", fillColor: "#e0e0e0" },
      ]);
    });

    return [
      [
        { text: "DESCRIPCION", fillColor: "#e0e0e0" },
        { text: "CANTIDAD", fillColor: "#e0e0e0" },
        { text: "DESCRIPCION", fillColor: "#e0e0e0" },
        { text: "IMPORTE", fillColor: "#e0e0e0" },
      ],
      ...arrayPlanoLineas,
      [
        "",
        "",
        "",
        {
          text: `Subtotal: ${currentInvoice?.subtotal}\n
          Tipo IVA: 21 \n
          Impuestos: ${currentInvoice?.impuestos}\n
          Total Factura: ${currentInvoice?.total}\n
          `,
          fillColor: "#e0e0e0",
          alignment: "right",
        },
      ],
    ];
  }, [currentInvoice]);

  const [docDefinition, setDocDefinition] = useState({});

  useEffect(() => {
    setDocDefinition({
      watermark: {
        text: "Factura",
        angle: 70,
        color: "red", // Cambia el color aquí, por ejemplo, 'red', '#FF0000', 'rgb(255, 0, 0)'
        opacity: 0.3,
        bold: true,
        italics: false,
      },

      pageMargins: [80, 60, 80, 60], // Márgenes en puntos [izquierdo, superior, derecho, inferior]
      content: [
        {
          margin: [0, 20, 0, 0],
          alignment: "justify",
          columns: [
            // Columna 1: Imagen
            {
              image: "logo",
              fit: [100, 100],
            },
            // Columna 2: Texto alineado a la derecha
            {
              text: "FACTURA",
              alignment: "right",
              fontSize: 34,
            },
          ],
        },

        {
          margin: [0, 20, 0, 0],
          alignment: "justify",
          columns: [
            { text: "DIRECCIÓN", style: "header" },
            {
              text: `D.N.I: ${user?.dni}`,
              style: "header",
              alignment: "right",
            },
          ],
        },
        {
          alignment: "justify",
          style: "anotherStyle",
          columns: [
            { text: user?.address, margin: [0, 5, 0, 0] },
            { text: user?.name, alignment: "right", margin: [0, 5, 0, 0] },
          ],
        },
        {
          alignment: "justify",
          style: "anotherStyle",
          columns: [
            {
              text: `${user?.villaege} (${user?.province})`,
              margin: [0, 5, 0, 0],
            },
            { text: user?.email, alignment: "right" },
          ],
        },
        {
          alignment: "justify",
          style: "anotherStyle",
          columns: [
            {
              text: `Código postal: ${user?.postalCode}`,
              margin: [0, 5, 0, 0],
            },
            { text: user?.phone, alignment: "right" },
          ],
        },
        {
          svg: '<svg width="600" height="25" viewBox="0 0 1200 5">    <line x1="0" y1="0" x2="900" y2="0" style="stroke:#000000; stroke-width:1"></line> </svg>',
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "*", "*", "*"],

            body: [
              [
                "FACTURA Nº",
                "FECHA",
                "FORMA DE PAGO",
                {
                  text: "TOTAL FACTURA",
                  style: "tableHeader",
                  alignment: "right",
                },
              ],
              [
                currentInvoice?.numfactura,
                currentInvoice?.fechaFactura,
                currentInvoice?.formapago,
                {
                  text: currentInvoice?.total,
                  style: "tableHeader",
                  alignment: "right",
                },
              ],
            ],
          },
          layout: "noBorders",
        },
        {
          svg: '<svg width="600" height="15" viewBox="0 0 1200 15">    <line x1="0" y1="0" x2="900" y2="0" style="stroke:#000000; stroke-width:1"></line> </svg>',
        },
        { text: `FACTURAR A:`, style: "header" },
        {
          text: currentInvoice.nombreCliente,
          style: "header",
          margin: [0, 5, 0, 0],
        },
        { text: currentInvoice.dni, style: "header", margin: [0, 5, 0, 0] },
        {
          text: currentInvoice.direccion,
          style: "header",
          margin: [0, 5, 0, 0],
        },
        {
          text: `${currentInvoice.ciudad} (${currentInvoice.provincia}) ${currentInvoice.codpostal}`,
          style: "header",
          margin: [0, 5, 0, 0],
        },
        {
          text: currentInvoice.telefono,
          style: "header",
          margin: [0, 5, 0, 0],
        },
        { text: currentInvoice.email, style: "header", margin: [0, 5, 0, 0] },
        {
          svg: '<svg width="600" height="50" viewBox="0 0 1200 15">    <line x1="0" y1="0" x2="900" y2="0" style="stroke:#000000; stroke-width:1"></line> </svg>',
        },
        {
          // layout: "lightHorizontalLines", // optional
          margin: [0, 5, 0, 0],
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "auto", 100, "*"],

            body: aplanaLineasFactura,
          },
        },
      ],

      images: {
        logo: {
          url: user?.image,
          headers: {
            myheader: "123",
            myotherheader: "abc",
          },
        },
      },
      styles: {
        header: {
          fontSize: 12,
          bold: true,
        },
        anotherStyle: {
          italics: true,
        },
      },
    });
  }, [currentCustomer, currentInvoice]);

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    // pdfGenerator.getBlob((blob) => {
    //   const url = URL.createObjectURL(blob);
    //   setUrl(url);
    // });
    pdfGenerator.download(`fac${currentInvoice.numfactura}.pdf`);
    pdfGenerator.open()
  };

  const styleInputLines = {
    height: "35px",
    borderRadius: "7px",
    outline: "auto grey",
    paddingInline: "15px",
    fontSize: "16px",
    width: "100%",
  };

  const [customersFields, setCustomerFields] = useState([
    { name: "NOMBRE", uid: "nombre" },
    { name: "RÁZON SOCIAL", uid: "razon" },
    { name: "D.N.I", uid: "dni" },
    { name: "TELÉFONO", uid: "telefono" },
    { name: "CIUDAD", uid: "ciudad" },
    { name: "ACTIONS", uid: "actions" },
  ]);

  const [invoiceFields, setInvoiceFields] = useState([
    { name: "Nº FACTURA", uid: "numfactura" },
    { name: "CLIENTE", uid: "nombreCliente" },
    { name: "D.N.I", uid: "dni" },
    { name: "FECHA", uid: "fechaFactura" },
    { name: "TOTAL", uid: "total" },
    { name: "ACTIONS", uid: "actions" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
    control,
  } = useForm({});

  const { fields, remove, append } = useFieldArray({
    control,
    name: "lineas", // Nombre del campo dinámico
  });

  useEffect(() => {
    getCounterBills(dispatch);
    dispatch(setCurrenInvoice({ numfactura: user.nextNumBill }));
  }, []);

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

  useEffect(() => {
    setValue("numfactura", currentInvoice.numfactura);
    setValue("fechaFactura", currentInvoice.fechaFactura);
    setValue("formapago", currentInvoice.formapago);
    setValue("nombreCliente", currentInvoice.nombreCliente);
    setValue("dni", currentInvoice.dni);
    setValue("direccion", currentInvoice.direccion);
    setValue("ciudad", currentInvoice.ciudad);
    setValue("codpostal", currentInvoice.codpostal);
    setValue("provincia", currentInvoice.provincia);
    setValue("email", currentInvoice.email);
    setValue("telefono", currentInvoice.telefono);
    setValue("subtotal", currentInvoice.subtotal);
    setValue("impuestos", currentInvoice.impuestos);
    setValue("total", currentInvoice.total);
    setValue("lineas", currentInvoice.lineas);
  }, [currentInvoice]);

  const StyledInput = styled("input", {
    backgroundColor: "$gray100",
  });

  const StyledSelect = styled("select", {
    backgroundColor: "$gray100",
  });

  const StyledParrafo = styled("p", {
    backgroundColor: "$gray100",
  });

  const agregarLinea = () => {
    append({
      numfactura: "",
      producto: "",
      descripcion: "",
      precio: 0,
      cantidad: null,
    });
  };

  const borrarLinea = (e, index) => {
    remove(index);
  };

  const lineas = watch("lineas") || []; // Obtener los valores de las líneas

  // const calcularTotalLinea = (index) =>
  //   lineas[index]?.precio * lineas[index]?.cantidad;

  // const calculaSubtoTotalFactura = () => lineas.reduce((acumulador, elemento) => acumulador + (elemento.cantidad * elemento.precio), 0);

  const calculaSubtoTotalFactura = (index) => {
    const totales = lineas.reduce((acumulador, elemento) => {
      return acumulador + elemento.cantidad * elemento.precio;
    }, 0);
    setValue("subtotal", totales);
    setValue("impuestos", (totales * 0.21).toFixed(2));
    setValue("total", (totales * 1.21).toFixed(2));
    setValue(
      `lineas.${index}.total`,
      lineas[index]?.precio * lineas[index]?.cantidad
    );
  };

  const onSubmit = async (data) => {
    try {
      await firebaseAddInvoice(user.email, data);
      resetForm();
      await firebaseUpdateUser(user.email, {
        nextNumBill: parseInt(data.numfactura) + 1,
      });

      Swal.fire({
        title: "Operación realizada",
        text: "Datos actualizados",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        button: "Ok",
      });
    }
  };

  const resetForm = () => {
    dispatch(setCurrenInvoice({ numfactura: user.nextNumBill }));
    dispatch(upateCurrenCustomer({}));
    reset();
    reset({ lineas: [] });
  };

  return (
    <Layout>
      <div className="App">
        <button onClick={createPdf}>Generate PDF</button>
      </div>

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
                    defaultValue={`${user?.address}`}
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
                    defaultValue={`${user?.village} (${user?.province})  ${user?.postalCode}`}
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
                    defaultValue={`Teléfono: ${user?.phone}`}
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
                    defaultValue={`D.N.I: ${user?.dni}`}
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
                    defaultValue={` ${user?.name}`}
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
                    defaultValue={`${user?.email}`}
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
                    {...register("numfactura", {
                      required: {
                        value: true,
                        message: "Por favor ingrese Nº de factura",
                      },
                    })}
                    type="text"
                    autoComplete="off"
                    style={{
                      height: "35px",
                      borderRadius: "0px",
                      border: "0px solid  rgb(200, 200, 200)",
                      width: "100%",
                    }}
                  />
                  {/* <Spacer x={0.5} /> */}
                  <ModalGridTableComponent
                    nameFields={invoiceFields}
                    title="Facturas"
                    collection="invoices"
                    icon={<BillIcon width={55} fill="red" />}
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
                    {...register("formapago")}
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
                nameFields={customersFields}
                title="Clientes"
                collection="customers"
                icon={<UserIcon width={55} />}
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
                      // required: {
                      //   value: true,
                      //   message: "Por favor ingrese direccion",
                      // },
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
                      // required: {
                      //   value: true,
                      //   message: "Por favor ingrese ciudad",
                      // },
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
                      // required: {
                      //   value: true,
                      //   message: "Por favor ingrese codpostal",
                      // },
                    })}
                    autoComplete="off"
                    type="text"
                    placeholder="Código postal"
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
                      // required: {
                      //   value: true,
                      //   message: "Por favor ingrese provincia",
                      // },
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
                      // required: {
                      //   value: true,
                      //   message: "Por favor ingrese telefono",
                      // },
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
                    Cantidad
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
                    Total
                  </StyledParrafo>
                </div>
              </div>
            </Grid>
          </Grid.Container>

          {fields.map((linea, index) => {
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
                            // border: "0px solid  rgb(200, 200, 200)",
                            width: "100%",
                          }}
                        >
                          {index + 1}
                        </StyledParrafo>
                      </div>
                    </div>
                  </Grid>

                  <Grid xs={12} sm={3}>
                    <input
                      {...register(`lineas.${index}.producto`)}
                      className=""
                      type="text"
                      autoComplete="off"
                      placeholder="Producto / Servicio"
                      style={styleInputLines}
                    />
                  </Grid>

                  <Grid xs={12} sm={2}>
                    <input
                      style={styleInputLines}
                      key={index}
                      type="number"
                      autoComplete="off"
                      placeholder="Precio"
                      {...register(`lineas.${index}.precio`)}
                      onBlur={() => {
                        calculaSubtoTotalFactura(index);
                      }}
                    />
                  </Grid>

                  <Grid xs={12} sm={2}>
                    <input
                      style={styleInputLines}
                      type="number"
                      autoComplete="off"
                      step="any"
                      placeholder="Cantidad"
                      {...register(`lineas.${index}.cantidad`)}
                      onBlur={() => {
                        calculaSubtoTotalFactura(index);
                      }}
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <Grid.Container justify="space-between">
                      <Grid xs={12} sm={12}>
                        <input
                          style={styleInputLines}
                          {...register(`lineas.${index}.total`)}
                          type="number"
                          autoComplete="off"
                          placeholder="Total"
                          step="any"
                          readOnly
                          // defaultvalue={calcularTotalLinea(index)}
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
                    <textarea
                      style={{ ...styleInputLines, height: "120px" }}
                      type="number"
                      autoComplete="off"
                      placeholder="Descripción"
                      {...register(`lineas.${index}.descripcion`)}
                    />
                  </Grid>
                </Grid.Container>
              </div>
            );
          })}

          <Grid.Container gap={1} css={{ marginTop: "15px" }}>
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
                        {...register(`subtotal`)}
                        // value={calculaSubtoTotalFactura.subTotal}
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
                        {...register(`tipoiva`)}
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
                        {...register(`descuentos`)}
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
                        {...register(`impuestos`)}
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
                        {...register(`total`)}
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

            <button
              to="#"
              type="button"
              className="btn btn-danger"
              onClick={() => {
                resetForm();
              }}
            >
              <i className="ri-newspaper-line align-bottom me-1"></i> Nueva
              Factura
            </button>

            <button type="button" to="#" className="btn btn-secondary">
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
