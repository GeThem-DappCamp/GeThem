import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@nextui-org/react";
import { MenuItem, Select } from "@material-ui/core";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { useContracts } from "../contexts";
import { CircularProgress } from "@mui/material";

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
  const [hiringStatus, setHiringStatus] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedApplication, setSelectedApp] = useState(null);
  const { gethemContract } = useContracts();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    var status_arr = [];
    data.map((item) => status_arr.push(item.hiring_status));
    setHiringStatus(status_arr);
  }, []);

  const handleValidated = async () => {
    setLoader(true);
    try {
      const { index, round, applicationId, jobId, status } =
        selectedApplication;

      await gethemContract.changeCandidateState(
        status,
        parseInt(applicationId.toString()),
        jobId
      );
      var hstatus = hiringStatus.splice();
      hstatus[index] = status;

      setHiringStatus([...hstatus]);
    } catch (error) {
      console.log("Couldn't update candidate status", error.message);
    }
    setLoader(false);
    setShowAlert(false);
  };

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
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Referrer</StyledTableCell>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell>Hiring</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length == 0 ? (
            <p>No candidates</p>
          ) : (
            data.map(
              (
                {
                  candidate_name,
                  referrer_name,
                  candidate_company,
                  applicationId,
                  jobId,
                  hiring_status,
                },
                index
              ) => (
                <StyledTableRow key={applicationId}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar
                      className="candidate-avatar"
                      src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {candidate_name}
                  </StyledTableCell>
                  <StyledTableCell>{referrer_name}</StyledTableCell>
                  <StyledTableCell>{candidate_company}</StyledTableCell>
                  <StyledTableCell>
                    <div className={"status " + getStatus(hiringStatus[index])}>
                      <p>{getStatus(hiringStatus[index])}</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={hiringStatus[index]}
                      onChange={(e) => {
                        setSelectedApp({
                          index,
                          name: candidate_name,
                          status: parseInt(e.target.value),
                          round: getStatus(parseInt(e.target.value)),
                          applicationId,
                          jobId,
                        });
                        setShowAlert(true);
                      }}
                      class="candidate-dropdown"
                    >
                      <option value={0} disabled={hiringStatus[index] > 0}>
                        Pending
                      </option>
                      <option value={1} disabled={hiringStatus[index] > 1}>
                        Round 1
                      </option>
                      <option value={2} disabled={hiringStatus[index] > 2}>
                        Round 2
                      </option>
                      <option value={3} disabled={hiringStatus[index] > 3}>
                        Accept
                      </option>
                      <option value={4}>Reject</option>
                    </select>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )
          )}
        </TableBody>
      </Table>
      {showAlert && (
        <div className="candidate-popup">
          <Alert show={showAlert} variant="inherit">
            <Alert.Heading>
              {"Are you sure about updating " +
                selectedApplication.name +
                "'s application status to " +
                selectedApplication.round +
                " ?"}
            </Alert.Heading>

            <div className="d-flex justify-content-end">
              <Button
                onClick={() => setShowAlert(false)}
                variant="outline-secondary"
              >
                Cancel
              </Button>

              <Button onClick={() => handleValidated()} variant="primary">
                {loader ? (
                  <CircularProgress color="inherit" size={"25px"} />
                ) : (
                  "Yes !"
                )}
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </TableContainer>
  );
}
