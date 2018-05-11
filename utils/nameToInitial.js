// changes the name of the person to its initials to be displaced cooly on the card
const nameToInitial = str => {
  return str
    .split(' ')
    .map(word => word.slice(0, 1))
    .join('')
}

export default nameToInitial
