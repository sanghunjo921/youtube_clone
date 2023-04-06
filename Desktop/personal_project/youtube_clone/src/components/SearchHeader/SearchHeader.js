import { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { commonSetting } from '../../setting/setting';




export const SearchHeader = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    //useEffect: 컴포넌트가 렌더링 된 후 한번 해주기 위해 

    useEffect(() => {
        fetch('setting.js')
    })

    const onSubmit = (e) => {
        e.preventDefault(); // avoid auto-refresh when submitting 
        navigate(`/videos/${keyword}`); //send it to a url
    }
    return <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
        <Link to="/" className='flex item-center '> 
            <BsYoutube className='text-4xl text-main_logo' />
            <hi className="font-bold ml-2 text-3xl">{commonSetting.title}</hi>
        </Link>
        <form className="w-full flex justify-center" onSubmit={onSubmit}>
            <input className="w-7/12 p-2 outline-none bg-black text-gray-50" type="text" placeholder='Search...' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            <button className="bg-zinc-600 p-4" type="submit"><BsSearch/></button>
        </form>
    </header>
}