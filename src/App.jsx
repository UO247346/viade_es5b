import React, { Component } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import LogInComponent from "./front-end/components/authentication/login/Login";
import RegisterContainer from "./front-end/components/authentication/register/RegistroContainer";
import Home from "./front-end/components/Home";
import VerRutas from "./front-end/components/ruta/VerRutas/VerRutas";
import Footer from "./front-end/components/fragments/Footer";
import "leaflet/dist/leaflet.css";
import NotLoggedInLayout from "./front-end/layouts/NotLoggedInLayout/not-logged-in.layout";
import PrivateLayout from "./front-end/layouts/PrivateLayout/private.layout";
import PublicLayout from "./front-end/layouts/PublicLayout/public.layout";
import Friends from "./front-end/components/friends/Friends";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import RutaService from "./front-end/services/rutas/RutaService";
import ShareView from "./front-end/components/share/ShareView";
import AddMapView from "./front-end/components/ruta/AñadirRuta/AddMapView";
import AddMenu from "./front-end/components/ruta/AñadirRuta/AddMenu";
import AddRuta from "./front-end/components/ruta/AñadirRuta/AddRuta";
const rutaService = new RutaService();

/**
 * COMPONENTE PADRE APP
 * Representa el componente principal y central de la aplicación.
 * Contiene el componente Router con un Switch para gestionar el enrutamiento
 * de los componentes. Suele contener componentes Padres, los cuales a su vez contienen
 * componentes hijos, a los que se les pasa referencias a las funciones de los servicios.
 */
class App extends Component {
  procesarRutas() {
    rutaService.procesarRutasCompartidas().then((result) => {
      for (var i = 0; i < result.length; i++) {
        //Agregamos la notificacion de ruta compartida
        store.addNotification({
          title: result[0].getTitulo(),
          message: result[0].getMensaje(),
          type: result[0].getTipo(),
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    });
  }
  async componentDidMount() {
    //Cada 10 segundos proceso las rutas compartidas
    var intervalId = setInterval(this.procesarRutas, 10000);
    this.setState({ intervalId: intervalId });
  }
  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }
  render() {
    return (
      <div data-testid="aplicacion">
        <Router>
          <div>
            <ReactNotification />
            <Switch>
              <PublicLayout exact path="/" component={Home} />
              <PrivateLayout
                exact
                path="/ver-rutas"
                component={VerRutas}
              ></PrivateLayout>
              <PrivateLayout exact path="/add-menu" component={AddMenu} />
              <PrivateLayout exact path="/friends" component={Friends} />
              <PrivateLayout exact path="/shared" component={ShareView} />
              <PrivateLayout exact path="/add-ruta" component={AddRuta} />
              <PrivateLayout
                exact
                path="/add-ruta-map"
                component={AddMapView}
              />

              <NotLoggedInLayout
                exact
                path="/login"
                component={LogInComponent}
              />
              <NotLoggedInLayout
                exact
                path="/signup"
                component={RegisterContainer}
              />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
