// import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { customerFields,  } from "../firebase/firebase";
import { Layout } from "../components/navbar/layout";
import { MaintenancesGridComponent } from "../components/maintenance/MaintenancesGridComponent";
import { useEffect, useState } from "react";

export const Customers = () => {
  const [nameFields, setNameFields] = useState([{ name: "", uid: "" }]);

  useEffect(() => {
    const data = customerFields.map((item) => {
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
        title="Clientes"
        collection="customers"
      ></MaintenancesGridComponent>
    </Layout>
  );
};
