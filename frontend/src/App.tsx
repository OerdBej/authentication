function App() {
  return (
    <div className='min-h-screen bg-gray-200 flex flex-col items-center justify-center p-6'>
      <h1 className='text-5xl font-black text-blue-700 bg-yellow-300 px-6 py-4 rounded-md shadow-lg mb-8 uppercase tracking-wider border-4 border-red-500'>
        Frontend Auth
      </h1>

      <div className='max-w-2xl w-full grid gap-6'>
        <p className='text-lg font-bold text-white bg-red-500 p-6 rounded-lg shadow-md border-4 border-yellow-400 text-center'>
          🚀 Built with <span className='text-yellow-300'>React</span> &{' '}
          <span className='text-blue-300'>TypeScript</span>, styled using{' '}
          <span className='text-gray-300'>Tailwind CSS</span> for a colorful,
          retro look.
        </p>

        <p className='text-lg font-bold text-white bg-blue-600 p-6 rounded-lg shadow-md border-4 border-red-400 text-center'>
          🛠️ The authentication flow includes login and signup screens with
          clean validation, designed to pop with vibrant Lego-inspired colors.
        </p>

        <p className='text-lg font-bold text-white bg-yellow-400 p-6 rounded-lg shadow-md border-4 border-blue-500 text-center'>
          🎨 Tailwind makes it easy to build playful and responsive designs.
          Customize everything to fit your project needs!
        </p>
      </div>
    </div>
  );
}

export default App;
