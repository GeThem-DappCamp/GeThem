import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContracts } from "../../contexts";
import Image from "next/image";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import Candidates from "../../components/Candidates";
import next from "../../assets/images/next.svg";
import user from "../../assets/images/user.svg";
const CANDIDATES = [
  {
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "Hanan Wahabi",
    referrer: "Adam Hsd",
    company: "Microsoft",
    status: "Accepted",
  },
  {
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Saumo Pal",
    referrer: "Adam Hsd",
    company: "Uber",
    status: "Round 1",
  },
];

export default function JobDetails() {
  return (
    <div className="wrapper">
      <Menu index={0} />
      <div className="wrapper-container">
        <div className="wrapper-header right">
          <Avatar image={user} />
        </div>
        <Link href={`/recruiter`}>
          <div className="wrapper-back">
            <Image src={next} alt="" />
            <a href="#">Back</a>
          </div>
        </Link>
        <div className="wrapper-body">
          <div className="job-topBar">
            <h1>Job #1233</h1>
            <button>Close Job</button>
          </div>
          <div className="job-details">
            <p className="title">Company:</p>
            <p className="text">BrickSeek</p>
          </div>
          <div className="job-details">
            <p className="title">Role:</p>
            <p className="text">Front End Developer</p>
          </div>
          <div className="job-details">
            <p className="title">Sallary:</p>
            <p className="text">$80 k- $100k</p>
          </div>
          <div className="job-details">
            <p className="title">Type:</p>
            <p className="text">Remote</p>
          </div>
          <div className="job-details job-details__description ">
            <p className="title">Description:</p>
            <p className="text">
              we are in the mid to late stages of building our platform. The
              platform will underpin our future growth, and this presents us
              with a whole host of technical challenges: Ensuring that the code
              we implement scales. Ensuring that application and data security
              concerns are at the heart of everything we build.
            </p>
          </div>
          <div className="job-details-candidates">
            <h1>Candidates</h1>
            <Candidates data={CANDIDATES} />
          </div>
        </div>
      </div>
    </div>
  );
}
