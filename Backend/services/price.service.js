const {BASE_PRICE,MIN_FARE,PRICE_PER_KM,PRICE_PER_MIN}=require('../config/price.js');
module.exports.calculateFare=(distance, duration)=>{
    const total_fare=BASE_PRICE+(distance*PRICE_PER_KM)+(duration*PRICE_PER_MIN);
    return total_fare<MIN_FARE ? MIN_FARE : Math.round(total_fare);
}