document.getElementById('delivery-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        fullName: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phoneNo: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pinCode: document.getElementById('pin').value
    };

    try {
        // Fetch user profile
        const userResponse = await fetch('http://localhost:5454/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTkxMzgwMzQsImV4cCI6MzQzODI3Njk2OCwiZW1haWwiOiJzY2phZ2F0aGFjaGlkYW1AZ21haWwuY29tIn0.N_fXtllFsonj3Kb5EjoQCcNHO7kkB-5Sxw8i6-pjE2w',
                'Content-Type': 'application/json'
            }
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user profile: ' + userResponse.statusText);
        }

        const user = await userResponse.json();
        console.log(formData.fullName)

        // Send address data to the server
        const response = await fetch(`http://localhost:5454/api/users/address/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTkxMzgwMzQsImV4cCI6MzQzODI3Njk2OCwiZW1haWwiOiJzY2phZ2F0aGFjaGlkYW1AZ21haWwuY29tIn0.N_fXtllFsonj3Kb5EjoQCcNHO7kkB-5Sxw8i6-pjE2w' 
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to save address: ' + response.statusText);
        }

        //save order
        const order = await fetch("http://localhost:5454/api/order/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTkxMzgwMzQsImV4cCI6MzQzODI3Njk2OCwiZW1haWwiOiJzY2phZ2F0aGFjaGlkYW1AZ21haWwuY29tIn0.N_fXtllFsonj3Kb5EjoQCcNHO7kkB-5Sxw8i6-pjE2w' 
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to save address: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
    }
});
