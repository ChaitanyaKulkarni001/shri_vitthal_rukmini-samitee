const Footer = () => {
    return (
      <footer className="bg-yellow-600 text-white text-center p-4 fixed bottom-0 w-full shadow-md">
        <p className="text-sm">
          © {new Date().getFullYear()} Shri Vitthal Rukmini Mandir Samitee, Pandharpur.  
          All Rights Reserved.
        </p>
        <p className="text-xs">📍 Address: Pandharpur, PIN 413307 | 📞 Contact: 02186-223550</p>
      </footer>
    );
  };
  
  export default Footer;
  