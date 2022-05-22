import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Menu from "../../components/Menu";
import Job from "../../components/Job";
import plus from "../../assets/images/plus.svg";
import user from "../../assets/images/user.svg";
import Image from "next/image";
import Avatar from "../../components/Avatar";
import NewJobModal from "../../components/NewJobModal";
import { ethers } from "ethers";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Recruiter() {
  const [modalShow, setModalShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const account = useAccount();
  const { gethemContract } = useContracts();
  const router = useRouter();

  const getJobs = async (address) => {
    try {
      const recruiter_jobs = await gethemContract.getJobsByRecruiterAddress(
        address
      );
      setJobs(recruiter_jobs);
    } catch (e) {
      console.log("Couldnt't load jobs" + e);
      setError("Couldnt't load jobs " + e.message);
      setOpenSnack(true);
    }
  };

  const createJob = async (
    company_name,
    logo,
    details,
    salary,
    job_type,
    initTimestamp,
    amount
  ) => {
    setError(true);
    try {
      setError("");
      const options = {
        value: ethers.utils.formatUnits(amount.toString(), "wei"),
      };

      const transaction = await gethemContract.createJob(
        company_name,
        logo,
        details,
        salary,
        job_type,
        initTimestamp,
        amount,
        options
      );
      await transaction.wait();

      setTimeout(async () => {
        await getJobs(account);
        setModalShow(false);
      }, 2000);
    } catch (e) {
      console.log("Couldnt't create a job" + e.message);
      await setError("Couldnt't create a job " + e.message);
      setModalShow(false);

      setOpenSnack(true);
    }
    setError(false);
  };

  useEffect(() => {
    if (account) {
      getJobs(account);
    } else router.push(`/`);
  }, [account, jobs.length]);

  return (
    <div>
      <div className="home">
        <Menu index={0} />
        <div className="home-body">
          <div className="home-header right">
            <Avatar image={user} />
          </div>
          <div className="home-header">
            <h1>Open Jobs</h1>
            <button onClick={() => setModalShow(true)}>
              <Image src={plus} alt="" height={15} width={15} />
            </button>
          </div>
          {jobs.map((item, index) => {
            const secs = item[5].toString();
            const createdAt = timeAgo.format(new Date(parseInt(secs)));

            return (
              <Job
                jobId={index + 1}
                name={item[0]}
                logo={item[1]}
                position={item[2]}
                salary={item[3]}
                type={item[4]}
                time={createdAt}
                status={item[6].toString()}
                amount={item[7].toString()}
                candidatesIds={item[8]}
              />
            );
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

        {/* <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setOpenSnack(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </MuiAlert> */}
        <NewJobModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onSave={(name, logo, position, salary, type, amount) => {
            const time = Date.now();
            console.log("time now ========", time);

            createJob(name, logo, position, salary, type, time, amount);
          }}
        />
      </div>
    </div>
  );
}
