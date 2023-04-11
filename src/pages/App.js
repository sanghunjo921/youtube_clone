
import { Outlet } from 'react-router-dom';
import { SearchHeader } from '../components/SearchHeader';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()


function App() {
  // useEffect(() => {
  //   fetch('data/videoList.json').then(res => res.json()).then((data) => console.log(data))
  // }, [])
  return (
   <>
   <SearchHeader />
   <QueryClientProvider client={queryClient}>
    <Outlet /> 
   </QueryClientProvider>
   </>
  );
}

export default App;
