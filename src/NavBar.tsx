import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import logo from "./logo.jpg";
import "./Header.css";

export default function NavBar() {

    const username = localStorage.getItem("username");

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/";
    }

    return (
        <Menu
            inverted
            fixed="top"
            style={{
                padding: "0.7rem 0",
                background: "#000000ff"
            }}
        >
            <Container
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <Menu.Item
                        as={NavLink}
                        to="/"
                        header
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: 0
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            className="header-logo"
                        />
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/cars" style={{ padding: 0 }}>
                        <Button
                            content="All Cars"
                            size="large"
                            style={{
                                borderRadius: "30px",
                                padding: "10px 20px",
                                background: "#c568ea",
                                color: "white"
                            }}
                        />
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/cars/add" style={{ padding: 0 }}>
                        <Button
                            content="Add Car"
                            size="large"
                            style={{
                                borderRadius: "30px",
                                padding: "10px 20px",
                                background: "#e376ddff",
                                color: "white"
                            }}
                        />
                    </Menu.Item>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {!username && (
                        <>
                            <Menu.Item as={NavLink} to="/login" style={{ padding: 0 }}>
                                <Button
                                    size="large"
                                    style={{
                                        borderRadius: "30px",
                                        padding: "10px 20px",
                                        background: "#8f4ce8",
                                        color: "white",
                                        fontWeight: "600"
                                    }}
                                >
                                    Login
                                </Button>
                            </Menu.Item>

                            <Menu.Item as={NavLink} to="/register" style={{ padding: 0 }}>
                                <Button
                                    size="large"
                                    style={{
                                        borderRadius: "30px",
                                        padding: "10px 20px",
                                        background: "#b35cf2",
                                        color: "white",
                                        fontWeight: "600"
                                    }}
                                >
                                    Register
                                </Button>
                            </Menu.Item>
                        </>
                    )}

                    {username && (
                        <>
                            <Menu.Item>
                                <span style={{ color: "white", marginRight: "10px", fontSize: "1rem" }}>
                                    Logged in as <strong>{username}</strong>
                                </span>
                            </Menu.Item>

                            <Menu.Item style={{ padding: 0 }}>
                                <Button
                                    size="large"
                                    color="red"
                                    style={{
                                        borderRadius: "30px",
                                        padding: "10px 20px",
                                        fontWeight: "600"
                                    }}
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </Menu.Item>
                        </>
                    )}
                </div>

            </Container>
        </Menu>
    );
}



