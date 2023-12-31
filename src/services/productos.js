const fs = require("fs");
const { conectar } = require(__basedir + "/src/config/dbConnection");

const getProductos = async () => {
  try {
    const rows = await conectar.query("SELECT * FROM productos ORDER BY categoria");
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const getProducto = async (id) => {
  try {
    const rows = await conectar.query("SELECT * FROM productos WHERE ?", { id });
    return rows[0][0];
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const insertProducto = async (datos) => {
  try {
    await conectar.query(`INSERT INTO productos (categoria, nombre, descripcion, variedad, precio, precioDocena, fraccionamiento, imgCard, estado, topSale, destacado) VALUES ("${datos.categoria}", "${datos.nombre}", "${datos.descripcion}", "${datos.variedad || datos.nombre}", "${datos.precio}", "${datos.precioDoc}", "${datos.fraccionamiento}", "${datos.nombreImg}", "${datos.estado || "false"}", "${datos.topSale || "false"}", "${datos.destacado || "false"}")`);
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const updateProducto = async (datos) => {
  try {
    const answer = await conectar.query(
      `UPDATE productos SET categoria = "${datos.categoria}", nombre = "${datos.nombre}", descripcion = "${datos.descripcion}", variedad = "${datos.variedad || datos.nombre}", precio = "${datos.precio}", precioDocena = "${datos.precioDoc}", fraccionamiento = "${datos.fraccionamiento}", imgCard = "${datos.nombreImg}", estado = "${datos.estado || "false"}", topSale = "${datos.topSale || "false"}", destacado = "${datos.destacado || "false"}" WHERE id = "${datos.id}"`
    );
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const deleteProducto = async (id) => {
  try {
    await conectar.query(`DELETE FROM productos WHERE id = "${id}"`);
    // Buscar id de prod en los stock de los locales, eliminarlo y actualizar bbdd
    const stock = await conectar.query(`SELECT id, stock FROM locales`);
    stock[0].forEach(async (dato) => {
      let datoArray = dato.stock.split(",");
      let busqueda = datoArray.indexOf(id);
      if (busqueda != -1) {
        datoArray.splice(busqueda, 1);
        datoArray.toString();
        await conectar.query(`UPDATE locales SET stock = "${datoArray}" WHERE id = "${dato.id}"`);
      }
    });
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const getCategorias = async () => {
  try {
    const rows = await conectar.query("SELECT * FROM categorias");
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const getCategoria = async (id) => {
  try {
    const rows = await conectar.query("SELECT * FROM categorias WHERE ?", { id });
    return rows[0][0];
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const insertCategoria = async (datos) => {
  try {
    const answer = await conectar.query(
      `INSERT INTO categorias (categoria, imgCat) VALUES ("${datos.categoria}", "${datos.nombreImg}")`
    );
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const updateCategoria = async (datos) => {
  try {
    const answer = await conectar.query(
      `UPDATE categorias SET categoria =  "${datos.categoria}", imgCat = "${datos.nombreImg}" WHERE id = "${datos.id}"`
    );
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const deleteCategoria = async (id) => {
  try {
    const answer = await conectar.query(`DELETE FROM categorias WHERE id = "${id}"`);
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const updatePrecios = async (datos) => {
  try {
    // Toma el dato del form y lo ordena en un array
    let datosOrdenados = Object.entries(datos);
    let datosUpdate = [];
    // Filtra el array por valor
    datosOrdenados.forEach((dato) => {
      if (dato[1][1] > 0 || dato[1][2] > 0) {
        datosUpdate.push(dato[1]);
      }
    });
    // constructor de la query sobre el array
    datosUpdate.forEach(async (dato) => {
      let updatePrecio = "";
      let updatePrecioDocena = "";
      let coma = "";
      if (dato[1] > 0) {
        updatePrecio = `precio = "${dato[1]}"`;
      }
      if (dato[2] > 0) {
        updatePrecioDocena = `precioDocena = "${dato[2]}"`;
      }
      if (dato[1] > 0 && dato[2] > 0) {
        coma = ",";
      }
      await conectar.query(
        `UPDATE productos SET ${updatePrecio}${coma} ${updatePrecioDocena} WHERE id = "${dato[0]}"`
      );
    });
  } catch (error) {
    throw error;
  } finally {
    conectar.releaseConnection();
  }
};

const lastId = async (tabla) => {
  const getLastId = await conectar.query(`SHOW TABLE STATUS LIKE '${tabla}'`);
  return getLastId[0][0].Auto_increment;
};

module.exports = {
  getProductos,
  getProducto,
  insertProducto,
  updateProducto,
  deleteProducto,
  getCategorias,
  getCategoria,
  insertCategoria,
  updateCategoria,
  deleteCategoria,
  updatePrecios,
  lastId,
};
