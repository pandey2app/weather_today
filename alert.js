
let checkWeatherAlert;
let showWeatherAlert;
function loaderAlert() {
    if ("Notification" in window) {
        // Request permission to display notifications
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                // Function to show weather alert notification
                showWeatherAlert = function (city, condition, icon, image) {
                    new Notification(`Weather Alert for ${city}`, {
                        body: `Alert: ${condition}`,
                        icon: icon,
                        image: image,
                    });
                }
            }
        });
    } else {
        console.log("Notifications not supported.");
    }

    checkWeatherAlert = function (city, condition){
        // Checking weather data for alert conditions
        if (condition.toLowerCase().includes('thunder') && condition.toLowerCase().includes('heavy rain')) {
            showWeatherAlert(city, "Moderate Thunder and Heavy Rain Warning!",'./images/rain.png','./images/notification-image.jpg');
            return;
        }
        if (condition.toLowerCase().includes('heavy rain')) {
            showWeatherAlert(city, "Heavy Rain Warning!",'./images/rain.png','./images/notification-image.jpg');
        }
        if (condition.toLowerCase().includes('thunder')) {
            showWeatherAlert(city, "Thunder Warning!",'./images/thunder.png','./images/notification-image.jpg');
        }
    }
}
loaderAlert();
export {
    checkWeatherAlert,
    loaderAlert
}
