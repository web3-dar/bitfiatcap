import { Link } from "react-router-dom";
import cardImg from "../assets/pngtree.png";
import { motion } from "framer-motion";


const HeroSection = () => {




  return (
    <>
    <section className="relative bg-white overflow-hidden w-full">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side: Animated Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 px-6 lg:px-16 py-16"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-500 mb-6 mt-[100px] leading-tight">
            EARN UP TO 4X <br /> BITCOIN REWARDS — <br /> DAILY MINING!
          </h1>

          <p className="text-gray-700 mb-6 text-base lg:text-lg">
            BitFiat Capital is revolutionizing crypto mining. Get up to{" "}
            <strong>4X BTC rewards</strong> on cloud mining packages,{" "}
            <strong>3X on staking</strong>, and{" "}
            <strong>2X on daily earnings</strong> from referrals and GPU rigs.
            Enjoy automated payouts, zero maintenance fees, and instant
            portfolio growth — all on a secure, scalable blockchain infrastructure.
          </p>

          <Link to="/signup">
            <button className="bg-green-400 text-white px-6 py-3 font-semibold rounded hover:bg-black transition">
              START MINING NOW
            </button>
          </Link>
        </motion.div>

        {/* Right Side: Bouncing Image */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full lg:w-1/2"
        >
          <img
            src={cardImg}
            alt="Mining dashboard and bitcoin graphics"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
   </>
  );
};

export default HeroSection;
