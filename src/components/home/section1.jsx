import { Text } from "@nextui-org/react";
import Aos from "aos";
import "aos/dist/aos.css";

import { useEffect, useState,  } from "react";
import { useInView } from "react-intersection-observer";

export const Section1 = () => {
  const [position, setPosition] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [inViewRef, inView] = useInView();

  const parallaxEffect = inView ? position : 0;

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = (e) => {
      e.preventDefault();
      if (window.scrollY==0){
        setPosition(0);
      }else 
      if (lastScrollTop < window.scrollY) {
        setPosition((prevCount) => prevCount - 10);
      } else {
        setPosition((prevCount) => prevCount + 10);
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
    <section
      ref={inViewRef}
    >
      <div>
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

          <div>
            <img
              style={{ transform: `translateY(${parallaxEffect}px)` }}
              className="inner aos-init img-fluid"
              data-aos="fade-up"
              data-aos-delay="1500"
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

          </div>

          <div
            style={{
              position: "absolute",
              width:'55%',
              height:'40%',
              backgroundImage: 'linear-gradient(15deg, #ff4f52 50%, transparent 50%)',
              bottom:'0',

            }}
           ></div> 

           <div
            style={{
              position: "absolute",
              width:'100%',
              right:0,
              height:'22%',
              backgroundColor:'#ff4f52',
                  bottom:'0'
            }}
           ></div> 

        </div>
      </div>
    </section>
  );
};
