interface AuthButtonProps {
  children: React.ReactNode;
  disabledHandler?: boolean;
  onClickFN?: () => void;
}

function AuthButton({
  children,
  disabledHandler = false,
  onClickFN,
}: AuthButtonProps) {
  return (
    <button
      disabled={disabledHandler}
      onClick={onClickFN}
      className={`w-full rounded-full disabled:bg-slate-500 bg-slate-950 px-7 py-2  hover:bg-slate-700 disabled:cursor-not-allowed text-white `}
    >
      {children}
    </button>
  );
}

export default AuthButton;
