$(document).ready(function(){

  $('.form-search').on('submit',function(){return false;});
  $('.form-search .btn').on('click', updateResults);
  $('.search-query').on('input', updateResults);

});

function updateResults() {
    var query = $.trim($('.search-query').val()).toLowerCase();
    $('.apps-list .app .title').each(function(){
         var $this = $(this);
         if($this.text().toLowerCase().indexOf(query) === -1)
             $this.closest('div.app').fadeOut(200);
        else $this.closest('div.app').fadeIn(200);
    });
}



function refreshPage(){

  $(".refreshBtn").hide();
  $(".refreshBtnDiv .refreshText").show();

  setTimeout(function() {
    $(".refreshBtn").show();
    $(".refreshBtnDiv .refreshText").hide();
  }, 5000);

  location.reload();
}
