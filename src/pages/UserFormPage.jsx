import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { UserForm } from "../components/UserForm/UserForm";

export const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, addUser, updateUser } = useUserStore();
  const user = users.find((u) => u.id === Number(id));

  const handleSubmit = (data) => {
    if (id) {
      updateUser(id, data);
    } else {
      addUser(data);
    }
    navigate("/users");
  };

  return (
    <div>
      <h1 style={{ color: "#1976d2" }}>{id ? "Edit User" : "Create User"}</h1>
      <UserForm initialValues={user} onSubmit={handleSubmit} />
    </div>
  );
};
