const statusGood = { success: true, message: 'ok' };
const statusBad = (msg) => ({ success: false, message: msg });
const authResponse = (user) => ({ user, ...statusGood })

export { statusGood, statusBad, authResponse };
