import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import NewJobModal from "../../components/NewJobModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import AccountModal from "../../components/accountModal";
import ReferrerJob from "../../components/ReferrerJob";
import Image from "next/image";
import trophy from "../../assets/images/trophy.svg";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Referrer() {
  const [modalShow, setModalShow] = useState(false);
  const [accountShow, setAccountShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const account = useAccount();
  const { gethemContract } = useContracts();
  const router = useRouter();
  const [referrer_name, setName] = useState("");
  const [referrer_email, setEmail] = useState("");
  const [referrer_community, setCommunity] = useState("");
  const [referrer_score, setScore] = useState("0");

  const getOpenJobs = async () => {
    try {
      const result = await gethemContract.getAllOpenJobs();

      var open_jobs = [];
      for (var i = 0; i < result.length; i++) {
        const job_id = parseInt(result[i]["jobId"].toString());
        const item = result[i]["jobStructure"];
        console.log(" => jobId =>>", job_id, "=>", item);

        const title = item[2];
        if (title != "") {
          const secs = item[6].toString();

          open_jobs.push({
            jobId: job_id,
            company_name: item[0],
            company_logo: item[1],
            job_title: item[2],
            details: item[3],
            salary: item[4],
            job_type: item[5],
            time: parseInt(secs) * 1000,
            hiringStatus: item[7].toString(),
            amount: item[8][1] ? item[8][1].toString() : "10",
            recruiter_address: item[9],
          });
        }
      }
      setJobs(open_jobs);
    } catch (e) {
      console.log("Couldnt't load jobs" + e);
      setError("Couldnt't load jobs " + e.message);
      setOpenSnack(true);
    }
  };

  const editAccount = async (name, email, community) => {
    try {
      setLoader(true);

      const isReferrer = await gethemContract.isReferrer(account);
      console.log("here", name, email, community, isReferrer);
      var transaction;
      if (isReferrer) {
        transaction = await gethemContract.editReferrer(name, email, community);
      } else {
        console.log("here?");
        transaction = await gethemContract.createReferrer(
          name,
          email,
          community
        );
      }
      console.log("here again?");
      await transaction.wait();
      getReferrerInfo(account);
    } catch (e) {
      await setError("Couldnt't modify account " + e.message);
    }
    setLoader(false);
    setAccountShow(false);
  };
  const getReferrerInfo = async (address) => {
    try {
      const referrerId = await gethemContract.address_referrerId(address);
      const referrer = await gethemContract.referrers(referrerId);
      setName(referrer[0]);
      setEmail(referrer[1]);
      setCommunity(referrer[2]);
      setScore(referrer[3].toString());
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    console.log("account", account);
    if (account) {
      getReferrerInfo(account);
      getOpenJobs(account);
    } else router.push(`/`);
  }, [account, jobs.length]);

  return (
    <div>
      <div className="home">
        <Menu index={0} actorType="referrer" />
        <div className="home-body">
          <div className="home-header right">
            <div style={{ marginRight: "60px", position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "10px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "2",
                  borderColor: "black",
                  borderWidth: "1",
                  color: "black",
                }}
              >
                {referrer_score}
              </span>
              <Image src={trophy} />
            </div>
            <Avatar onClick={() => setAccountShow(true)} />
          </div>
          <div className="home-header">
            <h1>Open Jobs</h1>
          </div>
          {jobs.map((item, index) => {
            return <ReferrerJob key={index} data={item} enabled={true} />;
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
          onHide={() => {
            setLoader(false);
            setModalShow(false);
          }}
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
          current_email={referrer_email}
          current_name={referrer_name}
          current_community={referrer_community}
          showCommunityField={true}
          address={account}
          show={accountShow}
          onHide={() => {
            setLoader(false);
            setAccountShow(false);
          }}
          onSave={(name_rec, email_rec, _company_rec, community_rec) => {
            editAccount(name_rec, email_rec, community_rec);
          }}
          loading={loader}
        />
      </div>
    </div>
  );
}
