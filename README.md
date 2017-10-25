# jhc
This is project is used as a working example to develop my understanding of the underlying technologies, namely react, node and git.

## Objectives
The purpose of this single page application is to let users know how many days annual leave they will need to take in a given period in order to observe the selected Jewish hoidays, ie a **j**ewish **h**oliday **c**ounter.
Given employees are allocated a certain number of days annual leave in a given 12 month period, the user will need to enter:
* The start date of their working year
* The end date of their working year
* The Jewish festivals to be observed.

The app then runs an ajax call to the server, which returns a table of all jewish holidays that fall in the time period. The results are returned with an additional column indicating whether a day of annual leave is required or not (ie if the festival falls on a weekend/bank holiday). 

The call to the server is only made if the input validation is successful. If not, appropriate error messages are displayed instead.

## Run instructions
To use the app, clone or download the code into your local directory. Then run `yarn install` to ensure all dependencies are correclty installed.

To develop the react elements, webpack has been set up to quickly render client side changes by using the `$ yarn run dev-server` command and navigating to `localhost:8080`

To run the app, run `$ yarn run start` which runs a local server at `localhost:3000`. **Note** if any changes have been made to the `src` or `public` directories, they will need to be rebuilt first using the `$ yarn run build` command.

A testing suite using mocha and expect has been set up to test app functionality. The results can be seen by running the `$ yarn run test` command and new tests can be entered in the tests directory.

