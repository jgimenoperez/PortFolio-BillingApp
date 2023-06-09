import {
  Dropdown,
  Link,
  Navbar,
  Switch,
  Text,
  Avatar,
  Tooltip,
  Button,
} from "@nextui-org/react";

import { firebaseLogout } from "../../firebase/firebase";
import { GithubIcon } from "../icons";
import { ModalLogin, ModalRegister, ModalResetPass } from "../auth";
import { setTheme } from "../../reducers/themeReducer";
import { useDispatch } from "react-redux";
import { Link as Enlace } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@nextui-org/react";
import { Troll, icons } from "./icons";
import { setAuth } from "../../reducers/userReducer";
export const Nav = ({ isLogin, isRegister, isResetPass }) => {
  const dispatch = useDispatch();
  const { isDark, theme } = useTheme();
  const { logged, user } = useSelector((state) => state.user);

  const collapseItems = [
    {
      name: "Clientes",
      link: "customers",
    },
    {
      name: "Articulos",
      link: "products",
    },
    {
      name: "Facturas",
      link: "invoices",
    },
  ];
  const logoutClick = () => {
    firebaseLogout();
    dispatch(setAuth(false));
  };

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
        <Troll fill={theme.colors.green800.value} />
        <Text
          b
          color="inherit"
          // hideIn="xs"
          size={40}
          css={{
            textGradient: "45deg, $green800 -100%, $text 90%",
          }}
        >
          {/* <Link href="/" > {"Manos {DEV} troll"}</Link> */}
          <Enlace className="ManosDevTrollText" to="/">
            {"Manos {DEV} troll"}
          </Enlace>
        </Text>

        <Navbar.Content
          hideIn="sm"
          css={{
            pl: "6rem",
          }}
        >
          {logged ? (
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
                  <Navbar.Link isActive color="inherit" href="/customers">
                    Clientes
                  </Navbar.Link>
                </Dropdown.Item>

                <Dropdown.Item
                  key="Articulos"
                  showFullDescription
                  description="Mantenimiento de artículos"
                  icon={icons.article}
                >
                  <Navbar.Link isActive color="inherit" href="/products">
                    Artículos
                  </Navbar.Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : null}

          {logged ? (
            <Navbar.Link isActive color="inherit" href="#">
              Facturación
            </Navbar.Link>
          ) : null}
        </Navbar.Content>
      </Navbar.Brand>

      <Navbar.Collapse>
        {collapseItems.map((item) => (
          <Navbar.CollapseItem key={item.name}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={`/${item.link}`}
            >
              {item.name}
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
            href="https://github.com/jgimenoperez"
          >
            <GithubIcon />
          </Link>
        </Navbar.CollapseItem>

        <Navbar.CollapseItem>
          <Switch
            checked={isDark}
            onChange={(e) =>
              dispatch(setTheme(e.target.checked ? "dark" : "light"))
            }
          />
        </Navbar.CollapseItem>

        <Navbar.CollapseItem>
          {logged ? (
            <Enlace to="/profile">
              <Tooltip
                content={
                  user?.typeProvider === "email"
                    ? user?.email
                    : `${user?.name} ${user?.email}`
                }
                hideArrow
                placement="bottomStart"
              >
                <Avatar
                  css={{ size: "$6", cursor: "pointer" }}
                  squared
                  size="lg"
                  text={
                    user?.typeProvider === "email" ? user?.email : user?.name
                  }
                  src={user?.image}
                />
              </Tooltip>
            </Enlace>
          ) : null}
        </Navbar.CollapseItem>

        <Navbar.CollapseItem>
          {logged ? (
            <Button
              auto
              flat
              icon={icons.logout}
              onClick={() => {
                logoutClick();
              }}
            ></Button>
          ) : null}
        </Navbar.CollapseItem>
      </Navbar.Collapse>

      <Navbar.Content hideIn="sm">
        {logged ? (
          <Enlace to="/profile">
            <Tooltip
              content={
                user?.typeProvider === "email"
                  ? user?.email
                  : `${user?.name} ${user?.email}`
              }
              hideArrow
              placement="bottomStart"
            >
              <Avatar
                css={{ size: "$6", cursor: "pointer" }}
                squared
                size="lg"
                text={user?.typeProvider === "email" ? user?.email : user?.name}
                src={user?.image}
              />
            </Tooltip>
          </Enlace>
        ) : null}

        {!logged && isRegister ? <ModalRegister /> : null}
        {!logged && isResetPass ? <ModalResetPass /> : null}

        {/* <Navbar.Item>
          <Button auto flat href="#">
            Start free trial
          </Button>
        </Navbar.Item> */}

        <Navbar.Item hideIn={"xs"}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            target="_blank"
            href="https://github.com/jgimenoperez"
          >
            <GithubIcon />
          </Link>
        </Navbar.Item>
        <Navbar.Item hideIn={"xs"}>
          <Switch
            checked={isDark}
            onChange={(e) =>
              dispatch(setTheme(e.target.checked ? "dark" : "light"))
            }
          />
        </Navbar.Item>

        {logged ? (
          <Navbar.Link
            color="inherit"
            onClick={() => {
              logoutClick();
            }}
          >
            Logout
          </Navbar.Link>
        ) : // <Button auto flat onClick={()=>{alert(1)}}>
        //   Start free trial
        // </Button>
        null}
        {!logged ? <ModalLogin /> : null}
      </Navbar.Content>
      <Navbar.Content showIn="sm">
        {!logged ? <ModalLogin /> : null}
      </Navbar.Content>
    </Navbar>
  );
};
