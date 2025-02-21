import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#252828] text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Company Info Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Flexi-Drive</h2>
                        <p className="mt-4 text-gray-400">
                            We stand as your trusted partner. Our dedication to quality, innovation, and customer satisfaction sets us apart.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">
                            Email: <a href="mailto:malisha84@gmail.com" className="text-[#40b6f0]">malisha84@gmail.com</a>
                        </p>
                        <p className="text-gray-400">Feel free! Ask us anything related to our service.</p>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Pages</h3>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Car</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">News</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Author</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Product Page</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Website Terms</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#40b6f0]">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Icons */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-[#40b6f0]">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#40b6f0]">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#40b6f0]">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#40b6f0]">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="text-center text-gray-400">
                    <p>&copy; 2025 Powered by Flexi-Drive, Designed by Malisha Perera</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
