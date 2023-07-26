'use client';
import { useState } from 'react';
import { Trip } from '../../migrations/1687932835-createTripsTable';
import styles from './TripsForm.module.scss';

type Props = {
  trips: Trip[];
};

export default function TripsForm({ trips }: Props) {
  const [tripList, setTripList] = useState(trips);
  const [nameInput, setNameInput] = useState('');
  const [onEditId, setOnEditId] = useState<number>();

  // only for on edit inputs
  const [onEditNameInput, setOnEditNameInput] = useState('');

  async function createTrip() {
    const response = await fetch(`/api/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the correct Content-Type header
      },
      body: JSON.stringify({
        name: nameInput,
      }),
    });

    const data = await response.json();

    setTripList([...tripList, data.trip]);
  }

  async function deleteTripById(id: number) {
    const response = await fetch(`/api/trips/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    console.log(data);
    setTripList(tripList.filter((trip) => trip.id !== id));
  }

  async function updateTripById(id: number) {
    const response = await fetch(`/api/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: onEditNameInput,
      }),
    });

    const data = await response.json();
    setTripList(
      tripList.map((trip) => {
        if (trip.id === data.trip.id) {
          return data.trip.id;
        }
        console.log(trip);
        return trip;
      }),
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inputDiv}>
        <label>
          <input
            className={styles.input}
            value={nameInput}
            onChange={(event) => setNameInput(event.currentTarget.value)}
          />
          Name
        </label>
        <br />
        <button
          className={styles.button}
          onClick={async () => await createTrip()}
        >
          create +
        </button>

        {tripList.map((trip) => {
          return (
            <div key={`trip-inputs-${trip.id}`} className={styles.inputDiv}>
              <br />
              <label>
                <input
                  className={styles.input}
                  value={trip.id !== onEditId ? trip.name : onEditNameInput}
                  onChange={(event) =>
                    setOnEditNameInput(event.currentTarget.value)
                  }
                  disabled={trip.id !== onEditId}
                />
                Name
              </label>

              <br />
              {trip.id === onEditId ? (
                <button
                  className={styles.button}
                  onClick={async () => {
                    setOnEditId(undefined);
                    await updateTripById(trip.id);
                  }}
                >
                  save
                </button>
              ) : (
                <button
                  className={styles.button}
                  onClick={() => {
                    setOnEditId(trip.id);
                    setOnEditNameInput(trip.name);
                  }}
                >
                  edit
                </button>
              )}
              <button
                className={styles.button}
                onClick={async () => await deleteTripById(trip.id)}
              >
                x
              </button>
              <br />
            </div>
          );
        })}
      </div>
    </section>
  );
}
