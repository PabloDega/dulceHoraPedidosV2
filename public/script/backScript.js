// Eventos menu
if (document.querySelector("#productos") != null) {
  document
    .querySelector("#productos")
    .addEventListener("click", () => (location.href = "/panel/productos/card"));
}
if (document.querySelector("#precios") != null) {
  document
    .querySelector("#precios")
    .addEventListener("click", () => (location.href = "/panel/precios"));
}
if (document.querySelector("#local") != null) {
  document
    .querySelector("#local")
    .addEventListener("click", () => (location.href = "/panel/local"));
}
if (document.querySelector("#fotos") != null) {
  document
    .querySelector("#fotos")
    .addEventListener("click", () => (location.href = "/panel/fotos"));
}
if (document.querySelector("#usuarios") != null) {
  document
    .querySelector("#usuarios")
    .addEventListener("click", () => (location.href = "/panel/usuarios"));
}
if (document.querySelector("#actividadToda") != null) {
  document
    .querySelector("#actividadToda")
    .addEventListener("click", () => (location.href = "/panel/actividadToda"));
}
if (document.querySelector("#pedidos") != null) {
  document
    .querySelector("#pedidos")
    .addEventListener("click", () => (location.href = "/panel/pedidos"));
}
if (document.querySelector("#stock") != null) {
  document
    .querySelector("#stock")
    .addEventListener("click", () => (location.href = "/panel/stock"));
}
if (document.querySelector("#actividad") != null) {
  document
    .querySelector("#actividad")
    .addEventListener("click", () => (location.href = "/panel/actividad"));
}
/* if (document.querySelectorAll(".editar") != null) {
  document
    .querySelectorAll(".editar")
    .forEach((boton) => boton.addEventListener("click", (e) => console.log(e.target.dataset.id)));
} */
if (document.querySelector("#backListaProdEditar") != null) {
  document
    .querySelectorAll("#backListaProdEditar")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/productos/editar?id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelector("#backListaProdEliminar") != null) {
  document
    .querySelectorAll("#backListaProdEliminar")
    .forEach((boton) => boton.addEventListener("click", (e) => confirmaEliminar(e.target.dataset)));
}
if (document.querySelector("#backListaCatEditar") != null) {
  document
    .querySelectorAll("#backListaCatEditar")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/categorias/editar?id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelector("#backListaCatEliminar") != null) {
  document
    .querySelectorAll("#backListaCatEliminar")
    .forEach((boton) => boton.addEventListener("click", (e) => confirmaEliminar(e.target.dataset)));
}
if (document.querySelector("#backListaLocalEditar") != null) {
  document
    .querySelectorAll("#backListaLocalEditar")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/local/editar?id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelector("#backListaLocalEliminar") != null) {
  document
    .querySelectorAll("#backListaLocalEliminar")
    .forEach((boton) => boton.addEventListener("click", (e) => confirmaEliminar(e.target.dataset)));
}
if (document.querySelector("#backListaUsuarioEditar") != null) {
  document
    .querySelectorAll("#backListaUsuarioEditar")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/usuarios/editar?id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelector("#backListaUsuarioEliminar") != null) {
  document
    .querySelectorAll("#backListaUsuarioEliminar")
    .forEach((boton) => boton.addEventListener("click", (e) => confirmaEliminar(e.target.dataset)));
}
if (document.querySelector("#nuevoUsuario") != null) {
  document
    .querySelector("#nuevoUsuario")
    .addEventListener("click", () => (location.href = "/panel/usuarios/nuevo"));
}
if (document.querySelector("#verUsuario") != null) {
  document
    .querySelector("#verUsuario")
    .addEventListener("click", () => (location.href = "/panel/usuarios"));
}
if (document.querySelector("#nuevoLocal") != null) {
  document
    .querySelector("#nuevoLocal")
    .addEventListener("click", () => (location.href = "/panel/local/nuevo"));
}
if (document.querySelector("#verCategoria") != null) {
  document
    .querySelector("#verCategoria")
    .addEventListener("click", () => (location.href = "/panel/categorias"));
}
if (document.querySelector("#nuevaCategoria") != null) {
  document
    .querySelector("#nuevaCategoria")
    .addEventListener("click", () => (location.href = "/panel/categorias/nueva"));
}
if (document.querySelector("#nuevoProd") != null) {
  document
    .querySelector("#nuevoProd")
    .addEventListener("click", () => (location.href = "/panel/productos/nuevo"));
}
if (document.querySelector("#vistaCard") != null) {
  document
    .querySelector("#vistaCard")
    .addEventListener("click", () => (location.href = "/panel/productos/card"));
}
if (document.querySelector("#vistaTabla") != null) {
  document
    .querySelector("#vistaTabla")
    .addEventListener("click", () => (location.href = "/panel/productos/tabla"));
}
if (document.querySelector("#editProdFraccionamiento") != null) {
  document
    .querySelector("#editProdFraccionamiento")
    .addEventListener("change", (e) => editProdtoggleUnidad(e));
}
if (document.querySelector("#fotosProducto") != null) {
  document
    .querySelector("#fotosProducto")
    .addEventListener("click", () => (location.href = "/panel/fotos/productos"));
}
if (document.querySelector("#fotosCategorias") != null) {
  document
    .querySelector("#fotosCategorias")
    .addEventListener("click", () => (location.href = "/panel/fotos/categorias"));
}
if (document.querySelector("#fotosLocales") != null) {
  document
    .querySelector("#fotosLocales")
    .addEventListener("click", () => (location.href = "/panel/fotos/locales"));
}
if (document.querySelectorAll(".btnProductos") != null) {
  document
    .querySelectorAll(".btnProductos")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/fotos/nueva?tipo=productos&id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelectorAll(".btnCategorias") != null) {
  document
    .querySelectorAll(".btnCategorias")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/fotos/nueva?tipo=categorias&id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelectorAll(".btnLocales") != null) {
  document
    .querySelectorAll(".btnLocales")
    .forEach((boton) =>
      boton.addEventListener(
        "click",
        (e) => (location.href = "/panel/fotos/nueva?tipo=locales&id=" + e.target.dataset.id)
      )
    );
}
if (document.querySelectorAll(".mensajeErrorForm") != null) {
  document
    .querySelectorAll(".mensajeErrorForm")
    .forEach((boton) => boton.addEventListener("click", (e) => (e.target.style.display = "none")));
}
if (document.querySelector("#userIcon") != null) {
  document.querySelector("#userIcon").addEventListener("click", () => {
    let vista = document.querySelector("#cerrarSesion").style;
    if (vista.display == "none") {
      vista.display = "flex";
    } else {
      vista.display = "none";
    }
  });
}

