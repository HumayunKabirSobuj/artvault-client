import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white py-10">
      <div className="container mx-auto px-4 text-center">
        {/* Animated Footer Heading */}
        <motion.h2 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="text-3xl font-semibold mb-4"
        >
          Stay Connected
        </motion.h2>

        {/* Social Icons with Hover Animation */}
        <div className="flex justify-center space-x-8 mb-6">
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-xl hover:text-[#FFD700]"
          >
            <FaFacebookF />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-xl hover:text-[#FFD700]"
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-xl hover:text-[#FFD700]"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-xl hover:text-[#FFD700]"
          >
            <FaLinkedinIn />
          </motion.a>
        </div>

        {/* Footer Links with Slide-in Animation */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center space-x-8 text-sm mb-6"
        >
          <a href="#about" className="hover:text-[#FFD700] transition-colors">About Us</a>
          <a href="#services" className="hover:text-[#FFD700] transition-colors">Services</a>
          <a href="#contact" className="hover:text-[#FFD700] transition-colors">Contact</a>
          <a href="#faq" className="hover:text-[#FFD700] transition-colors">FAQ</a>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xs"
        >
          &copy; {new Date().getFullYear()} ArtVault. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
