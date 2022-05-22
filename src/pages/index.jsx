import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../contexts";
import { connectWallet, getCurrentAccount } from "../utils/common";
import { useRouter } from "next/router";
import recruiter from "../assets/images/recruiter.svg";
import candidate from "../assets/images/candidate.svg";
import referrer from "../assets/images/referrer.svg";
import Image from "next/image";

export default function Home() {
  const account = useAccount();
  const router = useRouter();

  useEffect(async () => {
    await getCurrentAccount();
  }, [account]);

  const connect = async (user) => {
    try {
      await connectWallet();
      router.push(`/${user}`);
    } catch (error) {
      console.log(" connect", error);
    }
  };
  return (
    <div className="users">
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
