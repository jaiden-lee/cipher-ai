// Next/React
import Link from "next/link";
// Types
import type { Dispatch, SetStateAction } from "react";
// Libraries
import { useSignOut } from "react-firebase-hooks/auth";
// Utils
import {auth} from "@/utils/firebase";

type ProfileModalProps = {
    setProfileModalOpen: Dispatch<SetStateAction<boolean>>
}
function ProfileModal(props: ProfileModalProps) {
    const [signOut, loading, error] = useSignOut(auth);
    const {setProfileModalOpen} = props;

    function handleSignOut() {
        signOut();
        closeProfileModal();
    }

    function closeProfileModal() {
        setProfileModalOpen(false); // disables the profile modal
    }

    return (
        <div className="absolute bg-white shadow-center w-36 flex flex-col top-0 right-6 mt-20 p-2 rounded-xl z-10">
            <Link href="/profile" className="w-full px-2 py-1 rounded-md hover:bg-gray-stroke" onClick={closeProfileModal}>Profile</Link>
            <Link href="/settings" className="w-full px-2 py-1 rounded-md hover:bg-gray-stroke" onClick={closeProfileModal}>Settings</Link>
            <Link href="/contact" className="w-full px-2 py-1 rounded-md hover:bg-gray-stroke" onClick={closeProfileModal}>Contact us</Link>
            <Link href="/" className="w-full px-2 py-1 rounded-md hover:bg-gray-stroke" onClick={handleSignOut}>Log out</Link>
        </div>
    );
}

export default ProfileModal;