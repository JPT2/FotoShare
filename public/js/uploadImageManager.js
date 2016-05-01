$.get('/gallery/get',
  function (data, status ) {
    for (var i = 0; i < data.galleries.length; i++) {
      $('#galSelect').append(
          $('<option></option>').val(data.galleries[i]).html(data.galleries[i])
      );
    }
  });