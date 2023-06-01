import { Text } from "@nextui-org/react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Spacer } from "@nextui-org/react";

export const Section4 = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <section className="section4">
      <div
        className="wave"
        style={{
          width: "100%",
          height: "100%",
          display:"block",
        }}
      >
        <div
          style={{
            marginLeft: "5%",
            marginTop: "15px",
          }}
        >
          <Text
            className="tittleSection1"
            size={45}
            color="#20264c"
            weight="bold"
          >
            Se como nuestros clientes.
          </Text>
          <Text
            className="tittleSection1"
            size={45}
            color="#20264c"
            weight="bold"
          >
            Se un ganador.
          </Text>
          {/* <Text
            className="tittleSection1"
            size={85}
            color="#ff4f52"
            weight="bold"
            css={{ letterSpacing: "8px" }}
          >
            Clientes
          </Text> */}
          <Text
            h2
            className="tittleSection4"
            size={140}
            color="#ff4f52"
            css={{ paddingRight: "5%", textAlign: "left", lineHeight: "1.2",fontWeight:"200",letterSpacing:"10px" }}
          >
            Clientes
          </Text>
          <Spacer y={1} />{" "}
          <div
            style={{
              display: "block",
              width: "50%",
              marginRight: "225px",
              // backgroundColor: "blue",
            }}
          >
            <div className="logosClientes">
              <div>
                <img
                  src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685531043/BillingApp/Public/altavista-removebg-preview_pbg7yi.png"
                  alt="altavista"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685531078/BillingApp/Public/napster-removebg-preview_iwaq68.png"
                  alt="Imagen"
                  style={{ minWidth: "50%" }}
                />
              </div>
            </div>
            <div className="logosClientes">
              <div>
                <img
                  src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685531163/BillingApp/Public/ozu-removebg-preview_z2iy6a.png"
                  alt="altavista"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685531319/BillingApp/Public/ole-removebg-preview_sq4j40.png"
                  alt="Imagen"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="logosClientes">
              <div>
                <img
                  src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685531685/BillingApp/Public/yahoo-removebg-preview_kqdnw7.png"
                  alt="altavista"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685532232/BillingApp/Public/infovia-removebg-preview_aoz4me.png"
                  alt="Imagen"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
