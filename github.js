
	var baseString;
	var file_name;
	var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];
    file_name = file.name;
    console.log(file_name);
    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            baseString = btoa(binaryString);
            console.log(baseString);
        };

        reader.readAsBinaryString(file);
    }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}
function get_course_content(){
    var first_row = "";
    var second_row = "";
    var third_row = "";
    var fourth_row = "";
    var fifth_row = "";
	var course_name = $('#courses').val();
    $(".loader").show();
	url_assignemnt = "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/"+course_name+"Assignments";
    $.getJSON(url_assignemnt, function(data) {
        $.each(data, function(index) {
            
        	if(data[index].download_url != null){
                second_row = second_row+"<tr><td><a href=\""+data[index].download_url+"\">"+data[index].name+"</a></td></tr>";
        	}
        });
        $('#Assignments> tbody:last-child').append(second_row);
    });
    url_lectures = "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/"+course_name+"Lectures/";
    $.getJSON(url_lectures, function(data) {
        $.each(data, function(index) {
            
            if(data[index].download_url != null){
                first_row = first_row+"<tr><td><a href=\""+data[index].download_url+"\">"+data[index].name+"</a></td></tr>";
            }
        });
        $('#Lectures > tbody:last-child').append(first_row);
    });
    url_quizes = "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/"+course_name+"Quizes/";
    $.getJSON(url_quizes, function(data) {
        $.each(data, function(index) {
            
            if(data[index].download_url != null){
                third_row = third_row+"<tr><td><a href=\""+data[index].download_url+"\">"+data[index].name+"</a></td></tr>";
            }
        });
        $('#Quizes > tbody:last-child').append(third_row);
    });
    url_exams = "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/"+course_name+"Exams/";
    $.getJSON(url_exams, function(data) {
        $.each(data, function(index) {
            
            if(data[index].download_url != null){
                fourth_row = fourth_row+"<tr><td><a href=\""+data[index].download_url+"\">"+data[index].name+"</a></td></tr>";
            }
        });
        $('#Exams > tbody:last-child').append(fourth_row);
    });
    url_solutions = "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/"+course_name+"Labs/";
    $.getJSON(url_solutions, function(data) {
        $.each(data, function(index) {
            
            if(data[index].download_url != null){
                fifth_row = fifth_row+"<tr><td><a href=\""+data[index].download_url+"\">"+data[index].name+"</a></td><tr>";
            }
        });
        $('#Labs > tbody:last-child').append(fifth_row);
        $(".loader").hide();
    });
    
    
}
function get_courses(){
    $(".loader").show();
	var repo_url = "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/";
	$.ajax({
        url: repo_url,
        type: "GET",
        dataType: 'json',
        headers: {
              'Authorization':'token d6098ea42b15ebfeb7908dbfd5bfd551dde25119',
              'Content-Type': 'application/json',
              
        },
        success: function(data) {
            $.each(data, function(index) {
        	   if(data[index].download_url == null){
        		  name = "<option value=\""+data[index].name+"/\">"+data[index].name+"</option>"
        		  $('#courses').append(name);
        	    }
            });
            $(".loader").hide();
        }
    });
}
function upload_file(){
    $('.loader').show();
    userName = $("#userName").val();
	data = {
		"message": "Added file "+file_name+" by "+userName,
        "content": baseString,
    }
    course_name = $('#courseName').val()+"/";
    file_type = $("#typeOfFile").val()+"/";
	$.ajax({
        url : "https://api.github.com/repos/adarshsrivastava11/ce_ug/contents/"+course_name+file_type+file_name,
        type: "PUT",
        dataType: 'json',
        headers: {
              'Authorization':'token d6098ea42b15ebfeb7908dbfd5bfd551dde25119',
              'Content-Type': 'application/json',
              
        },
        data: JSON.stringify(data),
        success: function(data){
        	 $(".loader").hide();
        },
        error: function(err){
        	console.log(err);
        }
    });
}
function test_login_api(){
    data = {
        "name": "Nick Cerminara",
        "password": "password",
    }
    $.ajax({
        url : "http://localhost:8080/api/authenticate",
        type: "POST",
        // dataType: 'json',
        headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              
        },
        data: data,


        success: function(data){
             console.log(data.token);
        },
        error: function(err){
            console.log(err);
        }
    });

}