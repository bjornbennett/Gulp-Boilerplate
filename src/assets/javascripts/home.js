$(document).ready(function(){
    
    $('#hero img').magnificPopup({
        items: {
            src: '#hero video',
            type: 'inline'
        }
    });
    $('#hero img').click(function(){
        $('.mfp-content video')[0].play();
    });
});