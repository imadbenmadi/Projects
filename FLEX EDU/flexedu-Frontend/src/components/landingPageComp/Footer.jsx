import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import config from "../../config";
const EMAIL = config.EMAIL;

const TELEPHONE = config.TELEPHONE;
const FooterLink = ({ href, children }) => (
    <a
        href={href}
        className="text-gray-300 hover:text-white transition-colors duration-200"
    >
        {children}
    </a>
);

const SocialIcon = ({ href, Icon }) => (
    <a
        href={href}
        className="text-gray-300 hover:text-white transition-colors duration-200"
    >
        <Icon size={20} />
    </a>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-gray-400">
                        We are a leading institution dedicated to providing
                        quality education and fostering innovation.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <FooterLink href="/Home">Home</FooterLink>
                        </li>
                        <li>
                            <FooterLink href="/Achievements">
                                Achievements
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink href="/Courses">Courses </FooterLink>
                        </li>
                        <li>
                            <FooterLink href="/Contact">Contact</FooterLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <address className="text-gray-400 not-italic">
                        Flex Edu
                        <br />
                        algeria, 16000
                        <br />
                        Phone: {TELEPHONE}
                        <br />
                        Email: {EMAIL}
                    </address>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <SocialIcon
                            href="https://www.facebook.com/profile.php?id=61565127295492&mibextid=LQQJ4d"
                            Icon={FaFacebookF}
                        />
                        <SocialIcon
                            href="https://www.instagram.com/flex__edu"
                            Icon={FaInstagram}
                        />
                        <SocialIcon
                            href="https://www.linkedin.com/in/flex-edu-a080a2325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                            Icon={FaLinkedinIn}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                <p>
                    &copy; {new Date().getFullYear()} FlexEdu . All rights
                    reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
