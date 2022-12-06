function generateTime(bpm, note)
{
  let posR;
  let bps;
  let result;
  bps = bpm / 60
  console.log("bps: " + bps)

  let splitNote;
  splitNote = note.charAt(0)
  let posNum;
  console.log("pos: " + posNum)
  posNum = Number(splitNote)

  posR = 1 / bps
  result = posR * posNum
  console.log(result)
  return result
}

let r = generateTime(120,"10B")


console.log(r)
