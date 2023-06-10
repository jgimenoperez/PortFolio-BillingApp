import { firebaseAddProducts, firebaseLoginWithEmail } from "../src/firebase/firebase.js";
import { readFile } from "fs/promises";

const customersInfo = JSON.parse(await readFile("./products.json"));

async function  addCustomers()  {
    await firebaseLoginWithEmail('fiona@manosdehada.es','961421180')
    await firebaseAddProducts('fiona@manosdehada.es',customersInfo);
 }

addCustomers()