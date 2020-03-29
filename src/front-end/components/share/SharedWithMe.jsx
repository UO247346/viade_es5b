import React, { Component } from "react";
import { Accordion, Card, Button, Col, Row } from "react-bootstrap";

import RutaService from "../../services/rutas/RutaService";
import MapRuta from "../map/MapRuta";

/**
 * Componente que representa la vista de 'Compartido
 * conmigo' que contiene las rutas compartidas por los
 * amigos del usuario.
 */
class SharedWithMe extends Component {
  constructor() {
    super();
    this.rutaService = new RutaService();
  }

  state = { rutasCompartidas: [] };

  async componentDidMount() {
    this.setState({
      rutasCompartidas: await this.rutaService.getRutasCompartidasConmigo()
    });
  }

  render() {
    return (
      <div>
        <h2>Compartido conmigo</h2>
        <Accordion>
          {this.state.rutasCompartidas.map((sharedRoute, key) => {
            return (
              <Row>
                <Col>
                  <Card key={key++}>
                    <Card.Header>
                      <h3>{sharedRoute.getRuta().getNombre()}</h3>
                      <p>Autor: {sharedRoute.getAmigo().getNombre()}</p>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={key}
                      >
                        Comentarios
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={key}>
                      <Card.Body></Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <MapRuta ruta={sharedRoute.getRuta()}></MapRuta>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default SharedWithMe;
