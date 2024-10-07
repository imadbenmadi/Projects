async function updateAccessToken(refreshToken) {
    try {
        const response = await fetch('/api/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (response.ok) {
            const { accessToken } = await response.json();
            localStorage.setItem('accessToken', accessToken);
            console.log('Access token updated successfully');
        } else {
            console.error('Failed to update access token');
        }
    } catch (error) {
        console.error('An error occurred while updating the access token:', error);
    }
}