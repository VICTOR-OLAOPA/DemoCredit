const { exec } = require('child_process');

module.exports = async (req, res) => {
  exec('npm run migrate', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
    res.status(200).send(`Migrations completed: ${stdout}`);
  });
};
