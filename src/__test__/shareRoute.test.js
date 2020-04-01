import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SharePanel from "../front-end/components/share/SharePanel";
import createReactMock from 'react-mock-component';
import CommentBox from '../front-end/components/share/CommentBox'

// Rutas de prueba
let ruta = new Ruta("Ruta Avilés", [4.5, 5.4], "Muy buena ruta, entretenida.");
let hito1 = new Hito("Niemeyer", 4, 3.2);
let hito2 = new Hito("Parque Ferrera", 4.5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);

console.log("-------------------" + ruta.getHitos().length);

//Lista de amigos de prueba:
// Rutas de prueba
let amigos = [];
function setUp() {
  let amigo1 = new Amigo(
    "Pedro",
    "https://pedro223.inrupt.net/profile/card#me"
  );
  
  let amigo2 = new Amigo(
    "Alex",
    "https://hamalawindows.solid.community/profile/card#me"
  );

  amigos.push(amigo1);
  amigos.push(amigo2);
}


/*test("RouteCard contiene el botón de compartir.", () => {
    afterAll(cleanup);
    jest.mock("../__test__/__mocks__/solid-auth-client.js");
    const { getByTestId, getAllByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
    const bts = getAllByTestId("rb-compartir");
});*/
test("Se renderizan bien los componentes de SharePanel", () => {
    afterAll(cleanup);
    jest.mock("../__test__/__mocks__/");
    const { getByTestId } = render(<SharePanel ruta={ruta} show="true"></SharePanel>);
    //let dialogo = await waitForElement(() => getByTestId("componenteModal"));
    expect(getByTestId("componenteModal")).toBeTruthy();
    expect(getByTestId("titleCompartir")).toHaveTextContent("Compartir esta ruta");
    expect(getByTestId("nombreRutaCompartir")).toHaveTextContent("Ruta: "+ruta.getNombre());
    expect(getByTestId("parrafoSeleccion")).toHaveTextContent("Selecciona a los amigos con los que deseas compartir esta ruta:");
    expect(getByTestId("cancelarCompartirButton")).toHaveTextContent("Cancelar");
    expect(getByTestId("compartirButton")).toHaveTextContent("Compartir");
});


test("Se renderizan bien los componentes de SharePanel al pinchar en el botón de -compartir-", () => {
    afterAll(cleanup);
    jest.mock("../__test__/__mocks__/solid-auth-client.js");
    const { getByTestId, getAllByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
    const bts = getAllByTestId("rb-compartir");
    bts[0].click();
    //let dialogo = await waitForElement(() => getByTestId("componenteModal"));
    expect(getByTestId("componenteModal")).toBeTruthy();
    expect(getByTestId("titleCompartir")).toHaveTextContent("Compartir esta ruta");
    expect(getByTestId("nombreRutaCompartir")).toHaveTextContent("Ruta: "+ruta.getNombre());
    expect(getByTestId("parrafoSeleccion")).toHaveTextContent("Selecciona a los amigos con los que deseas compartir esta ruta:");
    expect(getByTestId("cancelarCompartirButton")).toHaveTextContent("Cancelar");
    expect(getByTestId("compartirButton")).toHaveTextContent("Compartir");
});	


test("Se ven los amigos para poder compartir con ellos la ruta", () => {
    afterAll(cleanup);
    jest.mock("../__test__/__mocks__/solid-auth-client.js");
    const { getByTestId, getAllByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
    const bts = getAllByTestId("rb-compartir");
    bts[0].click();
    //let dialogo = await waitForElement(() => getByTestId("componenteModal"));
    expect(getAllByTestId("componenteModal")).toBeTruthy();
    //expect(getByTestId("modalBody")).toHaveTextContent("Cargando amigos..."); //o contains
    //expect(getByTestId("amigosCompartir")).contains("Pedro");
    //expect(getByTestId("amigosCompartir")).contains("Alex");
    
});
