$('#tuttur').on('submit', function(e) {
	e.preventDefault();
	var formData = $('#tuttur').serializeObject();
	formData.latitude = markerLat;
	formData["longitude"] = markerLon;
	var formDataString = JSON.stringify(formData);
	//var deneme = {"firstName":"John", "lastName":"Doe"};
	//var denemeString = JSON.stringify(deneme);
	$.ajax({
		type: "POST",
		url: "http://nodejs-tutucundan.rhcloud.com/tutturmak",
		data: formDataString,
		crossDomain: true, 
		contentType: "application/json",
		dataType: "json",
		success: function(json){
			alert("Success");
			alert("ajax callback response:"+JSON.stringify(json));
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert("Error");
			console.log(JSON.stringify(jqXHR));
			console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
		}
	});
})

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};