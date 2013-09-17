#jQuery Notice Plugin

jQuery Plugin to show / hide failure, info or success notices.

Optimized for [Twitter Bootstrap](http://getbootstrap.com), but without any dependence.

###Usage

Set plugin:
  
	$.notice(options);

View notice:

	$.notice('show', 'failure', 'error message');
	$.notice('show', 'success', 'success message');
	$.notice('show', false, 'error message');
	$.notice('show', true, 'success message');

Close notice:

	$.notice('hide');

###Selector

You can view notice:

- in a body (*floating*, `float: true` option and `$.notice(…)` call);
- in a default selector (`classContainer` name, `float: false` option and `$.notice(…)` call);
- in a your selector (`float: false` option and `$(#yourSelector).notice(…)` call).

###Options

- `status`: (string) Default alert status: info | success | failure
- `closeButton`: (bool) Show close button
- `closeButtonClass`: (string) Add CSS class to close button
- `delay`: (integer) Delay time to close (0 = none)
- `float`: (bool) Show float alert or inner a item container
- `floatWidth`: (string) Width: px | 'auto' (if floating)
- `floatPositionTop`: (integer) Position to top of page: % (if floating)
- `floatPositionLeft`: (integer) Position to left of page: % (if floating)
- `classContainer`: (string) Default class container
- `classDefault`: (string) Default item class
- `classInfo`: (string) Default item class for info alert
- `classSuccess`: (string) Default item class for success alert
- `classError`: (string) Default item class for error alert
- `classWarning`: (string) Default item class for warning alert
- `fadeinSpeed`: (string | integer) Fade-in speed: fast | slow | int milliseconds
- `fadeoutSpeed`: (string | integer) Fade-out speed: fast | slow | int milliseconds
- `beforeMessage`: (string) HTML before message
- `afterMessage`: (string) HTML after message
- `message`: (string) Message HTML
- `inherit`: (bool) Set to inherit all options
- `storeOptions`: (bool) Set to store options for nex call
- `show`: (bool) Show immediatly
- `prependToInfo`: (string) Prepend text or HTML for info message
- `appendToInfo`: (string) Append text or HTML for info message
- `prependToSuccess`: (string) Prepend text or HTML for success message
- `appendToSuccess`: (string) Append text or HTML for success message
- `prependToError`: (string) Prepend text or HTML for error message
- `appendToError`: (string) Append text or HTML for error message
- `prependToWarning`: (string) Prepend text or HTML for warning message
- `appendToWarning`: (string) Append text or HTML for warning message

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
		, prependToInfo:		''
		, appendToInfo:			''
		, prependToSuccess:		''
		, appendToSuccess:		''
		, prependToError:		''
		, appendToError:		''
		, prependToWarning:		''
		, appendToWarning:		''
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
		closeButton:	false
		, delay:		100
	});
	$.notice('show', true, 'Your data are updated.');

Show success message without close button and closing it after 1 second.

	$.notice({
		'beforeMessage':	'<div><strong>Alert!</strong></div>'
		, 'afterMessage':	'<div>Thanks.</div>'
	});
	$.notice('show', false, 'All fields are mandatory.');

Show failure message with a text before and after message.
	
	$('#myalert').notice('show', 'info', 'Logged in.');
	
Show info message in your `#myalert`selector.

And so on.
