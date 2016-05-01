var galleries = [];

$.get("/gallery/get",
    function (data, status ) {
    	for (var i = 0; i < data.galleries.length; i++) {
    		$('#galSelect').append(
        		$('<option></option>').val(data.galleries[i]).html(data.galleries[i])
    		);
    	}

	});

document.getElementById("next").onclick = function () {
	var name = $('img').attr("id");
    var galName = $('img').attr("class");
    $('gallery img').attr("id", 'changed');
    $.post("/gallery/next",
    {
        galName: galName,
        name: name
    },
    function (data, status){
        var path = '/galleries/' + galName + '/' + data;
        $('img').attr('src', path);
        $('img').attr("id", data);
        var name = data.split('.');
        $('#picName').text(name[0]);
    });
};

document.getElementById("prev").onclick = function () {
	var name = $('img').attr("id");
	var galName = $('img').attr("class");
	$('gallery img').attr("id", 'changed');
	$.post("/gallery/prev",
    {
    	galName: galName,
        name: name
    },
    function (data, status){
    	var path = '/galleries/' + galName + '/' + data;
        $('img').attr('src', path);
        $('img').attr("id", data);
        var name = data.split('.');
        $('#picName').text(name[0]);
    });
};