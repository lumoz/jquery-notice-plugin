#jQuery Notice Plugin

jQuery Plugin to show / hide failure, info or success notices.

Optimized for [Twitter Bootstrap](http://getbootstrap.com), but without any dependence.

###Usage

Set plugin:
  
	$.notice(options);

View notice:

	$.notice('show', 'failure', 'error message');

Close notice:

	$.notice('close');

###Selector

You can view notice:

- in a body (*floating*, `float: true` option and `$.notice(…)` call);
- in a default selector (`class_container` name, `float: false` option and `$.notice(…)` call);
- in a your selector (`float: false` option and `$(#your_selector).notice(…)` call).

###Options

- `status`: (string) Default alert status: info | success | failure
- `close_button`: (bool) Show close button
- `close_button_class`: (string) Add CSS class to close button
- `delay`: (integer) Delay time to close (0 = none)
- `float`: (bool) Show float alert or inner a item container
- `float_width`: (string) Width: px | 'auto' (if floating)
- - `float_position_top`: (integer) Position to top of page: % (if floating)
- `float_position_left`: (integer) Position to left of page: % (if floating)
- `class_container`: (string) Default class container
- `class_default`: (string) Default item class
- `class_info`: (string) Default item class for info alert
- `class_success`: (string) Default item class for success alert
- `class_failure`: (string) Default item class for failure alert
- `fadein_speed`: (string | integer) Fade-in speed: fast | slow | int milliseconds
- `fadeout_speed`: (string | integer) Fade-out speed: fast | slow | int milliseconds
- `before_message`: (string) HTML before message
- `after_message`: (string) HTML after message
- `message`: (string) Message HTML
- `inherit`: (bool) Set to inherit all options
- `store_options`: (bool) Set to store options for nex call
- `show`: (bool) Show immediatly

Default options:

	var options = {
		status:					'info'
		, close_button:			true
		, close_button_class:	'close'
		, delay:				0
		, float:				false
		, float_width:			'auto'
		, float_position_top:	10
		, float_position_left:	50
		, class_container:		'notice'
		, class_default:		'alert'
		, class_info:			'alert-info'
		, class_success:		'alert-success'
		, class_failure:		'alert-error'
		, fadein_speed:			'fast'
		, fadeout_speed:		'fast'
		, before_message:		''
		, after_message:		''
		, message:				''
		, inherit:				true
		, store_options:		true
		, show:					false
	}


###Methods

######$.notice(options);

Set notice item.

######.notice('show', status, message);

Show alert message with status class.

######.notice('close');

Close alert message.

###Examples

	$.notice({
		close_button:	false
		, delay:		100
	});
	$.notice('show', 'success', 'Your data are updated.');

Show success message without close button and closing it after 1 second.

	$.notice({
		'before_message':	'<div><strong>Alert!</strong></div>'
		, 'after_message':	'<div>Thanks.</div>'
	});
	$.notice('show', 'failure', 'All fields are mandatory.');

Show failure message with a text before and after message.
	
	$('#myalert').notice('show', 'info', 'Logged in.');

And so on.
