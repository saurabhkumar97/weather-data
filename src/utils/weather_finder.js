const request = require('request')

const weather= (latitude,longitude,callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=ac4c5dfdce37ae3286d24c3bbc10c85d&query=' + latitude + ',' + longitude
    request({ url:url, json:true },(error,response) => {
        //console.log(response.body.current.weather_descriptions[0])
        if(error){
            callback('Unable to connect to Weather server',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                location: response.body.location.name,
                current_Time:response.body.current.observation_time,
                weather_description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feels_like: response.body.current.feelslike,
                prob_of_rain: response.body.current.precip
            }
            )
        }
    })
}

module.exports=weather