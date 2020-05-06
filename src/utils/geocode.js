const request = require('request')

const geocode= (address,callback) =>{
    const url= 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address +'.json?access_token=pk.eyJ1Ijoic2F1cmFiaGs5NyIsImEiOiJjazlheWQ0dDAwaGQ2M2xvMHo0c29rbm0xIn0.MjE0M7VCkcDrw5wrIT_XVQ&limit=1'
    // encodeURIComponent(address)   - for address containingspecial characters

    request({ url: url, json:true },(error,response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find location, Try another search. ', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports= geocode