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

export default function Referrals({ data }) {
  const getStatus = (value) => {
    switch (value) {
      case 0:
        return "Waiting";
        break;
      case 1:
        return "Round 1";
        break;
      case 2:
        return "Round 2";
        break;
      case 3:
        return "Accepted";
        break;
      default:
        return "Rejected";
        break;
    }
  };

  return (
    <TableContainer>
      <Table className="candidates-table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Referrer</StyledTableCell>
            <StyledTableCell align="center">Referred To</StyledTableCell>
            <StyledTableCell align="center">Hiring Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow>
              <StyledTableCell align="center" component="th" scope="row">
                <Avatar className="candidate-avatar" src={item.image} />
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {item.candidate_name}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {item.referrer_name}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {item.referred_company}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                <div className={"status " + getStatus(item.hiring_status)}>
                  <p>{getStatus(item.hiring_status)}</p>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
