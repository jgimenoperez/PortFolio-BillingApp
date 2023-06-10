import { Text } from "@nextui-org/react";
// import { useParallax } from "react-scroll-parallax";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const Section3 = () => {
  const [inViewRef, inView] = useInView();
  const [position, setPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [scroll, setScroll] = useState(0);


  const parallaxEffect = inView ? position : 0;
  
  useEffect(() => {
    let lastScrollTop = 0;
    let desplazamiento=10

    if (screenWidth<=800){
      desplazamiento=2
    }

    const handleScroll = (e) => {
      e.preventDefault();
      if (window.scrollY==0){
        setPosition(0);
      }else 
      if (lastScrollTop < window.scrollY) {
        setPosition((prevCount) => prevCount - desplazamiento);
      } else {
        setPosition((prevCount) => prevCount + desplazamiento);
      }

      lastScrollTop = window.scrollY;
      if (inView) {
        setScroll(window.scrollY);
      }
    };

    if (inView) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
      setPosition(0);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [inView]);


  return (
    <section className="section3" >
      <Text color="white">
        Dale un impulso a tu negocio con nuestro programa de facturación de
        última generación<br></br> Simplifica tus tareas financieras y lleva un
        control preciso de tus transacciones con nuestra poderosa herramienta.
        <br></br>
        Olvídate del papeleo y los cálculos interminables, nuestro programa te
        permite generar facturas profesionales con solo unos clics.<br></br>{" "}
        Desde pequeñas empresas hasta grandes corporaciones,<br></br> nuestro
        programa de facturación se adapta a tus necesidades y te ayuda a
        agilizar tus operaciones diarias.<br></br>{" "}
      </Text>
      <br></br>
      <Text h2 color="white" ref={inViewRef}>
        <strong>!! Si a tu cuñado le parece sencillo imaginate a ti. !!</strong>
      </Text>

      <div className="buttonContainer parallax-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            transform: `translateY(${parallaxEffect}px)`
          }}
          className="parallax-element"
        >
          <button 
            className="button type1" 
            >
            <span className="btn-txt">Saber más</span>
          </button>
          <div className="type1 pulsating-circle" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            transform: `translateY(${parallaxEffect*-1}px)`
          }}
        >
          <button className="button type1">
            <span className="btn-txt">I need it</span>
          </button>
          <div className="type1 pulsating-circle" />
        </div>

        {/* <div className="circles-wrapper">
              <div className="circle circle-lg">
                <div className="circle circle-md">
                  <div className="circle circle-sm" />
                </div>
              </div>
            </div> */}
      </div>
    </section>
  );
};
