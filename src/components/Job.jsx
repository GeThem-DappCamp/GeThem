import Image from "next/image";
import { useRouter } from "next/router";
import brickseek from "../assets/images/brickseek.png";
import threecandidates from "../assets/images/candidates.svg";
import oneCandidate from "../assets/images/oneCandidate.svg";
import twoCandidate from "../assets/images/twoCandidate.svg";
import { useContext, useEffect, useState } from "react";
import { JobContext, LanguageContext } from "../contexts";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
export default function Job({ data }) {
  const [applications, setApplications] = useState([]);
  const {
    jobId,
    name,
    logo,
    position,
    details,
    salary,
    type,
    time,
    status,
    amount,
    candidates,
    recruiter_address,
    recruiter_name,
    recruiter_email,
  } = data;
  useEffect(() => {
    var applications_arr = [];
    candidates.map((item) =>
      applications_arr.push({
        candidate_name: item[0],
        referrer_name: item[1],
        candidate_company: item[2],
        applicationId: item[3].toString(),
        jobId: parseInt(item[4].toString()),
        hiring_status: item[5],
      })
    );
    setApplications(applications_arr);
  }, []);

  return (
    <Link
      href={{
        pathname: `recruiter/${jobId}`,
        query: {
          jobId,
          name,
          logo,
          position,
          details,
          salary,
          type,
          time,
          status,
          amount,
          applications: JSON.stringify(applications),
          recruiter_address,
          recruiter_name,
          recruiter_email,
        },
      }}
      as={`recruiter/${jobId}`}
    >
      <div className="job">
        <div className="job-logo">
          <Image
            src={logo}
            alt=""
            height={78}
            width={78}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="job-card">
          <div>
            <h1 className="job-title">Job #{jobId}</h1>
            <p className="job-subtitle">{name + " - " + position}</p>
            <div className="job-description">
              <p style={{ marginRight: "10px" }}>{salary}</p>
              <p>{type}</p>
            </div>
          </div>
          <div className="job-trailing">
            <p className="job-date">
              <ReactTimeAgo date={time} locale="en-US" />
            </p>
            <div className="job-candidates">
              {candidates.length > 0 ? (
                <Image
                  src={
                    candidates.length == 1
                      ? oneCandidate
                      : candidates.length == 2
                      ? twoCandidate
                      : threecandidates
                  }
                  alt=""
                />
              ) : null}
              {candidates.length == 1 ? (
                <p> {"1 candidate"}</p>
              ) : candidates.length <= 3 ? (
                <p> {candidates.length + " candidates"}</p>
              ) : (
                <p> {"+3 candidates"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
