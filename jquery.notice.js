/**
 * jQuery Plugin to show / hide error, info or success notices.
 * @author	Luigi Mozzillo <luigi@innato.it>
 * @link	http://innato.it
 * @version 1.0.3
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

	// --------------------------------------------------------------------------

	Notice.prototype = {

		/**
		 * Constructor.
		 *
		 */
		constructor: Notice

		// -------------------------------------

		/**
		 * Initialize item.
		 *
		 * @param  string element
		 * @param  object options
		 * @return void
		 */
		, init: function(element, options) {

			if ( ! $(element).length) {
				element = document;
			}

			this.element	= element;
			this.$element	= $(element);

			// Check if use stored options or current
			if ( ! $(document).data('noticeOptions') && options.storeOptions == true) {
				$(document).data('noticeOptions', this.$options);
			}
			else if (options.inherit) {
				options = $(document).data('noticeOptions');
			}

			this.options = $.extend({}, $.fn.notice.defaults, options);

			// Create div item
			this.$div = $('<div />')
				.addClass('notice')
				.addClass(this.options.classDefault);

			// Add data
			this.$container = $('.'+ this.options.classContainer);
			this.statusEnabled = [ 'info', 'success', 'error', 'warning' ]

			// Set behaviours
			this.behaviours();

			// Show if necessacy
			if (this.options.show) {
				this.show();
			}
		}

		// -------------------------------------

		/**
		 * Behaviours
		 */
		, behaviours: function() {
			$(document).on('click', '[data-close="'+ this.options.classDefault +'"]', $.proxy(this.close, this));
			$(window).resize($.proxy(this._positionsItem, this));
		}

		// -------------------------------------

		/**
		 * Show notice.
		 *
		 * @param  mixed status (boolean or string)
		 * @param  string message
		 * @return void
		 */
		, show: function(status, message) {
			var that = this;

			// Remove old notices
			$('.'+ this.options.classDefault)
				.remove();

			// Clean $div
			this.$div
				.removeAttr('class')
				.addClass('notice')
				.addClass(this.options.classDefault)
				.html('')
				.show();

			// Show alert floating (if document or no default container)
			// or in a specifiched container
			if (this.element != document) {
				this.$container = this.$element;
			} else {
				if ( ! this.$container.length) {
					this.options.float	= true;
					this.$container		= $('body');
				}
			}

			// If not exists status, use default
			if (typeof status == 'boolean') {
				status = status ? 'success' : 'error';
			} else {
				if ( ! status) {
					status = this.options.status;
				}
			}

			// If not exists message, use default
			if ( ! message) {
				message = this.options.message;
			}

			// Verify if need to prepend text or HTML to message
			if (this.options['prependTo'+ that._capitalize(status)] != '') {
				message = this.options['prependTo'+ that._capitalize(status)] + message;
			}

			// Verify if need to append text or HTML to message
			if (this.options['appendTo'+ that._capitalize(status)] != '') {
				message += this.options['appendTo'+ that._capitalize(status)];
			}

			// Add status class to $div
			this.$div.addClass(this._getStatusClass(status));

			// Check if show closer button
			if (this.options.closeButton) {
				$('<a />')
					.addClass(this.options.closeButtonClass)
					.attr('data-close', this.options.classDefault)
					.css('cursor', 'pointer')
					.append('&times;')
					.appendTo(this.$div);
			}

			// Append messages
			this.$div
				.append(this.options.beforeMessage)
				.append(message)
				.append(this.options.afterMessage);

			// Append $div to $container
			this.$container.append(this.$div);

			// If position is floating, calculate dimensions
			if (this.options.float) {
				// Apply position to item
				this._positionsItem();

				// Fade-in $div
				this.$div.fadeIn(this.options.fadeinSpeed);
			} else {
				// Fade-in $container
				this.$container.fadeIn(this.options.fadeinSpeed);
			}


			// If delay is set, close on timeout
			if (this.options.delay != 0) {
				setTimeout(function() {
					that.close();
				}, this.options.delay);
			}
		}

		// -------------------------------------

		/**
		 * Hide notice.
		 *
		 * @return boolean
		 */
		, hide: function() {
			var that = this;
			this.$div.fadeOut(this.options.fadeoutSpeed);
			return false;
		}

		// -------------------------------------

		/**
		 * Hide notice (alias).
		 *
		 * @return boolean
		 */
		, close: function() {
			this.hide();
		}

		// -------------------------------------

		/**
		 * Check if status is valid.
		 *
		 * @param  string status
		 * @return boolean
		 */
		, _getStatusClass: function(status) {
			var that = this;
			for (var i = 0; i < this.statusEnabled.length; i++) {
				if (this.statusEnabled[i] == status) {
					return this.options['class'+ that._capitalize(status)];
				}
			}
			return this.options['class'+ that._capitalize(statusEnabled[0])];
		}

		// -------------------------------------

		/**
		 * Capitalize first letter in a string.
		 *
		 * @param  string string
		 * @return string
		 */
		, _capitalize: function(string) {
			string = string.toLowerCase();
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		// -------------------------------------

		/**
		 * Calculate position and dimentions of div (if floating).
		 *
		 * @return void
		 */
		, _positionsItem: function() {
			if (this.options.float) {

				// Apply position
				this.$div.css({
					width:		this.options.floatWidth == 'auto'
						? parseInt($('body').width() / 2)
						: parseInt(this.options.floatWidth)
				});

				if ($(window).width() / 100 * 90 < this.$div.outerWidth()) {
					this.$div.css({
						width:	$(window).width() / 100 * 90
					});
				}

				this.$div.css({
					  top:		parseInt(($(window).height() / 100 * parseInt(this.options.floatPositionTop)) + $('body').scrollTop())
					, left:		parseInt(($(window).width() / 100 * parseInt(this.options.floatPositionLeft)) - (this.$div.outerWidth() / 2))
					, position:	'absolute'
				});
			}
		}
	}

	// --------------------------------------------------------------------------

	/**
	 * Create plugin.
	 *
	 * @param  object option
	 * @param  mixed  status (string or boolean)
	 * @param  string message
	 * @return object
	 */
	$.fn.notice = function (option, status, message) {
		return this.each(function() {
			var   $this		= $(this)
				, data		= $this.data('notice')
				, options	= typeof option == 'object' && option

			if ( ! data) {
				$this.data('notice', (data = new Notice(this, options)));
			}

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
		, closeButton:			true				// Show close button
		, closeButtonClass:		'close'				// Add CSS class to close button
		, delay:				0					// Delay time to close (0 = none)
		, float:				false				// Show float alert or inner a item container
		, floatWidth:			'auto'				// Width: px | 'auto' (if floating)
		, floatPositionTop:		10					// Position to top of page: % (if floating)
		, floatPositionLeft:	50					// Position to left of page: % (if floating)
		, classContainer:		'notice'			// Default class container
		, classDefault:			'alert'				// Default item class
		, classInfo:			'alert-info'		// Default item class for info alert
		, classSuccess:			'alert-success'		// Default item class for success alert
		, classError:			'alert-error'		// Default item class for error alert
		, classWarning:			'alert-warning'		// Default item class for warning alert
		, fadeinSpeed:			'fast'				// Fade-in speed: fast | slow | int milliseconds
		, fadeoutSpeed:			'fast'				// Fade-out speed: fast | slow | int milliseconds
		, beforeMessage:		''					// HTML before message
		, afterMessage:			''					// HTML after message
		, message:				''					// Message HTML
		, inherit:				true				// Set to inherit all options
		, storeOptions:			true				// Set to store options for nex call
		, show:					false				// Show immediatly
		, prependToInfo:		''					// Prepend text or HTML for info message
		, appendToInfo:			''					// Append text or HTML for info message
		, prependToSuccess:		''					// Prepend text or HTML for success message
		, appendToSuccess:		''					// Append text or HTML for success message
		, prependToError:		''					// Prepend text or HTML for error message
		, appendToError:		''					// Append text or HTML for error message
		, prependToWarning:		''					// Prepend text or HTML for warning message
		, appendToWarning:		''					// Append text or HTML for warning message
	}

}(window.jQuery);