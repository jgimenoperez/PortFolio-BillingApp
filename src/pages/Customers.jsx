// import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { customerFields, firebaseGetCustomers } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { Layout } from "../components/navbar/layout";

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [nameFields, setNameFields] = useState([{ name: "", uid: "" }]);

  const { email } = useSelector((state) => state.user.user);

  useEffect(() => {
    firebaseGetCustomers(email).then((data) => {
      setCustomers(data);
    });
  }, []);

  useEffect(() => {
    const data = customerFields.map((item) => {
      return {
        name: item.toUpperCase(),
        uid: item.toLowerCase(),
      };
    });
    setNameFields(data);
  }, [])


  return (
    <Layout>
      <MaintenancesGridComponent dataGrid={customers} nameFields={nameFields}/>
    </Layout>
  )
};
