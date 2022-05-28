const statusGood = { success: true, message: 'ok' };
const statusBad = (msg) => ({ success: false, message: msg });
const userResponse = (user) => ({ user, ...statusGood })

// converts google id to mongo objectId
const convertId = (id) => (id + ('f'.repeat(24 - id.length)));

export { statusGood, statusBad, userResponse, convertId };
