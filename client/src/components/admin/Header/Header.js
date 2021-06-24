import HintMark from "./HintMark";
import SWCLogo from "./swc-logo";

const Header = () => {
  return (
    <div className="bg-white py-4 px-6 flex justify-between items-center">
      <SWCLogo />
      
      <div className="flex items-center">
        <HintMark />
        <div className="h-9 w-9 rounded-full bg-navy ml-4"></div>
      </div>
    </div>
  );
};

export default Header;