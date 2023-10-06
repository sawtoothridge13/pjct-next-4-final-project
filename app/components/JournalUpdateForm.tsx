'use client';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { getJournalById, updateJournalById } from '../../database/journals';
import style from './JournalForm.module.scss';

// {id: number, comment: string}[]]

type Props = {
  params: {
    tripId: number;
    journalId: number;
    entry: string;
  };
};

export default async function updateJournalEntry({ params }: Props) {
  const singleJournal = await getJournalById(Number(params.tripId));
  const [entry, setEntry] = useState({ singleJournal });
  // If you need to have a type parameter for the useState (either
  // undefined or a string)
  // const [comment, setComment] = useState<undefined | string>();
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setEntry(event.currentTarget.value);
  }

  return (
    // WARNING: in order to use Server Action you need to update the next.js config with serverActions: true,
    // when using Server Actions we don't need prevent the default of the form
    <form>
      <textarea
        className={style.textarea}
        value={params.entry}
        onChange={handleChange}
      />
      {/* Instead of using onClick we use formAction */}
      <br />
      <button
        className={style.button}
        formAction={async () => {
          router.refresh();
          await updateJournalById(journalId, entry);
        }}
      >
        Update
      </button>
    </form>
  );
}
