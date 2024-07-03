// Next
import Link from "next/link";
import Image from "next/image";
// Utils
import { outfit } from "@/utils/fonts";

function LandingPage() {
  return (
    <div>
      {/* Hero section */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 min-h-[80vh] py-6">
        {/* Text content */}
        <div className="flex flex-col justify-center gap-4 items-center text-center w-[95%] sm:w-[45%] sm:items-start sm:text-left">
          <h1 className={`${outfit.className} text-4xl font-bold text-blue-header`}>Prepare for your interviews with cipher</h1>
          <p className="text-gray-text-dark text-lg">Cipher is the best way to prepare for coding interviews with our AI assistance!</p>
          <Link href="/signup" className="button-primary font-medium text-lg">Sign up!</Link>
        </div>
        <div className="w-[95%] sm:w-[45%] flex items-center">
          <Image src="/hero-image.png" width={1440} height={1024} alt="Cipher hero image" className="max-w-full"/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;