/**
 * jQuery Plugin to show / hide failure, info or success notices.
 * @author	Luigi Mozzillo <luigi@innato.it>
 * @link	http://innato.it
 * @version 1.0.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 */
!function($) {
	'use strict';

	var Notice = function(element, options) {
		this.init(element, options)
	}

	Notice.prototype = {

		constructor: Notice

		// Initialize item
		, init: function(element, options) {
			if (!$(element).length)
				element = document;
			this.element	= element;
			this.$element	= $(element);

			// Check if use stored options or current
			if (!$(document).data('notice_options') && options.store_options == true)
				$(document).data('notice_options', this.$options);
			else if (options.inherit)
				options = $(document).data('notice_options');
			this.options = $.extend({}, $.fn.notice.defaults, options);

			// Create div item
			this.$div = $('<div />').addClass('notice')
				.addClass(this.options.class_default);

			// Add data
			this.$container = $('.'+ this.options.class_container);
			this.status_enabled = [ 'info', 'success', 'failure' ]

			// Set behaviours
			this.behaviours();

			// Show if necessacy
			if (this.options.show)
				this.show();

		}

		, behaviours: function() {
			$(document).on('click', '[data-close="'+ this.options.class_default +'"]', $.proxy(this.close, this));
			$(window).resize($.proxy(this._positions_item, this));
		}

		// Show notice
		, show: function(status, message) {
			var that = this;

			// Hide container if exists
			this.$container.hide();

			// Remove old notices
			$('.'+ this.options.class_default).remove();

			// Clean $div
			this.$div.removeClass().addClass('notice')
				.addClass(this.options.class_default)
				.html('').show();

			// Show alert floating (if document or no default container)
			// or in a specifiched container
			if (this.element != document) {
				this.$container = this.$element;
			} else {
				if (!this.$container.length) {
					this.options.float	= true;
					this.$container		= $('body');
				}
			}

			// If not exists status or message, use default
			if (!status)	status	= this.options.status;
			if (!message)	message	= this.options.message;

			// Add status class to $div
			this.$div.addClass(this._get_status_class(status));

			// Check if show closer button
			if (this.options.close_button) {
				$('<a />').addClass(this.options.close_button_class)
					.attr('data-close', this.options.class_default)
					.css('cursor', 'pointer')
					.append('&times;')
					.appendTo(this.$div);
			}

			// Append messages
			this.$div.append(this.options.before_message)
				.append(message)
				.append(this.options.after_message);

			// Append $div to $container
			this.$container.append(this.$div);

			// If position is floating, calculate dimensions
			if (this.options.float) {
				// Apply position to item
				this._positions_item();

				// Fade-in $div
				this.$div.fadeIn(this.options.fadein_speed);
			} else {
				// Fade-in $container
				this.$container.fadeIn(this.options.fadein_speed);
			}


			// If delay is set, close on timeout
			if (this.options.delay != 0) {
				setTimeout(function() {
					that.close();
				}, this.options.delay);
			}
		}

		// Close notice
		, close: function() {
			var that = this;
			this.$div.fadeOut(this.options.fadeout_speed);
			return false;
		}

		// Check if status is valid
		, _get_status_class: function(status) {
			for (var i = 0; i < this.status_enabled.length; i++) {
				if (this.status_enabled[i] == status)
					return this.options['class_'+ status];
			}
			return this.options['class_'+ status_enabled[0]];
		}

		// Calculate position and dimentions of div (if floating)
		, _positions_item: function() {
			if (this.options.float) {
				// Apply position
				this.$div.css({
					width:		this.options.float_width == 'auto' ? parseInt($('body').width() / 2) : parseInt(this.options.float_width)
				});
				if ($(window).width() / 100 * 90 < this.$div.outerWidth()) {
					this.$div.css({
						width:	$(window).width() / 100 * 90
					});
				}
				this.$div.css({
					top:	parseInt(($(window).height() / 100 * parseInt(this.options.float_position_top)) + $('body').scrollTop())
					, left:	parseInt(($(window).width() / 100 * parseInt(this.options.float_position_left)) - (this.$div.outerWidth() / 2))
					, position:	'absolute'
				});
			}
		}


	}

	// Create plugin
	$.fn.notice = function (option, status, message) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('notice')
				, options	= typeof option == 'object' && option
			if (!data) $this.data('notice', (data = new Notice(this, options)))
			if (typeof option == 'string') {
				switch (option) {
					default:
						data[option]();
						break;
					case 'show':
						data[option](status, message)
						break;
				}
			};
			return $(this);
		})
	};
	$.fn.notice.Constructor = Notice
	// Empty call document item
	$.notice = function(options, status, message) {
		$(document).notice(options, status, message);
	};

	// Default options
	$.fn.notice.defaults = {
		status:					'info'				// Default alert status
		, close_button:			true				// Show close button
		, close_button_class:	'close'				// Add CSS class to close button
		, delay:				0					// Delay time to close (0 = none)
		, float:				false				// Show float alert or inner a item container
		, float_width:			'auto'				// Width: px | 'auto' (if floating)
		, float_position_top:	10					// Position to top of page: % (if floating)
		, float_position_left:	50					// Position to left of page: % (if floating)
		, class_container:		'notice'			// Default class container
		, class_default:		'alert'				// Default item class
		, class_info:			'alert-info'		// Default item class for info alert
		, class_success:		'alert-success'		// Default item class for success alert
		, class_failure:		'alert-error'		// Default item class for failure alert
		, fadein_speed:			'fast'				// Fade-in speed: fast | slow | int milliseconds
		, fadeout_speed:		'fast'				// Fade-out speed: fast | slow | int milliseconds
		, before_message:		''					// HTML before message
		, after_message:		''					// HTML after message
		, message:				''					// Message HTML
		, inherit:				true				// Set to inherit all options
		, store_options:		true				// Set to store options for nex call
		, show:					false				// Show immediatly
	}

}(window.jQuery);