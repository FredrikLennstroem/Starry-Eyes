async function convertCoordinatesToLV95(easting, northing) {
    const url = `http://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=${easting}&northing=${northing}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default convertCoordinatesToLV95;
