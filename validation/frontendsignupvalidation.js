function validate() {
    const pass = document.getElementById('password').value;
    const Pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let show = document.getElementById('show');
    let showconfirm = document.getElementById('showconfirm');
    let confirm = document.getElementById('confirmPassword').value;
    let values = pass;

    const test = Pattern.test(values);

    if (!test) {
        show.style.display = "block";
        return false;
    } else if (pass !== confirm) {
        showconfirm.style.display = "block";
        return false;
    } else {
        show.style.display = "none";
        showconfirm.style.display = "none";
        return true;
    }
}

