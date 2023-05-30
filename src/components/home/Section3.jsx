import { Text } from "@nextui-org/react";
// import { useParallax } from "react-scroll-parallax";
import {  useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const Section3 = () => {
  const [position, setPosition] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [inViewRef, inView] = useInView();


  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = (e) => {
      e.preventDefault();
      if (lastScrollTop < window.scrollY) {
        setPosition((prevCount) => prevCount + 10);
      } else {
        setPosition((prevCount) => prevCount -10);
      }

      lastScrollTop = window.scrollY;
      if (inView) {
        setScroll(window.scrollY);
      }

      // const animateScroll = ()=>{
      //   if (inView) {
      //     window.requestAnimationFrame(animateScroll);
      //     setPosition((prevCount) => prevCount + 5);
      //   }
      //   requestAnimationFrame(animateScroll);

      // }
      // requestAnimationFrame(animateScroll);
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

  
  const parallaxEffect = inView ? position : 0;
  

  return (
    <section className="section3"   >
      {/* <div className="parallax-container" >
        <div className="parallax-element">
          <h1 ref={parallaxRef} style={{ color: "red" }}>hola mundo </h1>
        </div>
      </div> */}

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
      <Text h2 color="white">
        <strong>!! Si a tu cuñado le parece sencillo imaginate a ti. !!</strong>
      </Text>

      <div  className="buttonContainer parallax-container" ref={inViewRef}>
        {/* <div className="pulsating-circle" /> */}

        {/* <div className="circles-wrapper">
              <div className="circle circle-lg">
                <div className="circle circle-md">
                  <div className="circle circle-sm" />
                </div>
              </div>
            </div> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            transform: `translateY(${parallaxEffect}px)`,
          }}
          className="parallax-element"
        >
          <button className="button type1"> 
            <span className="btn-txt">Petalo</span>
          </button>
          <div className="type1 pulsating-circle" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            transform: `translateY(${parallaxEffect*-1}px)`,
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
