$.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: 'http://moromis.com/getCurrentlyPlaying',/
    // url: 'http://localhost:3000/getCurrentlyPlaying',
    success: function (data) {
        if (data.status === 'listening') {
            document.getElementById("spotifyCover").src = data.artwork;
            document.getElementById("spotifySong").innerHTML = "I\'m currently listening to: " + "<a href=" + data.link + ">" + data.song + "</a> by " + data.artist;
        }else{
            document.getElementById("spotifyCover").src = data.artwork;
            document.getElementById("spotifySong").innerHTML = "I\'m not currently listening to Spotify... However, here's the last song I " +
                "listened to:<br><br>" + "<a href=" + data.link + ">" + data.song + "</a> by " + data.artist;
        }
    },
    error: function (){
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: 'http://www.moromis.com/getCurrentlyPlaying',
            // url: 'http://localhost:3000/getCurrentlyPlaying',
            success: function (data) {
                if (data.status === 'listening') {
                    document.getElementById("spotifyCover").src = data.artwork;
                    document.getElementById("spotifySong").innerHTML = "I\'m currently listening to: " + "<a href=" + data.link + ">" + data.song + "</a> by " + data.artist;
                }else{
                    document.getElementById("spotifyCover").src = data.artwork;
                    document.getElementById("spotifySong").innerHTML = "I\'m not currently listening to Spotify... However, here's the last song I " +
                        "listened to:<br><br>" + "<a href=" + data.link + ">" + data.song + "</a> by " + data.artist;
                }
            }
        });
    }
});