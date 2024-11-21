import { useEffect } from "react";
import { useParams } from "react-router-dom";


function RedirectHandler() {
  const { shortId } = useParams();

  useEffect(() => {
    window.open(`http://localhost:3000/${shortId}`, "_blank");
  }, [shortId]);

  return (
    <div className="bg-gray-700 flex w-screen h-screen text-white items-center justify-center">
      <div className="font-bold text-4xl">Redirecting...</div>
    </div>
  );
}

export default RedirectHandler;

// const res = await axios.get(`http://localhost:3000/${shortId}`)
// useEffect(()=>{
//     window.location.href = res.redirectURL
// })