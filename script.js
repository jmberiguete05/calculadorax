// Definir los artículos disponibles
var articulos = [
    { codigo: "ART1", descripcion: "VENTANA CORREDERA PERIMETRAL BLANCA" },
    { codigo: "ART2", descripcion: "Vidrio para ventana estándar" },
    { codigo: "ART3", descripcion: "Herrajes para ventana estándar" }
  ];
  
  // Función para cargar los artículos en la lista desplegable
  function cargarArticulos() {
    var select = document.getElementById("articulo");
    select.innerHTML = "<option value=''>Seleccionar Artículo</option>";
    articulos.forEach(function (articulo) {
      var option = document.createElement("option");
      option.value = articulo.codigo;
      option.text = articulo.descripcion;
      select.appendChild(option);
    });
  }
  
  // Función para crear un nuevo artículo
  function crearArticulo() {
    var codigo = document.getElementById("codigo").value;
    var descripcion = document.getElementById("descripcion").value;
  
    if (codigo.trim() === "" || descripcion.trim() === "") {
      alert(
        "Por favor, ingrese un código y una descripción para el nuevo artículo."
      );
      return;
    }
  
    articulos.push({ codigo: codigo, descripcion: descripcion });
    cargarArticulos();
    alert("Nuevo artículo creado con éxito.");
  }
  
  // Función para calcular el área
  function calcularArea() {
    var widthEntero = parseFloat(document.getElementById("widthEntero").value);
    var widthFraccion = document.getElementById("widthFraccion").value;
    var heightEntero = parseFloat(document.getElementById("heightEntero").value);
    var heightFraccion = document.getElementById("heightFraccion").value;
    var codigoArticulo = document.getElementById("articulo").value;
  
    // Validar y convertir la entrada en fracción decimal a número
    var width = convertirFraccionDecimalANumero(widthEntero, widthFraccion);
    var height = convertirFraccionDecimalANumero(heightEntero, heightFraccion);
  
    if (isNaN(width) || isNaN(height)) {
      document.getElementById("resultado").innerText =
        "Por favor, ingrese valores válidos para el ancho y la altura.";
      return;
    }
  
    var area = (width * height) / 144; // Convertir pulgadas cuadradas a pies cuadrados
    document.getElementById("resultado").innerText =
      "El área de la ventana es: " + area.toFixed(2) + " pies cuadrados.";
    document.getElementById("resultado").innerText +=
      "\nArtículo seleccionado: " + obtenerDescripcionArticulo(codigoArticulo);
  }
  
  // Función para obtener la descripción del artículo basada en el código
  function obtenerDescripcionArticulo(codigo) {
    var articulo = articulos.find(function (articulo) {
      return articulo.codigo === codigo;
    });
    return articulo ? articulo.descripcion : "Ningún artículo seleccionado";
  }
  
  // Función para convertir fracción decimal a número
  function convertirFraccionDecimalANumero(entero, fraccion) {
    var partes = fraccion.split("/");
    if (partes.length === 2) {
      var numerador = parseFloat(partes[0]);
      var denominador = parseFloat(partes[1]);
      if (!isNaN(numerador) && !isNaN(denominador) && denominador !== 0) {
        return entero + numerador / denominador;
      }
    }
    // Si no se puede convertir, devolver NaN
    return NaN;
  }
  
  // Función para imprimir la información en formato de tabla
  function imprimirInformacion() {
      var contenido = document.getElementById('resultado').innerText;
      var ventanaImpresion = window.open('', '_blank');
      ventanaImpresion.document.write('<html><head><title>Información de Ventana</title>');
      ventanaImpresion.document.write('<link rel="stylesheet" type="text/css" href="styles.css"></head><body>');
      ventanaImpresion.document.write('<h2>Información de Ventana</h2>');
      ventanaImpresion.document.write('<table>');
      ventanaImpresion.document.write('<tr><th>Descripción del Artículo</th><th>Cantidad en Pie Cuadrado</th></tr>');
      ventanaImpresion.document.write('<tr><td>' + contenido.split('\n')[1] + '</td><td>' + contenido.split('\n')[0] + '</td></tr>');
      ventanaImpresion.document.write('</table>');
      ventanaImpresion.document.write('</body></html>');
      ventanaImpresion.document.close();
      ventanaImpresion.print();
  }
  
  // Cargar los artículos al cargar la página
  window.onload = cargarArticulos;
  