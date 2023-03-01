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
import command from '../lib/cli/command';

command( {
	requiredArgs: 1,
} )
	.command( 'create', 'Create a new local dev environment' )
	.command( 'update', 'Update an already created local dev environment' )
	.command( 'start', 'Start a local dev environment' )
	.command( 'stop', 'Stop a local dev environment' )
	.command( 'destroy', 'Remove containers, networks, volumes and configuration files of a local dev environment' )
	.command( 'info', 'Provides basic info about one or multiple local dev environments' )
	.command( 'list', 'Provides basic info about all local dev environments' )
	.command( 'exec', 'Execute a WP-CLI command in local dev environment' )
	.command( 'import', 'Import data into a local WordPress environment' )
	.command( 'shell', 'Spawns a shell in a dev environment', function( name, sub, options ) {
		this.details = {
			options: [],
			commands: [],
			examples: [],
		};
		process.argv = [ process.argv[ 0 ], process.argv[ 1 ] + '-' + name ].concat( process.argv.slice( 3 ) );
		command( { wildcard: true, skipAddOptions: true } )
			.option( 'slug', 'Custom name of the dev environment' )
			.option( 'root', 'Spawn a root shell' )
			.option( 'service', 'Spawn a shell in a specific service (php if omitted)' )
			.argv( process.argv, async ( a, o ) => console.log( 'xxx', a, o ) );
	} )
	.command( 'logs', 'View logs from a local WordPress environment' )
	.argv( process.argv );
