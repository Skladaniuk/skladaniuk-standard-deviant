import styles from "./UserListTable.module.scss";
import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export const UserListTable = memo(({ users, onDelete }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className={styles.tableRow}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/users/edit/${user.id}`}
                  variant="contained"
                  color="primary"
                  className={styles.editButton}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(user.id)}
                  variant="contained"
                  color="error"
                  className={styles.deleteButton}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
