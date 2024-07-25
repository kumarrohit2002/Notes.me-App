import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import methods from '../utils/LocalStorage';
import {  useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from 'react-toastify';

const MainPage = () => {
    const colorArray=["bg-pink-500","bg-red-500","bg-orange-500","bg-yellow-500","bg-gray-500"]
    const [notes, setNotes] = useState([]);
    const [isDark, setIsDark] = useState(localStorage.getItem("isDark") || "");
    const [name,setName]=useState("not log in");
    const navigate=useNavigate();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.post("http://localhost:4000/api/v1/notes/getusernotes", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });   
            const data = response.data.notes;
            localStorage.setItem("notes-data", JSON.stringify(data));
            if (Array.isArray(data) && data.length) {
                setNotes(data);
            }
            const Name=localStorage.getItem("name");
            setName(Name);
        } catch (error) {
            console.error("Error fetching notes:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const saveNotes = async(id,newText) => {
        const token = localStorage.getItem("Token");
        await axios.post("http://localhost:4000/api/v1/notes/addnotes",newText,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        toast.success("New Note is Added Successfully!", { position: "top-center" });
        fetchData();
    };

    const darkHandler = () => {
        methods.isDark();
        setIsDark(localStorage.getItem("isDark"));
    };
    useEffect(()=>{},[isDark]);

    const addNewNotes = () => {
        // Retrieve and parse data from localStorage
        const data = JSON.parse(localStorage.getItem("notes-data"));
        if(data==null) {
            // Create a new note with an incremented id
        const newNote = {
            id:1,
            text: "",
            date: new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date()),
            color: colorArray[0] // Or any default color
        };
        const updatedData = [newNote];
        localStorage.setItem("notes-data", JSON.stringify(updatedData));
        setNotes(updatedData);
        }else{
        // Create a new note with an incremented id
        const newNote = {
            id: data.length + 1,
            text: "",
            date: new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(new Date()),
            color: colorArray[data.length % 5] // Or any default color
        };
        const updatedData = [newNote, ...data];
        localStorage.setItem("notes-data", JSON.stringify(updatedData));
        setNotes(updatedData);
        }
        return;
    }

    const removeNotes = async(_id) => {
        const id={_id:_id};
        const token = localStorage.getItem("Token");
        await axios.post("http://localhost:4000/api/v1/notes/remove",id,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        toast.error("Notes is deleted Successfully!", { position: "top-center" });
        fetchData();
    };  

    

    return (
        <div className={`min-h-screen ${isDark}`}>
            {/* Sidebar */}
            <div className="bg-slate-800 fixed left-0 bottom-0 top-0 w-[8%] md:w-[4%] flex flex-col justify-between items-center py-5 border-r">
                <Icon className="w-[35px] h-[35px] text-white" icon="mage:edit-pen" />
                <div>
                    <Icon className="w-[35px] h-[35px] text-white" icon="prime:home" />
                    <Icon onClick={addNewNotes} className="w-[35px] h-[35px] text-white" icon="bi:plus" />
                </div>
                
                <div className="text-gray-300">
                    Logout
                <Icon onClick={()=>{
                    navigate('/');
                    localStorage.removeItem('Token');
                }
                } 
                className="w-[35px] h-[35px] text-white" icon="tabler:login-2" />
                </div>
            </div>

            {/* Dashboard */}
            <div className="ml-[12%] w-[80%] pt-4">
                {/* Search bar */}
                <div className={`border rounded-md flex justify-between ${isDark==''?"":isDark } p-1`}>
                    <div className="flex w-full items-center ">
                        <Icon className="w-[35px] h-[35px] cursor-pointer " icon="ic:baseline-search" />
                        <input type="text" placeholder=" Search notes" className={`w-[100%] outline-none ${isDark==''?"":isDark }`} />
                    </div>
                    <Icon onClick={darkHandler} className="w-[35px] h-[35px] cursor-pointer " icon="tdesign:sun-fall" />
                </div>

                <div className="text-start mt-10">
                    <h1 className="text-3xl">Hello, <span className="font-bold">{`${name}`}</span></h1>
                    <p className="text-gray-500">All your notes are here, in one place!</p>
                </div>

                {/* All Notes */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-5">
                    {notes.length > 0 ? notes.map((note, index) => (
                        <NoteCard key={index} note={note} onRemove={removeNotes} onSave={saveNotes} fetchData={fetchData} />
                    )) : "No Data"}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
