import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Avatar from "../../components/Avatar";
import AccountModal from "../../components/accountModal";
import CandidateJob from "../../components/CandidateJob";
import MenuCandidate from "../../components/MenuCandidate";

export default function History() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const { gethemContract } = useContracts();
  const [accountShow, setAccountShow] = useState(false);
  const [candidate_name, setName] = useState("");
  const [candidate_email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const account = useAccount();

  useEffect(() => {
    getCandidateInfo(account);
    getAppliedJobs();
  }, []);

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

      const isCandidate = await gethemContract.isCandidate(account);
      var transaction;
      if (isCandidate) {
        transaction = await gethemContract.editCandidate(name, email, company);
      } else {
        transaction = await gethemContract.createCandidate(
          name,
          email,
          company,
          account
        );
      }
      await transaction.wait();
      getCandidateInfo(account);
    } catch (e) {
      console.log("Couldnt't modify account " + e.message);

      await setError("Couldnt't modify account " + e.message);
    }
    setLoader(false);
    setAccountShow(false);
  };
  const getAppliedJobs = async () => {
    try {
      var applied_jobs = [];

      var result = await gethemContract.seeAllAppliedOrReferredJobs();
      console.log("seeAllAppliedOrReferredJobs", result);

      for (var i = 0; i <= result.length; i++) {
        if (result[i]) {
          const job = result[i]["job"];
          const application = result[i][1];

          var item = {
            company_name: job["company_name"],
            company_logo: job["company_logo"],
            job_title: job["job_title"],
            details: job["details"],
            salary: job["salary"],
            job_type: job["job_type"],
            hiringStatus: application["hiringStatus"],
            application_time:
              parseInt(application["initTimestamp"].toString()) * 1000,
          };

          applied_jobs.push(item);
        }
      }
      console.log("applied_jobs", applied_jobs);
      setJobs(applied_jobs);
    } catch (e) {
      console.log("Couldnt't load jobs" + e);
      setError("Couldnt't load jobs " + e.message);
    }
  };
  return (
    <div className="wrapper">
      <MenuCandidate index={1} />
      <div className="wrapper-container">
        <div className="home-header right">
          <Avatar onClick={() => setAccountShow(true)} />
        </div>

        <div className="home-body">
          {jobs.map((item) => {
            return <CandidateJob data={item} enabled={false} />;
          })}
        </div>
      </div>
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
  );
}
