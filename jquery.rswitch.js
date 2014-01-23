/*!
 * jQuery rswitch
 * Original author: @reginaldosousa
 * Licensed under the MIT license
 */

;
(function($, window, document, undefined) {

	var pluginName = "rswitch",
		  defaults = {
		    active: false,
		    labels: true,
		    offLabel: "OFF",
		    onLabel: "ON"
		  };

	function Plugin(element, options) {
		this.element = element;

		// jQuery has an extend method that merges the
		// contents of two or more objects, storing the
		// result in the first object. The first object
		// is generally empty because we don't want to alter
		// the default options for future instances of the plugin
		this.options = $.extend({},
		defaults, options);

		this._defaults = defaults;
		this._name = pluginName;
		this._template = '<div class="rswitch">' + 
    '  <label class="rswitch-label-off">{offLabel}</label>' + 
    '  <span class="rswitch-switch"></span>' + 
    '  <label class="rswitch-label-on">{onLabel}</label>' + 
    '</div>';

		this.init();
	}

	Plugin.prototype = {

		init: function() {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.options
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.options).
			this.parseOptions();
			this.parseTemplate();
      this.binds();
      this.renderTemplate();
		},
		
		parseOptions: function () {
		  data = $(this.element).data();
		  this.options["active"] = data.rswitchActive || this.options["active"];
		  this.options["offLabel"] = data.rswitchOfflabel || this.options["offLabel"];
		  this.options["onLabel"] = data.rswitchOnlabel || this.options["onLabel"];
		  this.options["labels"] = data.rswitchlabels || this.options["labels"];
		},

		parseTemplate: function() {
		  this._template = this._template.replace("{onLabel}", this.options.onLabel);
		  this._template = this._template.replace("{offLabel}", this.options.offLabel);
		  var tpl = $(this._template);
		  if (this.options.labels == false) {
		    tpl.find('label').remove();
		  }
		  if (this.options.active == true) {
		    tpl.addClass("rswitch-switch-on");
		  } else {
		    tpl.addClass("rswitch-switch-off");
		  }
			this._parsedTemplate = tpl;
		},
		
		renderTemplate: function() {
		  if($(this.element).attr("type") == "checkbox") {
		    $(this._parsedTemplate).insertAfter(this.element);
		    var self = this;
		    $(this.element).on('click', function(){
		      self.changeStatus(self.element.checked);
		    });
        $(this.element).hide();
		  } else {
		    $(this.element).html(this._parsedTemplate);
		  }
		},
		
		binds: function() {
		  var self = this;
		  this._parsedTemplate.on('click', '.rswitch-switch', function(){
		    var new_status = $(this).parent('.rswitch').hasClass('rswitch-switch-on') ? false : true;
		    self.changeStatus(new_status);
		  });
		  
		  this._parsedTemplate.on('click', '.rswitch-label-on', function(){
		    self.changeStatus(true);
		  });
		  
		  this._parsedTemplate.on('click', '.rswitch-label-off', function(){
		    self.changeStatus(false);
		  });
		  
		},
		
		changeStatus: function(status) {
		  var el;
      if($(this.element).attr("type") == "checkbox") {
        el = $(this.element).next('.rswitch');
        $(this.element).prop('checked', status).change();
      } else {
        el = $(this.element).find('.rswitch');
      }
		  if (status == true) {
		    el.removeClass('rswitch-switch-off').addClass('rswitch-switch-on');
		  } else {
		    el.removeClass('rswitch-switch-on').addClass('rswitch-switch-off');
		  }
		}
	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
