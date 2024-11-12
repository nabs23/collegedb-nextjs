'use client'
import React, { useEffect } from 'react';
import Router from 'next/router';

const withGlobalCheck = (WrappedComponent) => {
  const WithGlobalCheckComponent = (props) => {
    useEffect(() => {
      const checkCondition = async () => {
        // Attempt to retrieve the setup completion status from local storage
        const isSetupComplete = localStorage.getItem('isSetupComplete');

        // If the status is not found or false, fetch it and update local storage
        if (!isSetupComplete || isSetupComplete === 'false') {
          const institution = await fetchInstitutionData();
          console.log(institution)
          if (institution.isSetupComplete) {
            // If setup is complete, update local storage
            localStorage.setItem('isSetupComplete', 'true');
          } else {
            // Redirect to setup if the institution hasn't completed it
            Router.push('/setup');
          }
        }
        // If isSetupComplete in localStorage is true, do nothing
      };
      console.log("check condition")
      checkCondition();
    });

    return <WrappedComponent {...props} />;
  };

  return WithGlobalCheckComponent;
};

export default withGlobalCheck;

async function fetchInstitutionData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data)
  if (data) {
    return { isSetupComplete: true };
  }
  return { isSetupComplete: false }; // Replace with actual data fetching
}
