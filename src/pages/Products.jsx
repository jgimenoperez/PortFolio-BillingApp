// import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { ProductFields, firebaseGetProducts } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { Layout } from "../components/navbar/layout";
import {  Loading } from "@nextui-org/react";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [nameFields, setNameFields] = useState([{ name: "", uid: "" }]);
  const [isLoading, setIsLoading] = useState(true);

  const { email } = useSelector((state) => state.user.user);

  useEffect(() => {
    firebaseGetProducts(email).then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const data = ProductFields.map((item) => {
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
      <MaintenancesGridComponent dataGrid={products} nameFields={nameFields}/>
    </Layout>
  )
};
