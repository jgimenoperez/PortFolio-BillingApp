import { firebaseAddCustomers, firebaseLoginWithEmail } from "../src/firebase/firebase.js";
import { readFile } from "fs/promises";

const customersInfo = JSON.parse(await readFile("./customers.json"));

async function  addCustomers()  {
    console.log(customersInfo)
    await firebaseLoginWithEmail('fiona@manosdehada.es','961421180')
    await firebaseAddCustomers('fiona@manosdehada.es',customersInfo);
 }

addCustomers()