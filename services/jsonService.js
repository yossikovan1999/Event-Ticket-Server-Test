import fs from "fs/promises";

/**
 *
 * @param {*} fileName
 * @returns
 */
export async function readJsonFile(fileName) {
  const data = await fs.readFile(fileName, "utf-8");
  return JSON.parse(data);
}

/**
 * 
 * @param {*} fileName
 */
export async function writeJsonFile(fileName, data) {
  const stringJson = JSON.stringify(data, null, 2);
  await fs.writeFile(fileName, stringJson, "utf-8");
}

/**
 * this function will read the daa push to it and then write it back
 * @param {*} fileName 
 * @param {*} data 
 */
export async function appendToJsonFile(fileName, data){

  const jsonData = await readJsonFile(fileName);

  jsonData.push(data);

  await writeJsonFile(fileName, jsonData);
}