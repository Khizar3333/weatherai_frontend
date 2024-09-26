import Image from "next/image";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-teal-50 to-teal-100 h-screen">
      
    <Weather/>
    </div>
  );
}
