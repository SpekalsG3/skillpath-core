require('dotenv').config();

const CronJob = require('cron').CronJob;
const Logger = require('./utils/logger');
const SkillsUpdater = require('./jobs/skills-updater');

const callbacksDictionary = {};
async function callBackRunner (f) {
  if (callbacksDictionary[f]) {
    return;
  }
  callbacksDictionary[f] = true;
  await f();
  callbacksDictionary[f] = false;
}

const skillsUpdater = new SkillsUpdater(new Logger('SKILLS-UPDATER'));
async function skillsUpdaterCallback () {
  await skillsUpdater.updateAll();
}

const skillsUpdaterJob = new CronJob('*/10 * * * * *', async () => await callBackRunner(skillsUpdaterCallback)); // every 10 seconds

skillsUpdaterJob.start();
