import Image from "next/image";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useAccount } from "../contexts";

export default function Avatar({ onClick }) {
  const account = useAccount();

  return (
    <>
      {account && (
        <div className="user" onClick={onClick}>
          <Jazzicon diameter={56} seed={jsNumberForAddress(account)} />
          <p className="name">{"0x.." + account.slice(account.length - 3)}</p>
        </div>
      )}
    </>
  );
}
