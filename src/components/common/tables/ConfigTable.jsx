function ConfigTable() {
  return (
    <button className="hover:bg-zinc-200 rounded-md shadow-md p-2">
      <svg
        class="w-6 h-6 text-current"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          d="M12 6h.01M12 12h.01M12 18h.01"
        />
      </svg>
    </button>
  );
}

export default ConfigTable;
