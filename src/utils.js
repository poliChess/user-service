const statusGood = { success: true, message: 'Ok' };
const statusBad = (msg) => { return { success: false, message: msg } };
const authResponse = (usr) => { return { success: true, message: 'Ok', user: usr} }

export { statusGood, statusBad, authResponse };
