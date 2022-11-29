import AdminLayout from "@layouts/Admin/index";
import { selectAuth } from "@store/Slices/securitySlice";
import { useSelector, useStore } from "react-redux";
import { SecState } from "@store/Slices/securitySlice";

const EjemploAdmin = () => {
  const user = useSelector(selectAuth);
  console.log(user);
  //const store = useStore();
  //console.log(store);
  return (
    <>
      <AdminLayout>
        <h1>Esto es ejemplo de admin layout</h1>
      </AdminLayout>
    </>
  );
};

export default EjemploAdmin;
