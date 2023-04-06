import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SearchHeader } from '../components/SearchHeader';



function App() {
  // useEffect(() => {
  //   fetch('data/videoList.json').then(res => res.json()).then((data) => console.log(data))
  // }, [])
  return (
   <>
   <SearchHeader />
   <Outlet /> 
   </>
  );
}

export default App;
