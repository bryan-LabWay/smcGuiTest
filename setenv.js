const { writeFileSync } = require('fs');
const { join } = require('path');

// Define the path to your production environment file
const envProdFilePath = join(__dirname, 'src', 'environments', 'environment.ts');

// Get the environment variables from process.env
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

// Build the content of environment.prod.ts
const envFileContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
  apiKey: '${apiKey}'
};
`;

// Write the content to the environment file
writeFileSync(envProdFilePath, envFileContent, { encoding: 'utf8' });

console.log(`Wrote environment variables to ${envProdFilePath}`);