if (document.querySelector("#cerrarSesionBtn") != null) {
  document
    .querySelector("#cerrarSesionBtn")
    .addEventListener("click", () => (location.href = "/login/logout"));
}

if (document.querySelector(".pedidosCard") != null) {
  document.querySelectorAll(".pedidosCard").forEach((boton) =>
    boton.addEventListener("click", (e) => {
      location.href = "/panel/pedidos?id=" + e.currentTarget.dataset.id;
    })
  );
}

if (document.querySelector(".pedidoEstadoBoton") != null) {
  document.querySelectorAll(".pedidoEstadoBoton").forEach((boton) =>
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      pedidoFinalizado(pedidoNumero, e.target.value);
      document.querySelector("#" + e.target.dataset.form).submit();
    })
  );
}

/* if (document.querySelector("#cerrarSesionBtn") != null) {
  document.querySelector("#cerrarSesionBtn").addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("envioMensaje", e.target.value);
    e.target.value = "";
  });
} */

// Toggle precio de docena en editar/nuevo producto
function editProdtoggleUnidad(e) {
  let precioDocenaInput = document.querySelector("#editProdPrecioDocena");
  let precioDocena = document.querySelector("#precioDoc");
  if (e.target.value == "Docena") {
    precioDocenaInput.style.display = "block";
  } else {
    precioDocenaInput.style.display = "none";
    precioDocena.value = "0";
  }
}

function editProdListaVariedad() {
  let lista = document.querySelector("#variedades");
  const span = document.createElement("span");
  span.className = "editProdItemVariedad";
  span.innerHTML =
    '<input type="text" name="variedad" id="variedad" placeholder="nueva variedad" />';
  lista.appendChild(span);
  editProdEventsListener();
}

// Funcion eliminar variedad en editar/nuevo producto
function editProdEliminarVariedad(e) {
  document.querySelector("#variedad" + e.target.dataset.id).remove();
}

// funcion eventos editar/nuevo producto
function editProdEventsListener() {
  if (document.querySelector("#editProdNuevaVariedad") != null) {
    document
      .querySelector("#editProdNuevaVariedad")
      .addEventListener("click", editProdListaVariedad);
  }
  if (document.querySelector("#editProdEliminarVariedad") != null) {
    document
      .querySelectorAll("#editProdEliminarVariedad")
      .forEach((boton) => boton.addEventListener("click", (e) => editProdEliminarVariedad(e)));
  }
}
editProdEventsListener();

// confirmar elimincacion
function confirmaEliminar(data) {
  let popScreen = document.querySelector("#popScreen");
  popScreen.innerHTML += `<div id="cortina">
  <div id="confirmarEliminar">
    Está por borrar un registro. Esta acción no se puede deshacer. Desea
    continuar?
    <div class="btn btnNaranja" id="btnEliminar">Confirmar</div>
    <div class="btn btnRojo" id="btnEliminarCancelar">Cancelar</div>
  </div>
</div>`;
  document
    .querySelector("#btnEliminar")
    .addEventListener(
      "click",
      () => (location.href = `/panel/${data.tipo}/eliminar?id=${data.id || data.usuario}`)
    );
  document.querySelector("#btnEliminarCancelar").addEventListener("click", cerrarPopEliminar);
}

function cerrarPopEliminar() {
  let popScreen = document.querySelector("#popScreen");
  popScreen.innerHTML = "";
}