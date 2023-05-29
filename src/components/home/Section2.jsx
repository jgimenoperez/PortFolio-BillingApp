import { Text } from "@nextui-org/react";

export const Section2 = () => {
  return (
    <section>
      <div
        style={{
          height: "71vh",
          backgroundColor: "#ff4f52",
          display: "flex",
          flexDirection: "column",
          backgroundImage:
            "url(https://res.cloudinary.com/dxnwtmj3l/image/upload/v1685342852/BillingApp/Public/lines-map-1_tn5ly3.svg)",
          backgroundRepeat: "norepeat",
          backgroundSize: "100%",
        }}
      >
        <Text
          className="tittleSection1"
          size={140}
          weight="bold"
          color="#20264c"
          css={{ paddingRight: "5%", textAlign: "right", lineHeight: "1.2" }}
        >
          Qué <br></br>hacemos
        </Text>
        <Text
          className="tittleSection1"
          size={30}
          weight="bold"
          color="#20264c"
          css={{
            marginLeft: "65%",
            textAlign: "left",
            lineHeight: "1.2",
            paddingRight: "5%",
          }}
        >
          Hasta los egs de costosos y complicados programas de facturación.
          <br></br> Preocupate solo por la parte del complicado.
        </Text>
      </div>
    </section>
  );
};
