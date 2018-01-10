  setupEntranceAnimations();

  function setupEntranceAnimations() {
  var clases = [
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'rollIn',
  ];
  var elementsForWaypoint = [];
  $(".animated").each(function() {
  var targetClass = false;
  for(var vi in clases) {
    if($(this).hasClass(clases[vi])) {
      targetClass = true;
      $(this).removeClass(clases[vi]).data("animated", clases[vi]);
      var $targetParent = $(this).parent();
      if($.inArray($targetParent, elementsForWaypoint) == -1) {
        elementsForWaypoint.push($targetParent);
      }
      break;
    }
  }
  });
  for(var vi in elementsForWaypoint) {
  $(elementsForWaypoint[vi]).waypoint(function() {
    var $this      = this.element;
    var $target    = $(".animated", $(this.element));
    //console.log($target);
    var delay      = 0,
        sum        = 100,
        multiplier = 1.5,
        c          = 1;
    $target.each(function() {
      var $this = $(this);
      setTimeout(function() {
        $this.delay().addClass($this.data("animated"));
      }, delay + ((sum * multiplier) * c));
      c++;
    });
  }, {offset: '80%'});
  }
  }
