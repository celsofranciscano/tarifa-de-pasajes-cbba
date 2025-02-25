function SubmitButton({ isLoading, name }) {
  return (
    <button
      type="submit"
      className={`py-2 px-4 w-full md:w-fit  bg-yellow-400 rounded-md text-black font-medium flex items-center justify-center ${
        isLoading ? " bg-yellow-300  text-black  cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="animate-spin  border-2 border-black border-t-transparent  rounded-full w-4 h-4 mr-2"></span>
      ) : null}
      {name}
    </button>
  );
}

export default SubmitButton;
