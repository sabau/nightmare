require('mocha-generators').install();

var Nightmare = require('nightmare');
var config = require('../config/dev-lunaria-it');
var should = require('chai').should();

describe ('login and logout to some environment', function() {
    
    describe ('login and logout', function () {
        
        var nightmare;
        
        beforeEach (function() {
            nightmare = Nightmare();
        });
        
        afterEach (function*() {
            yield nightmare.end();
        });
        
        it ('login', function*() {
    
            let location = yield nightmare
                .viewport(1024, 768)
                .goto(config.app.login.url)
                .wait()
                .type('input#user', config.app.login.username)
                .type('input#password', config.app.login.password)
                .click('#login')
                .wait(250)
                .screenshot('./logs/screenshots/login.png')
                .wait(250)
                .evaluate(function () {
                    return location.origin + location.pathname;
                })
            ;
    
            location.should.eql(config.app.login.url);
        });
        
        it ('logout', function*() {
    
            let location = yield nightmare
                .goto(config.app.login.url)
                .wait()
                .click('#logout')
                .wait(250)
                .screenshot('./logs/screenshots/logout.png')
                .wait(250)
                .evaluate(function () {
                    return location.origin + location.pathname;
                })
            ;
    
            location.should.eql(config.app.logout.url);
        });
        
    });
    
});