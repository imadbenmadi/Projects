import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"; // Importing social icons
import Logo from "../../../../public/Logo.png";
import config from "../../../config";

function Contact() {
    const EMAIL = config.EMAIL;
    const INSTA = config.INSTA;
    const FB = config.FB;
    const LINKEDIN = config.LINKEDIN;
    const TELEPHONE = config.TELEPHONE;

    const ContactItem = ({ label, value }) => (
        <div
            className="mb-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-md transform md:hover:scale-105 text-sm md:text-lg
         transition-transform duration-300"
        >
            <span className="font-semibold text-indigo-700">{label}:</span>
            <span className="ml-2 text-gray-800">{value || "N/A"}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 md:p-8 p-0 py-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-600 shadow-text">
                    Contact the Support
                </h1>
                <p className="text-center text-lg text-gray-500 mb-8">
                    Reach out to us for any questions or support, we are here to
                    help!
                </p>
                <img
                    className="w-[250px] mx-auto mb-8"
                    src={Logo}
                    alt="Support Logo"
                />
                <div className="relative">
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl relative z-10 p-8">
                        <div className="md:flex items-stretch justify-center gap-8">
                            <div className="md:w-2/3 w-full flex flex-col items-center justify-center gap-6">
                                <div className=" flex flex-col gap-6">
                                    <ContactItem
                                        label="Email"
                                        value={
                                            <a
                                                href={`mailto:${EMAIL}`}
                                                className="text-gray-800 underline"
                                            >
                                                {EMAIL || "Not set"}
                                            </a>
                                        }
                                    />
                                    <ContactItem
                                        label="Telephone"
                                        value={TELEPHONE || "N/A"}
                                    />
                                </div>

                                {/* Social media icons */}
                                <div className="flex justify-center space-x-6">
                                    <a
                                        href={FB}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-transform duration-300"
                                    >
                                        <FaFacebook size={40} />
                                    </a>
                                    <a
                                        href={INSTA}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-500 hover:text-pink-700 transform hover:scale-110 transition-transform duration-300"
                                    >
                                        <FaInstagram size={40} />
                                    </a>
                                    <a
                                        href={LINKEDIN}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:text-blue-900 transform hover:scale-110 transition-transform duration-300"
                                    >
                                        <FaLinkedin size={40} />
                                    </a>
                                </div>

                                {/* Call to Action Button */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
