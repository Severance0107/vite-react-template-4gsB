// Supongamos que xmlString contiene tu respuesta XML en forma de cadena

const XMLaJSON = (xml) =>{
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
}
const xmlString = '<root><person><name>John</name><age>30</age></person><person><name>Jane</name><age>25</age></person></root>';

// Utiliza el DOMParser para convertir la cadena XML en un objeto XML
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

// Utiliza la función xmlToJson para convertir el objeto XML en un objeto JSON
const jsonResult = xmlToJson(xmlDoc);

// Imprime el resultado JSON
console.log(jsonResult);

// Función para convertir XML a JSON
function xmlToJson(xml) {
  // Crea el objeto que contendrá el resultado JSON
  const obj = {};

  // Verifica si el nodo XML es un elemento (ignora nodos de texto y otros tipos)
  if (xml.nodeType === 1) {
    // Recorre cada atributo del elemento y los agrega al objeto JSON
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    // Si el nodo es un nodo de texto, agrega el contenido al objeto JSON
    obj['#text'] = xml.nodeValue;
  }

  // Recorre los nodos hijos y los agrega al objeto JSON
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;

      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }

        obj[nodeName].push(xmlToJson(item));
      }
    }
  }

  return obj;
}