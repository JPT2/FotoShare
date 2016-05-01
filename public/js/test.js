var members = [];

$('#memberEntry').keyup( function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    var potentialMember = $('#memberEntry').val().trim();
    $.post('/gallery/new/member', {
      member: potentialMember
    },
    function (data, status) {
      if (data) {
        members.push(potentialMember);
        $('#memberEntry').val('');
        var string = 'Members to add: ';
        $.each(members, function (index, value) {
          string += value + ', ';
        });
        $('#toInput').text(string);
      }
    });
  }
});

document.getElementById('submit').onclick = function () {
  $('#memberEntry').val(members);
};