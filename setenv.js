const { writeFileSync } = require('fs');
const { join } = require('path');

// Define the path to your production environment file
const envProdFilePath = join(__dirname, 'src', 'environments', 'environment.ts');

// Get the environment variables from process.env
const apiUrl_main = process.env.API_URL_MAIN;
const apiKey_main = process.env.API_KEY_MAIN;
const apiUrl_3Epochs = process.env.API_URL_3EPOCHS;
const apiUrl_6Epochs = process.env.API_URL_6EPOCHS;
const apiUrl_9Epochs = process.env.API_URL_9EPOCHS;
const apiUrl_18Epochs = process.env.API_URL_18EPOCHS;

// Build the content of environment.prod.ts
const envFileContent = `export const environment = {
  production: true,
  apiUrlMain: '${apiUrl_main}',
  apiKeyMain: '${apiKey_main}',
  apiUrl3Epochs: '${apiUrl_3Epochs}'
  apiUrl6Epochs: '${apiUrl_6Epochs}'
  apiUrl9Epochs: '${apiUrl_9Epochs}'
  apiUrl18Epochs: '${apiUrl_18Epochs}'

};
`;

// Write the content to the environment file
writeFileSync(envProdFilePath, envFileContent, { encoding: 'utf8' });

console.log(`Wrote environment variables to ${envProdFilePath}`);
