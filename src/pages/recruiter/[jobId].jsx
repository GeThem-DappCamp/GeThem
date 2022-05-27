import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import Candidates from "../../components/Candidates";
import next from "../../assets/images/next.svg";
import { useRouter } from "next/router";
import { useAccount, useContracts } from "../../contexts";
import AccountModal from "../../components/accountModal";

export default function JobDetails() {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const { gethemContract } = useContracts();
  const account = useAccount();

  useEffect(() => {
    const data = router.query;
    if (data) {
      setJob(data);
      setCandidates(JSON.parse(data.applications));
    }
  }, []);

  return (
    <div className="wrapper">
      <Menu index={0} />
      <div className="wrapper-container">
        {/* <div className="wrapper-header right">
          <Avatar onClick={() => setAccountShow(true)} />
        </div> */}
        <Link href={`/recruiter`}>
          <div className="wrapper-back">
            <Image src={next} alt="" />
            <a href="#">Back</a>
          </div>
        </Link>
        {job ? (
          <div className="wrapper-body">
            <div className="job-topBar">
              <h1>Job #{job.jobId}</h1>
              {/* <button>Close Job</button> */}
            </div>
            <div className="job-details">
              <p className="title">Company:</p>
              <p className="text">{job.name}</p>
            </div>
            <div className="job-details">
              <p className="title">Role:</p>
              <p className="text">{job.position}</p>
            </div>
            <div className="job-details">
              <p className="title">Sallary:</p>
              <p className="text">{job.name}</p>
            </div>
            <div className="job-details">
              <p className="title">Type:</p>
              <p className="text">{job.type}</p>
            </div>
            <div className="job-details job-details__description ">
              <p className="title">Description:</p>
              <p className="text">{job.details}</p>
            </div>
            <div className="job-details-candidates">
              <h1>Candidates</h1>

              <Candidates data={candidates} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
