import { useState } from 'react';
import FacebookLoginComponent from './Components/FacebookLogin';
import PagesList from './Components/PagesList';
import PageInsights from './Components/PageInsights';

function App() {
  const [user, setUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState('');
  const [dateRange, setDateRange] = useState({ since: '', until: '' });
  const [showInsights, setShowInsights] = useState(false);

  const handleLogin = (response) => {
    setUser(response);
  };

  const handlePageSelect = (pageId) => {
    setSelectedPage(pageId);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInsights(true);
  };

  return (
    <div className='flex flex-col justify-center items-center w-[100%] h-[100vh] bg-[#dddddd]'>
      {!user ? (
        <FacebookLoginComponent onLogin={handleLogin} />
      ) : (
        <div className='flex flex-col justify-center items-center h-[100vh] w-[100%] gap-8'>
          <div className='flex flex-col gap-2'>
            <img src={user.picture.data.url} alt={user.name} className='w-28 rounded-full border-2 border-white shadow-2xl' />
            <h1 className='text-2xl font-bold'>{user.name}</h1>
          </div>
          <div className='flex flex-col justify-center items-center gap-4 bg-slate-300 rounded-md p-8 sm:w-[30%] w-full'>
            <h2 className='text-xl font-bold'>Your Pages</h2>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-full'>
              <PagesList accessToken={user.accessToken} onPageSelect={handlePageSelect} />
              <input
                type="date"
                name="since"
                value={dateRange.since}
                onChange={handleDateChange}
                className='p-2 border rounded w-full'
              />
              <input
                type="date"
                name="until"
                value={dateRange.until}
                onChange={handleDateChange}
                className='p-2 border rounded w-full'
              />
              <button type="submit" className='p-2 bg-blue-500 text-white rounded w-full'>Show Insights</button>
            </form>
          </div>
          {showInsights && selectedPage && (
            <PageInsights
              pageId={selectedPage}
              accessToken={user.accessToken}
              dateRange={dateRange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
