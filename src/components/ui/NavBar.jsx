import {
  Button,
  Spacer,
  Text,
  useTheme,
  Link,
//   globalCss,
} from "@nextui-org/react";

// const globalStyles = globalCss({
//   body: { margin: 0 },
// });

export const NavBar = () => {
  const { theme } = useTheme();
  console.log(theme)
//   globalStyles();

  return (
    <header
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20%",
        backgroundColor: theme?.colors.green800.value,
        margin: "0 auto",
      }}
      className="navbar"
    >
      <Button background="primaryCustom" color="text" bordered>
        <Text css={{ background: "$NavBarColor" }}>NextUI colors</Text>
        Mi botón personalizado
      </Button>
      <p  style={{ color: theme?.colors.green800.value }}>HOLA MUNDO P</p>
      <Text css={{ color: '$myDarkColor' }}>HOLA MUNDO</Text>
      <img
        src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1684404965/PortFolioBillingApp/troll_vg4rbf.png"
        alt="icono de la app"
        width={60}
        className="logo"
      />
      <a href="/">
        <Link>
          <Text color="white" h3>
            Manos de Troll
          </Text>
        </Link>
      </a>
      <Spacer css={{ flex: 1 }} />
      <a href="/favorites">
        <Link css={{ marginRight: "10px" }}>
          <Text color="white">Favoritos</Text>
        </Link>
      </a>
    </header>
  );
};
