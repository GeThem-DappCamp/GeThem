import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Menu from "../../components/Menu";
import Avatar from "../../components/Avatar";
import Referrals from "../../components/Referrals";
import AccountModal from "../../components/accountModal";
import Image from "next/image";
import trophy from "../../assets/images/trophy.svg";

export default function AllReferrals() {
  const [referrals, setReferrals] = useState([]);
  const [error, setError] = useState("");
  const { gethemContract } = useContracts();
  const [accountShow, setAccountShow] = useState(false);
  const [referrer_name, setName] = useState("");
  const [referrer_email, setEmail] = useState("");
  const [referrer_community, setCommunity] = useState("");
  const [referrer_score, setScore] = useState("0");
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
      setCommunity(referrer[2]);
      setScore(referrer[3].toString());
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const editAccount = async (name, email) => {
    try {
      setLoader(true);

      const isReferrer = await gethemContract.isReferrer(account);
      var transaction;
      if (isReferrer) {
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
      <Menu index={1} actorType="referrer" />
      <div className="wrapper-container">
        <div className="wrapper-header right">
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
        <div className="wrapper-body">
          <h1>Referrals</h1>
          <Referrals data={referrals} />
        </div>
      </div>
      <AccountModal
        current_email={referrer_email}
        current_name={referrer_name}
        current_community={referrer_community}
        showCommunityField={true}
        address={account}
        show={accountShow}
        onHide={() => setAccountShow(false)}
        onSave={(name_rec, email_rec, _company_rec, community_rec) => {
          editAccount(name_rec, email_rec, community_rec);
        }}
        loading={loader}
      />
    </div>
  );
}
