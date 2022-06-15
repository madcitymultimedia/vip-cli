#!/usr/bin/env node

/**
 * @flow
 * @format
 */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import command from 'lib/cli/command';

command( {
	requiredArgs: 2,
} )
	.command( 'purge-url', 'Purge page cache' )
	.command( 'debug-url', 'Debug page cache' )
	.argv( process.argv );
