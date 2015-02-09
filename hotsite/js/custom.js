$(document).ready(function () {
    // BACKGROUND - HOME
    var i = 0
    setInterval(function() {
      $('.stars-front').css('background-position-x', i+'px');
      i++;
    }, 600);

    var y = 0
    setInterval(function() {
      $('.stars-back').css('background-position-x', y+'px');
      y++;
    }, 350);

    var x = 0
    setInterval(function() {
      $('#home').css('background-position-x', x+'px');
      x--;
    }, 300);



    // FORM
    // Input mask
    $("#ddd").mask("(00)");
    $("#telefone").mask("0000-00009");
    // Submit form to send the data to email
    $("#formRegister").submit(function (e) {
        e.preventDefault();
        if (!validateForm())
            return false;

        var dataS = {
            "nome": $('#nome').val(),
            "email": $('#email').val(),
            "ddd": $('#ddd').val(),
            "telefone": $('#telefone').val(),
            "mensagem": $('#mensagem').val()
        };

        $.ajax({
            type: "POST",
            url: "mail/mailRegister.aspx",
            data: JSON.stringify(dataS),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response == "OK") {
                    //alert("Obrigado por se cadastrar.");
                    $('#modal p').text('').html("Obrigado por se cadastrar.");
                    $('#modal, .shadown').fadeIn();
                    setTimeout(function() {
                      $('#modal, .shadown').fadeOut();
                    }, 1500);
                    $('#nome').val("");
                    $('#email').val("");
                    $('#ddd').val(""); ;
                    $('#telefone').val("");
                    $('#mensagem').val("");
                } else
                    $('#modal p').text('').html("Ocorreu um erro ao efetuar seu cadastro: " + response);
                    $('#modal, .shadown').fadeIn();
                    setTimeout(function() {
                      $('#modal, .shadown').fadeOut();
                    }, 1500);
            },
            error: function (response) {
                $('#modal p').text('').html("Ocorreu um erro ao efetuar seu cadastro: " + response);
                $('#modal, .shadown').fadeIn();
                setTimeout(function() {
                  $('#modal, .shadown').fadeOut();
                }, 1500);
            }
        });
        return false;
    });



    // Validate form data
    function validateForm() {
        var emailReg = /^([0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*)+@(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,17})$/;

        var nome = $('#nome').val();
        var email = $('#email').val();
        var ddd = $('#ddd').cleanVal();
        var telefone = $('#telefone').cleanVal(); ;
        var mensagem = $('#mensagem').val();

        if (nome == "" || email == "" || ddd == "" || telefone == "" || mensagem == "") {
            //alert("Preencha todos os campos para efetuar seu cadastro");
            $('#modal p').text('').html("Preencha todos os campos para efetuar seu cadastro");
            $('#modal, .shadown').fadeIn();
            setTimeout(function() {
              $('#modal, .shadown').fadeOut();
            }, 1500);
            return false;
        }
        else if (ddd.length != 2) {
            //alert("Preencha um DDD válido");
            $('#modal p').text('').html("Preencha um DDD válido");
            $('#modal, .shadown').fadeIn();
            setTimeout(function() {
              $('#modal, .shadown').fadeOut();
            }, 1500);
            return false;
        }
        else if (telefone.length < 8 || telefone.length > 9) {
            //alert("Preencha um telefone válido");
            $('#modal p').text('').html("Preencha um telefone válido");
            $('#modal, .shadown').fadeIn();
            setTimeout(function() {
              $('#modal, .shadown').fadeOut();
            }, 1500);
            return false;
        }
        else if (!emailReg.test(email)) {
            //alert("Preencha um email válido");
            $('#modal p').text('').html("Preencha um email válido");
            $('#modal, .shadown').fadeIn();
            setTimeout(function() {
              $('#modal, .shadown').fadeOut();
            }, 1500);
            return false;
        }
        return true;
    }   
});