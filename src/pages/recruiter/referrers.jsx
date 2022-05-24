import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useContracts } from "../../contexts";
import Image from "next/image";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import user from "../../assets/images/user.svg";
import Referrers from "../../components/Referrers";
import AccountModal from "../../components/accountModal";

export default function TopReferrers() {
  const [referrers, setReferrers] = useState([]);
  const [error, setError] = useState("");
  const { gethemContract } = useContracts();
  const [accountShow, setAccountShow] = useState(false);
  const [recruiter_name, setName] = useState("");
  const [recruiter_email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const account = useAccount();

  useEffect(() => {
    getRecruiterInfo(account);
    getReferrers();
  }, []);
  const sortByScore = (items) =>
    [...items].sort((itemA, itemB) => itemA.score - itemB.score).reverse();

  const getRecruiterInfo = async (address) => {
    try {
      const recruiterId = await gethemContract.address_recruiterId(address);
      const recruiter = await gethemContract.recruiters(recruiterId);
      setName(recruiter[0]);
      setEmail(recruiter[1]);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const editAccount = async (name, email) => {
    try {
      setLoader(true);

      const isRecruiter = await gethemContract.isRecruiter(account);
      var transaction;
      if (isRecruiter) {
        transaction = await gethemContract.editRecruiter(name, email);
      } else {
        transaction = await gethemContract.createRecruiterAccount(
          account,
          name,
          email
        );
      }
      await transaction.wait();
      getRecruiterInfo(account);
    } catch (e) {
      await setError("Couldnt't modify account " + e.message);
    }
    setLoader(false);
    setAccountShow(false);
  };
  const getReferrers = async () => {
    try {
      var referrer_arr = [];

      var referrerCount = await gethemContract.referrerCount();
      referrerCount = parseInt(referrerCount.toString());

      for (var i = 1; i <= referrerCount; i++) {
        var referrer = await gethemContract.referrers(i);
        referrer = {
          image: "",
          name: referrer[0],
          score: Math.floor(Math.random() * 10),
          //referrer[3].toString(),
          referrals: referrer[4].toString(),
          email: referrer[1],
        };

        referrer_arr.push(referrer);
      }
      referrer_arr = sortByScore(referrer_arr);

      setReferrers(referrer_arr);
    } catch (e) {
      console.log("Couldnt't load referrers" + e);
      setError("Couldnt't load referrers " + e.message);
    }
  };
  return (
    <div className="wrapper">
      <Menu index={1} />
      <div className="wrapper-container">
        <div className="wrapper-header right">
          <Avatar onClick={() => setAccountShow(true)} />
        </div>
        <div className="wrapper-body">
          <h1>Top Referrers</h1>
          <Referrers data={referrers} />
        </div>
      </div>
      <AccountModal
        current_email={recruiter_email}
        current_name={recruiter_name}
        address={account}
        show={accountShow}
        onHide={() => setAccountShow(false)}
        onSave={(name_rec, email_rec) => {
          editAccount(name_rec, email_rec);
        }}
        loading={loader}
      />
    </div>
  );
}
