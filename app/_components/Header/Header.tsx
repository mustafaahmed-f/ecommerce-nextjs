import HeadersWrapper from "./HeadersWrapper";

interface HeaderProps {}

async function Header({}: HeaderProps) {
  return (
    <header>
      <HeadersWrapper />
    </header>
  );
}

export default Header;
