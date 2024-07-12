// Utils
import { outfit } from "@/utils/fonts";

function ContactPage() {
    return (
        <div className="py-6 px-4 flex flex-col justify-center items-center gap-4">
            <h1 className={`${outfit.className} text-3xl font-semibold text-blue-header`}>Contact Us</h1>
            <p className="text-gray-text-dark">For any questions, comments, or feedback, contact us at <a href="mailto:jaidenleebuild@gmail.com" className="text-blue-primary underline hover:text-cyan-600">jaidenleebuild@gmail.com</a></p>
        </div>
    );
}

export default ContactPage;