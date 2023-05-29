import { Text } from "@nextui-org/react";
import { useParallax } from "react-scroll-parallax";
import { useRef } from "react";

export const Section3 = () => {
  const target1 = useRef(null);

  const button1 = useParallax({
    speed: 10,
    easing: "easeInOut",
    targetElement: target1.current,
  });

  const button2 = useParallax({
    speed: -10,
    easing: "easeInOutBack",
    targetElement: target1.current,
  });

  return (
    <section className="section3">
      <div
        style={{
          height: "81vh",
          backgroundColor: "#20264c",
          display: "flex",
          flexDirection: "column",
          backgroundImage:
            "url(https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685346952/BillingApp/Public/lines-map-2_Mesa-de-trabajo-1_tvrojo.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "100%",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="tittleSection1" color="white">
          Dale un impulso a tu negocio con nuestro programa de facturación de
          última generación<br></br> Simplifica tus tareas financieras y lleva
          un control preciso de tus transacciones con nuestra poderosa
          herramienta.<br></br>
          Olvídate del papeleo y los cálculos interminables, nuestro programa te
          permite generar facturas profesionales con solo unos clics.<br></br>{" "}
          Desde pequeñas empresas hasta grandes corporaciones,<br></br> nuestro
          programa de facturación se adapta a tus necesidades y te ayuda a
          agilizar tus operaciones diarias.<br></br>{" "}
          <strong>
            !! Si a tu cuñado le parece sencillo imaginate a ti. !!
          </strong>
        </Text>

        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            margin: "45px 20%",
          }}
        >



          <div  ref={button1.ref}>
            <button
              className="button type1"
              style={{
                marginTop: "20px",
              }}
            >
              <span className="btn-txt">Petalo</span>
            </button>
            <div className="pulsating-circle" />

            {/* <div className="circles-wrapper">
              <div className="circle circle-lg">
                <div className="circle circle-md">
                  <div className="circle circle-sm" />
                </div>
              </div>
            </div> */}
          </div>
          <div  ref={button2.ref}>
            <button
              className="button type1"
              style={{
                marginTop: "20px",
              }}
            >
              <span className="btn-txt">I nedd it</span>
            </button>
            <div className="pulsating-circle" />

            {/* <div className="circles-wrapper">
              <div className="circle circle-lg">
                <div className="circle circle-md">
                  <div className="circle circle-sm" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
