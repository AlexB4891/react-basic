import React from 'react';

/*Vamos a crear una App con el titulo de nivel 1, luego un input de texto y por ultimo un boton para desencadenar una acción*/
/* link the app with the css file*/
/* add an instruction for the input*/


import { analyzeImage } from './azure-image-analysis.js';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');

  const handleButtonClick = () => {
    analyzeImage(imageUrl).then((result) => {
      /*setImageDescription(result.description);*/
      setImageSrc(result.imageUrl);
      /*setJsonResponse(JSON.stringify(result.jsonResponse, null, 2));*/
    });
  };

  return (
    <div>
      <link rel="stylesheet" href="./index.css" />
      <h1>Aplicación para describir/generar imagenes</h1>
      <p>Aquí abajo puedes escribir tu prompt para generar imagenes o en su defecto puedes pegar un URL y la AI de Azure va a describir lo que está dentro de tu imagen</p>
      <input  type="text" placeholder="Escribe tu URL o prompt aquí" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button onClick={handleButtonClick}>Enviar</button> 
      <img src={imageSrc} alt="Imagen analizada" />
    </div>
  );
}


export default App;