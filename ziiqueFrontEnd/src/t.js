function getInterval(bpm)
{
  let result = [];
  let bps = bpm / 60
  let interval = 1/ bps
  for (let i = 0; i < 16; i++) {
    let it = interval * i
    result.push(it)
  }
  return result
}

console.log("120: " + getInterval(120)[1])
console.log("240: " + getInterval(240)[1])
console.log("320: " + getInterval(320)[1])
console.log(getInterval(120)[15])
console.log(getInterval(120).length)

