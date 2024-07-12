// Next/React
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// Types
import type { User } from "firebase/auth";
// Utils
import { outfit } from "@/utils/fonts"; // Outfit header font
// Components
import ProfileModal from "../Modals/ProfileModal";


type NavbarProps = {
    user: User | null | undefined
}

function Navbar (props: NavbarProps) {
    const {user} = props;
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    function handleProfileClick() {
        if (user) {
            setProfileModalOpen((oldState) => !oldState);
        }
    }

    return (
        <div className={` flex box-border px-6 py-4 gap-4 items-center text-blue-header font-medium text-lg border-b-[1px] border-gray-stroke`}>
            {/* Logo */}
            <Link href={user ? "/home" : "/"} className={`${outfit.className} text-3xl font-bold text-blue-primary`}>cipher</Link>
            
            {/* Main Navbar */}
            <Link href="/problems" className="ml-4 mt-1 hover:text-black">Problems</Link>

            {/* Navbar end */}

            {
                !user && 
                <div className="ml-auto flex items-center h-full gap-6 mt-1">
                    <Link href="/login" className="hover:text-black">Log in</Link>
                    <Link href="/signup" className="button-primary">Sign up</Link>
                </div>
            }

            {
                user &&
                <button className="ml-auto w-12 bg-gray-stroke rounded-full aspect-square flex justify-center items-center" onClick={handleProfileClick}>
                    <Image src="/icons/pfp.svg" width={43} height={55} alt="Profile picture" className="w-[50%] fill-current"/>
                </button>
            }

            {
                (profileModalOpen && user) &&
                <ProfileModal setProfileModalOpen={setProfileModalOpen}/>
            }
        </div>
    );
}

export default Navbar;