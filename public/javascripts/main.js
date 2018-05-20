$(function () {

    $('#post-delete-btn').on('click', () => {
        let ans = confirm("Are you sure?");
        if (ans === true) {
            return true;
        } else {
            return false;
        }
    });
});
