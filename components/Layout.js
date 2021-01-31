import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Header from "../components/Header"
import Footer from "../components/Footer"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
  return (
    <div>
      <Container className={"bg-red layout-container"}>
        <Row>
          <Col>
            <Header/>          
          </Col>
        </Row>
        <Row>
          <Col>
          <div className={"content-container p-2 my-2"}>
          {children}
          </div>
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
}