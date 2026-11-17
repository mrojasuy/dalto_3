<?php

require_api( 'authentication_api.php' );
require_api( 'form_api.php' );
require_api( 'helper_api.php' );
require_api( 'print_api.php' );

auth_reauthenticate();
access_ensure_global_level( config_get( 'manage_plugin_threshold' ) );

$t_enabled       = plugin_config_get( 'enabled' );
$t_contrast_type = plugin_config_get( 'contrast_type' );

if( gpc_get_bool( 'save', false ) ) {
	form_security_validate( 'plugin_ModoDaltonico_config' );

	$f_enabled       = gpc_get_int( 'enabled', ON );
	$f_contrast_type = gpc_get_string( 'contrast_type', 'protanopia' );

	$t_valid_types = array( 'protanopia', 'deuteranopia', 'tritanopia' );
	if( !in_array( $f_contrast_type, $t_valid_types, true ) ) {
		$f_contrast_type = 'protanopia';
	}

	if( $f_enabled !== ON && $f_enabled !== OFF ) {
		$f_enabled = ON;
	}

	plugin_config_set( 'enabled', $f_enabled );
	plugin_config_set( 'contrast_type', $f_contrast_type );

	form_security_purge( 'plugin_ModoDaltonico_config' );
	print_header_redirect( plugin_page( 'config', true ) );
}

layout_page_header( plugin_lang_get( 'name' ) );
layout_page_begin();
?>

<div class="col-md-8 col-md-offset-2 col-xs-12">
	<div class="space-10"></div>
	<div class="widget-box widget-color-blue2">
		<div class="widget-header widget-header-small">
			<h4 class="widget-title lighter">
				<?php print_icon( 'fa-eye', 'ace-icon' ); ?>
				<?php echo plugin_lang_get( 'configuracion' ); ?>
			</h4>
		</div>
		<div class="widget-body">
			<div class="widget-main no-padding">
				<form method="post" action="<?php echo plugin_page( 'config' ); ?>">
					<?php echo form_security_field( 'plugin_ModoDaltonico_config' ); ?>
					<input type="hidden" name="save" value="1" />
					<table class="table table-bordered table-condensed table-striped">
						<tr>
							<th class="category" width="40%">
								<?php echo plugin_lang_get( 'activacion' ); ?>
							</th>
							<td>
								<label>
									<input type="radio" name="enabled" value="1"
										<?php echo ( ON == $t_enabled ) ? 'checked="checked"' : ''; ?> />
									<?php echo plugin_lang_get( 'activar' ); ?>
								</label>
								<label class="padding-left-8">
									<input type="radio" name="enabled" value="0"
										<?php echo ( OFF == $t_enabled ) ? 'checked="checked"' : ''; ?> />
									<?php echo plugin_lang_get( 'desactivar' ); ?>
								</label>
							</td>
						</tr>
						<tr>
							<th class="category">
								<?php echo plugin_lang_get( 'tipo_contraste' ); ?>
							</th>
							<td>
								<select name="contrast_type" class="input-sm">
									<option value="protanopia"
										<?php echo ( 'protanopia' === $t_contrast_type ) ? 'selected="selected"' : ''; ?>>
										<?php echo plugin_lang_get( 'protanopia' ); ?>
									</option>
									<option value="deuteranopia"
										<?php echo ( 'deuteranopia' === $t_contrast_type ) ? 'selected="selected"' : ''; ?>>
										<?php echo plugin_lang_get( 'deuteranopia' ); ?>
									</option>
									<option value="tritanopia"
										<?php echo ( 'tritanopia' === $t_contrast_type ) ? 'selected="selected"' : ''; ?>>
										<?php echo plugin_lang_get( 'tritanopia' ); ?>
									</option>
								</select>
							</td>
						</tr>
					</table>
					<div class="widget-toolbox padding-8 clearfix">
						<input type="submit" class="btn btn-primary btn-white btn-round"
							value="<?php echo plugin_lang_get( 'guardar' ); ?>" />
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<?php
layout_page_end();
