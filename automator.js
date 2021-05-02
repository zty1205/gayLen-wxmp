const automator = require('miniprogram-automator');

automator
  .launch({
    projectPath: '../gayLen-wxmp' // 项目文件地址
  })
  .then(async (miniProgram) => {
    const page = await miniProgram.reLaunch('/pages/automator/automator');
    await page.waitFor(500);
    const element = await page.$('.btn');
    // console.log('element = ', element);
    const res = await element.tap();
    console.log('tap res = ', res);

    await miniProgram.close();
  })
  .catch((err) => {
    console.log('automator err = ', err);
  });
