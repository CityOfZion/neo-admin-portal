Meteor.methods({
  startSlackbot() {
    const spawn = require('child_process').spawn;
    const slackBot = spawn('node', [process.env.METEOR_SHELL_DIR + '/../../../imports/slack-bot/index']);
    slackBot.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    slackBot.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    slackBot.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
});