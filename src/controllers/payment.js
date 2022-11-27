

const payment = async (req, res) => {
    console.log("ENTRE ACA");
    numberi = Math.floor(Math.random() * 1800) + 1200;
    valid = Math.floor(Math.random() * 100);
    console.log("numberi: " + numberi);
    console.log("valid: " + valid);
    if (valid >= 90) {
        approvedi = false;
    }
    else {
        approvedi = true;
    }
    return res.status(200).json({
        time: numberi,
        approved: approvedi
    }); 
}

module.exports = {

    payment
}