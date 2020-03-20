async function checkCookie() {
    fetch('http://localhost:5000/welcome', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((res) => {return res})
      .catch((err)=>{return err})
  }