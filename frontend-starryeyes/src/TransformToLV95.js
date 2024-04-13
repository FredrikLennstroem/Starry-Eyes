async function convertCoordinatesToLV95(easting, northing) {
    const url = `http://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=${easting}&northing=${northing}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Return the JSON response
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for handling in the caller function
    }
}

export default convertCoordinatesToLV95;
