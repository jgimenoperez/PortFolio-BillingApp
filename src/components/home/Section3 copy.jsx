import { Text } from "@nextui-org/react";
// import { useParallax } from "react-scroll-parallax";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const Section3 = () => {
  const [inViewRef, inView] = useInView();
  const [buttonIntersection, setButtonIntersection] = useState('');
  useEffect(() => {
    let startPosition = 0;
    let nextPosition = 200;
    let lastScrollTop = 0;

    const handleScroll = (e) => {
      e.preventDefault();
      if (lastScrollTop < window.scrollY) {
        setButtonIntersection('down')
        // Scroll down
        nextPosition += 1;
        // startPosition += 10;
        document.documentElement.style.setProperty(
          "--desplazamiento",
          `${nextPosition}px`
        );
        document.documentElement.style.setProperty(
          "--startPosition",
          `${startPosition}px`
        );
      } else {
        // Scroll up
        setButtonIntersection('up')
        nextPosition -= 1;
        // startPosition -= 10;
        document.documentElement.style.setProperty(
          "--desplazamiento",
          `${nextPosition*-1 }px`
        );
        document.documentElement.style.setProperty(
          "--startPosition",
          `${startPosition*-1}px`
        );
      }
      lastScrollTop = window.scrollY;
    };

    if (inView) {
      window.addEventListener("scroll", handleScroll);
      // setButtonIntersection(true)
    } else {
      window.removeEventListener("scroll", handleScroll);
      // setButtonIntersection(false)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [inView]);

  useEffect(() => {
    console.log(1, inView);
  }, [inView]);

  return (
    <section className="section3" ref={inViewRef}>
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

      <div className="buttonContainer parallax-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
          className="parallax-element"
        >
          <button
            className={`button type1 ${
              buttonIntersection==='up' ? "buttonAnimationUp" :"buttonAnimationDown"
            }`}
          >
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
            // transform: `translateY(${parallaxEffect * -1}px)`,
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
