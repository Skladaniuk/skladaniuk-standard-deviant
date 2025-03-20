import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { UserTable } from "../components/userTables/userTables";
import { ConfirmationWindow } from "../components/confirmationWindow/confirmationWindow";
export const UsersPage = () => {
  const { users, fetchUsers, deleteUser } = useUserStore();
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  console.log("----", users);
  return (
    <div>
      <h1>Users</h1>
      <Button
        variant="contained"
        component={Link}
        to="/users/new"
        style={{ marginBottom: 16 }}
      >
        Create User
      </Button>
      <UserTable users={users} onDelete={(id) => setConfirmDelete(id)} />
      <ConfirmationWindow
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (confirmDelete !== null) deleteUser(confirmDelete);
          setConfirmDelete(null);
        }}
      />
    </div>
  );
};
