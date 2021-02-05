import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./UserPanel.module.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Badge } from "reactstrap";
import { Button } from "reactstrap";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function UsersTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [usersToShow, setUsersToShow] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const usersFetchNdSet = () => {
    axios
      .get("/api/admin/users")
      .then(({ data }) => {
        // console.log(data);
        setUsers(data);
        setUsersToShow(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filterUsers = (e) => {
    const type = e.target.value;
    if (type === "all") {
      setUsersToShow(users);
    } else if (type === "admins") {
      const admins = users.filter((user) => {
        return user.isAdmin;
      });
      setUsersToShow(admins);
    } else if (type === "users") {
      const nonAdmins = users.filter((user) => {
        return !user.isAdmin;
      });
      setUsersToShow(nonAdmins);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const name = e.target.firstChild.value.toLowerCase();
    const searchedUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(name);
    });
    setUsersToShow(searchedUsers);
  };

  const removeAdmin = (email) => {
    console.log("Remove", email);
    axios({
      method: "post",
      url: `/api/admin/deleteAdmin`,
      data: {
        email: email,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        usersFetchNdSet();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addAdmin = (email) => {
    console.log("Add", email);
    axios({
      method: "post",
      url: `/api/admin/createAdmin`,
      data: {
        email: email,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        usersFetchNdSet();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    usersFetchNdSet();
  }, []);

  return (
    <>
      <div className={styles.tableToolbar}>
        <form onSubmit={searchHandler}>
          <input type="text" autoFocus placeholder="Search User by Name" />
        </form>
        <select name="users" class={styles.filterUsers} onClick={filterUsers}>
          <option value="all">ALL</option>
          <option value="admins">ADMINS</option>
          <option value="users">USERS</option>
        </select>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#373535",
                      color: "#fff",
                      borderTopLeftRadius: "5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  style={{
                    backgroundColor: "#373535",
                    color: "#fff",
                    borderTopRightRadius: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersToShow
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  const adminStatus = user.isAdmin ? "ADMIN" : "USER";
                  const badgeColor = user.isAdmin ? "danger" : "success";
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user._id}
                    >
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "name" ? (
                              <h8>
                                {value}{" "}
                                <Badge color={badgeColor}>{adminStatus}</Badge>
                              </h8>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        {user.isAdmin ? (
                          <Button
                            outline
                            color="danger"
                            size="sm"
                            onClick={() => removeAdmin(user.email)}
                          >
                            Remove-Admin
                          </Button>
                        ) : (
                          <Button
                            outline
                            color="success"
                            size="sm"
                            onClick={() => addAdmin(user.email)}
                          >
                            Add-Admin
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={usersToShow.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
