import Image from "next/image";
import { useRouter } from "next/router";
import brickseek from "../assets/images/brickseek.png";
import candidates from "../assets/images/candidates.svg";

export default function Job({ jobId }) {
  const router = useRouter();

  return (
    <div className="job" onClick={() => router.push(`/recruiter/${jobId}`)}>
      <div className="job-logo">
        <Image
          src={brickseek}
          alt=""
          height={78}
          width={78}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className="job-card">
        <div>
          <h1 className="job-title">Job #1233</h1>
          <p className="job-subtitle">BrickSeek - Front End Developer</p>
          <div className="job-description">
            <p>$80k - $100k</p>
            <p>Remote</p>
          </div>
        </div>
        <div className="job-trailing">
          <p className="job-date">3 days ago</p>
          <div className="job-candidates">
            <Image src={candidates} alt="" />
            <p>+3 candidates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
