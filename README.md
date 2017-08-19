<p align="center">
  <img 
    src="http://res.cloudinary.com/vidsy/image/upload/v1503160820/CoZ_Icon_DARKBLUE_200x178px_oq0gxm.png" 
    width="125px"
  >
</p>

<h1 align="center">NEO Admin Portal</h1>

<p align="center">
  NEO Admin portal for developers
</p>

## How to use
 - Install Meteor JS
 - Do meteor npm install inside the main folder
 - Start meteor with `meteor run`
 - You will have to install a MongoDB client (I use MongoBooster)
 - Use the tool to connect to your local database (localhost:3001)
 - Create the collection `meteor_accounts_loginServiceConfiguration`
 - Execute the following query
 ```
 db.meteor_accounts_loginServiceConfiguration.insert({
  "service" : "slack",
  "clientId" : "your_slack_client_id",
  "secret" : "your_slack_secret",
  "loginStyle" : "popup"
 });
```
- You should now be able to use the script.
**However, slack requires you to specify a publicly available endpoint! Make sure you check your app settings on slack.**
 
## Roadmap
### Version 0.1
- [x] Slack login
- [x] FAQ questions management
- [x] Admin portal interface
- [ ] Admin portal interface NEO style

### Version 0.2
- [x] Slack invite management
- [x] User profile management
- [x] Bot status page
- [x] Bot stop/start

### Version 0.3
- [ ] Suspicious user management (find bots/spammers/etc)
- [ ] Reward management
- [ ] User project management

### Version 0.4
- [ ] Integrate wallet system

### Version 0.5
- Pending
