let weather = {apiKey: "9f23b56e8dcad8299bf4e5a2a3fc932b", //  OpenWeatherMap API key
    pexelsApiKey: "UOXnmRY7SJnvyv5P36zpYYbLKWUsC6lYiezQjYJaBX0VJBuBokJQfT5I", //  Pexels API key
  
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
  
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];    
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        this.fetchBackgroundImage(name);
        document.querySelector(".weather").classList.remove("loading");
    },
    fetchBackgroundImage: function (query) {
      const url =`https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`; // Adding "&orientation=landscape" to request landscape-oriented images
      fetch(url, {
          headers: {
              Authorization: this.pexelsApiKey
          }
      })
          .then((response) => response.json())
          .then((data) => {
              const imageUrl = data.photos[0].src.large2x + "?w=1800"; // Requesting a 2000px wide image
              document.body.style.backgroundImage =` url('${imageUrl}')`;
             //const bg=document.body.style;
             //bg.backgroundRepeat='no-repeat';
             //bg.backgroundSize="contain,cover";
          })
          .catch((error) => {
              console.error("Error fetching background image:", error);
          });
  },
  
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
  
  //weather.fetchWeather("Delhi");