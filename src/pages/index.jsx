import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../contexts";
import { connectWallet, getCurrentAccount } from "../utils/common";
import { useRouter } from "next/router";
import recruiter from "../assets/images/recruiter.svg";
import candidate from "../assets/images/candidate.svg";
import referrer from "../assets/images/referrer.svg";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

export default function Home(props) {
  const account = useAccount();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (account) {
      setLoader(false);
    }
  }, [account]);

  const connect = async (user) => {
    setLoader(true);
    try {
      await connectWallet();
      props.onConnect((currentAccount) => {
        if (currentAccount) {
          // setLoader(false);

          router.push(`/${user}`);
        }
      });
    } catch (error) {
      setLoader(false);

      console.log("error while connecting", error);
    }
  };
  return (
    <div className="users">
      {loader && (
        <div className="users-loader">
          <CircularProgress color="inherit" size={"40px"} />
        </div>
      )}
      <div className="users-card" onClick={() => connect("referrer")}>
        <Image src={referrer} alt="" />
        <p>REFERRER</p>
      </div>
      <div className="users-card" onClick={() => connect("recruiter")}>
        <Image src={recruiter} alt="" />
        <p>RECRUITER</p>
      </div>
      <div className="users-card" onClick={() => connect("candidate")}>
        <Image src={candidate} alt="" />
        <p>CANDIDATE</p>
      </div>
    </div>
  );
}
