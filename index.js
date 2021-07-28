let logCss = 'background-color:blue; padding: 0 0.5em 0 0.5em; border-radius: 1em; color: white;'
console.log('%cindex.js', logCss, 'loaded')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const regs = await navigator.serviceWorker.getRegistrations()
      if (regs.length == 0) {
        try {
          const reg = await navigator.serviceWorker.register('serviceWorker.js')
          console.log('%cserviceWorker.js', logCss, 'registered')
        } catch (err) {
          console.log('Service worker registration failed: ', err)
        }
      } else {
        regs.forEach(reg => reg.update())
        console.log('%cserviceWorker.js', logCss, 'found')
      }    
    })
  }