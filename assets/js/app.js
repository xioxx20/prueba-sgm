$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

$('#emailUser').keyup(function(){
    email= $(this).val();
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(email.match(pattern)){
        $('#searchUser').prop('disabled', false);
    }else{
        $('#searchUser').prop('disabled', true);
    }
});

$('#searchUser').click(function(){
    $("#loading-spinner").css('display', 'block');

    email= $("#emailUser").val();
   
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/users?email=${email}`,
        cache: false,
        contentType: false,
        processData: false,
        method: 'GET',
        type: 'GET',
        success: function(data){
            console.log(data);
            $("#loading-spinner").css('display', 'none');
            if(data.length > 0){
                $('.user-info-cont').css( 'display', 'block' );
                $("body,html").animate(
                    {
                    scrollTop: $(".user-info-cont").offset().top
                    },
                    800
                ); 

                infoUser= data[0];
                $('#name').text(infoUser.name);
                $('#userName').text(infoUser.username);
                $('#userEmail').text(infoUser.email);

                address= data[0].address;
                $('#adress').text(`${address.street}, ${address.suite}, ${address.city}`);
                $('#zipCode').text(address.zipcode);
                $('#lat').text(address.geo.lat);
                $('#long').text(address.geo.lng);

                $('#phone').text(infoUser.phone);
                $('#website').text(infoUser.website);

                company= data[0].company;

                $('#companyName').text(company.name);
                $('#infoCompany').text(`${company.catchPhrase} - ${company.bs}`);
            
            }else{
                $( ".user-info-cont" ).hide( 1000 );
                bootbox.alert({
                    message: "User information not found!",
                    size: 'small',
                    className: 'animated fadeIn'
                });
            }
        }
    });

    
    
});


$("#upBtn").click(function(){
    $( ".user-info-cont" ).hide( 1000 );
    $('#emailUser').val("");
    $('#searchUser').prop('disabled', true);
});


