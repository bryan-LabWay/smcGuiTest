const { writeFileSync } = require('fs');
const { join } = require('path');

// Define the path to your production environment file
const envProdFilePath = join(__dirname, 'src', 'environments', 'environment.ts');

// Get the environment variables from process.env
const apiUrl_main = process.env.API_URL_v0_01;
const apiKey_main = process.env.API_KEY_MAIN;
const apiUrl_v01_r_16 = process.env.API_URL_v01_R_16;
const apiUrl_v02 = process.env.API_URL_v0_02;
const apiUrl_v021 = process.env.API_URL_v0_021;
const apiUrl_v021_5e_5 = process.env.API_URL_v0_021_5e_5;
const apiUrl_v022 = process.env.API_URL_v0_022;
const apiUrl_v022R = process.env.API_URL_v0_022R;
const apiUrl_v022B = process.env.API_URL_v0_022B;

// Build the content of environment.prod.ts
const envFileContent = `export const environment = {
  production: true,
  apiUrlMain: '${apiUrl_main}',
  apiKeyMain: '${apiKey_main}',
  apiUrlv01R16: '${apiUrl_v01_r_16}',
  apiUrlv02: '${apiUrl_v02}',
  apiUrlv021: '${apiUrl_v021}',
  apiUrlv0215E5: '${apiUrl_v021_5e_5}',
  apiUrlv022: '${apiUrl_v022}',
  apiUrlv022: '${apiUrl_v022R}',
  apiUrlv022: '${apiUrl_v022B}'
};
`;

// Write the content to the environment file
writeFileSync(envProdFilePath, envFileContent, { encoding: 'utf8' });

console.log(`Wrote environment variables to ${envProdFilePath}`);
