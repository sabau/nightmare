require('mocha-generators').install();

const Nightmare = require('nightmare');
const config = require('../config/dev-lunaria-it');

describe ('login and logout to some environment', function() {
    
    describe ('login and logout', function () {
        
        let nightmare;
        
        beforeEach (function() {
            nightmare = Nightmare({
                width: 1900,
                height: 1200,
                waitTimeout: 60000,
                webPreferences:{
                    partition: 'tb_crm35'
                },
                //show: true,
            });
        });
        
        afterEach (function*() {
            yield nightmare.end();
        });
        
        it ('login', function*() {
            let location = yield nightmare
                .goto(config.app.login.url)
                .insert('input#user', config.app.login.username)
                .insert('input#password', config.app.login.password)
                .click('#login')
                .wait('#menuContent > ul > li[name="Home"]')
                .evaluate(function () {
                    return location.origin + location.pathname;
                })
            ;
            location.should.eql(config.app.url);
        });
        
        it ('logout', function*() {
            let location = yield nightmare
                .goto(config.app.url)
                .wait('input#user')
                .insert('input#user', config.app.login.username)
                .insert('input#password', config.app.login.password)
                .click('#login')
                .wait('#menuContent > ul > li[name="Home"]')
                .wait('div.nav.nav-header.user.pull-right > ul > li > a')
                .click('div.nav.nav-header.user.pull-right > ul > li > a')
                .wait('#logout')
                .click('#logout')
                .wait('input#user')
                .evaluate(function () {
                    return location.origin + location.pathname;
                })
            ;
            location.should.eql(config.app.login.url);
        });
    
        it ('Bad login', function*() {
            let error = yield nightmare
                .goto(config.app.login.url)
                .insert('input#user', 'ME_NO_EGSISTS')
                .insert('input#password', config.app.login.password)
                .click('#login')
                .wait('p#error')
                .evaluate(function () {
                    return document.querySelector('#error span').innerText;
                })
            ;
            error.should.eql(config.app.login.invalid);
        });
        
    });
    
});