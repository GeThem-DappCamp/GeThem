import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import next from "../../assets/images/next.svg";
import { useRouter } from "next/router";
import ReferModal from "../../components/ReferModal";
import MuiAlert from "@mui/material/Alert";
import { useContracts } from "../../contexts";
import Menu from "../../components/Menu";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} severity="success" {...props} />;
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

  const referToJob = async (jobId, name, email, company, address) => {
    setLoader(true);
    try {
      const transaction = await gethemContract.referCandidate(
        name,
        email,
        company,
        address,
        parseInt(jobId)
      );
      await transaction.wait();
      setSuccess(
        "Your application has been sent to the recruiter successfully!"
      );
    } catch (error) {
      console.log("Couldnt't refer to job" + error);
      setError("Couldnt't  refer to job " + error.message);
    }
    setLoader(false);
    setModalShow(false);
  };
  return (
    <div className="wrapper">
      <Menu index={0} actorType="referrer" />
      <div className="wrapper-container">
        <Link href={`/referrer`}>
          <div className="wrapper-back">
            <Image src={next} alt="" />
            <a href="#">Back</a>
          </div>
        </Link>
        {job ? (
          <div className="wrapper-body">
            <div className="job-topBar">
              <h1>Job #{job.jobId}</h1>
              <button onClick={() => setModalShow(true)}>Refer</button>
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
        <ReferModal
          show={modalShow}
          onHide={() => {
            setLoader(false);
            setModalShow(false);
          }}
          onSave={(name, email, company, address) =>
            referToJob(job.jobId, name, email, company, address)
          }
          loading={loader}
        />
      </div>
    </div>
  );
}
