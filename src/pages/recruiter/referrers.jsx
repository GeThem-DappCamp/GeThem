import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContracts } from "../../contexts";
import Image from "next/image";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import user from "../../assets/images/user.svg";
import Referrers from "../../components/Referrers";

const REFERRERS = [
  {
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "Hanan Wahabi",
    score: 523,
    referrals: 23,
    email: "hanenouahabii@gmail.com",
  },
  {
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Saumo Pal",
    score: 429,
    referrals: 15,
    email: "Saumopal@gmail.com",
  },
  {
    image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    name: "Shravan",
    score: 213,
    referrals: 12,
    email: "Shravan@gmail.com",
  },
];
export default function TopReferrers() {
  return (
    <div className="wrapper">
      <Menu index={1} />
      <div className="wrapper-container">
        <div className="wrapper-header right">
          <Avatar image={user} />
        </div>
        <div className="wrapper-body">
          <h1>Top Referres</h1>
          <Referrers data={REFERRERS} />
        </div>
      </div>
    </div>
  );
}
