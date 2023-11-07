
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { CognitiveServicesCredentials } = require('@azure/ms-rest-azure-js');

// Configura las credenciales
const subscriptionKey = '';
const endpoint = 'https://compu-visi-msl.cognitiveservices.azure.com/';

// Crea un cliente de Computer Vision
const credentials = new CognitiveServicesCredentials(subscriptionKey);
const client = new ComputerVisionClient(credentials, endpoint);


// Define una función para analizar una imagen
async function analyzeImage(imageUrl) {
    try {
      // Haz una solicitud al servicio de Computer Vision
      const response = await client.analyzeImage(imageUrl, { visualFeatures: ['Tags', 'Description'] });
  
      // Devuelve la respuesta
      return response;
    } catch (error) {
      console.log(error);
      throw new Error('No se pudo analizar la imagen.');
    }
  }
  
  module.exports = { analyzeImage };