import { NavLink } from "react-router-dom";

import CalendarSVG from '../../../assets/CalendarSVG';
import AnalyticsSVG from "../../../assets/AnalyticsSVG";

const SideNavBar = () => {
  return (
    <div>
      <div className="my-4 mx-8 bg-bgColor w-32 text-center text-2xl py-2 text-navy">
        CS101
        <svg className="inline-block w-3 ml-2" width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.437202 0L10.9012 15L21.3652 0L0.437202 0Z" fill="#142661"/>
        </svg>
      </div>
      <ul>
        <li>
          <NavLink to="/admin/dashboard" className="flex items-center py-4 border-r-8 border-white px-12" activeClassName="border-r-8 border-cardBorder bg-bgColor">
            <CalendarSVG />
            <div className="pl-3 text-navy text-xl font-normal">Dashboard</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/calendar" className="flex items-center py-4 border-r-8 border-white px-12" activeClassName="border-r-8 border-cardBorder bg-bgColor">
            <CalendarSVG />
            <div className="pl-3 text-navy text-xl font-normal">Calendar</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/analytics" className="flex items-center py-4 border-r-8 border-white px-12" activeClassName="border-r-8 border-cardBorder bg-bgColor">
            <AnalyticsSVG />
            <div className="pl-3 text-navy text-xl font-normal">Analytics</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;