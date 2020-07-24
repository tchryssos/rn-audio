const timestampRegex = /^0((0:)?0?)?/
export default (timeString) => (timeString ? timeString.replace(timestampRegex, '') : '')
