import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { useAccount, useContracts } from "../../contexts";
// import Image from "next/image";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
// import user from "../../assets/images/user.svg";
import Referrals from "../../components/Referrals";
import AccountModal from "../../components/accountModal";

export default function AllReferrals() {
  const [referrals, setReferrals] = useState([]);
  const [error, setError] = useState("");
  const { gethemContract } = useContracts();
  const [accountShow, setAccountShow] = useState(false);
  const [referrer_name, setName] = useState("");
  const [referrer_email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const account = useAccount();

  useEffect(() => {
    getReferrerInfo(account);
    getReferrals();
  }, []);
  const sortByStatus = (items) =>
    [...items]
      .sort((itemA, itemB) => itemA.hiring_status - itemB.hiring_status)
      .reverse();

  const getReferrerInfo = async (address) => {
    try {
      const referrerId = await gethemContract.address_referrerId(address);
      const referrer = await gethemContract.referrers(referrerId);
      setName(referrer[0]);
      setEmail(referrer[1]);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const editAccount = async (name, email) => {
    try {
      setLoader(true);

      const isReferrer = await gethemContract.isReferrer(account);
      var transaction;
      if (isRecruiter) {
        transaction = await gethemContract.editReferrer(name, email);
      } else {
        transaction = await gethemContract.createReferrer(account, name, email);
      }
      await transaction.wait();
      getReferrerInfo(account);
    } catch (e) {
      await setError("Couldnt't modify account " + e.message);
    }
    setLoader(false);
    setAccountShow(false);
  };

  const getReferrals = async () => {
    try {
      var referrals_arr = [];

      var referrals_out = await gethemContract.listOfReferrals();
      console.log("referrals_out=============================", referrals_out);

      for (var i = 0; i < referrals_out.length; i++) {
        var referral = referrals_out[i];
        var referral_in = {
          candidate_name: referral.candidate_name,
          referrer_name: referral.referrer_name,
          referred_company: referral.referred_company,
          hiring_status: referral.hiring_status,
        };
        referrals_arr.push(referral_in);
      }

      referrals_arr = sortByStatus(referrals_arr);

      console.log("referrals_arr=============================", referrals_arr);

      setReferrals(referrals_arr);
    } catch (e) {
      console.log("Couldnt't load referrals" + e);
      setError("Couldnt't load referrals " + e.message);
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
          <h1>Referrals</h1>
          <Referrals data={referrals} />
        </div>
      </div>
      <AccountModal
        current_email={referrer_email}
        current_name={referrer_name}
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
