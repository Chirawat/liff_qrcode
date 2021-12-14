var UID;

async function sendMsg(name, time) {
    if (liff.getContext().type !== "none" && liff.getContext().type !== "external") {
        await liff.sendMessages([{
            "type": "text",
            "text": 'ลงเวลามาเรียนสำเร็จ\n' + name + '\n' + time
        }])
    }
}

async function main() {

    await liff.init({ liffId: "1656646368-2QL0wVaq" });

    const queryString = decodeURIComponent(window.location.search);

    const params = new URLSearchParams(queryString);

    if (params.get("param") !== null) {
        const profile = await liff.getProfile();

        var ts = parseInt(params.get("param"));
        var d = new Date(ts * 1000);
        var today = new Date();

        console.log("time diff=")
        console.log( today.getMinutes() - d.getMinutes() );

        if (d.getDate() !== today.getDate() || 
            today.getMinutes() - d.getMinutes() > 1) {

            //if (window.confirm('QR Code ไม่ถูกต้อง')) {
            if (alert('QR Code ไม่ถูกต้อง\nความซื่อสัตย์เป็นเครื่องหมายของคนดี')) {
                liff.closeWindow();
            } else {
                liff.closeWindow();
            }

        }


        console.log(d);

        //$("#userId").append(profile.userId)

        $.ajax({
            url: "https://docs.google.com/spreadsheets/d/1FXXk80ECzWbOiiNBXMngZyC79vjXZu8sDYLnvJQBVd0/export?format=csv",
            success: function(result) {
                $('#spinner').hide();
                if (result.indexOf(profile.userId) > 1) {
                    lines = result.split('\r\n');
                    lines.map((data) => {
                        var field = data.split(',');
                        if (field[0] === profile.userId) {


                            var name = field[2] + field[3] + '  ' + field[4];
                            $('#name').append(name);
                            var now = new Date();
                            $('#time').append(now.toLocaleTimeString());

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

                            sendMsg(name, now.toLocaleString());

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
    } else {
        alert('qr code ไม่ถูกต้อง');
        liff.closeWindow();
    }
}

main();