import { useEffect } from "react";
// import { MessageCircle } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";

declare global {
  interface Window {
    ChatraID: string;
    Chatra?: any;
  }
}

const SupportBot = () => {


   useEffect(() => {
    // Load Tawk.to script
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/687207037d1812190e9f5eea/1ivummqeg";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);



  return (

    <>
   
   <div className="fixed bottom-[100px] left-5 z-50 flex flex-col items-center space-y-1">
  <a href="mailto:support@">
    <button
      className="p-3 rounded-full shadow-lg bg-blue-800 hover:bg-blue-700 text-white"
    >
     <FaEnvelope/>
    </button>
  </a>
  <span className="text-sm text-black font-bold">Email Us</span>
</div>



    </>
  );
};

export default SupportBot;
