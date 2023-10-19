// Function to display playdate listings
let playdates = [];

// Function to display playdate listings
function displayPlaydates() {
    const playdateList = document.getElementById("playdate-list");
    playdateList.innerHTML = '';

    if (playdates.length === 0) {
        const noPlaydatesMessage = document.createElement("li");
        noPlaydatesMessage.textContent = "No playdates found.";
        playdateList.appendChild(noPlaydatesMessage);
    } else {
        playdates.forEach((playdate, index) => {
            const li = document.createElement("li");
            li.textContent = `Playdate ${index + 1}: Pet: ${playdate.petName}, Type: ${playdate.petType}, Date: ${playdate.date}, Location: ${playdate.location}`;
            playdateList.appendChild(li);
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // Register form
    const registrationForm = document.getElementById("registration-form");
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Handle registration here
    });

    // Login form
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Handle login here
    });

    // Create playdate form
    const playdateForm = document.getElementById("playdate-form");
    playdateForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form input values
        const petName = document.getElementById("pet-name").value;
        const petType = document.getElementById("pet-type").value;
        const date = document.getElementById("date").value;
        const location = document.getElementById("location").value;

        // Simulate adding a playdate to the array
        playdates.push({ petName, petType, date, location });

        // Clear the form fields
        document.getElementById("pet-name").value = "";
        document.getElementById("pet-type").value = "";
        document.getElementById("date").value = "";
        document.getElementById("location").value = "";

        // Update the display of playdates
        displayPlaydates();
    });

    // Display playdates immediately when the page loads
    displayPlaydates();
});
