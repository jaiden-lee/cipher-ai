import { FormEvent } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
import { useState } from "react";
import {auth, firestore} from "@/utils/firebase";
import { updateDoc, doc } from "firebase/firestore";

function ChangeName({closeModal, initialDisplayName, setDisplayName}: {closeModal: any, initialDisplayName: string, setDisplayName: any}) {
    const [displayNameValue, setDisplayNameValue] = useState(initialDisplayName); // this is usually bad practice, but its fine here since state only ever changes on open or close

    async function handler() {
        if (displayNameValue.length > 0) {
            closeModal();
            try {
                if (auth.currentUser) {
                    const uid = auth.currentUser.uid;
                    const userDocRef = doc(firestore, "users", uid);
                    await updateDoc(userDocRef, {
                        "displayName": displayNameValue
                    });
                    setDisplayName(displayNameValue);
                }
            } catch (e) {}
        }
    }

    function handleNameChange(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handler();
    }

    return (
        // shadow in BG
        <div className="absolute left-0 top-0 bg-[rgb(0,0,0,.35)] w-full h-[100dvh] grid place-items-center" onClick={closeModal}>

            <div className="w-full max-w-96 py-4 bg-white shadow-center rounded-md z-10" onClick={(e: MouseEvent) => e.stopPropagation()}>
                <div className="px-4 mb-4 flex items-center">
                    <h3 className="text-lg font-medium text-blue-header">Edit display name</h3>
                    <button className="ml-auto text-gray-text-dark rounded-full transition-colors box-content p-2 hover:bg-gray-stroke" onClick={closeModal}>
                        <Image src="/icons/close.svg" width={100} height={100} alt="Close modal" className="w-6" />
                    </button>
                </div>

                <hr />

                <form onSubmit={handleNameChange} className="flex flex-col gap-2 px-4 pt-4 py-2">
                    <label htmlFor="change-display-name">Display name</label>
                    <input 
                        type="text" 
                        id="change-display-name" 
                        className="outline-none border-[1px] border-gray-stroke px-3 py-2 rounded-md text-gray-text-dark" 
                        placeholder="Enter display name"
                        value={displayNameValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDisplayNameValue(e.target.value)}
                    />
                    <button className="button-primary mt-4">Save</button>
                </form>

            </div>
        </div>
    );
}

export default ChangeName;