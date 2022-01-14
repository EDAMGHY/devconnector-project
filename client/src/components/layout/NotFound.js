import React from 'react';

const NotFound = () => {
  return (
    <section className='container'>
      <h1 className='xl-large text-primary text-center'>
        <i className='fas fa-exclamation-triangle text-' /> Page Not Found
      </h1>
      <p className='large text-center'>Sorry, this page does not exist</p>
    </section>
  );
};

export default NotFound;
