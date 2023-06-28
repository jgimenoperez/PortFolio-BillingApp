import { firebaseAddProducts, firebaseLoginWithEmail } from "../src/firebase/firebase.js";
import { readFile } from "fs/promises";

const customersInfo = JSON.parse(await readFile("./products.json"));

async function  addCustomers()  {
    await firebaseLoginWithEmail('xxxx@xxx.es','xxxx')
    await firebaseAddProducts('xxx@xxx.es',customersInfo);
 }

addCustomers()