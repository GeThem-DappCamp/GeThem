import React, { useEffect, useState } from "react";
import { useAccount, useContracts } from "../../contexts";
import Menu from "../../components/Menu";
import Job from "../../components/Job";
import plus from "../../assets/images/plus.svg";
import user from "../../assets/images/user.svg";
import Image from "next/image";
import Avatar from "../../components/Avatar";
import NewJobModal from "../../components/NewJobModal";

export default function Recruiter() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <div className="home">
        <Menu index={0} />
        <div className="home-body">
          <div className="home-header right">
            <Avatar image={user} />
          </div>
          <div className="home-header">
            <h1>Open Jobs</h1>
            <button onClick={() => setModalShow(true)}>
              <Image src={plus} alt="" height={15} width={15} />
            </button>
          </div>
          <Job jobId={0} />
          <Job jobId={1} />
        </div>
        <NewJobModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onSave={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}
