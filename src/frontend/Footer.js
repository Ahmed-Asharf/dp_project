import React from "react";
import { Box, Container, Row, Column, FooterLink } from "./FooterStyle";

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">
              Do not sell my personal information
            </FooterLink>
            <FooterLink href="#">Imprint</FooterLink>
            <FooterLink href="#">Writing</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Jobs</FooterLink>
          </Column>
          <Column>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">
              Do not sell my personal information
            </FooterLink>
            <FooterLink href="#">Imprint</FooterLink>
            <FooterLink href="#">Writing</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Jobs</FooterLink>
          </Column>
          <Column>
            <p style={{ color: "grey", marginLeft: "20rem" }}>&copy;2021</p>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
