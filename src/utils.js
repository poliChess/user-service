const statusGood = { status: true, message: "ok" };
const statusBad = (msg) => { return { status: false, message: msg } };

export { statusGood, statusBad };
