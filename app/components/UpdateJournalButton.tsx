'use client';
import React, { useState } from 'react';
import { updateJournalEntryById } from '../../database/journals';

type UpdateJournalButtonProps = {
  journalId: number;
  initialEntry: string;
};

const UpdateJournalButton: React.FC<UpdateJournalButtonProps> = ({
  journalId,
  initialEntry,
}) => {
  const [entry, setEntry] = useState(initialEntry);

  const handleUpdate = async () => {
    try {
      await updateJournalEntryById(journalId, entry);
      // Optionally, handle success or refetch the data
    } catch (error) {
      console.error('Error updating journal entry:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={4}
        cols={50}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateJournalButton;
