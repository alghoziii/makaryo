import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-50">
      <ClipLoader size={50} color="#D04B1E" />
    </div>
  );
}
