/* eslint-disable react/no-unescaped-entities */

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footbar from './Footbar';

const Layout = () => {
  return (
    <div className="ui container">
      <Navbar />
      {<Outlet />}
      <div className='footerText'>
      <Footbar />
      </div>
    </div>
  );
};

export default Layout;