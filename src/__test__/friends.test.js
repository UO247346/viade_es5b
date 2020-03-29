import React from 'react';
import Friends from '../front-end/components/friends/Friends';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

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

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

it('AddFriend', () => {
  act(() => {
    ReactDOM.render(<Friend />, container);
  });

  expect(container).toBeTruthy();

  /*expect(container.querySelector('.first')).toBeTruthy();
  expect(container.querySelector('.bold')).toBeTruthy();

  expect(container.querySelector('.input')).toBeTruthy();

  expect(container.querySelector('.mt-2')).toBeTruthy();*/
});

/*test("Presionar boton añadir y que aparezca Agregar", () => {
    const { getByTestId } = render(<AddFriend />);
    act(() =>{
        getByTestId("buttonAdd").click();
    });

    expect(getByTestId("buttonAdd")).toHaveTextContent("Agregar");
});*/

//PRUEBAS DE RENDERIZADO DE LOS COMPONENTES

test("Se renderizan bien titulos, forms, etiquetas", async () => {
  const { getByTestId }=render(<Friends amigos={[]}></Friends>);
  
  expect(getByTestId("titleAmigos")).toHaveTextContent("Amigos");
  expect(getByTestId("gestionAmigos")).toHaveTextContent("Desde aquí puedes realizar la gestión de tus amigos.");
  expect(getByTestId("componenteAddFriend")).toBeInTheDocument();
  
  //Dentro del componente addFriend
  expect(getByTestId("nuevoAmigo")).toHaveTextContent("Para agregar un nuevo amigo, introduce su WebID. El WebID puede cambiar según el provedor del POD del usuario.");
  expect(getByTestId("webID")).toHaveTextContent("WebID");
  expect(getByTestId("formAddFriend")).toBeInTheDocument();
  expect(getByTestId("buttonAdd")).toBeInTheDocument();

})

test("input vacío para agregar nuevo webID y botón agregar desactivado inicialmente", async () => {
  const { getByTestId }=render(<Friends amigos={[]}></Friends>);

  expect(getByTestId("formAddFriend")).toBeEmpty();
  expect(getByTestId("buttonAdd")).toBeDisabled();

})

test("insertamos un webID y se tendría que activar el botón de agregar", async () => {
  const { getByTestId }=render(<Friends amigos={[]}></Friends>);

  getByTestId("formAddFriend").innerText = "https://alex123.solid.community";
  expect(getByTestId("buttonAdd")).toBeEnabled();

})

test("insertamos un webID que no existe", async () => {
  const { getByTestId }=render(<Friends amigos={[]}></Friends>);

  getByTestId("formAddFriend").innerText = "12345";
  let agregar = getByTestId("buttonAdd");
  agregar.click();
  expect(getByTestId("alertNoExisteUsuario")).toHaveTextContent("No existe el usuario o ya está presente en tu lista de amigos.")

})

test("insertamos un webID correcto", async () => {
  const { getByTestId }=render(<Friends amigos={[]}></Friends>);

  getByTestId("formAddFriend").innerText = "https://alex123.solid.community";
  let agregar = getByTestId("buttonAdd");
  agregar.click();

})