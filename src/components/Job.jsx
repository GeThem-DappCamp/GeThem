import Image from "next/image";
import { useRouter } from "next/router";
import brickseek from "../assets/images/brickseek.png";
import candidates from "../assets/images/candidates.svg";
import oneCandidate from "../assets/images/oneCandidate.svg";
import twoCandidate from "../assets/images/twoCandidate.svg";
import TimeAgo from "javascript-time-ago";

export default function Job({
  jobId,
  name,
  logo,
  position,
  salary,
  type,
  time,
  status,
  amount,
  candidatesIds,
}) {
  const router = useRouter();

  return (
    <div className="job" onClick={() => router.push(`/recruiter/${jobId}`)}>
      <div className="job-logo">
        <Image
          src={brickseek}
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
            <p>{salary}</p>
            <p>{type}</p>
          </div>
        </div>
        <div className="job-trailing">
          <p className="job-date">{time}</p>
          <div className="job-candidates">
            {candidatesIds.length > 0 ? (
              <Image
                src={
                  candidatesIds.length == 1
                    ? oneCandidate
                    : candidatesIds.length == 2
                    ? twoCandidate
                    : candidates
                }
                alt=""
              />
            ) : null}
            {candidatesIds.length == 1 ? (
              <p> {"1 candidate"}</p>
            ) : candidatesIds.length <= 3 ? (
              <p> {candidatesIds.length + " candidates"}</p>
            ) : (
              <p> {"+3 candidates"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
