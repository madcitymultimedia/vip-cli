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
import { appQuery, debugCache } from 'lib/api/cache-debug';
import command from 'lib/cli/command';
import { trackEvent } from 'lib/tracker';
import * as exit from 'lib/cli/exit';

const examples = [
	{
		usage: 'vip cache debug-url <URL>',
		description: 'Inspect page cache from a URL',
	},
];

export async function cacheDebugCommand( url = null, opt = {} ): void {
	console.log( url );
	const trackingParams = {
		app_id: opt.app.id,
		command: 'vip cache debug-url',
		env_id: opt.env.id,
	};

	await trackEvent( 'cache_debug_url_command_execute', trackingParams );

	if ( ! url ) {
		await trackEvent( 'cache_debug_url_command_error', { ...trackingParams, error: 'No URL provided' } );

		exit.withError( 'Please supply a URL.' );
	}

	let debugCacheObject = {};
	try {
		debugCacheObject = await debugCache( opt.app.id, opt.env.id, url );
	} catch ( err ) {
		await trackEvent( 'cache_debug_url_command_error', { ...trackingParams, error: err.message } );

		exit.withError( `Failed to debug URL(s) from page cache: ${ err.message }` );
	}

	await trackEvent( 'cache_debug_url_command_success', trackingParams );

	console.log( JSON.stringify( debugCacheObject ) );
}

command( {
	appContext: true,
	appQuery,
	envContext: true,
	wildcardCommand: true,
	usage: 'vip cache debug-url <URL>',
} )
	.option( 'from-file', 'Read URLs from file (useful to debug multiple URLs)' )
	.examples( examples )
	.argv( process.argv, cacheDebugCommand );
