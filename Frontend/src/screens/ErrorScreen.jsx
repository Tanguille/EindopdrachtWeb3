import React from 'react';

const ErrorScreen = ({ error }) => {
  return (
    <div>
      <div className="error-screen flex flex-col items-center justify-center h-screen text-center text-gray-700">
        <h1 className="text-2xl font-bold mb-4">Oei, er is iets fout gegaan</h1>
        <p className="text-lg mb-4">Het spijt ons, maar er is een fout opgetreden bij het laden van de pagina. Probeer het later opnieuw.</p>
        {error && (
          <div className="error-details bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            <strong className="font-bold">Foutmelding:</strong>
            <span className="block mt-1">{error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;
