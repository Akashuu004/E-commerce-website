
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-secondary/30">
        <div className="container-custom max-w-md">
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
