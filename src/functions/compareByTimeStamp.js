function compareByTimeStamp(a, b) {
    // Porovnává hodnoty 'value' v objektech
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  }

  export default compareByTimeStamp