import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Menu from "../../components/Menu";
import Job from "../../components/Job";
import plus from "../../assets/images/plus.svg";
import Image from "next/image";
import Avatar from "../../components/Avatar";
import NewJobModal from "../../components/NewJobModal";
import { ethers } from "ethers";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import AccountModal from "../../components/accountModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Recruiter() {
  const [modalShow, setModalShow] = useState(false);
  const [accountShow, setAccountShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const account = useAccount();
  const { gethemContract } = useContracts();
  const router = useRouter();
  const [recruiter_name, setName] = useState("");
  const [recruiter_email, setEmail] = useState("");

  const getJobs = async (address) => {
    try {
      console.log("###### account", account);

      const isRecruiter = await gethemContract.isRecruiter(address);
      if (isRecruiter) {
        const result = await gethemContract.getJobsByAddress(address);
        const jobIds = Object.keys(result);
        var recruiter_jobs = [];
        for (var i = 0; i < jobIds.length; i++) {
          const job_id = parseInt(jobIds[i]);
          const applications = await gethemContract.getApplicationsForJob(
            job_id
          );
          const item = result[job_id];
          const secs = item[6].toString();

          recruiter_jobs.push({
            jobId: job_id,
            name: item[0],
            logo: item[1],
            position: item[2],
            details: item[3],
            salary: item[4],
            type: item[5],
            time: parseInt(secs) * 1000,
            status: item[7].toString(),
            amount: item[8][1] ? item[8][1].toString() : "10",
            candidatesIds: applications,
            recruiter_address: item[9],
          });
        }
        console.log("###### recruiter_jobs", recruiter_jobs);

        setJobs(recruiter_jobs);
      }
    } catch (e) {
      console.log("Couldnt't load jobs" + e);
      setError("Couldnt't load jobs " + e.message);
      setOpenSnack(true);
    }
  };

  const handleSaveJob = async (
    name,
    logo,
    position,
    details,
    salary,
    type,
    amount
  ) => {
    setLoader(true);

    //to consume isRecruiter function only when the jobs list is empty
    if (jobs.length == 0) {
      const isRecruiter = await gethemContract.isRecruiter(account);
      if (!isRecruiter) {
        console.log("##### create recruiter");
        const transaction = await gethemContract.createRecruiterAccount(
          account,
          "",
          ""
        );
        await transaction.wait();
      }

      await createJob(name, logo, position, details, salary, type, amount);
    } else {
      await createJob(name, logo, position, details, salary, type, amount);
    }
    setLoader(false);
  };

  const createJob = async (
    company_name,
    logo,
    title,
    details,
    salary,
    job_type,
    amount
  ) => {
    try {
      console.log("##### create job");

      setError("");
      const options = {
        value: ethers.utils.formatUnits(amount.toString(), "wei"),
      };

      const transaction = await gethemContract.createJobByRecruiter(
        company_name,
        logo,
        title,
        details,
        salary,
        job_type,
        amount,
        options
      );
      await transaction.wait();

      // setTimeout(async () => {
      await getJobs(account);
      setModalShow(false);
      // }, 2000);
    } catch (e) {
      console.log("Couldnt't create a job " + e.message);
      await setError("Couldnt't create a job " + e.message);
      setModalShow(false);

      setOpenSnack(true);
    }
    setLoader(false);
  };

  const editAccount = async (name, email) => {
    try {
      setLoader(true);

      const isRecruiter = await gethemContract.isRecruiter(account);
      var transaction;
      if (isRecruiter) {
        transaction = await gethemContract.editRecruiter(name, email);
      } else {
        transaction = await gethemContract.createRecruiterAccount(
          account,
          name,
          email
        );
      }
      await transaction.wait();
      getRecruiterInfo(account);
    } catch (e) {
      await setError("Couldnt't modify account " + e.message);
    }
    setLoader(false);
    setAccountShow(false);
  };
  const getRecruiterInfo = async (address) => {
    try {
      const recruiterId = await gethemContract.address_recruiterId(address);
      const recruiter = await gethemContract.recruiters(recruiterId);
      setName(recruiter[0]);
      setEmail(recruiter[1]);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    console.log("account", account);
    if (account) {
      getRecruiterInfo(account);
      getJobs(account);
    } else router.push(`/`);
  }, [account, jobs.length]);

  return (
    <div>
      <div className="home">
        <Menu index={0} />
        <div className="home-body">
          <div className="home-header right">
            <Avatar onClick={() => setAccountShow(true)} />
          </div>
          <div className="home-header">
            <h1>Open Jobs</h1>
            <button onClick={() => setModalShow(true)}>
              <Image src={plus} alt="" height={15} width={15} />
            </button>
          </div>
          {jobs.map((item, index) => {
            return <Job data={item} />;
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
        <NewJobModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onSave={(
            company_name,
            logo,
            title,
            details,
            salary,
            job_type,
            amount
          ) =>
            handleSaveJob(
              company_name,
              logo,
              title,
              details,
              salary,
              job_type,
              amount
            )
          }
          loading={loader}
        />
        <AccountModal
          current_email={recruiter_email}
          current_name={recruiter_name}
          address={account}
          show={accountShow}
          onHide={() => setAccountShow(false)}
          onSave={(name_rec, email_rec) => {
            editAccount(name_rec, email_rec);
          }}
          loading={loader}
        />
      </div>
    </div>
  );
}
