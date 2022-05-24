import Image from "next/image";
import { useRouter } from "next/router";
import brickseek from "../assets/images/brickseek.png";
import candidates from "../assets/images/candidates.svg";
import oneCandidate from "../assets/images/oneCandidate.svg";
import twoCandidate from "../assets/images/twoCandidate.svg";
import { useContext, useState } from "react";
import { JobContext, LanguageContext } from "../contexts";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
export default function Job({
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
  candidatesIds,
  recruiter_address,
  recruiter_name,
  recruiter_email,
}) {
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
            <p className="job-date">
              <ReactTimeAgo date={time} locale="en-US" />
            </p>
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
    </Link>
  );
}
