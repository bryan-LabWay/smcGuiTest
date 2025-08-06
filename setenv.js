const { writeFileSync } = require('fs');
const { join } = require('path');

// Define the path to your production environment file
const envProdFilePath = join(__dirname, 'src', 'environments', 'environment.ts');

// Get the environment variables from process.env
const apiUrl_main = process.env.API_URL_v0_01;
const apiKey_main = process.env.API_KEY_MAIN;
const apiUrl_v01_r_32 = process.env.API_URL_v01_R_32;
const apiUrl_v01_r_64 = process.env.API_URL_v01_R_64;
const apiUrl_v02 = process.env.API_URL_v0_02;
const apiUrl_v01_cl_p1 = process.env.API_URL_v01_CL_P1;
const apiUrl_v02_cl_p3 = process.env.API_URL_v01_CL_P3;

// Build the content of environment.prod.ts
const envFileContent = `export const environment = {
  production: true,
  apiUrlMain: '${apiUrl_main}',
  apiKeyMain: '${apiKey_main}',
  apiUrlv01R32: '${apiUrl_v01_r_32}',
  apiUrlv01R64: '${apiUrl_v01_r_64}',
  apiUrlv02: '${apiUrl_v02}',
  apiUrlv01ClP1: '${apiUrl_v01_cl_p1}',
  apiUrlv01ClP3: '${apiUrl_v02_cl_p3}'
};
`;

// Write the content to the environment file
writeFileSync(envProdFilePath, envFileContent, { encoding: 'utf8' });

console.log(`Wrote environment variables to ${envProdFilePath}`);
