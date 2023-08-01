// import {
//   createTrip,
//   deleteTripById,
//   getTripById,
//   getTripsWithLimitAndOffsetBySessionToken,
//   updateTripById,
// } from '../database/trips';

// export default async function testDatabaseFunctions() {
//   try {
//     // Test getTripsWithLimitAndOffsetBySessionToken function
//     const trips = await getTripsWithLimitAndOffsetBySessionToken(
//       10,
//       0,
//       'sampleSessionToken',
//     );
//     console.log('getTripsWithLimitAndOffsetBySessionToken result:', trips);

//     // Test createTrip function
//     const newTrip = await createTrip('New Trip', 1);
//     console.log('createTrip result:', newTrip);

//     // Test getTripById function
//     const tripIdToRetrieve = 1; // Use the ID from the newly created trip
//     const retrievedTrip = await getTripById(tripIdToRetrieve);
//     console.log('getTripById result:', retrievedTrip);

//     // Test deleteTripById function
//     const tripIdToDelete = 1; // Use the ID from the newly created trip
//     const deletedTrip = await deleteTripById(tripIdToDelete);
//     console.log('deleteTripById result:', deletedTrip);

//     // Test updateTripById function
//     const tripIdToUpdate = 1; // Use the ID from the retrieved trip
//     const updatedTrip = await updateTripById(tripIdToUpdate, 'Updated Trip', 1);
//     console.log('updateTripById result:', updatedTrip);
//   } catch (error) {
//     console.error('Error occurred:', error);
//   }
// }
