import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';


function App() {
  // useEffect(() => {
  //   fetch('data/videoList.json').then(res => res.json()).then((data) => console.log(data))
  // }, [])
  return (
   <>
   <Outlet />
   </>
  );
}

export default App;
