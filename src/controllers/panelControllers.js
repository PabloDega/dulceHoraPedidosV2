const servicesProductos = require(__basedir + "/src/services/productos");
const servicesProductosFabrica = require(__basedir + "/src/services/productosFabrica");
const servicesLocal = require(__basedir + "/src/services/local");
const servicesUsuarios = require(__basedir + "/src/services/usuarios");
const servicesPedidos = require(__basedir + "/src/services/pedidos");
const servicesChat = require(__basedir + "/src/services/chat");
const servicesActividad = require(__basedir + "/src/services/actividad");
const servicesProduccion = require(__basedir + "/src/services/produccion");
const servicesReportes = require(__basedir + "/src/services/reportes");
const servicesServicios = require(__basedir + "/src/services/servicios");
const { validationResult } = require("express-validator");
const { hashearPassword } = require(__basedir + "/src/middlewares/hash");
const actividadMiddleware = require(__basedir + "/src/middlewares/actividad");
const produccionMiddleware = require(__basedir + "/src/middlewares/produccion");
const reportesMiddleware = require(__basedir + "/src/middlewares/reportes");
const localMiddleware = require(__basedir + "/src/middlewares/local");

const index = (req, res) => {
  res.render(__basedir + "/src/views/pages/panel", {
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosCard = async (req, res) => {
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/productos", {
    data,
    vista: "card",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosTabla = async (req, res) => {
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/productos", {
    data,
    vista: "tabla",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosEditar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/productos/tabla");
  }
  let id = req.query.id;
  let data = await servicesProductos.getProducto(id);
  if(data === undefined){
    return res.redirect("/panel/productos/tabla");
  }
  let dataCategorias = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/editarProducto", {
    data,
    dataCategorias,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosUpdate = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    let dataCategorias = await servicesProductos.getCategorias();
    return res.render(__basedir + "/src/views/pages/editarProducto", {
      dataCategorias,
      data: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let datos = req.body;
  await servicesProductos.updateProducto(datos);
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/productos", {
    data,
    vista: "card",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosNuevo = async (req, res) => {
  let dataCategorias = await servicesProductos.getCategorias();
  let lastId = await servicesProductos.lastId("productos");
  res.render(__basedir + "/src/views/pages/nuevoProducto", {
    lastId,
    dataCategorias,
    data: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosInsert = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    let dataCategorias = await servicesProductos.getCategorias();
    return res.render(__basedir + "/src/views/pages/nuevoProducto", {
      dataCategorias,
      lastId: req.body.id,
      data: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let datos = req.body;
  await servicesProductos.insertProducto(datos);
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/productos", {
    data,
    vista: "card",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const productosEliminar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/productos/tabla");
  }
  let id = req.query.id;
  // manejar error
  await servicesProductos.deleteProducto(id);
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/productos", {
    data,
    vista: "card",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const categoriasTabla = async (req, res) => {
  let data = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/categorias", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const categoriasNueva = async (req, res) => {
  let data = await servicesProductos.lastId("categorias");
  res.render(__basedir + "/src/views/pages/nuevaCategoria", {
    data,
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const categoriasInsert = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render(__basedir + "/src/views/pages/nuevaCategoria", {
      data: req.body.id,
      valoresForm: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let datos = req.body;
  await servicesProductos.insertCategoria(datos);
  let data = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/categorias", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const categoriasEditar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/categorias");
  }
  let id = req.query.id;
  let data = await servicesProductos.getCategoria(id);
  if(data === undefined){
    return res.redirect("/panel/categorias");
  }
  res.render(__basedir + "/src/views/pages/editarCategoria", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const categoriasUpdate = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render(__basedir + "/src/views/pages/editarCategoria", {
      data: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let datos = req.body;
  await servicesProductos.updateCategoria(datos);
  let data = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/categorias", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const categoriasEliminar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/categorias");
  }
  let id = req.query.id;
  // manejar error
  await servicesProductos.deleteCategoria(id);
  let data = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/categorias", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const precios = async (req, res) => {
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/precios", {
    data,
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const preciosUpdate = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    let data = await servicesProductos.getProductos();
    return res.render(__basedir + "/src/views/pages/precios", {
      data,
      valoresForm: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let datos = req.body;
  await servicesProductos.updatePrecios(datos);
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/precios", {
    data,
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const local = async (req, res) => {
  let data = await servicesLocal.getLocales();
  res.render(__basedir + "/src/views/pages/local", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const localEditar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/local");
  }
  let id = req.query.id;
  let data = await servicesLocal.getLocal(id);
  if(data === undefined){
    return res.redirect("/panel/local");
  }
  const servicios = await servicesServicios.getServicios();
  const diasEntrega = await localMiddleware.crearObjetoDiasEntrega2(data.entrega);
  res.render(__basedir + "/src/views/pages/editarLocal", {
    data,
    servicios,
    diasEntrega,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const localUpdate = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render(__basedir + "/src/views/pages/editarLocal", {
      data: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  const servicios = await servicesServicios.getServicios();
  const serviciosActivos = await localMiddleware.crearObjetoServicios(servicios, req.body);
  const diasEntrega = await localMiddleware.crearObjetoDiasEntrega(req.body)
  await servicesLocal.updateLocal(req.body, serviciosActivos, diasEntrega);
  let data = await servicesLocal.getLocales();
  res.render(__basedir + "/src/views/pages/local", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const localNuevo = async (req, res) => {
  const data = await servicesProductos.lastId("locales");
  const servicios = await servicesServicios.getServicios();
  res.render(__basedir + "/src/views/pages/nuevoLocal", {
    servicios,
    data,
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const localInsert = async (req, res) => {
  const servicios = await servicesServicios.getServicios();
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render(__basedir + "/src/views/pages/nuevoLocal", {
      servicios,
      data: req.body.id,
      valoresForm: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  const diasEntrega = await localMiddleware.crearObjetoDiasEntrega(req.body)
  const serviciosActivos = await localMiddleware.crearObjetoServicios(servicios, req.body) 
  await servicesLocal.insertLocal(req.body, diasEntrega, serviciosActivos);
  res.redirect("/panel/local");
};

const localEliminar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/local");
  }
  let id = req.query.id;
  //manejar error
  await servicesLocal.deleteLocal(id);
  let data = await servicesLocal.getLocales();
  res.render(__basedir + "/src/views/pages/local", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const fotos = async (req, res) => {
  res.render(__basedir + "/src/views/pages/fotos", {
    mostrar: "",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const fotosProductos = async (req, res) => {
  let data = await servicesProductos.getProductos();
  res.render(__basedir + "/src/views/pages/fotos", {
    data,
    mostrar: "productos",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const fotosCategorias = async (req, res) => {
  let data = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/fotos", {
    data,
    mostrar: "categorias",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const fotosLocales = async (req, res) => {
  let data = await servicesLocal.getLocales();
  res.render(__basedir + "/src/views/pages/fotos", {
    data,
    mostrar: "locales",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const fotosNueva = async (req, res) => {
  if(!req.query.id && !req.query.tipo){
    return res.redirect("/panel/fotos");
  }
  let id = req.query.id;
  let tipo = req.query.tipo;
  let data;
  switch (tipo) {
    case "productos":
      data = await servicesProductos.getProducto(id);
      if(data === undefined){
        return res.redirect("/panel/fotos");
      }
      res.render(__basedir + "/src/views/pages/fotos", {
        data,
        mostrar: "upload",
        tipo,
        usuario: req.session.userLog,
        userRol: req.session.userRol,
      });
      break;
    case "categorias":
      data = await servicesProductos.getCategoria(id);
      if(data === undefined){
        return res.redirect("/panel/fotos");
      }
      res.render(__basedir + "/src/views/pages/fotos", {
        data,
        mostrar: "upload",
        tipo,
        usuario: req.session.userLog,
        userRol: req.session.userRol,
      });
      break;
    case "locales":
      data = await servicesLocal.getLocal(id);
      if(data === undefined){
        return res.redirect("/panel/fotos");
      }
      res.render(__basedir + "/src/views/pages/fotos", {
        data,
        mostrar: "upload",
        tipo,
        usuario: req.session.userLog,
        userRol: req.session.userRol,
      });
      break;
  }
};

const fotosNuevaSubida = async (req, res) => {
  if (req.fileValidationError == "Error") {
    return res.render(__basedir + "/src/views/pages/fotos", {
      data: {
        nombre: req.body.nombre,
        img: req.body.nombreArchivo,
        id: req.body.id,
      },
      mostrar: "upload",
      tipo: req.query.tipo,
      errores: [{ msg: "Formato de archivo no admitido" }],
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let data;
  let tipo = req.query.tipo;
  switch (tipo) {
    case "productos":
      data = await servicesProductos.getProductos();
      res.render(__basedir + "/src/views/pages/fotos", {
        data,
        mostrar: "productos",
        usuario: req.session.userLog,
        userRol: req.session.userRol,
      });
      break;
    case "categorias":
      data = await servicesProductos.getCategorias();
      res.render(__basedir + "/src/views/pages/fotos", {
        data,
        mostrar: "categorias",
        usuario: req.session.userLog,
        userRol: req.session.userRol,
      });
      break;
    case "locales":
      data = await servicesLocal.getLocales();
      res.render(__basedir + "/src/views/pages/fotos", {
        data,
        mostrar: "locales",
        usuario: req.session.userLog,
        userRol: req.session.userRol,
      });
      break;
  }
};

const usuarios = async (req, res) => {
  let data = await servicesUsuarios.getUsuarios();
  res.render(__basedir + "/src/views/pages/usuarios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const usuariosNuevo = async (req, res) => {
  let locales = await servicesLocal.getLocales();
  res.render(__basedir + "/src/views/pages/nuevoUsuario", {
    locales,
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const usuariosInsert = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    let locales = await servicesLocal.getLocales();
    return res.render(__basedir + "/src/views/pages/nuevoUsuario", {
      locales,
      valoresForm: req.body,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  let datos = req.body;
  datos.passHash = await hashearPassword(datos.passUser);
  await servicesUsuarios.insertUsuario(datos);
  let data = await servicesUsuarios.getUsuarios();
  res.render(__basedir + "/src/views/pages/usuarios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const usuariosEditar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/usuarios");
  }
  let usuario = req.query.id;
  let data = await servicesUsuarios.getUsuario(usuario);
  if(data === undefined){
    return res.redirect("/panel/usuarios");
  }
  res.render(__basedir + "/src/views/pages/editarUsuario", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const usuariosUpdate = async (req, res) => {
  let datos = req.body;
  await servicesUsuarios.updateUsuario(datos);
  let data = await servicesUsuarios.getUsuarios();
  res.render(__basedir + "/src/views/pages/usuarios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const usuariosEliminar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/usuarios");
  }
  let usuario = req.query.id;
  // manejar error
  await servicesUsuarios.deleteUsuario(usuario);
  let data = await servicesUsuarios.getUsuarios();
  res.render(__basedir + "/src/views/pages/usuarios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const pedidos = async (req, res) => {
  let dataPedido;
  let dataMensajes;
  let idLocal = req.session.userLocal;
  if(req.query.id){
    const dataPedidoCheck = await servicesPedidos.getPedido(req.query.id);
    if(dataPedidoCheck.local === idLocal){
      dataPedido = dataPedidoCheck;
      dataMensajes = await servicesChat.getMensajes(req.query.id);
      await actividadMiddleware.actividadUser(req.session.userLog, idLocal, req.query.id, "Lectura", "");
    }
  }
  let dataPedidos = await servicesPedidos.getPedidos(idLocal);
  let dataProds = await servicesProductos.getProductos();
  let local = await servicesLocal.getLocal(idLocal);
  res.render(__basedir + "/src/views/pages/pedidos", {
    pedidoNumero: req.query.id || 0,
    dataPedido,
    dataMensajes,
    dataPedidos,
    dataProds,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
    local,
  });
};

const pedidosEstado = async (req, res) => {
  await servicesPedidos.updateEstadoPedidos(req.body.id, req.body.estado);
  await actividadMiddleware.actividadUser(req.session.userLog, req.session.userLocal, req.body.id, "Estado", req.body.estado);
  return res.redirect("/panel/pedidos");
};

const actividad = async(req, res) => {
  let page;
  if(isNaN(req.query.page) || req.query.page < 1){
    page = 1;
  }else{
    page = req.query.page;
  }
  let data = await servicesActividad.getActividad(req.session.userLocal, page);
  res.render(__basedir + "/src/views/pages/actividad", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const actividadToda = async(req, res) => {
  let page;
  if(isNaN(req.query.page) || req.query.page < 1){
    page = 1;
  }else{
    page = req.query.page;
  }
  let data = await servicesActividad.getActividadAll(page);
  res.render(__basedir + "/src/views/pages/actividadFull", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const stockForm = async(req, res) => {
  const data = await servicesLocal.getLocal(req.session.userLocal);
  const productos = await servicesProductos.getProductos();
  const categorias = await servicesProductos.getCategorias();
  res.render(__basedir + "/src/views/pages/stock", {
    data,
    productos,
    categorias,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const stockUpdate = async (req, res) => {
  let datos = req.body.stock;
  // validacion
  if(!Array.isArray(req.body.stock)){
    return res.redirect("/panel/stock")
  }
  datos.forEach((dato) => {
    if(isNaN(parseInt(dato))){
      return res.redirect("/panel/stock")}
  })
  let local = req.session.userLocal;
  await servicesLocal.updateStock(datos, local);
  await actividadMiddleware.actividadUser(req.session.userLog, local, 0, "Stock", datos.toString());
  return res.redirect("/panel/stock")
};

const pedidoProduccionLocal = async(req, res) => {
  let dataPedido;
  if(req.query.id){
    const dataPedidoCheck = await servicesProduccion.getProduccionPedido(req.query.id);
    if(dataPedidoCheck.local == req.session.userLocal){
      if(dataPedidoCheck.buzon == "mensajeFabrica"){
        await servicesProduccion.mensajeProduccionLeido(req.query.id)
      }
      dataPedido = await servicesProduccion.getProduccionPedido(req.query.id);
    }
  }
  const data = await servicesProduccion.getProduccionLocal(req.session.userLocal);
  const productos = await servicesProductosFabrica.getProductosFabrica();
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const dataLocal = await servicesLocal.getLocal(req.session.userLocal);
  const locales = await servicesLocal.getLocales();
  // const ultimosPedidos = await produccionMiddleware.getUltimosPedidos(data);
  const prodFecha = await produccionMiddleware.getFechasProduccionLocal(dataLocal.entrega, data);
  res.render(__basedir + "/src/views/pages/produccion", {
    data,
    categorias,
    dataPedido,
    dataLocal,
    productos,
    prodFecha,
    locales,
    lector: "local",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
    userLocal: req.session.userLocal,
  });
};

const pedidoProduccionAgregarMensajeLocal = async(req, res) => {
  // agregar mensaje a la bbdd
  const data = await servicesProduccion.getProduccionPedido(req.body.pedidoProdNum);
  let mensajes = JSON.parse(data.mensajes);
  let nuevoMensaje = [req.body.emisorMensaje, req.body.mensajeProduccion]
  mensajes.push(nuevoMensaje)
  mensajes = JSON.stringify(mensajes)
  await servicesProduccion.agregarMensajeProduccion(req.body.pedidoProdNum, mensajes, req.body.emisorMensaje)
  return res.redirect(req.originalUrl);
}

const pedidoProduccionFabrica = async(req, res) => {
  let dataPedido;
  if(req.query.id){
    const dataPedidoCheck = await servicesProduccion.getProduccionPedido(req.query.id);
    if(dataPedidoCheck.buzon == "mensajeLocal"){
      await servicesProduccion.mensajeProduccionLeido(req.query.id)
    }
    dataPedido = await servicesProduccion.getProduccionPedido(req.query.id);
    if(dataPedido.local === "x"){
      return res.redirect("/panel/produccion/fabrica")
    }
  }
  const locales = await servicesLocal.getLocales();
  const data = await servicesProduccion.getProduccionFabrica();
  const productos = await servicesProductosFabrica.getProductosFabrica();
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  
  // calcular estado del pedido de cada local segun fecha actual
  let fechasLocales = [];
  for await (let local of locales){
    let serviciosLocal = JSON.parse(local.servicios);
    if(serviciosLocal.pedidos){
      const data = await servicesProduccion.getProduccionLocal(local.id);
      // const ultimosPedidos = await produccionMiddleware.getUltimosPedidos(data);
      let fechas = await produccionMiddleware.getFechasProduccionLocal(local.entrega, data);
      fechas.localId = local.id;
      fechasLocales.push(fechas);
    }
  }
  res.render(__basedir + "/src/views/pages/produccion", {
    data,
    dataPedido,
    productos,
    categorias,
    locales,
    fechasLocales,
    lector: "fabrica",
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const pedidoProduccionAgregarMensajeFabrica = async(req, res) => {
  // agregar mensaje a la bbdd
  const data = await servicesProduccion.getProduccionPedido(req.body.pedidoProdNum);
  let mensajes = JSON.parse(data.mensajes);
  let nuevoMensaje = [req.body.emisorMensaje, req.body.mensajeProduccion]
  mensajes.push(nuevoMensaje)
  mensajes = JSON.stringify(mensajes)
  await servicesProduccion.agregarMensajeProduccion(req.body.pedidoProdNum, mensajes, req.body.emisorMensaje)
  return res.redirect(req.originalUrl);
}

const pedidoProduccionNuevo = async (req, res) => {
  const productos = await servicesProduccion.getProductosProduccion();
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  let ultimoPedido = await servicesProduccion.getUltimoPedido(req.session.userLocal);
  if(ultimoPedido == undefined){
    ultimoPedido = 0;
  }
  res.render(__basedir + "/src/views/pages/nuevaProduccion", {
    ultimoPedido,
    productos,
    categorias,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const pedidoProduccionInsert = async (req, res) => {
  await actividadMiddleware.actividadUser(req.session.userLog, req.session.userLocal, 0, "Nuevo Pedido a Produccion", "");
  let pedido = [];
  const productos = await servicesProduccion.getProductosProduccion();
  for(dato in req.body){
    if(!isNaN(dato)){
      if(req.body[dato] > 0){
        let pedidoItem = [];
        let producto = productos.find((datoProd) => datoProd.id == dato);
        pedidoItem.push(parseInt(req.body[dato]));
        pedidoItem.push(parseInt(dato));
        pedidoItem.push(producto.costo);
        pedido.push(pedidoItem);
      }
    }
  }
  let datos = {
    local: parseInt(req.session.userLocal),
    pedido: JSON.stringify(pedido),
    total: parseInt(req.body.pedidoProduccionImporteTotal),
    fechaDeEntrega: req.body.pedidoProduccionFechaEntrega,
  }
  await servicesProduccion.insertPedidoProduccion(datos);
  return res.redirect("/panel/produccion/local");  
}

const pedidoProduccionUpdateEstado = async(req, res) => {
  await actividadMiddleware.actividadUser(req.session.userLog, req.session.userLocal, 0, "Cambio de estado de pedido", req.body.estado);
  if(req.body.estado == "cancelado"){
    await servicesProduccion.deletePedidoProduccion(req.body.id);
    if(req.body.emisor == "fabrica"){
      return res.redirect("/panel/produccion/fabrica");
    } else if(req.body.emisor == "local"){
      return res.redirect("/panel/produccion/local");
    }
  } else {
    await servicesProduccion.updateEstadoProduccion(req.body.estado, req.body.id);
    if(req.body.emisor == "fabrica"){
      return res.redirect("/panel/produccion/fabrica?id=" + req.body.id);
    } else if(req.body.emisor == "local"){
      return res.redirect("/panel/produccion/local?id=" + req.body.id);
    }
  }
}

const productosFabrica = async(req, res) => {
  let data = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/productosFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const pedidoProduccionEditar = async(req, res) => {
  if(!req.query.id){
    return res.redirect("/panel");
  }
  let productos = await servicesProductosFabrica.getProductosFabrica();
  let pedido = await servicesProduccion.getProduccionPedido(req.query.id);
  if(pedido === undefined){
    return res.redirect("/panel");
  }
  if(req.session.userRol == "admin" && pedido.estado !== "personalizado"){
    return res.redirect("/panel");
  }
  let locales = await servicesLocal.getLocales();
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  res.render(__basedir + "/src/views/pages/editarPedidoProduccion", {
    locales,
    productos,
    pedido,
    categorias,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const pedidoProduccionUpdate = async(req, res) => {
  let pedido = [];
  const productos = await servicesProduccion.getProductosProduccion();
  for(dato in req.body){
    if(!isNaN(dato)){
      if(req.body[dato] > 0){
        let pedidoItem = [];
        let producto = productos.find((datoProd) => datoProd.id == dato);
        pedidoItem.push(parseInt(req.body[dato]));
        pedidoItem.push(parseInt(dato));
        pedidoItem.push(producto.costo);
        pedido.push(pedidoItem);
      }
    }
  }
  let datos = {
    pedido: JSON.stringify(pedido),
    total: parseInt(req.body.pedidoProduccionImporteTotal),
    local: parseInt(req.body.pedidoProduccionLocalId),
  }
  await servicesProduccion.updatePedidoProduccion(datos);
  if(req.session.userRol == "admin"){
    return res.redirect("/panel/produccion/local?id=" + req.body.pedidoProduccionLocalId);
  }
  return res.redirect("/panel/produccion/fabrica?id=" + req.body.pedidoProduccionLocalId);
}

const pedidoProduccionPersonalizadoNuevo = async (req, res) => {
  const locales = await servicesLocal.getLocales();
  res.render(__basedir + "/src/views/pages/nuevoPedidoPersonalizado", {
    locales,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const pedidoProduccionPersonalizadoCrear = async (req, res) => {
  console.log(req.body)
  let data = {};
  data.fecha = await produccionMiddleware.fechaProduccionNormalizada(req.body.fecha);
  data.local = req.body.local;
  data.minimos = req.body.minimos;
  await servicesProduccion.insertPedidoProduccionPersonalizado(data);
  res.redirect("/panel/produccion/fabrica");
}

const productosFabricaNuevo = async(req, res) => {
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const sectores = await servicesProductosFabrica.getSectoresFabrica();
  res.render(__basedir + "/src/views/pages/nuevoProductoFabrica", {
    valoresForm: {},
    categorias,
    sectores,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const productosFabricaInsert = async(req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const categorias = await servicesProductosFabrica.getCategoriasFabrica();
    const sectores = await servicesProductosFabrica.getSectoresFabrica();
    return res.render(__basedir + "/src/views/pages/nuevoProductoFabrica", {
      valoresForm: req.body,
      categorias,
      sectores,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  await servicesProductosFabrica.insertProductoFabrica(req.body);
  let data = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/productosFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const productosFabricaEditar = async(req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/productosFabrica");
  }
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const sectores = await servicesProductosFabrica.getSectoresFabrica();
  let productoFabrica = await servicesProductosFabrica.getProductoFabrica(req.query.id);
  if(productoFabrica == undefined){
    return res.redirect("/panel/productosFabrica");
  }
  res.render(__basedir + "/src/views/pages/editarProductoFabrica", {
    valoresForm: productoFabrica,
    categorias,
    sectores,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const productosFabricaUpdate = async(req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const categorias = await servicesProductosFabrica.getCategoriasFabrica();
    const sectores = await servicesProductosFabrica.getSectoresFabrica();
    return res.render(__basedir + "/src/views/pages/editarProductoFabrica", {
      valoresForm: req.body,
      categorias,
      sectores,
      errores: errores.array({ onlyFirstError: true }),
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  if(!req.query.id){
    return res.redirect("/panel/productosFabrica")
  }
  await servicesProductosFabrica.updateProductoFabrica(req.body, req.query.id);
  let data = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/productosFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const productosFabricaEliminar = async(req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/productosFabrica")
  }
  await servicesProductosFabrica.deleteProductoFabrica(req.query.id);
  let data = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/productosFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const categoriasFabrica = async(req, res) => {
  let data = await servicesProductosFabrica.getCategoriasFabrica();
  res.render(__basedir + "/src/views/pages/categoriasFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const categoriasFabricaNueva = async(req, res) => {
  res.render(__basedir + "/src/views/pages/nuevaCategoriaFabrica", {
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const categoriasFabricaInsert = async(req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render(__basedir + "/src/views/pages/nuevaCategoriaFabrica", {
      errores: errores.array({ onlyFirstError: true }),
      valoresForm: req.body,
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    })
  }
  await servicesProductosFabrica.insertCategoriaFabrica(req.body);
  let data = await servicesProductosFabrica.getCategoriasFabrica();
  res.render(__basedir + "/src/views/pages/categoriasFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const categoriasFabricaEditar = async(req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/categoriasFabrica")
  }
  let categoriaFabrica = await servicesProductosFabrica.getCategoriaFabrica(req.query.id);
  if(categoriaFabrica === undefined){
    return res.redirect("/panel/categoriasFabrica")
  }
  res.render(__basedir + "/src/views/pages/editarCategoriaFabrica", {
    valoresForm: categoriaFabrica,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const categoriasFabricaUpdate = async(req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    if(!req.query.id){
      return res.redirect("/panel/categoriasFabrica")
    }
    let categoriaFabrica = await servicesProductosFabrica.getCategoriaFabrica(req.query.id);
    if(categoriaFabrica === undefined){
      return res.redirect("/panel/categoriasFabrica")
    }
    return res.render(__basedir + "/src/views/pages/editarCategoriaFabrica", {
      errores: errores.array({ onlyFirstError: true }),
      valoresForm: categoriaFabrica,
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    })
  }
  if(!req.query.id){
    return res.redirect("/panel/categoriasFabrica")
  }
  await servicesProductosFabrica.updateCategoriaFabrica(req.body, req.query.id);
  let data = await servicesProductosFabrica.getCategoriasFabrica();
  res.render(__basedir + "/src/views/pages/categoriasFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const categoriasFabricaEliminar = async(req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/categoriasFabrica")
  }
  await servicesProductosFabrica.deleteCategoriaFabrica(req.query.id);
  let data = await servicesProductosFabrica.getCategoriasFabrica();
  res.render(__basedir + "/src/views/pages/categoriasFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const fotosProductosFabrica = async(req, res) => {
  let data = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/fotosProductosFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const nuevaFotoProductoFabrica = async(req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/productosFabrica/fotos");
  }
  const data = await servicesProductosFabrica.getProductoFabrica(req.query.id);
  if(data === undefined){
    return res.redirect("/panel/productosFabrica/fotos");
  }
  res.render(__basedir + "/src/views/pages/nuevaFotoProductoFabrica", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const uploadNuevaFotoProductoFabrica = async(req, res) => {
  if (req.fileValidationError == "Error") {
    return res.render(__basedir + "/src/views/pages/nuevaFotoProductoFabrica", {
      data: {
        nombre: req.body.nombre,
        img: req.body.nombreArchivo,
        id: req.body.id,
      },
      errores: [{ msg: "Formato de archivo no admitido" }],
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    });
  }
  return res.redirect("/panel/productosFabrica/fotos");
}

const reportes = async (req, res) => {
  const sectores = await servicesProductosFabrica.getSectoresFabrica();
  res.render(__basedir + "/src/views/pages/reportesProduccion", {
    sectores,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const reportesSelector = async(req, res) => {
  res.redirect(`/panel/produccion/reportes/${req.body.tipo}?sector=${req.body.sector}&fecha=${req.body.fecha}`);
}

const reportePlanta = async(req, res) => {
  //verificar querys
  if(req.query.fecha === undefined || req.query.sector === undefined){
    return res.redirect("/panel/produccion/reportes");
  }
  //verificar validez del sector
  const sectores = await servicesProductosFabrica.getSectoresFabrica();
  if(sectores.find((dato) => dato.sector == req.query.sector) === undefined){
    return res.redirect("/panel/produccion/reportes");
  }
  const fecha = await produccionMiddleware.fechaProduccionNormalizada(req.query.fecha);
  const pedidos = await servicesReportes.getReportes(fecha);
  // Verifica si la fecha contiene pedidos
  if(pedidos.length == 0){
    return res.redirect("/panel/produccion/reportes");
  }
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const productos = await servicesProductosFabrica.getProductosFabrica();
  const data = await reportesMiddleware.reportePlanta(productos, pedidos, req.query.sector);
  const productosDelPedido = await reportesMiddleware.productosDelPedido(productos, data);
  res.render(__basedir + "/src/views/pages/reportePlanta", {
    sector: req.query.sector,
    fecha,
    data,
    categorias,
    productos: productosDelPedido,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const reportePedidos = async(req, res) => {
  //verificar querys
  if(req.query.fecha === undefined || req.query.sector === undefined){
    return res.redirect("/panel/produccion/reportes");
  }
  //verificar validez del sector
  const sectores = await servicesProductosFabrica.getSectoresFabrica();
  if(sectores.find((dato) => dato.sector == req.query.sector) === undefined){
    return res.redirect("/panel/produccion/reportes");
  }
  const fecha = await produccionMiddleware.fechaProduccionNormalizada(req.query.fecha);
  const locales = await servicesLocal.getLocales();
  const pedidos = await servicesReportes.getReportes(fecha);
  const pedidosFiltrados = await reportesMiddleware.sumarPedidosMismaFecha(pedidos, locales);
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const productos = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/reportePedidos", {
    sector: req.query.sector,
    fecha,
    pedidos: pedidosFiltrados,
    categorias,
    productos,
    locales,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const reporteValorizado = async(req, res) => {
  //verificar querys
  if(req.query.fecha === undefined || req.query.sector === undefined){
    return res.redirect("/panel/produccion/reportes");
  }
  //verificar validez del sector
  const sectores = await servicesProductosFabrica.getSectoresFabrica();
  if(sectores.find((dato) => dato.sector == req.query.sector) === undefined){
    return res.redirect("/panel/produccion/reportes");
  }
  const fecha = await produccionMiddleware.fechaProduccionNormalizada(req.query.fecha);
  const locales = await servicesLocal.getLocales();
  const pedidos = await servicesReportes.getReportes(fecha);
  const pedidosFiltrados = await reportesMiddleware.sumarPedidosMismaFecha(pedidos, locales);
  const localesConPedido = await reportesMiddleware.localesConPedido(pedidosFiltrados);
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const productos = await servicesProductosFabrica.getProductosFabrica();
  const cantidadesPorProducto = await reportesMiddleware.cantidadesPorProducto(productos, pedidosFiltrados, req.query.sector);
  res.render(__basedir + "/src/views/pages/reporteValorizado", {
    sector: req.query.sector,
    fecha,
    pedidos: pedidosFiltrados,
    categorias,
    productos,
    locales,
    localesConPedido,
    cantidadesPorProducto,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const servicios = async (req, res) => {
  let data = await servicesServicios.getServicios();
  res.render(__basedir + "/src/views/pages/servicios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const servicioNuevo = async (req, res) => {
  let data = await servicesProductos.lastId("servicios");
  res.render(__basedir + "/src/views/pages/nuevoServicio", {
    data,
    valoresForm: {},
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const servicioInsert = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render(__basedir + "/src/views/pages/nuevoServicio", {
      errores: errores.array({ onlyFirstError: true }),
      valoresForm: req.body,
      usuario: req.session.userLog,
      userRol: req.session.userRol,
    })
  }
  await servicesServicios.insertServicio(req.body);
  let data = await servicesServicios.getServicios();
  res.render(__basedir + "/src/views/pages/servicios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  })
}

const servicioEliminar = async (req, res) => {
  if(!req.query.id){
    return res.redirect("/panel/servicios");
  }
  await servicesServicios.deleteServicio(req.query.id);
  let data = await servicesServicios.getServicios();
  res.render(__basedir + "/src/views/pages/servicios", {
    data,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
};

const preciosProductosFabrica = async(req, res) => {
  const categorias = await servicesProductosFabrica.getCategoriasFabrica();
  const productos = await servicesProductosFabrica.getProductosFabrica();
  res.render(__basedir + "/src/views/pages/preciosFabrica", {
    categorias,
    productos,
    usuario: req.session.userLog,
    userRol: req.session.userRol,
  });
}

const preciosProductosFabricaUpdate = async(req, res) => {
  await servicesProductosFabrica.updatePreciosProductosFabrica(req.body);
  res.redirect("/panel/productosFabrica/precios");
}

module.exports = {
  index,
  productosCard,
  productosTabla,
  productosEditar,
  productosNuevo,
  productosInsert,
  productosUpdate,
  productosEliminar,
  categoriasNueva,
  categoriasEditar,
  categoriasTabla,
  categoriasInsert,
  categoriasUpdate,
  categoriasEliminar,
  localEditar,
  localUpdate,
  localNuevo,
  localInsert,
  localEliminar,
  precios,
  preciosUpdate,
  local,
  localInsert,
  fotos,
  fotosProductos,
  fotosCategorias,
  fotosLocales,
  fotosNueva,
  fotosNuevaSubida,
  usuarios,
  usuariosNuevo,
  usuariosInsert,
  usuariosEditar,
  usuariosUpdate,
  usuariosEliminar,
  pedidos,
  pedidosEstado,
  actividad,
  actividadToda,
  stockForm,
  stockUpdate,
  pedidoProduccionLocal,
  pedidoProduccionFabrica,
  pedidoProduccionAgregarMensajeLocal,
  pedidoProduccionAgregarMensajeFabrica,
  pedidoProduccionNuevo,
  pedidoProduccionInsert,
  pedidoProduccionUpdateEstado,
  productosFabrica,
  pedidoProduccionEditar,
  pedidoProduccionUpdate,
  productosFabricaNuevo,
  productosFabricaInsert,
  productosFabricaEditar,
  productosFabricaUpdate,
  productosFabricaEliminar,
  preciosProductosFabrica,
  preciosProductosFabricaUpdate,
  pedidoProduccionPersonalizadoNuevo,
  pedidoProduccionPersonalizadoCrear,
  categoriasFabrica,
  categoriasFabricaNueva,
  categoriasFabricaInsert,
  categoriasFabricaEditar,
  categoriasFabricaUpdate,
  categoriasFabricaEliminar,
  fotosProductosFabrica,
  nuevaFotoProductoFabrica,
  uploadNuevaFotoProductoFabrica,
  reportes,
  reportesSelector,
  reportePlanta,
  reportePedidos,
  reporteValorizado,
  servicios,
  servicioNuevo,
  servicioInsert,
  servicioEliminar,
};
