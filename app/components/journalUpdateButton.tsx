'use client';

import React, { useState } from 'react';

type Props = {
  initialEntry: string;
};

const JournalEntryUpdate: React.FC<Props> = ({ initialEntry }) => {
  const [journalEntry, setJournalEntry] = useState(initialEntry);

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/updateJournal', {
        method: 'PUT',
        body: JSON.stringify({
          entry: journalEntry,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update journal entry');
      }

      // Handle successful update here if needed
    } catch (error) {
      console.error('Error updating journal entry:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>Journal Entry:</h2>
      <textarea
        value={journalEntry}
        onChange={(event) => setJournalEntry(event.target.value)}
      />
      <div>
        <button onClick={handleUpdate}>Update Entry</button>
      </div>
    </div>
  );
};

export default JournalEntryUpdate;
