import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';

const NoteCard = (props) => {
  const { text, date, color ,id} = props.note;
  const { onRemove ,onSave} = props;

  const [note,setNote]=useState("");


 
  return (
    <div className={`${color} rounded-tl-xl border-gray-300 border rounded-br-xl p-2 flex flex-col justify-between h-72`}>
      <p>
      {
        text===""?
        <div>
          <textarea value={note} name="note" 
          onChange={(e)=>{setNote(e.target.value)}} className='w-full h-32 p-1 text-black' type="text" placeholder="write here note"/>
        </div>
        :text
      }
      </p>
      <div className="flex justify-between">
        <p>{date}</p>
        {
          text===""?
        <button  onClick={() => {onSave(id, note); setNote("")}}>
          <Icon className="w-[25px] h-[25px] hover:text-blue-600 text-white" icon="mingcute:save-line" />
        </button>
          :
        <button  onClick={() => {onRemove(id)}}>
          <Icon className="w-[25px] h-[25px] text-gray-800 hover:text-red-900" icon="material-symbols:delete-outline"/>
        </button>
        }
      </div>
    </div>
  );
};

export default NoteCard;
