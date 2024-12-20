import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async () => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsLoading(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.post(`${apiBaseUrl}/url`, { url });
      const shortId = res.data.shorturl;
      const fullUrl = `${apiBaseUrl}/${shortId}`;

      setShortId(shortId);
      setFullUrl(fullUrl);
    } catch (error) {
      console.error("Error generating short URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);

      // Automatically hide the pop-up after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy the URL:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center bg-black h-80 items-center max-w-full">
        <div className="text-white text-3xl font-bold items-center justify-center w-auto px-7 pt-7 flex-col sm:text-4xl">
          Shorten your links, expand your reach.
        </div>
        <div className="pt-6 text-xl px-5 text-gray-400 font-normal sm:px-8">
          Simplify your online presence with our powerful URL shortening tool.
        </div>
        <div className=" flex items-center mt-5 w-full px-40">
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Enter your long URL"
            className="rounded-lg h-12 mt-7 pl-3 placeholder:text-xl w-full sm:w-full text-xl"
          />
          <div className="flex justify-center items-center mt-8 pl-5 text-2xl">
            <button
              onClick={handleShorten}
              className={`flex items-center text-lg text-white hover:text-gray-400 ${
                isLoading ? "opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Shorten"}
            </button>
          </div>
        </div>
      </div>

      <div className="justify-center">
        <div className="flex justify-between items-center mt-7 shadow-md h-15 rounded-md mx-5">
          <div className="font-semibold ml-5 text-lg">Shortened URL:</div>
          <div
            className="items-center hover:text-gray-600 text-lg"
            onClick={() => window.open(fullUrl, "_blank")}
            style={{ cursor: "pointer" }}
          >
            {fullUrl}
          </div>
          <div className="flex gap-2 mr-4 py-2">
            <button
              className="bg-gray-200 rounded-full w-12 h-12 items-center justify-center pb-2 hover:bg-gray-300 hover:shadow-md
              "
              onClick={handleCopy}
            >
              <svg
                className="h-10 w-10 text-black items-center justify-center pt-2 pl-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pop-up notification */}
        {isCopied && (
          <div className="absolute top-0 right-1/2 transform translate-x-1/2 bg-green-500 text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-lg">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
