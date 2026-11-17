<?php

require_api( 'authentication_api.php' );
require_api( 'form_api.php' );

auth_reauthenticate();

header( 'Content-Type: application/json; charset=utf-8' );

$t_response = array( 'ok' => false );

$f_active = gpc_get_string( 'active', '' );

if( $f_active === 'on' || $f_active === 'off' ) {
	$t_response['ok'] = true;
	$t_response['active'] = ( $f_active === 'on' );
} else {
	$t_response['error'] = 'Invalid parameter';
}

echo json_encode( $t_response );
