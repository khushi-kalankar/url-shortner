import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState(localStorage.getItem("shortId") || "");
  const [fullUrl, setFullUrl] = useState(localStorage.getItem("fullUrl") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();


  const handleShorten = async () => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/url", { url });
      const shortId = res.data.shorturl;
      const fullUrl = `http://localhost:3000/${shortId}`;

      setShortId(shortId);
      setFullUrl(fullUrl);

      localStorage.setItem("shortId", shortId);
      localStorage.setItem("fullUrl", fullUrl);
    } catch (error) {
      console.error("Error generating short URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalytics = () =>{
    navigate(`/analytics/${shortId}`);
  }
  
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
        <div className="text-white text-5xl font-bold items-center justify-center w-auto px-7 pt-7 flex-col sm:text-6xl">
          Shorten your links, expand your reach.
        </div>
        <div className="pt-6 text-3xl text-gray-400 font-normal sm:px-8">
          Simplify your online presence with our powerful URL shortening tool.
        </div>
        <div className="flex mt-5 w-full px-40">
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Enter your long URL"
            className="rounded-lg h-12 mt-8 pl-3 placeholder:text-3xl sm:w-full text-xl"
          />
          <div className="flex justify-center items-center mt-8 pl-5 text-2xl">
            <button
              onClick={handleShorten}
              className={`text-white hover:text-gray-400 ${isLoading ? "opacity-50" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Shorten"}
            </button>
          </div>
        </div>
      </div>
      {fullUrl && (
        <div className="justify-center">
          <div className="flex justify-between items-center mt-7 shadow-md h-20 rounded-md mx-7">
            <div className="font-semibold ml-5 text-3xl">
              Shortened URL:
            </div>
            <div
              className="items-center hover:text-gray-600 text-3xl"
              onClick={() => window.open(fullUrl, "_blank")}
              style={{ cursor: "pointer" }}
            >
              {fullUrl}
            </div>
            <div className="flex gap-2 mr-4">
              <div className="bg-gray-200 rounded-full flex justify-center items-center px-3 py-1 text-3xl cursor-pointer"
              onClick={handleAnalytics}>
                No. of clicks
              </div>
              <button className="bg-gray-200 rounded-full w-16 h-16 items-center justify-center pb-1 pl-1 hover:bg-gray-300 hover:shadow-md
              " onClick={handleCopy}>
                <svg
                  className="h-12 w-12 text-black items-center justify-center pt-2 pl-2"
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
      )}
    </div>
  );
};

export default Hero;
