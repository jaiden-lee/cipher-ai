// Icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
// React/Next
import { useState } from 'react';
// Utils
import { firestore, auth } from '@/utils/firebase';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';


function StarButton(props: {problemId: string, starred: boolean}) {
    const [isStarred, setIsStarred] = useState(props.starred);

    async function handleClick() {
        if (auth.currentUser) {
            const uid = auth.currentUser.uid;
            if (isStarred) {
                // Remove from database
                setIsStarred(false);
                const userDocRef = doc(firestore, "users", uid);
                await updateDoc(userDocRef, {
                    "starredProblems": arrayRemove(props.problemId)
                }); // firestore automatically sends user JWT if they are logged since firebase auth and firestore work together
                // so I don't need to handle the case of sending it to server, unlike the case with cookies and getServerSideProps
            } else {
                setIsStarred(true);
                const userDocRef = doc(firestore, "users", uid);
                // Only want to add if already in database
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    // try catch, in case starred field doesn't exist for some reason
                    try {
                        if (!userDoc.data().starredProblems.includes(props.problemId)) {
                            await updateDoc(userDocRef, {
                                "starredProblems": arrayUnion(props.problemId)
                            })
                        }
                    } catch (e) {}
                }
            }
        }
        
    }

    return (
        <button className="text-yellow-400 mx-4" onClick={handleClick}>
            {
                (isStarred ? 
                <StarIcon className="scale-125" /> : 
                <StarBorderIcon className="scale-125" />)
            }
        </button>
    );
}

export default StarButton;