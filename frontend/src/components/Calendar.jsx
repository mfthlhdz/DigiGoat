import React, { useState, useEffect } from 'react';
import '../css/Calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [goatCode, setGoatCode] = useState('');
  const [editNoteId, setEditNoteId] = useState(null); // ID catatan yang sedang diedit

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const daysToShowFromPreviousMonth = firstDayOfMonth;

  const calendarDays = [
    ...Array.from({ length: daysToShowFromPreviousMonth }, (_, i) => ({
      day: daysInPreviousMonth - daysToShowFromPreviousMonth + i + 1,
      isPreviousMonth: true
    })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isPreviousMonth: false
    }))
  ];

  const openNoteForm = (day, noteId = null) => {
    setSelectedDay(day);
    setEditNoteId(noteId); // Simpan ID catatan yang sedang diedit
    const key = `${year}-${month + 1}-${day}`;
    setNewNote(notes[key]?.text || '');
    setGoatCode(notes[key]?.goatCode || '');
  };

  const saveNote = async () => {
    const key = `${year}-${month + 1}-${selectedDay}`; // Tanggal dalam format YYYY-MM-DD
    const noteData = { goatCode, note: newNote, date: key };

    try {
      let response;
      if (editNoteId) {
        // Update catatan
        response = await fetch(`http://localhost:5000/api/schedules/${editNoteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(noteData)
        });
      } else {
        // Tambah catatan baru
        response = await fetch('http://localhost:5000/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(noteData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gagal menyimpan catatan:', errorData.message);
        alert('Gagal menyimpan catatan.');
        return;
      }

      const savedNote = await response.json();

      // Update notes state dengan catatan yang baru disimpan atau diedit
      setNotes((prevNotes) => {
        const updatedNotes = { ...prevNotes };
        updatedNotes[key] = { id: savedNote._id, text: newNote, goatCode };
        return updatedNotes;
      });

      setNewNote('');
      setGoatCode('');
      setSelectedDay(null);
      setEditNoteId(null);
    } catch (error) {
      console.error('Error saat menyimpan catatan:', error.message);
      alert('Terjadi kesalahan saat menyimpan catatan.');
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/schedules/${noteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gagal menghapus catatan:', errorData.message);
        alert('Gagal menghapus catatan.');
        return;
      }

      // Hapus catatan dari state lokal
      setNotes((prevNotes) => {
        const updatedNotes = { ...prevNotes };
        Object.keys(updatedNotes).forEach((key) => {
          if (updatedNotes[key].id === noteId) {
            delete updatedNotes[key];
          }
        });
        return updatedNotes;
      });

      alert('Catatan berhasil dihapus.');
    } catch (error) {
      console.error('Error saat menghapus catatan:', error.message);
      alert('Terjadi kesalahan saat menghapus catatan.');
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schedules', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gagal mengambil catatan:', errorData.message);
        return;
      }

      const fetchedNotes = await response.json();
      const formattedNotes = {};

      fetchedNotes.forEach((note) => {
        const dateKey = note.date; // Menggunakan format YYYY-MM-DD untuk key
        formattedNotes[dateKey] = { id: note._id, text: note.note, goatCode: note.goatCode };
      });

      setNotes(formattedNotes);
    } catch (error) {
      console.error('Error saat mengambil catatan:', error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="calendar-container">
      <div className="calendar">
        <h3>{monthNames[month]} {year}</h3>
        <div className="calendar-grid">
          <div className="calendar-header">Minggu</div>
          <div className="calendar-header">Senin</div>
          <div className="calendar-header">Selasa</div>
          <div className="calendar-header">Rabu</div>
          <div className="calendar-header">Kamis</div>
          <div className="calendar-header">Jumat</div>
          <div className="calendar-header">Sabtu</div>

          {calendarDays.map((item, index) => {
            const key = `${year}-${month + 1}-${item.day}`;
            return (
              <div
                key={index}
                className={`calendar-day ${item.isPreviousMonth ? 'previous-month' : ''} ${!item.isPreviousMonth && notes[key] ? 'has-note' : ''}`}
                onClick={() => !item.isPreviousMonth && openNoteForm(item.day, notes[key]?.id)}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="calendar-form-note">
          <h4>{editNoteId ? 'Edit Catatan' : 'Tambah Catatan'} untuk Tanggal {selectedDay}</h4>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Tambahkan catatan di sini..."
          />
          <input
            type="text"
            value={goatCode}
            onChange={(e) => setGoatCode(e.target.value)}
            placeholder="Kode Kambing"
          />
          <div>
            <button onClick={saveNote}>{editNoteId ? 'Update' : 'Simpan'}</button>
            <button className="cancel" onClick={() => setSelectedDay(null)}>Batal</button>
          </div>
        </div>
      )}

      <div className="notes">
        <h4>Jadwal Kegiatan</h4>
        {Object.keys(notes).length === 0 ? (
          <p>Tidak ada catatan.</p>
        ) : (
          <ul>
            {Object.entries(notes).map(([key, note], index) => (
              <li key={index} className="note-item">
                <strong>{new Date(key).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}:</strong> {note.text} - Kode Kambing: {note.goatCode}
                <button onClick={() => deleteNote(note.id)} className="delete-note">Hapus</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Calendar;
