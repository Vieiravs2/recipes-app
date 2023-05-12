import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FetchContext } from '../providers/FetchProvider';


function Profile() {
  return (
    <div>
      <Header title="Profile" profile search={ false } />
      <ProfileComponent />
      <Footer />
    </div>
  );
}

export default Profile;
