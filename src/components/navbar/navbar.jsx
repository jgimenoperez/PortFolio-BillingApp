import {
  Button,
  Dropdown,
  Link,
  Navbar,
  Switch,
  Image,
  Text,
} from "@nextui-org/react";

import { ModalLogin } from "../modal";
import { Troll, icons } from "./icons";
// import {useTheme as useNextTheme} from 'next-themes';
import { useTheme } from "@nextui-org/react";
import { GithubIcon } from "../icons/GithubIcon";

export const Nav = () => {
  //    const {setTheme} = useNextTheme();
  const { isDark, type, theme } = useTheme();
  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
  ];

  return (
    <Navbar
      className="navbar"
      isBordered
      css={{
        overflow: "hidden",
        "& .nextui-navbar-container": {
          background: "$navbarcolor",
          borderBottom: "none",
        },
      }}
    >
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
        {/* <img
          src="https://res.cloudinary.com/dxnwtmj3l/image/upload/v1684404965/PortFolioBillingApp/troll_vg4rbf.png"
          alt="icono de la app"
          width={60}
          className="logo"
        />{" "} */}

        {/* {icons.troll} */}
        <Troll fill={theme.colors.green800.value}/>

        <Text
          b
          color="inherit"
          hideIn="xs"
          size={40}
          css={{
            textGradient: "45deg, $green800 -100%, $text 90%",
          }}
        >
          {"Manos {DEV} troll"}
        </Text>
        <Navbar.Content
          hideIn="sm"
          css={{
            pl: "6rem",
          }}
        >
          <Dropdown isBordered>
            <Navbar.Item>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
                iconRight={icons.chevron}
                ripple={false}
              >
                Mantenimientos
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="aaa"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="autoscaling"
                showFullDescription
                description="Mantenimiento de clientes"
                icon={icons.user}
              >
                Clientes
              </Dropdown.Item>
              <Dropdown.Item
                key="Articulos"
                showFullDescription
                description="Mantenimiento de artículos"
                icon={icons.article}
              >
                Artículos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Link isActive color="inherit" href="#">
            Facturación
          </Navbar.Link>
        </Navbar.Content>
      </Navbar.Brand>

      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            target="_blank"
            href="https://github.com/Siumauricio/landing-template-nextui"
          >
            <GithubIcon />
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          {/* <Switch
                  checked={isDark}
                  onChange={(e) =>
                     setTheme(e.target.checked ? 'dark' : 'light')
                  }
               /> */}
        </Navbar.CollapseItem>
      </Navbar.Collapse>

      <Navbar.Content>
        <ModalLogin />

        <Navbar.Item>
          <Button auto flat href="#">
            Start free trial
          </Button>
        </Navbar.Item>
        <Navbar.Item hideIn={"xs"}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            target="_blank"
            href="https://github.com/Siumauricio/landing-template-nextui"
          >
            <GithubIcon />
          </Link>
        </Navbar.Item>
        <Navbar.Item hideIn={"xs"}>
          <Switch
            checked={isDark}
            //   onChange={(e) =>
            //      setTheme(e.target.checked ? 'dark' : 'light')
            //   }
          />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
