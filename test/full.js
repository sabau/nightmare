// const Nightmare = require('nightmare');
// const assert = require('assert');
//
// let url = 'http://127.0.0.1:8080';
//
// describe('UI Flow Tests', function() {
//     this.timeout('200s');
//    
//     let nightmare = null;
//     beforeEach(() => {
//         nightmare = new Nightmare({
//             width: 1900,
//             height: 1200,
//             show: true,
//             openDevTools: {
//                 //mode: 'detach'
//             },
//             dock: true
//         })
//     });
//    
//     describe('Public Pages', function() {
//         describe('/auth (Login Page)', () => {
//             it('should load without error',  done => {
//                 nightmare.goto(url)
//                     .end()
//                     .then(done)
//                     .catch()
//             })
//         })
//     });
//    
//     describe('Login Page', function () {
//         describe('given bad data', () => {
//             it('should not login', done => {
//                 nightmare
//                     .goto(url)
//                     .on('page', (type, message) => {
//                         if (type === 'alert') done()
//                     })
//                     .wait('input#user')
//                     .insert('#user', 'notgonnawork')
//                     .insert('#password', 'invalid password')
//                     .click('.login-submit')
//                     .wait('.spinner')
//                     .exists('h1.title')
//                     //execute the chain
//                     .then((exists) => {
//                         //assert existence
//                         assert(exists === true, 'We are back at login page');
//                     })
//                     .wait('div#login-forn')
//                     .then(() => {
//                         return nightmare.exists('p.error')
//                     })
//                     .then((exists) => {
//                         assert(exists === true, 'We have an error due to wron g credentials');
//                     })
//                     .end()
//                     .then(() => done())
//                     .catch(done)
//             })
//         })
//     });
//    
//     describe('Using the App', function () {
//         describe('signing up and finishing setup', () => {
//             it('should work without timing out', done => {
//                 nightmare
//                     .goto(url)
//                     .wait('input#user')
//                     .insert('#user', 'cfp\\lundbeck.tbadmin')
//                     .insert('#password', 'be careful')
//                     .click('#login')
//                     .wait('#menuContent > ul > li.menu-item.active.expanded')
//                     .wait('#form-container > div.header > div.header-cell.title-label > span')
//                     .click('#menuContent > ul > li[name="GIP"] > a')
//                     .click('#menuContent > ul > li[name="GIP"] > ul > li[name="InitiativeList"] > a')
//                     .wait('form.grid-form > table.table.dataTable > tbody')
//                    
//                     .end()
//                     .then(result => { done() })
//                     .catch(done)
//             })
//         })
//     })
// });