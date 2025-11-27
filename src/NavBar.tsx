import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import logo from './logo.jpg'; 
import './Header.css';

export default function NavBar() {
    return (
        <Menu
            inverted
            fixed="top"
            style={{
                padding: "0.7rem 0",
                background: "#000000ff",
                display: "flex",
                alignItems: "center"
            }}
        >
            <Container
                className="header-container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                
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

                <Menu.Menu position="right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                    <Menu.Item as={NavLink} to="/cars" style={{ padding: 0 }}>
                        <Button
                            content="Wszystkie Auta"
                            size="large"
                            style={{
                                borderRadius: "30px",
                                padding: "10px 20px",
                                fontSize: "1rem",
                                fontWeight: "600",
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
                                fontSize: "1rem",
                                fontWeight: "600",
                                background: "#e376ddff",
                                color: "white"
                            }}
                        />
                    </Menu.Item>


                </Menu.Menu>

            </Container>
        </Menu>
    );
}

