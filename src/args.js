export default () => {
  if (process.argv.length !== 5) {
    return
  }

  const [,, protocol, method, data] = process.argv
  return {
    protocol,
    method,
    data
  }
}
