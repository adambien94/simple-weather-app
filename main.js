var myData;
        var cityName = document.getElementById('city-name');
        var cityDate = document.getElementById('date');
        var dataBox = document.getElementById('data');
        var mainIcon = document.getElementById('main-icon');
        var windArrow = document.getElementById('wind-icon');
        var input = document.getElementById('city-input');
        var loading = document.getElementById('loading');
        var poka = document.getElementById('check');
        var temp = document.getElementById('temp');
        var pressure = document.getElementById('pressure');
        var humidity = document.getElementById('humidity');
        var wind = document.getElementById('wind');
        var forecastDay1 = document.getElementById('day1-day');
        var forecastDay2 = document.getElementById('day2-day');
        var forecastDay3 = document.getElementById('day3-day');
        var forecastDay4 = document.getElementById('day4-day');
        var forecastDay5 = document.getElementById('day5-day');
        var forecastDays = [forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5];
        var days = ['Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pią.', 'Sob.', 'Niedz.'];
        var tempUnit = 'C';
        var windUnit = 'm/s';
        var metricBtn = document.getElementById('metric-btn');
        var imperialBtn = document.getElementById('imperial-btn');
        var myRequest = new XMLHttpRequest();
        var http = 'https://openweathermap.org/data/2.5/weather?q=';
        var city;
        var appid = '&appid=b6907d289e10d714a6e88b30761fae22';
        var units = '';
        var url;
        var city2;


        poka.addEventListener('click', function() {
            showData();
            city = document.getElementById('city-input').value = 'City..';
        });

        input.addEventListener('click', function() {
            input.value = "";
        });

        imperialBtn.addEventListener('click', function() {
            units = '&units=imperial';
            windUnit = 'miles/h';
            tempUnit = 'F';
            changeUnits();
            imperialBtn.style.color = '#C6C6C6';
            metricBtn.style.color = '#000';
        });

        metricBtn.addEventListener('click', function() {
            units = '&units=metric';
            windUnit = 'm/s';
            tempUnit = 'C';
            changeUnits();
            imperialBtn.style.color = '#000';
            metricBtn.style.color = '#C6C6C6';
        });

        function showData() {
            city = document.getElementById('city-input').value;
            if (city == 'city..' || city == '') {
                alert('Enter City');
            } else {
                city2 = city;
                url = http + city + appid + units;
                loading.classList.toggle('loading-display');
                doRequest();
            }
        }

        function changeUnits() {
            url = http + city2 + appid + units;
            loading.classList.toggle('loading-display');
            doRequest();
        }

        function doRequest() {
            myRequest.open('GET', url);
            myRequest.onload = function() {
                myData = JSON.parse(myRequest.responseText);
                printData();
                dataBoxDisplay();
                loading.classList.toggle('loading-display');
            };
            myRequest.send();
        }

        function printData() {
            var x = Math.pow(10, 1);
            var temperature = Math.round(x * myData.main.temp) / x;
            var windDeg = myData.wind.deg;
            windArrow.style.transform = "rotate(" + windDeg + "deg)";
            temp.innerHTML = temperature + '&deg' + tempUnit;
            pressure.innerHTML = myData.main.pressure + ' hPa';
            humidity.innerHTML = myData.main.humidity + '%';
            wind.innerHTML = myData.wind.speed + ' ' + windUnit;
            cityName.innerHTML = myData.name + ', ' + myData.sys.country;
            var iconId = myData.weather[0].icon;
            mainIcon.style.background = "url('img/" + iconId + ".png')";
            mainIcon.style.backgroundSize = 'cover';
        }

        function dataBoxDisplay() {
            dataBox.classList = "data-display";
        }

        setInterval(function() {
            var date = new Date();
            updateTime(date);
        }, 1000);

        function updateTime(date) {
            var day = date.getDay();
            var dayCount = day - 1;
            switch (day) {
                case 0:
                    day = 'niedziela';
                    break;
                case 1:
                    day = 'poniedziałek';
                    break;
                case 2:
                    day = 'wtorek';
                    break;
                case 3:
                    day = 'środa';
                    break;
                case 4:
                    day = 'czwartek';
                    break;
                case 5:
                    day = 'piątek';
                    break;
                case 6:
                    day = 'sobota';
                    break;
            }
            var hours = date.getHours();
            var minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            } else if (hours < 10) {
                hours = '0' + hours;
            }
            var time = day + ', ' + hours + ':' + minutes;
            cityDate.innerHTML = time;
            for (var i = 0; i < 5; i++) {
                dayCount++;
                if (dayCount > 6) {
                    dayCount = 0;
                }
                forecastDays[i].innerHTML = days[dayCount];
            }
        }