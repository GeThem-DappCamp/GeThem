import Image from "next/image";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { getStatus } from "../utils/common";
import moment from "moment";
import Link from "next/link";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function ReferrerJob({ data, enabled }) {
  const {
    jobId,
    company_name,
    company_logo,
    job_title,
    details,
    salary,
    job_type,
    hiringStatus,
    application_time,
    time,
  } = data;
  return (
    <Link
      href={
        enabled
          ? {
              pathname: `referrer/${jobId}`,
              query: { data: JSON.stringify(data) },
            }
          : { pathname: "#" }
      }
      as={enabled ? `referrer/${jobId}` : "#"}
    >
      <div className="job">
        <div className="job-logo">
          <Image
            src={company_logo}
            alt=""
            height={78}
            width={78}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="job-card">
          <div>
            <h1 className="job-title">{company_name}</h1>
            <p className="job-subtitle">{job_title}</p>
            <div className="job-description history-decription">
              <p className="job-type">{job_type}</p>
              <p>{salary}</p>
            </div>
          </div>
          <div className="job-trailing job-history">
            <p className="job-date job-status">
              {time ? (
                <p className="job-date">
                  <ReactTimeAgo date={time} locale="en-US" />
                </p>
              ) : (
                <div className={"status " + getStatus(hiringStatus)}>
                  <p>{getStatus(hiringStatus)}</p>
                </div>
              )}
            </p>
            <div className="job-candidates">
              {application_time && (
                <p>
                  {"Applied on " +
                    moment(new Date(application_time)).format("DD-MM-YYYY")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
