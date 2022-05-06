const statusGood = { success: true, message: 'ok' };
const statusBad = (msg) => ({ success: false, message: msg });
const userResponse = (user) => ({ user, ...statusGood })

export { statusGood, statusBad, userResponse };
