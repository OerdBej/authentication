import type { FC } from 'react';
import GlowingCircles from './components/GlowingCircles';

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
        <h1 className='text-4xl font-bold text-white text-center'>
          Authentication App
        </h1>
        {/* Your auth components will go here */}
      </div>
    </div>
  );
};

export default App;
