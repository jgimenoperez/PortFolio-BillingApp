import {
  Dropdown,
  Link,
  Navbar,
  Switch,
  Text,
  Avatar,
  Tooltip,
} from "@nextui-org/react";

import { firebaseLogout } from "../../firebase/firebase";
import { GithubIcon } from "../icons/GithubIcon";
import { ModalLogin, ModalRegister, ModalResetPass } from "../auth";
import { setTheme } from "../../reducers/themeReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@nextui-org/react";
import { Troll, icons } from "./icons";

export const Nav = ({ isLogin, isRegister, isResetPass }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark, theme } = useTheme();
  const { logged, user } = useSelector((state) => state.auth);

  const collapseItems = ["Clientes", "Artículos", "Facturas"];

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
          hideIn="xs"
          size={40}
          css={{
            textGradient: "45deg, $green800 -100%, $text 90%",
          }}
        >
          <Link href="/login" > {"Manos {DEV} troll"}</Link>
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
      </Navbar.Collapse>

      <Navbar.Content>
        {logged ? (
          <Tooltip
            content={
              user.providerData[0].providerId === "password"
                ? user?.email
                : `${user?.displayName} ${user?.email}`
            }
            hideArrow
            placement="right"
          >
            <Avatar
              css={{ size: "$6" }}
              squared
              size="lg"
              text={
                user.providerData[0].providerId === "password"
                  ? user?.email
                  : user?.displayName
              }
              src={user?.photoURL}
            />
          </Tooltip>
        ) : null}

        {logged ? (
          <Navbar.Link
            color="inherit"
            onClick={() => {
              firebaseLogout(navigate);
            }}
          >
            Logout
          </Navbar.Link>
        ) : // <Button auto flat onClick={()=>{alert(1)}}>
        //   Start free trial
        // </Button>
        null}

        {!logged && isLogin ? <ModalLogin /> : null}
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
      </Navbar.Content>
    </Navbar>
  );
};
