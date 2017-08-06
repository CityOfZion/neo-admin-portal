const path = require('path');
const meteorDir = path.resolve(process.env.METEOR_SHELL_DIR + '/../../../../');
const {spawn, exec} = require('child_process');
const isWin = /^win/.test(process.platform);

import checkRole from '/imports/helpers/check-role.js';

const update = Meteor.bindEnvironment(function(query, data) {
  Bots.update(query, data);
});

const log = Meteor.bindEnvironment(function(data) {
  console.log(data);
  //BotLogs.insert(data);
});

Meteor.methods({
  startBot(name) {
    if (!checkRole('admin')) {
      return;
    }
    
    const botInfo = Bots.findOne({name: name});
    
    if(botInfo) {
      const bot = spawn('node', botInfo.arguments, {
        cwd: botInfo.path,
        shell: true,
        detached: true
      });
      
      console.log('starting bot', name, bot.pid);
      update({name: name}, {
        $set: {
          processId: bot.pid,
          status: 'started',
          startDate: new Date()
        }
      });
  
      bot.stdout.on('data', (data) => {
        console.log('DATA', name);
        log({
          bot: name,
          log: data.toString(),
          type: 'data',
          place: 'bot',
          logDate: new Date()
        });
      });
  
      bot.stderr.on('error', (data) => {
        console.log('ERROR', name);
        update({name: name}, {
          $set: {
            status: 'stopped',
            processId: ""
          }
        });
        log({
          bot: name,
          log: data.toString(),
          type: 'error',
          place: 'bot',
          logDate: new Date()
        });
      });
  
      bot.on('close', (code, msg) => {
        if(code === 0) {
          update({name: name}, {
            $set: {
              status: 'stopped',
              processId: ""
            }
          });
        }
        log({
          bot: name,
          code: code.toString(),
          msg: msg ? msg.toString() : 'exited',
          type: 'exit',
          place: 'bot',
          logDate: new Date()
        });
      });
    }
  },
  installBot(name) {
    if (!checkRole('admin')) {
      return;
    }
    const botDir = path.resolve(meteorDir + '/bots/' + name);
  
    const bot = Bots.findOne({name: name});
    const {repository} = bot;
    
    const clone = require('git-clone');
  
    let cmd = isWin ? 'cmd' : 'terminal';
  
    clone(repository, botDir, function () {
      const ls = spawn(cmd, [], {shell: true});
      
      ls.stdin.write(`cd ${botDir} \n`);
      ls.stdin.write('npm install\n');
      
      ls.stdin.end('install', 1);
      ls.stdout.on('data', (data) => {
        log({
          bot: name,
          log: data.toString(),
          type: 'data',
          place: 'install',
          logDate: new Date()
        });
      });
      
      ls.stderr.on('error', (data) => {
        log({
          bot: name,
          log: data.toString(),
          type: 'error',
          place: 'install',
          logDate: new Date()
        });
      });
      
      ls.on('close', (code, msg) => {
        if(code === 0) {
          update({name: name}, {
            $set: {
              path: botDir,
              installed: true,
              status: 'stopped'
            }
          });
        }
        log({
          bot: name,
          code: code.toString(),
          msg: msg ? msg.toString() : 'exited',
          type: 'exit',
          place: 'install',
          logDate: new Date()
        });
      });
    });
    
  },
  stopBot(name) {
    if (!checkRole('admin')) {
      return;
    }
    
    console.log('stopped bot ', name);
    
    const bot = Bots.findOne({name: name});
    
    console.log('trying to kill task: ' + bot.processId);
    spawn("taskkill", ["/pid", bot.processId, '/f', '/t']);
  
    update({name: name}, {
      $set: {
        status: 'stopped',
        dateStopped: new Date(),
        processId: ""
      }
    });
  },
  updateBot(name) {
    Meteor.call('stopBot', name, function() {
      Meteor.call('installBot', name, function() {
        
      })
    })
  }
});