import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Avatar from "../../components/Avatar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import AccountModal from "../../components/accountModal";
import MenuCandidate from "../../components/MenuCandidate";
import CandidateJob from "../../components/CandidateJob";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Candidate() {
  const { gethemContract } = useContracts();
  const [modalShow, setModalShow] = useState(false);
  const [accountShow, setAccountShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [candidate_name, setName] = useState("");
  const [candidate_email, setEmail] = useState("");
  const account = useAccount();
  const router = useRouter();

  const getOpenJobs = async () => {
    try {
      const result = await gethemContract.getAllOpenJobs();

      var open_jobs = [];
      for (var i = 0; i < result.length; i++) {
        const job_id = parseInt(result[i]["jobId"].toString());
        const item = result[i]["jobStructure"];
        console.log(" => jobId =>>", job_id, "=>", item);

        const title = item[2];
        if (title != "") {
          const secs = item[6].toString();

          open_jobs.push({
            jobId: job_id,
            company_name: item[0],
            company_logo: item[1],
            job_title: item[2],
            details: item[3],
            salary: item[4],
            job_type: item[5],
            time: parseInt(secs) * 1000,
            hiringStatus: item[7].toString(),
            amount: item[8][1] ? item[8][1].toString() : "10",
            recruiter_address: item[9],
          });
        }
      }
      setJobs(open_jobs);
    } catch (e) {
      console.log("Couldnt't load jobs" + e);
      setError("Couldnt't load jobs " + e.message);
      setOpenSnack(true);
    }
  };

  const getCandidateInfo = async (address) => {
    try {
      const candidateId = await gethemContract.address_candidateId(address);
      const candidate = await gethemContract.candidates(candidateId);
      setName(candidate[0]);
      setEmail(candidate[1]);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const editAccount = async (name, email, company) => {
    try {
      setLoader(true);

      // const isCandidate = await gethemContract.isCandidate(account);
      var transaction;
      // if (isCandidate) {
      //   transaction = await gethemContract.editCandidate(name, email, company);
      // } else {
      transaction = await gethemContract.createCandidate(
        name,
        email,
        company,
        account
      );
      // }
      await transaction.wait();
      getCandidateInfo(account);
    } catch (e) {
      console.log("Couldnt't modify account " + e.message);

      await setError("Couldnt't modify account " + e.message);
    }
    setLoader(false);
    setAccountShow(false);
  };

  useEffect(() => {
    console.log("account", account);

    if (account) {
      getCandidateInfo(account);
      getOpenJobs();
    } else router.push(`/`);
  }, [account, jobs.length]);

  return (
    <div>
      <div className="home">
        <MenuCandidate index={0} />
        <div className="home-body">
          <div className="home-header right">
            <Avatar onClick={() => setAccountShow(true)} />
          </div>
          <div className="home-header">
            <h1>Open Jobs</h1>
            {/* <button onClick={() => setModalShow(true)}>
              <Image src={plus} alt="" height={15} width={15} />
            </button> */}
          </div>
          {jobs.map((job) => {
            console.log("Candidate job", job);
            return <CandidateJob data={job} enabled={true} />;
          })}
        </div>
        <Snackbar
          open={openSnack}
          autoHideDuration={8000}
          onClose={() => setOpenSnack(false)}
          message={error}
          severity="error"
        >
          <Alert
            onClose={() => setOpenSnack(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>

        <AccountModal
          current_email={candidate_email}
          current_name={candidate_name}
          address={account}
          show={accountShow}
          showCompanyField={true}
          onHide={() => setAccountShow(false)}
          onSave={(name_rec, email_rec, company) => {
            editAccount(name_rec, email_rec, company);
          }}
          loading={loader}
        />
      </div>
    </div>
  );
}
