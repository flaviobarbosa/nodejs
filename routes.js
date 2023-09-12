const users = ['user 1', 'user 2', 'user 3', 'user 4', 'user 5'];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.write('<html>');
  res.write('<head><title>Section 1 assignment</title></head>');

  if (url === '/') {
    res.write('<body>Hello from section 1 assignment!</body>');
    res.write(`<form action='create-user' method='POST'>`);
    res.write(`<input type='text' name='username'>`);
    res.write(`<button type='submit'>Send</button>`);
    res.write(`</form>`);
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.write('<body><ul>');
    users.forEach((user) => res.write('<li>' + user + '</li>'));
    res.write('</ul></body>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
      return res.end();
    });
  }
};

exports.handler = requestHandler;
