import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NoteCard = (props) => {
  const [isedit, setIsedit] = useState(false);
  const { text, date, color, _id } = props.note;
  const { onRemove, onSave, fetchData } = props;

  const [note, setNote] = useState({ text: "", date: "", color: "" });

  useEffect(() => {}, [isedit]);

  const handleNoteChange = (e) => {
    setNote({
      text: e.target.value,
      date,
      color,
    });
  };

  const onEdit = async (id, note) => {
    try {
      await axios.post("http://localhost:4000/api/v1/notes/update", { _id: id, text: note.text });
      fetchData();
      setIsedit(false);
    } catch (error) {
      console.log("Error in onEdit: " + error.message);
    }
  };

  return (
    <div className={`${color} rounded-tl-xl border-gray-300 border rounded-br-xl p-2 flex flex-col justify-between h-72`}>
      {/* Handle the text rendering */}
      {isedit || text === "" ? (
        <textarea
          value={note.text}
          name="note"
          onChange={handleNoteChange}
          className="w-full h-32 p-1 text-black"
          type="text"
          placeholder="write here note"
        />
      ) : (
        <div className="text">{text}</div>
      )}

      {/* Actions and Date */}
      <div className="flex justify-between">
        <p>{date}</p>
        <div>
          {isedit || text === "" ? (
            isedit ? (
              <button onClick={() => { onEdit(_id, note); setNote({ text: "", date: "", color: "" }); }}>
                <Icon className="w-[25px] h-[25px] hover:text-blue-600 text-white" icon="fluent:save-edit-24-regular" />
              </button>
            ) : (
              <button onClick={() => { onSave(_id, note); setNote({ text: "", date: "", color: "" }); }}>
                <Icon className="w-[25px] h-[25px] hover:text-blue-600 text-white" icon="fluent:save-edit-24-regular" />
              </button>
            )
          ) : (
            <div>
              <button onClick={() => { setIsedit(true); setNote({ text }); }} className="mr-4">
                <Icon className="w-[25px] h-[25px] hover:text-blue-600 text-white" icon="raphael:edit" />
              </button>
              <button onClick={() => { onRemove(_id); }}>
                <Icon className="w-[25px] h-[25px] text-red-800 hover:text-red-900" icon="material-symbols:delete-outline" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
