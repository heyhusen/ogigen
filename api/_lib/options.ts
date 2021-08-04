import chrome from 'chrome-aws-lambda';

let execPath: string;
switch (process.platform) {
  case 'win32':
    execPath =
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe;';
    break;
  case 'linux':
    execPath = '/usr/bin/chromium';
    break;
  default:
    execPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export default async function getOptions(isDev: boolean) {
  let options: Options;
  if (isDev) {
    options = {
      args: [],
      executablePath: execPath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}
