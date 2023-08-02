'use client';
import { useEffect, useState } from 'react';
import { Trip } from '../../database/trips';
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

  useEffect(() => {
    // Your component update code here (if needed)
    // For example, you can log the updated state:
    console.log('Updated tripList:', tripList);
    console.log('Updated onEditId:', onEditId);
    console.log('Updated onEditNameInput:', onEditNameInput);
  }, [tripList, onEditId, onEditNameInput]);

  async function createTrip() {
    const response = await fetch('/api/createTrip', {
      method: 'POST',
      body: JSON.stringify({
        name: nameInput,
      }),
    });

    const data = await response.json();
    console.log(data);
    setTripList([...tripList, data.trip]);
  }

  async function deleteTripById(id: number) {
    try {
      const response = await fetch(`/api/deleteTrip`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the id in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to delete trip');
      }

      // If the API call is successful, update the tripList state
      setTripList((prevTripList) =>
        prevTripList.filter((trip) => trip.id !== id),
      );
    } catch (error) {
      console.error('Error deleting trip:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
  }

  async function updateTripById(id: number) {
    try {
      const response = await fetch(`/api/updateTrip`, {
        method: 'PUT',
        body: JSON.stringify({
          name: onEditNameInput,
          id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update trip');
      }

      const data = await response.json();

      // Ensure that the data object contains the trip information
      if (!data.trip) {
        throw new Error('Invalid response data: trip information not found');
      }

      setTripList((prevTripList) =>
        prevTripList.map((trip) => {
          if (trip.id === data.trip.id) {
            return data.trip;
          }
          return trip;
        }),
      );
    } catch (error) {
      console.error('Error updating trip:', error);
      // Handle the error here (e.g., show an error message to the user)
    }
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
                    await updateTripById(Number(trip.id));
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
                onClick={async () => await deleteTripById(Number(trip.id))}
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
