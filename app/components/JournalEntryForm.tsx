'use client';

import React, { useState } from 'react';
import { Journal } from '../../migrations/1687939503-createJournalsTable';
import styles from './JournalForm.module.scss'; // Replace 'YourStyles.module.css' with the actual path to your CSS file

type Props = {
  journals: Journal[];
};

export default function JournalEntryForm({ journals }: Props) {
  // State to store the selected journal entry
  const [entryText, setEntryText] = useState<Journal | null>(null); // State to store the textarea content

  const handleJournalSelection = (journal: Journal) => {
    setEntryText(journal.entry); // Set the textarea content to the selected journal's entry
  };

  const handleUpdate = () => {
    if (entryText) {
      // Your code to update the journal entry goes here, for example, making an API call to update the journal entry.
      // For simplicity, we'll just log the updated entry here.
      console.log('Updated entry:', entryText);
    }
  };

  return (
    <form className={styles.form}>
      <div>
        <textarea
          className={styles.textarea}
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
        />
        <div>
          <button className={styles.button} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
