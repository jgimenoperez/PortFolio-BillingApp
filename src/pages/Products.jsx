import { ProductFields } from "../firebase/firebase";
import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { Layout } from "../components/navbar/layout";
import { useEffect, useState } from "react";

export const Products = () => {
  const [nameFields, setNameFields] = useState([{ name: "", uid: "" }]);


  useEffect(() => {
    const data = ProductFields.map((item) => {
      return {
        name: item.toUpperCase(),
        uid: item.toLowerCase(),
      };
    });
    setNameFields(data);
  }, []);

  useEffect(() => {
    const data = ProductFields.map((item) => {
      return {
        name: item.toUpperCase(),
        uid: item.toLowerCase(),
      };
    });
    setNameFields(data);
  }, []);



  return (
    <Layout>
      <MaintenancesGridComponent
        nameFields={nameFields}
        title="Artículos"
        collection="products"
      ></MaintenancesGridComponent>
    </Layout>
  );
};
