// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Initial testing': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementCount('.meal', 8)
      .end();
  },
  'Add Starter': function test(browser) {
    const devServer = browser.globals.devServerURL;
    browser
      .url(devServer)
      .expect.element('#app').to.be.visible.before(1000)
    browser.click('#linkAdd')
      .expect.element('input#newName').to.be.visible.before(1000)
    browser.setValue('input#newName', 'Escudella')
      .setValue('input#newCalorieCount', 30)
      .setValue('input#newDifficulty', 2)
      .setValue('input#newScore', 4)
      .setValue('input#newTime', 120)
      .click('input#newStarter')
      .click('button#newItem')
      .expect.element('.meal[name=Escudella]').to.be.visible.before(1000)
    browser.assert.elementCount('.meal', 9)
      .assert.value('input#newName', '')
      .end()
  },
  'Add Main': function test(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .click('#linkAdd')
      .waitForElementVisible('input#newName', 1000)
      .setValue('input#newName', 'Fricandó')
      .setValue('input#newCalorieCount', 110)
      .setValue('input#newDifficulty', 2)
      .setValue('input#newScore', 4)
      .setValue('input#newTime', 50)
      .click('input#newMain')
      .click('button#newItem')
      .waitForElementVisible('.meal[name=Fricandó]', 1000)
      .assert.elementCount('.meal', 9)
      .assert.value('input#newName', '')
      .end();
  },
  'Add Various Meals': function test(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .click('#linkAdd')
      .waitForElementVisible('input#newName', 1000)
      .setValue('input#newName', 'Escudella')
      .setValue('input#newCalorieCount', 30)
      .setValue('input#newDifficulty', 2)
      .setValue('input#newScore', 4)
      .setValue('input#newTime', 120)
      .click('input#newStarter')
      .click('button#newItem')
      .waitForElementVisible('.meal[name=Escudella]', 1000)
      .setValue('input#newName', 'Bròquil')
      .setValue('input#newCalorieCount', 37)
      .setValue('input#newDifficulty', 0)
      .setValue('input#newScore', 2)
      .setValue('input#newTime', 15)
      .click('input#newStarter')
      .click('button#newItem')
      .waitForElementVisible('.meal[name=Bròquil]', 1000)
      .setValue('input#newName', 'Tallarins')
      .setValue('input#newCalorieCount', 60)
      .setValue('input#newDifficulty', 1)
      .setValue('input#newScore', 2)
      .setValue('input#newTime', 30)
      .click('input#newStarter')
      .click('button#newItem')
      .waitForElementVisible('.meal[name=Tallarins]', 1000)
      .setValue('input#newName', 'Fricandó')
      .setValue('input#newCalorieCount', 110)
      .setValue('input#newDifficulty', 2)
      .setValue('input#newScore', 4)
      .setValue('input#newTime', 50)
      .click('input#newMain')
      .click('button#newItem')
      .waitForElementVisible('.meal[name=Fricandó]', 1000)
      .assert.elementCount('.meal', 12)
      .end();
  }
};
