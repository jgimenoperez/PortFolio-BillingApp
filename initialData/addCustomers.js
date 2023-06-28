import { firebaseAddCustomers, firebaseLoginWithEmail } from "../src/firebase/firebase.js";
import { readFile } from "fs/promises";

const customersInfo = JSON.parse(await readFile("./customers.json"));

async function  addCustomers()  {
    await firebaseLoginWithEmail('xxx@xxxx.es','xxxxx')
    await firebaseAddCustomers('xxx@xxx,es',customersInfo);
 }

addCustomers()