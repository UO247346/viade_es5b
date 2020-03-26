import React, { Component } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import MapRuta from "../../map/MapRuta";
import "../../../css/map-style.css";

/**
 * Representa un elemento Card con la
 * información de la ruta que encapsula.
 */
class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.eventKey = this.props.eventKey;
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <h3 data-testid="r-title">{this.props.ruta.getNombre()}</h3>
          <Button
            variant="success"
            className="mr-2"
            onClick={this.handleViewInMap}
          >
            Ver en el mapa
          </Button>
          <Button
            variant="danger"
            className="mr-2"
            onClick={() => this.props.handleDelete(this.props.ruta.getUUID())}
            data-testid="deleteButton"
          >
            Eliminar
          </Button>
          <Button>Editar</Button>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col md="auto">
                <Card.Title>Descripción</Card.Title>
                <Card.Text data-testid="r-description">
                  {this.props.ruta.getDescripcion()}
                </Card.Text>
                <Card.Title>Hitos</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Latitud</th>
                      <th>Longitud</th>
                    </tr>
                  </thead>
                  <tbody data-testid="r-hitos">
                    {this.props.ruta.getHitos().map((h, key) => (
                      <tr key={key++}>
                        <td>{key === 1 ? <b>Inicio</b> : h.getNombre()}</td>
                        <td>{h.getLat()}</td>
                        <td>{h.getLong()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col>
                {this.state.loaded && (
                  <div
                    id={`mapa-${this.props.ruta.getNombre()}`}
                    className="ml-3 mb-3"
                  >
                    <MapRuta ruta={this.props.ruta} />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  /**
   * Se ejecuta cada vez que se actualiza el componente
   * para mover el scroll al mapa recién mostrado.
   */
  componentDidUpdate() {
    if (this.state.loaded) {
      document
        .getElementById(`mapa-${this.props.ruta.getNombre()}`)
        .scrollIntoView(false);
    }
  }

  /**
   * Función flecha invocada cuando se hace click
   * sobre el link para ver la ruta en el mapa.
   */
  handleViewInMap = () => {
    this.setState({ loaded: !this.state.loaded });
  };
}

export default RouteCard;
