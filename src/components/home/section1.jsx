import { Text } from "@nextui-org/react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useParallax } from "react-scroll-parallax";

import { useEffect, useState, useRef } from "react";

export const Section1 = () => {
  const target = useRef(null);
  const [pathD, setPathD] = useState("M0,0L100,800L100,400L0,350Z");
  const bill = useParallax({
    speed: 50,
    easing: 'easeInOut',
    targetElement: target.current,
  });
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const updatePathD = () => {
      const screenWidth = window.innerWidth;

      // Lógica para calcular el nuevo valor de 'd' según la resolución de pantalla
      let newPathD = "";
      console.log(screenWidth);

      //switch segun screenwidth
      if (screenWidth < 768) {
        newPathD = "M0,0L800,800L200,100L0,100Z";
      } else if (screenWidth < 992) {
        newPathD = "M0,0L1000,800L200,100L0,100Z";
      } else if (screenWidth < 1200) {
        newPathD = "M0,0L1200,800L200,100L0,100Z";
      } else {
        newPathD = "M0,0L1800,800L100,100L0,350Z";
      }

      // if (screenWidth < 1468) {
      //   newPathD = 'M0,0L1200,800L200,100L0,100Z';
      // } else {
      //   newPathD = 'M0,0L1800,800L100,400L0,350Z';
      // }

      // Actualizar el estado con el nuevo valor de 'd'
      setPathD(newPathD);
    };

    // Llamar a la función inicial para establecer el valor inicial de 'd'
    updatePathD();

    // Agregar el evento de redimensionamiento
    window.addEventListener("resize", updatePathD);

    // Limpiar el evento de redimensionamiento al desmontar el componente
    return () => {
      window.removeEventListener("resize", updatePathD);
    };
  }, []);

  return (
    <section ref={target}>
      <div >
        <div
          style={{
            position: "relative",
            height: "91vh",
          }}
          className="section1"
        >
          <Text 
            className="tittleSection1"
            size={40}
            weight="bold"
            data-aos="fade-up"
          >
            La <br></br>facturación que<br></br>te mereces
          </Text>

          <h1 data-aots="flip-left" style={{ color: "#ff4f52" }}>
            <span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                F
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                a
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                c
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                t
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                u
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                r
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                a
              </span>
            </span>

            <br></br>
            <span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                t
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                u
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                s
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {" "}
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                &quot;b
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                i
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                l
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                l
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                s&quot;
              </span>
            </span>
            <br></br>
            <span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                l
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="900"
              >
                i
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                k
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1100"
              >
                e
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                {" a "}
              </span>
            </span>

            <br></br>

            <span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1300"
              >
                B
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1400"
              >
                i
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1500"
              >
                l
              </span>
              <span
                className="inner aos-init"
                data-aos="fade-up"
                data-aos-delay="1500"
              >
                l
              </span>
            </span>
          </h1>

          <div  >
            <img  ref={bill.ref}
              className="inner aos-init img-fluid"
              data-aos="fade-up"
              // data-aos-delay="1500"
              src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685300806/BillingApp/Public/bill2_aq2pfs.png"
            />
            <svg data-aos="fade-up" className="circle" viewBox="0 0 100 100">
              <circle cx="50%" cy="50%" r="15%" fill="#ff4f52" />
            </svg>
            <svg className="circle " viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="41"
                fill="none"
                stroke="#ff4f52"
                strokeWidth=""
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0.650 0 500 1"
              style={{ height: "50vh" }}
              className="svg"
            >
              <rect x="0%" y="65%"  style={{height:"100%",width:"100%" }} fill="#ff4f52" />
              <path fill="#ff4f52" fillOpacity="1" d={pathD} ></path>
              {/* <foreignObject x={"80%"} y={"10%"} width={160} height={80}>
                <h1
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ color: "black", fontSize: 24, textAlign: "center" }}
                >
                  Título dentro del SVG
                </h1>
              </foreignObject> */}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// const MyButton = styled(Button, {
//   borderRadius: "9999px",
//   fontSize: "85px",
//   border: "0",
//   fontFamily: "MiFuente",
//   "@font-face": {
//     fontFamily: "MiFuente",
//     src: `url(${fuente}) format('truetype')`,
//   },
// });
