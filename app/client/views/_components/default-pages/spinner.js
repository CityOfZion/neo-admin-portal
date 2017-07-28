TemplateController('loading', {
  onCreated() {
    Meteor.Spinner.options = {
      lines: 20, // The number of lines to draw
      length: 50, // The length of each line
      width: 10, // The line thickness
      radius: 50, // The radius of the inner circle
      corners: 0.7, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#fff', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
    };
  }
});