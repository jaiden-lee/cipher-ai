// Next/React
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// Types
import type { ReactNode } from "react";
// Fonts
import { outfit } from "@/utils/fonts";
// Components
import ChangeName from "@/components/Modals/ChangeName";

type UserInfo = {
    displayName: string,
}

function ProfileLayout ({children, userInfo}: {children: ReactNode, userInfo: UserInfo}) {
    const [changeNameModalOpen, setChangeNameModalOpen] = useState(false);
    const [currentDisplayName, setCurrentDisplayName] = useState(userInfo.displayName);

    const router = useRouter();

    function closeChangeNameModal() {
        setChangeNameModalOpen(false);
    }

    return (
        <div className="px-4 py-6 text-gray-text-dark">
            {
                changeNameModalOpen &&
                <ChangeName closeModal={closeChangeNameModal} initialDisplayName={currentDisplayName} setDisplayName={setCurrentDisplayName} />
            }
            
            <h1 className={`${outfit.className} text-blue-header text-3xl font-semibold mb-4`}>Profile</h1>

            {/* Top Section */}
            <div className="flex items-center gap-6">
                {/* Pfp */}
                <button className="bg-gray-stroke rounded-full w-full max-w-32 aspect-square flex justify-center items-center">
                    <Image src="/icons/pfp.svg" width={43} height={55} alt="Change profile picture" className="w-[50%]" />
                </button>
                {/* Display Name */}
                <button className="flex gap-4 items-center" onClick={() => setChangeNameModalOpen(true)}>
                    <h3 className={`${outfit.className} text-3xl font-semibold`}>{currentDisplayName || "Display Name"}</h3>
                    <Image src="/icons/edit.svg" width={92} height={92} alt="Edit name" className="max-w-6" />
                </button>
            </div>

            {/* Navbar */}
            <div className="mt-8 text-gray-text-light text-2xl font-semibold flex gap-8 border-b-[1px] pb-2 border-gray-stroke">
                <Link href="/profile" className={`${router.pathname === "/profile" ? "selected" : ""} [&.selected]:text-blue-primary [&.selected]:underline underline-offset-[14px] hover:text-gray-text-dark`}>Activity</Link>
                <Link href="/profile/settings" className={`${router.pathname === "/profile/settings" ? "selected" : ""} [&.selected]:text-blue-primary [&.selected]:underline underline-offset-[14px] hover:text-gray-text-dark`}>Settings</Link>
            </div>

            {/* Bottom */}
            <div className="px-2 py-4">
                {children}
            </div>
        </div>
    );
}

export default ProfileLayout;