import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@nextui-org/react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#162844",
    color: "#DEE1E5",
    fontSize: 15,
    fontWeight: 200,
  },
  body: {
    fontSize: 16,
    backgroundColor: "#213656",
    color: "white",
    borderBottomWidth: 16,
    borderBottomColor: "#162844",
  },
  root: { borderBottomColor: "#162844" },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Referrers({ data }) {
  return (
    <TableContainer>
      <Table className="candidates-table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Score</StyledTableCell>
            <StyledTableCell align="center">Referrals</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow>
              <StyledTableCell align="center" component="th" scope="row">
                <Avatar className="candidate-avatar" src={item.image} />
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="center">{item.score}</StyledTableCell>
              <StyledTableCell align="center">{item.referrals}</StyledTableCell>
              <StyledTableCell align="center">{item.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
