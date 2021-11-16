async function main() {




    // await liff.init({ liffId: "1656626766-8BeYd530" })

    // const queryString = decodeURIComponent(window.location.search)

    // const params = new URLSearchParams(queryString)

    //alert(params.get("param"))

    // if (params.get("param") !== null) {
    //     const profile = await liff.getProfile()
    //     document.getElementById("userId").append(profile.userId)

    //     var url = "https://docs.google.com/forms/d/e/1FAIpQLScH94bKiIR54tzzWDd8dkvvTka_TkHJjb5RS6Ka2YvuOtS_jQ/formResponse?usp=pp_url&entry.448259260=" + profile.userId + "&entry.58029896=" + "std_id" + "&submit=Submit"

    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open("GET", url, false); // false for synchronous request
    //     xmlHttp.send(null);
    // }
}



//main()

var data;
$.ajax({
    type: "GET",
    url: "https://docs.google.com/spreadsheets/d/1FXXk80ECzWbOiiNBXMngZyC79vjXZu8sDYLnvJQBVd0/export?format=csv",
    dataType: "text",
    success: function(response) {
        data = $.csv.toArrays(response);
        //generateHtmlTable(data);
        console.log(data)
    }
});