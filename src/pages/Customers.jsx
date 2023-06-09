// import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { customerFields, firebaseGetData } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { Layout } from "../components/navbar/layout";
import {  Loading } from "@nextui-org/react";

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [nameFields, setNameFields] = useState([{ name: "", uid: "" }]);
  const [isLoading, setIsLoading] = useState(true);

  const { email } = useSelector((state) => state.user.user);

  useEffect(() => {
    firebaseGetData(email,"customers").then((data) => {
      setCustomers(data);
      setIsLoading(false);
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

  if (isLoading)
  return (
    <Loading
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Loading
    </Loading>
  );

  return (
    <Layout>
      <MaintenancesGridComponent dataGrid={customers} nameFields={nameFields}/>
    </Layout>
  )
};
