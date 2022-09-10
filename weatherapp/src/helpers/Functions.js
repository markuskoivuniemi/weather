
export function PresentTemperature(temperature){
    const roundedTemperature = Math.round(temperature)
    const degreeIndicator = roundedTemperature <= 0 ? "-" : "+"
    const celsius = `${degreeIndicator}${roundedTemperature}\u00B0`

    return celsius
}