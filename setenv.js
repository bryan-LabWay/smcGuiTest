const { writeFileSync } = require('fs');
const { join } = require('path');

// Define the path to your production environment file
const envProdFilePath = join(__dirname, 'src', 'environments', 'environment.ts');

// Get the environment variables from process.env
const apiUrl_main = process.env.API_URL_v0_01;
const apiKey_main = process.env.API_KEY_MAIN;
const apiUrl_v01_r_8 = process.env.API_URL_v01_R_8;
const apiUrl_v01_r_16 = process.env.API_URL_v01_R_16;
const apiUrl_v01_r_32 = process.env.API_URL_v01_R_32;
const apiUrl_v01_r_64 = process.env.API_URL_v01_R_64;
const apiUrl_v01_cl_p1 = process.env.API_URL_v01_CL_P1;
const apiUrl_v01_cl_p2 = process.env.API_URL_v01_CL_P2;
const apiUrl_v01_cl_p3 = process.env.API_URL_v01_CL_P3;
const apiUrl_v01_cl_p4 = process.env.API_URL_v01_CL_P4;
const apiUrl_v01_cl_p5 = process.env.API_URL_v01_CL_P5;
const apiUrl_v02 = process.env.API_URL_v0_02;
const apiUrl_v021 = process.env.API_URL_v0_021;

// Build the content of environment.prod.ts
const envFileContent = `export const environment = {
  production: true,
  apiUrlMain: '${apiUrl_main}',
  apiKeyMain: '${apiKey_main}',
  apiUrlv01R8: '${apiUrl_v01_r_8}',
  apiUrlv01R16: '${apiUrl_v01_r_16}',
  apiUrlv01ClP1: '${apiUrl_v01_cl_p1}',
  apiUrlv01ClP2: '${apiUrl_v01_cl_p2}',
  apiUrlv01ClP3: '${apiUrl_v01_cl_p3}',
  apiUrlv01ClP4: '${apiUrl_v01_cl_p4}',
  apiUrlv01ClP5: '${apiUrl_v01_cl_p5}',
  apiUrlv02: '${apiUrl_v02}',
  apiUrlv02: '${apiUrl_v021}',
};
`;

// Write the content to the environment file
writeFileSync(envProdFilePath, envFileContent, { encoding: 'utf8' });

console.log(`Wrote environment variables to ${envProdFilePath}`);
