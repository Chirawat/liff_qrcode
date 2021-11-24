function requestForData() {
    $('#spinner').show();

    var nationalId = $('#nationalId').val();
    var lineId = $('#lineId').val();


    $.get(
        "https://script.google.com/macros/s/AKfycbyjU9DInnvLvSWEaLAv6TMg3Q-GX_oW0_OmFPpay3gFA9i6m5eURdXOVqUv3JbMzdc/exec", {
            id: nationalId,
            userId: lineId
        },
        function(data) {
            $('#spinner').hide();

            //$('#result').show();
            document.getElementById("result").style.display = "block";

            console.log(data);
            if (data['status'] == 'failed') {
                alert('ไม่พบข้อมูล');
                return;
            }


            $('#studentId').val(data['data'][1]);
            $('#studentName').val(data['data'][2] + data['data'][3] + '  ' + data['data'][4]);
            $('#grade').val(data['data'][6]);
            $('#section').val(data['data'][7]);
        });
}

async function main() {


    await liff.init({
        //liffId: "1656642215-1namPL5Q"
        liffId: "1656646368-JLlBKQem"
    })

    const profile = await liff.getProfile();
    $('#lineId').val(profile.userId);



}

$(document).ready(function() {

    console.log("ready!");

    //$('#result').hide();

    main();
});