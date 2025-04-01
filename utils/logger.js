const getInfoLog = (method, url) => {
  console.log(`INFO (${new Date(Date.now()).toUTCString()}): ${method} - ${url}`);
};

const getErrorLog = (url) => {
  console.warn(`ERROR (${new Date(Date.now()).toUTCString()}): requested url ${url} doesn't exist.`);
};

const getProcessLog = (message) => {
  console.log(`PROCESS (${new Date(Date.now()).toUTCString()}): ${message}`);
};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};
