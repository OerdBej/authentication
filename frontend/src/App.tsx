import type { FC } from 'react';
import GlowingCircles from './components/GlowingCircles';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';

// Home page component
const HomePage: FC = () => {
  return (
    <div>
      <h2 className='text-2xl font-semibold text-white text-center mb-6'>
        Welcome to the Authentication App
      </h2>
      <p className='text-gray-300 text-center'>
        Please sign up or log in to access your account.
      </p>
    </div>
  );
};

const App: FC = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-slate-950'>
      {/* Background glowing circles for visual effect */}
      <GlowingCircles
        color='bg-blue-500'
        size='w-96 h-96'
        top='10%'
        left='15%'
        delay={0}
      />
      <GlowingCircles
        color='bg-purple-500'
        size='w-80 h-80'
        top='60%'
        left='75%'
        delay={2}
      />
      <GlowingCircles
        color='bg-rose-500'
        size='w-64 h-64'
        top='85%'
        left='25%'
        delay={4}
      />

      {/* Main content */}
      <div className='relative z-10 container mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold text-white text-center mb-8'>
          Authentication App
        </h1>
        {/* Routes for different pages */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
