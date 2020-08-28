function takeScreenshot() {
  if (window.callPhantom) {
    const date = new Date()
    const filename = `screenshots/${date.getTime()}`
    console.log(`Taking screenshot ${filename}`)
    callPhantom({ screenshot: filename })
  }
}
takeScreenshot()
