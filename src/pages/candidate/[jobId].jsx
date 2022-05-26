import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import next from "../../assets/images/next.svg";
import { useRouter } from "next/router";
import ApplyModal from "../../components/ApplyModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useContracts } from "../../contexts";
import MenuCandidate from "../../components/MenuCandidate";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      // variant="filled"
      severity="success"
      {...props}
    />
  );
});

export default function JobDetails() {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const { gethemContract } = useContracts();

  useEffect(() => {
    const { data } = router.query;
    if (data) {
      setJob(JSON.parse(data));
    }
  }, []);
  const ApplyToJob = async (
    jobId,
    yearsOfExperience,
    skillsets,
    currentPosition,
    linkedinProfile
  ) => {
    setLoader(true);
    try {
      // const isCandidate = await gethemContract.isCandidate(account);
      // if (!isCandidate) {
      //   const transaction = await gethemContract.createCandidate(
      //     "",
      //     "",
      //     "",
      //     account
      //   );
      //   await transaction.wait();
      // }
      const transaction = await gethemContract.applyToJob(
        parseInt(jobId),
        parseInt(yearsOfExperience),
        skillsets,
        currentPosition,
        linkedinProfile
      );
      await transaction.wait();
      setSuccess(
        "Your application has been sent to the recruiter successfully!"
      );
    } catch (error) {
      console.log("Couldnt't apply to job" + error);
      setError("Couldnt't  apply to job " + error.message);
    }

    setLoader(false);
    setModalShow(false);
  };
  return (
    <div className="wrapper">
      <MenuCandidate index={0} />
      <div className="wrapper-container">
        <Link href={`/candidate`}>
          <div className="wrapper-back">
            <Image src={next} alt="" />
            <a href="#">Back</a>
          </div>
        </Link>
        {job ? (
          <div className="wrapper-body">
            <div className="job-topBar">
              <h1>Job #{job.jobId}</h1>
              <button onClick={() => setModalShow(true)}>Apply </button>
            </div>
            <div className="job-details">
              <p className="title">Company:</p>
              <p className="text">{job.company_name}</p>
            </div>
            <div className="job-details">
              <p className="title">Role:</p>
              <p className="text">{job.job_title}</p>
            </div>
            <div className="job-details">
              <p className="title">Sallary:</p>
              <p className="text">{job.salary}</p>
            </div>
            <div className="job-details">
              <p className="title">Type:</p>
              <p className="text">{job.job_type}</p>
            </div>
            <div className="job-details job-details__description ">
              <p className="title">Description:</p>
              <p className="text">{job.details}</p>
            </div>
          </div>
        ) : null}
        {success && (
          <Alert
            className="success-alert"
            onClose={() => setSuccess(null)}
            severity="success"
            sx={{ width: "50%" }}
          >
            {success}
          </Alert>
        )}
        <ApplyModal
          show={modalShow}
          onHide={() => {
            setLoader(false);
            setModalShow(false);
          }}
          onSave={(
            yearsOfExperience,
            skillsets,
            currentPosition,
            linkedinProfile
          ) =>
            ApplyToJob(
              job.jobId,
              yearsOfExperience,
              skillsets,
              currentPosition,
              linkedinProfile
            )
          }
          loading={loader}
        />
      </div>
    </div>
  );
}
