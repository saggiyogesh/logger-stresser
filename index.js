const express = require('express')
const app = express();
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);


const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Hello world log', new Date());
});

let stressing = false
app.get('/hike', async (req, res) => {
  if (stressing) {
    return res.send('Already Running Stress')
  }
  stressing = true;
  const { stdout, stderr } = await exec('stress --vm 1 --vm-bytes 512M --timeout 30s ');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
  stressing = false;
  res.send('Stressing Done')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


if (process.env.Label) {
  let i = 0;
  setInterval(() => {
    console.log(process.env.Label, i++);
  }, 10000);
}