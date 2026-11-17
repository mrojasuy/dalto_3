(function() {
	'use strict';

	var config = window.ModoDaltonicoConfig || {};
	var STORAGE_KEY_ACTIVE = 'md_active';
	var STORAGE_KEY_TYPE   = 'md_contrast_type';

	function getStorageItem( key ) {
		try {
			return localStorage.getItem( key );
		} catch( e ) {
			return null;
		}
	}

	function setStorageItem( key, value ) {
		try {
			localStorage.setItem( key, value );
		} catch( e ) {
			// localStorage unavailable
		}
	}

	function isActive() {
		var stored = getStorageItem( STORAGE_KEY_ACTIVE );
		if( stored === null ) {
			return !!config.initialActive;
		}
		return stored === 'true';
	}

	function getContrastType() {
		var stored = getStorageItem( STORAGE_KEY_TYPE );
		if( stored && ( stored === 'protanopia' || stored === 'deuteranopia' || stored === 'tritanopia' ) ) {
			return stored;
		}
		return config.contrastType || 'protanopia';
	}

	function removeFilterClasses() {
		document.body.classList.remove( 'md-protanopia', 'md-deuteranopia', 'md-tritanopia' );
	}

	function applyFilter( type ) {
		removeFilterClasses();
		if( type ) {
			document.body.classList.add( 'md-' + type );
		}
	}

	function updateUI( active, type ) {
		var btn   = document.getElementById( 'md-toggle-btn' );
		var badge = document.getElementById( 'md-badge' );
		var selector = document.getElementById( 'md-type-selector' );

		if( btn ) {
			btn.setAttribute( 'aria-pressed', active ? 'true' : 'false' );
			btn.setAttribute( 'title', active ? config.activeLabel : config.inactiveLabel );
		}

		if( badge ) {
			if( active ) {
				badge.classList.add( 'md-visible' );
				badge.textContent = ( config.strings && config.strings.indicador_activo )
					? config.strings.indicador_activo
					: '';
			} else {
				badge.classList.remove( 'md-visible' );
			}
		}

		if( selector ) {
			if( active ) {
				selector.classList.add( 'md-visible' );
			} else {
				selector.classList.remove( 'md-visible' );
			}
		}

		if( active ) {
			applyFilter( type );
		} else {
			removeFilterClasses();
		}
	}

	function toggleActive() {
		var active = !isActive();
		var type   = getContrastType();
		setStorageItem( STORAGE_KEY_ACTIVE, active ? 'true' : 'false' );
		updateUI( active, type );
	}

	function changeType( newType ) {
		setStorageItem( STORAGE_KEY_TYPE, newType );
		if( isActive() ) {
			applyFilter( newType );
		}
	}

	function injectSVGFilters() {
		var svgNS = 'http://www.w3.org/2000/svg';
		var container = document.createElement( 'div' );
		container.className = 'md-svg-filters';
		container.setAttribute( 'aria-hidden', 'true' );

		var svg = document.createElementNS( svgNS, 'svg' );
		svg.setAttribute( 'xmlns', svgNS );

		// Protanopia filter - simulates and corrects for red-blind vision
		var filterP = document.createElementNS( svgNS, 'filter' );
		filterP.setAttribute( 'id', 'md-protanopia-filter' );
		var matrixP = document.createElementNS( svgNS, 'feColorMatrix' );
		matrixP.setAttribute( 'type', 'matrix' );
		matrixP.setAttribute( 'values',
			'0.567, 0.433, 0,     0, 0 ' +
			'0.558, 0.442, 0,     0, 0 ' +
			'0,     0.242, 0.758, 0, 0 ' +
			'0,     0,     0,     1, 0'
		);
		filterP.appendChild( matrixP );
		svg.appendChild( filterP );

		// Deuteranopia filter - simulates and corrects for green-blind vision
		var filterD = document.createElementNS( svgNS, 'filter' );
		filterD.setAttribute( 'id', 'md-deuteranopia-filter' );
		var matrixD = document.createElementNS( svgNS, 'feColorMatrix' );
		matrixD.setAttribute( 'type', 'matrix' );
		matrixD.setAttribute( 'values',
			'0.625, 0.375, 0,   0, 0 ' +
			'0.7,   0.3,   0,   0, 0 ' +
			'0,     0.3,   0.7, 0, 0 ' +
			'0,     0,     0,   1, 0'
		);
		filterD.appendChild( matrixD );
		svg.appendChild( filterD );

		// Tritanopia filter - simulates and corrects for blue-blind vision
		var filterT = document.createElementNS( svgNS, 'filter' );
		filterT.setAttribute( 'id', 'md-tritanopia-filter' );
		var matrixT = document.createElementNS( svgNS, 'feColorMatrix' );
		matrixT.setAttribute( 'type', 'matrix' );
		matrixT.setAttribute( 'values',
			'0.95, 0.05,  0,     0, 0 ' +
			'0,    0.433, 0.567, 0, 0 ' +
			'0,    0.475, 0.525, 0, 0 ' +
			'0,    0,     0,     1, 0'
		);
		filterT.appendChild( matrixT );
		svg.appendChild( filterT );

		container.appendChild( svg );
		document.body.appendChild( container );
	}

	function injectToggleUI() {
		var wrapper = document.createElement( 'div' );
		wrapper.className = 'md-toggle';
		wrapper.setAttribute( 'role', 'region' );
		wrapper.setAttribute( 'aria-label', config.strings && config.strings.activar
			? config.strings.activar
			: 'Colorblind mode' );

		// Badge
		var badge = document.createElement( 'span' );
		badge.id = 'md-badge';
		badge.className = 'md-badge';
		badge.setAttribute( 'aria-live', 'polite' );
		wrapper.appendChild( badge );

		// Type selector
		var selectorDiv = document.createElement( 'div' );
		selectorDiv.id = 'md-type-selector';
		selectorDiv.className = 'md-type-selector';

		var select = document.createElement( 'select' );
		select.id = 'md-type-select';

		var types = ['protanopia', 'deuteranopia', 'tritanopia'];
		var currentType = getContrastType();

		for( var i = 0; i < types.length; i++ ) {
			var option = document.createElement( 'option' );
			option.value = types[i];
			option.textContent = ( config.strings && config.strings[types[i]] )
				? config.strings[types[i]]
				: types[i];
			if( types[i] === currentType ) {
				option.selected = true;
			}
			select.appendChild( option );
		}

		selectorDiv.appendChild( select );
		wrapper.appendChild( selectorDiv );

		// Toggle button
		var btn = document.createElement( 'button' );
		btn.id = 'md-toggle-btn';
		btn.className = 'md-toggle-btn';
		btn.setAttribute( 'type', 'button' );
		btn.innerHTML = '&#x1f441;';
		wrapper.appendChild( btn );

		document.body.appendChild( wrapper );

		btn.addEventListener( 'click', function() {
			toggleActive();
		});

		select.addEventListener( 'change', function() {
			changeType( this.value );
		});
	}

	function init() {
		injectSVGFilters();
		injectToggleUI();

		var active = isActive();
		var type   = getContrastType();

		if( active ) {
			setStorageItem( STORAGE_KEY_ACTIVE, 'true' );
		}

		updateUI( active, type );
	}

	if( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

})();
