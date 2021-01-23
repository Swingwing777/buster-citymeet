# CityMeet 
The objective was to build a React-based progressive web application using Google Calendars.

The principles of test-driven, behaviour-driven development and end-to-end testing were applied.

Serverless functions have been used to authorize and access a CareerFoundry event calendar, with Rechart data visualisation added to allow an intuitive breakdown of events by location and topic.

![Citymeet(450).png](https://sweepback.co.uk/supportfiles/Readme%20Support%20Media%20-%20for%20Sweepback/Citymeet(450).png)

### Tech:

CityMeet is a progressive web app and uses the following open source projects to work:

* [React] - React 16 was used due to incompatibility (at the time) of React 17 with [Enzyme].
* [create-react-app] - A React bootstrapping tool.
* [React-Bootstrap] - Component styling.
* [Node.js] - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [npm] - Build Amazing Things.
* [serverless] Toolkit - To create the serverless functions for hosting on Amazon AWS (or equivalent).
* Testing with:
    * [Enzyme].
    * [Jest].
    * [Cucumber].
    * [Puppeteer]
* [Google Calendar API] - A Career Foundry calendar.
* [Amazon AWS] - Serverless functions (OAuth).
* [Recharts] - Data visualisation.
* Hosting on [GitHub Pages].
* [Dillinger] - The Last Markdown Editor ever.
* And of course CityMeet itself is open source with a [public repository] on GitHub.


----
### Installation:

CityMeet requires [Node.js LTS](https://nodejs.org/) v14+ to build.

Install the latest LTS version of `Node.js`, followed by `React 16`, and then `create-react-app`:
```sh
$ nvm install lts/*
$ npm install react@16.14.0 react-dom@16.14.0
$ npx create-react-app
```
> Note: At time of writing, Enzyme has just been updated for compatibility with React 17.  The Todos list below includes upgrading and retesting with React 17.

----
### App Creation:
In bash, within your portfolio directory, type:
```sh
npx create-react-app <appname> --template cra-template-pwa
```
##### Note:
This is a progressive web application.  In its current iteration (Version 4), `create-react-app` does not create the `server-worker.js` or `serviceWorkerRegistration.js` files by default, hence the addition of the `--template cra-template-pwa` code.

Add the new project to GitHub and then run for the first time by typing:
```sh
npm run start
```
To create a production build later, type:
```sh
npm run build
```
----
### Accounts Needed:

##### Google Calendar API:
To use Google Calendar API, developers should visit Googles API console at `https://console.developers.google.com/` to create an account and new project, including an **OAuth client ID**.

##### Amazon AWS Lamda:
Amazon Lamda is Amazon’s cloud-service provider and requires an account.  Devlopers should follow instructions for creating an account at the [AWS Management Console].

----
### Serverless
Serverless functions were created and deployed using the [Serverless] Toolkit.  Install globally via:
```sh
npm install -g serverless
```
Follow [serverless] documentation for creating and deploying serverless functions.  After creating a separate `auth-server` project (not included in the **CityMeet** repository), but available separately [here], two functions were added to authenticate with and retrieve data from the Google Calendar API:
* getCalendarEvents
* getAccessToken

Integration of the serverless functions into CityMeet can be found in the `/src/_support_/api.js` file.

----
### Test Driven Development
![CityMeet_Test_Coverage(450).png](https://sweepback.co.uk/supportfiles/Readme%20Support%20Media%20-%20for%20Sweepback/CityMeet_Test_Coverage(450).png)
##### Installation
Unit testing was completed using Jest, which is incliuded by default in [create-react-app].  No additional installation is required.  To run tests, type:
```sh
npm run test
```
To check test coverage, type:
```sh
npm test -- --coverage
```
[Enzyme] is a JavaScript testing utility for React recommended by [Jest].  To install:
```sh
npm i --save-dev enzyme enzyme-adapter-react-16
```
> Note: At time of coding (Nov 2020), no official `enzyme-adapter-react-17` exists, hence the use of React 16. The situation is fast changing, however.
##### Testing
Shallow and full rendering was used to complete unit and integration testing.  See: `src/_tests_/*` for the complete test files.

----
### Behaviour-Driven Development
Behaviour-Driven Development was applied with the aid of [Jest-Cucumber], a Cucumber-based library that can be added on top of Jest as an alternative to vanilla Cucumber.js (which does not come with its own assertion library).

To install, type:
```sh
npm install jest-cucumber --save-dev
```
Acceptance tests can be found in directory: /src/_features_/*.  Both `Gherkin` (ie`.feature`) and `.test.js` files are included.

----
### End-to-End Testing
End-to_end testing was completed using [Puppeteer], which automatically installs the most recent version of Chromium browser.  

To install, type:
```sh
npm install --save-dev puppeteer
```
An end-to-end test file was created.  This can be found at `/src/_tests_/EndToEnd.test.js`.  Then to run Puppeteer, type:
```sh
node EndToEnd.test.js
```
**Note**: WSL1 and WSL2 users may experience failure issues when trying to run Puppeteer for the first time.  The problem relates to missing files.  I am grateful to the following (extremely comprehensive and well-written) [Puppeteer solution].

The [Puppeteer API] can be used to interact with the Chromium browser to allow for more realistic end-to-end testing.

----
### Data Visualisation
Data visualisation was acheived through use of [Recharts], which offers a comprehensive choice of charting solutions.

To install:
```sh
npm install recharts
```
----
### Privacy Policy
This project is for developer education purposes only, with all Calendar API data provided by Career Foundry.

No user information is requested, accessed, stored or otherwise retained by the developer or the developer code. Allowing app access to a user's Google account is needed solely by Google to view the app's functionaility (including that of the AWS hosted serverless functions used to obtain an access token). Any information exchanged in the authorization process is entirely between the user and Google, and not shared with or stored by the developer or buster-citymeet in any way of form.

Access can be cancelled at any time by the user via their Google account settings.

----
### Todos

 - Update and retest with React 17
----
License 
----

##### DWhal
* Email via GitHub.
* [GitHub]
* [LinkedIn]
* [Twitter]



   [Dillinger]: <https://github.com/joemccann/dillinger>
   [Node.js]: <https://nodejs.org/en/>
   [npm]: <https://www.npmjs.com/>
   [Amazon AWS]: <https://aws.amazon.com/>
   [AWS Management Console]: <https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2#>
   [Enzyme]: <https://www.npmjs.com/package/enzyme>
   [Jest]: <https://jestjs.io/>
   [here]: <https://github.com/Swingwing777/auth-server>
   [Jest-Cucumber]: <https://cucumber.io/>
   [Puppeteer solution]: <https://www.publish0x.com/dev/how-to-resolve-puppeteer-dependencies-like-error-while-loadi-xwnjgee>
   [Puppeteer API]: <https://github.com/puppeteer/puppeteer#usage>
   [React]: <https://reactjs.org/>
   [Recharts]: <http://recharts.org/en-US/>
   [React Bootstrap]: <https://react-bootstrap.github.io/>
   [create-react-app]: <https://create-react-app.dev/>
   [serverless]: <https://www.serverless.com/framework/docs/getting-started/>
   [Google Calendar API]: <https://developers.google.com/calendar>
   [Atatus]: <https://www.atatus.com/>
   [public repository]: <https://github.com/Swingwing777/buster-citymeet>
   [GitHub Pages]: <https://swingwing777.github.io/buster-citymeet/>
   [GitHub]: <https://github.com/Swingwing777/buster-citymeet>
   [LinkedIn]: <linkedin.com/in/david-hales-3450305a>
   [Twitter]: <https://twitter.com/dwhal>

  
