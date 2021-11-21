var UID;

async function main() {

    await liff.init({ liffId: "1656646368-2QL0wVaq" });

    const queryString = decodeURIComponent(window.location.search);

    const params = new URLSearchParams(queryString);

    if (params.get("param") !== null) {
        const profile = await liff.getProfile();

        //$("#userId").append(profile.userId)

        $.ajax({
            url: "https://docs.google.com/spreadsheets/d/1FXXk80ECzWbOiiNBXMngZyC79vjXZu8sDYLnvJQBVd0/export?format=csv",
            success: function(result) {
                if (result.indexOf(profile.userId) > 1) {
                    lines = result.split('\r\n');
                    lines.map((data) => {
                        var field = data.split(',');
                        if (field[0] === profile.userId) {

                            $('#name').append(field[2] + field[3] + '  ' + field[4]);
                            var now = new Date();
                            $('#time').append(now.toLocaleTimeString());

                            $('#spinner').hide();

                            // get students data
                            var url = 'https://docs.google.com/forms/d/e/1FAIpQLScH94bKiIR54tzzWDd8dkvvTka_TkHJjb5RS6Ka2YvuOtS_jQ/formResponse?usp=pp_url&entry.448259260=' +
                                profile.userId + '&entry.58029896=' +
                                field[1] + '&entry.670271101=' +
                                params.get("param") + '&entry.325908539=' +
                                field[2] + field[3] + '  ' + field[4] + '&entry.718694407=' +
                                field[6] + '&entry.719468585=' +
                                field[7] + '&submit=Submit';

                            $('#status').text('สำเร็จ!');
                            $("#close-button").css("display", "inline");

                            // // save to google sheet
                            var xmlHttp = new XMLHttpRequest();
                            xmlHttp.open("GET", url, false); // false for synchronous request
                            xmlHttp.send(null);


                        }
                    });

                } else {
                    alert('ไม่พบบัญชี กรุณาลงทะเบียนก่อนใช้งาน')
                }
            }
        });
    }
}

main();