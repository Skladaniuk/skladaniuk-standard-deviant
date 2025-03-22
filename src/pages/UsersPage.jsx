import styles from "./UsersPage.module.scss";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { UserListTable } from "../components/UsersListTable/UsersListTable";
import { ConfirmationWindow } from "../components/ConfirmationWindow/ConfirmationWindow";
import { useCallback } from "react";
export const UsersPage = () => {
  const { users, deleteUser } = useUserStore();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const onDelete = useCallback((id) => setConfirmDelete(id), []);

  const onConfirm = useCallback(() => {
    if (confirmDelete !== null) deleteUser(confirmDelete);
    setConfirmDelete(null);
  }, [confirmDelete, deleteUser]);

  return (
    <div className={styles.container}>
      <h1 style={{ color: "#1976d2" }}>Users</h1>
      <Button
        variant="contained"
        component={Link}
        to="/users/new"
        className={styles.createButton}
      >
        Create User
      </Button>
      <UserListTable users={users} onDelete={onDelete} />
      <ConfirmationWindow
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={onConfirm}
      />
    </div>
  );
};
