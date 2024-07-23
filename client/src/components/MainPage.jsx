import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import notesData from '../data/notes.json';
import methods from '../utils/LocalStorage';
import {  useNavigate } from "react-router-dom";

const MainPage = () => {
    const colorArray=["bg-pink-400","bg-red-400","bg-orange-400","bg-yellow-400","bg-gray-400"]
    const [notes, setNotes] = useState([]);
    const [isDark, setIsDark] = useState(localStorage.getItem("isDark") || "");
    const navigate=useNavigate();

    useEffect(() => {
        const data = methods.getFromLocalStorage("notes-data");
        if (Array.isArray(data) && data.length) {
            setNotes(data);
        } else {
            console.log("Fetch data from data file");
            methods.addToLocalStorage("notes-data", notesData);
            setNotes(notesData);
        }
    }, []);

    const handleSave = (id, newText) => {
        const updatedNotes = notes.map(note => 
          note.id === id ? { ...note, text: newText } : note
        );
        localStorage.setItem("notes-data", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    const darkHandler = () => {
        methods.isDark();
        setIsDark(localStorage.getItem("isDark"));
    };
    useEffect(()=>{},[isDark]);

    const handleClick = () => {
        console.log("Click handler called");
        // Retrieve and parse data from localStorage
        const data = JSON.parse(localStorage.getItem("notes-data"));
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
        console.log(updatedData);
        return;
    }

    const handleRemove = (id) => {
        const data = JSON.parse(localStorage.getItem("notes-data"));
        const updatedData = data.filter(note => note.id !== id);
        localStorage.setItem("notes-data", JSON.stringify(updatedData));
        setNotes(updatedData);
    };  

    

    return (
        <div className={`min-h-screen ${isDark}`}>
            {/* Sidebar */}
            <div className="bg-slate-800 fixed left-0 bottom-0 top-0 w-[8%] md:w-[4%] flex flex-col justify-between items-center py-5 border-r">
                <Icon className="w-[35px] h-[35px] text-white" icon="mage:edit-pen" />
                <div>
                    <Icon className="w-[35px] h-[35px] text-white" icon="prime:home" />
                    <Icon onClick={handleClick} className="w-[35px] h-[35px] text-white" icon="bi:plus" />
                </div>
                <Icon onClick={()=>{
                    navigate('/');
                    localStorage.removeItem('Token');
                }
                } 
                className="w-[35px] h-[35px] text-white" icon="tabler:login-2" />
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
                    <h1 className="text-3xl">Hello, <span className="font-bold">Rohit</span></h1>
                    <p className="text-gray-500">All your notes are here, in one place!</p>
                </div>

                {/* All Notes */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-5">
                    {notes.length > 0 ? notes.map((note, index) => (
                        <NoteCard key={index} note={note} onRemove={handleRemove} onSave={handleSave} />
                    )) : "No Data"}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
