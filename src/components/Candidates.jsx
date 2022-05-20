import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@nextui-org/react";
import { MenuItem, Select } from "@material-ui/core";

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

export default function Candidates({ data }) {
  return (
    <TableContainer>
      <Table className="candidates-table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Referrer</StyledTableCell>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell>Hiring</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ image, name, referrer, company, status }) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <Avatar className="candidate-avatar" src={image} />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {name}
              </StyledTableCell>
              <StyledTableCell>{referrer}</StyledTableCell>
              <StyledTableCell>{company}</StyledTableCell>
              <StyledTableCell>
                <div className={"status " + status}>
                  <p>{status}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={status}
                  // onChange={handleChange}
                  className="candidate-dropdown"
                >
                  <MenuItem value="Waiting">Pending</MenuItem>
                  <MenuItem value={"Round 1"}>Round 1</MenuItem>
                  <MenuItem value={"Round 2"}>Round 2</MenuItem>
                  <MenuItem value={"Accepted"}>Accept</MenuItem>
                  <MenuItem value={"Rejected"}>Reject</MenuItem>
                </Select>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
